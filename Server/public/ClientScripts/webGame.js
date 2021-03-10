const circleCanvas = document.createElement('canvas')
const circleContext = circleCanvas.getContext("2d");
circleCanvas.width = screen.width;
circleCanvas.height = screen.height;

const  circles = [];

function addCircle() {
    let x = random(25, canvas.width - 25)
    let y = random(25, canvas.height - 25);

    circles.push({ x: x, y: y, radius: 25, percent: 0, color: getRandomColor()});
}
let updated = false;
let cleared = false;
function updateGame() {
    if (updated) {
        circleContext.clearRect(0,0,screenWidth, screenHeight);
        cleared = true;
    }
    for (let i = 0; i < circles.length; i++){
        let value = circles[i];
        // Check if hand is close enough
        let a = value.x - pose.keypoints[9].position.x;
        let b = value.y - pose.keypoints[9].position.y;

        let c = Math.sqrt( a*a + b*b);
        if (c < 50) {
            circles.splice(i, 1);
            addCircle();
            updated = true;
            return ;
        }

        if (value !== 1) updated = true;
        value.percent += 0.05;
        if (value.percent > 1) value.percent = 1;

        if (updated) {
            circleContext.beginPath();
            circleContext.fillStyle = value.color;
            circleContext.arc(value.x, value.y, value.radius * easeOutBack(value.percent), 0, 2 * Math.PI);
            circleContext.fill();
            circleContext.stroke();
            circleContext.closePath();
        }
    }

    if (cleared) {
        updated = false;
        cleared = false;
    }

}


function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



