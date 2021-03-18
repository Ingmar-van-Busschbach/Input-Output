function updateGame() {
    if (dodgeState === "left") {
        context.beginPath();
        let green = 255 - dodgeColor;
        context.fillStyle = `rgb(${dodgeColor}, ${green},0)`;
        context.fillRect(0,0, window.innerWidth/2, window.innerHeight);
        context.closePath();
    }
    if (dodgeState === "right") {
        context.beginPath();
        let green = 255 - dodgeColor;
        context.fillStyle = `rgb(${dodgeColor}, ${green},0)`;
        context.fillRect(window.innerWidth/2,0, window.innerWidth/2, window.innerHeight);
        context.closePath();
    }
}
