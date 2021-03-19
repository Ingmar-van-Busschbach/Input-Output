const screenWidth = screen.width;
const screenHeight = screen.height;

const canvas = document.getElementById('canvas');
canvas.style.zIndex = 1;

let context = canvas.getContext('2d');
let pose;//debug global
let showVideoStream = true; // show video on / off
let videoStreamAlpha = 0.1; // opacity of video stream

let averageArrayX = [];
let averageArrayY = [];

function setupContext() {
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    context.translate(screenWidth, 0); // flip screen horizontal
    context.scale(-1, 1); // flip screen horizontal
}

async function start() {
    for (let i = 0; i < 17; i++) {
        averageArrayX[i] = new MovingAverageCalculator();
        averageArrayY[i] = new MovingAverageCalculator();
    }


    setupContext();
    const net = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 16,
        inputResolution: { width: 320, height: 180 },
        multiplier: 1,
    });

    let video;
    try {
        video = await loadVideo();
    } catch (e) {
        console.error(e);
        return;
    }

    socket.emit("setup", screenWidth, screenHeight);
    detectPoseInRealTime(video, net);
}

function detectPoseInRealTime(video, net) {

    async function poseDetectionFrame() {
        pose = await net.estimateSinglePose(video, {
            flipHorizontal: false
        });

        updateAverage(pose);


        context.clearRect(0, 0, screenWidth, screenHeight);
        if(showVideoStream){
            context.globalAlpha = videoStreamAlpha; // opacity
            context.drawImage(video, 0, 0, screenWidth, screenHeight);
        }


        drawPoints(pose);
        drawSkeleton(pose);

        socket.emit('updatePoseNet', pose, screenWidth, screenHeight);

        requestAnimationFrame(poseDetectionFrame);
    }

    poseDetectionFrame().catch(reason => console.log(reason));
}

async function loadVideo() {
    const video = await setupCamera();
    video.play();
    return video;
}

async function setupCamera() {
    const video = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
            'audio': false,
            'video': {
                width: screenWidth,
                height: screenHeight
            }
        });
        video.width = screenWidth;
        video.height = screenHeight;
        video.srcObject = stream;
        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                resolve(video);
            };
        });
    } else {
        const errorMessage = "This browser does not support video capture, or this device does not have a camera";
        alert(errorMessage);
        return Promise.reject(errorMessage);
    }
}

function updateAverage(newPose) {
    for (let i = 0; i < 17; i++) {
        if (newPose.keypoints[i].score < 0.6) continue;
        if (newPose.keypoints[i].score > 0.9) {
            for (let j = 0; j < averageArrayX.length/2; j++) {
                averageArrayX[i].update(newPose.keypoints[i].position.x);
                averageArrayY[i].update(newPose.keypoints[i].position.y);
            }
        }
        // if it's 100% sure i want it there no matter what
        if (newPose.keypoints[i].score > 1) {
            for (let j = 0; j < averageArrayX.length; j++) {
                averageArrayX[i].update(newPose.keypoints[i].position.x);
                averageArrayY[i].update(newPose.keypoints[i].position.y);
            }
        }

        averageArrayX[i].update(newPose.keypoints[i].position.x);
        averageArrayY[i].update(newPose.keypoints[i].position.y);

        pose.keypoints[i].position.x = averageArrayX[i].mean;
        pose.keypoints[i].position.y = averageArrayY[i].mean;
    }
}



start().then(r => console.log(r));