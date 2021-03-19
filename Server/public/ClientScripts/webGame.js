function updateGame() {
    if (dodgeState === "right") {
        console.log("yes")
        context.beginPath();
        let green = dodgeColor/255;
        context.fillStyle = `rgb(${dodgeColor}, ${green}, 0)`;
        context.fillRect(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight);
        context.closePath();
    }

    if (dodgeState === "left") {
        console.log('no')
        context.beginPath();
        let green = dodgeColor/255;
        context.fillStyle = `rgb(${dodgeColor}, ${green}, 0)`;
        context.fillRect(0,0,window.innerWidth/2, window.innerHeight);
        context.closePath();
    }
}