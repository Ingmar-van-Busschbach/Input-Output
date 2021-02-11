let posenetOk = false;

const screenWidth = screen.width;
const screenHeight = screen.height;
const canvas2 = document.getElementById('canvas2');
canvas2.style.zIndex = 1;
let context = canvas2.getContext('2d');
let pose;//debug global
let showVideoStream = false; // show video on / off
let videoStreamAlpha = 0.4; // opacity of video stream

let averageArrayX = [];
let averageArrayY = [];

function setupContext() {
    canvas2.width = screenWidth;
    canvas2.height = screenHeight;
    context.translate(screenWidth, 0); // flip screen horizontal
    context.scale(-1, 1); // flip screen horizontal
}

async function start() {
    for (let i = 0; i < 17; i++) {
        averageArrayX[i] = new MovingAverageCalculator();
        averageArrayY[i] = new MovingAverageCalculator();
    }


    setupContext();
    //https://github.com/tensorflow/tfjs-models/tree/master/posenet
    const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        //inputResolution: { width: 640, height: 480 },
        multiplier: 0.5 // 0.75
        //outputstride 32 lower resolution = higher speed
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
        //pose = await net.estimateSinglePose(video, 0.5, false, 16);
        pose = await net.estimateSinglePose(video, {
            //flipHorizontal: false
        });

        updateAverage(pose);
        context.clearRect(0, 0, screenWidth, screenHeight);
        drawKeypoints()


        socket.emit('updatePoseNet', pose, screenWidth, screenHeight);
        requestAnimationFrame(poseDetectionFrame);
    }

    poseDetectionFrame();
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

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    for (let i = 0; i < 16; i++) {
        let x = averageArrayX[i].lastMean;
        let y = averageArrayY[i].lastMean;

        ellipse(x, y, 10);
    }
}

function updateAverage(newPose) {
    for (let i = 0; i < 17; i++) {
        if (newPose.keypoints[i].score < 0.2) continue;
        averageArrayX[i].update(newPose.keypoints[i].position.x);
        averageArrayY[i].update(newPose.keypoints[i].position.y);

        pose.keypoints[i].position.x = averageArrayX[i].mean;
        pose.keypoints[i].position.y = averageArrayY[i].mean;
    }
}


start();
