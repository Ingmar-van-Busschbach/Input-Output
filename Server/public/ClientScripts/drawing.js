function line(x1, y1, x2, y2) {
    context.beginPath();
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