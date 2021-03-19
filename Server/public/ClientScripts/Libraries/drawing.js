function line(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = "#FF0000";
    context.lineWidth = 10;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function ellipse(x, y, r, c = "blue") {
    context.beginPath();
    context.fillStyle = c;
    context.strokeStyle = "red";
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
}


function drawPoints() {
    for (let i = 0; i < 16; i++) {
        let x = averageArrayX[i].lastMean;
        let y = averageArrayY[i].lastMean;

        if (pose.keypoints[i].score > 0.4) {
            ellipse(x, y, 10);
        }
    }

}

function drawSkeleton(pose) {
    let points = pose.keypoints;
    drawLineBetween(1,2)

    // Main body
    drawLineBetween(5, 6);
    drawLineBetween(6, 12);
    drawLineBetween(12, 11);
    drawLineBetween(11, 5);

    // arms
    drawLineBetween(5, 7);
    drawLineBetween(7, 9);
    drawLineBetween(6,8)
    drawLineBetween(8, 10)

    function drawLineBetween(a, b) {
        line(points[a].position.x, points[a].position.y, points[b].position.x, points[b].position.y);
    }
}



