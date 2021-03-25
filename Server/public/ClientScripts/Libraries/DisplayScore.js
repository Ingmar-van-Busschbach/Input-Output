function drawScoreText(text) {
    let textWidth = scoreContext.measureText(text).width;

    scoreContext.font = '48px serif';
    scoreContext.fillText(text, (window.innerWidth/2) - (textWidth/2), window.innerHeight/2);

    let y = window.innerHeight / 2;

    let interval = setInterval(function () {
        scoreContext.clearRect(0, 0, window.innerWidth, window.innerHeight)
        scoreContext.font = '48px serif';
        scoreContext.fillText(text, (window.innerWidth/2) - (textWidth/2), y -= 0.5);
        console.log(y)
    }, 10);



    setTimeout(function () {
        clearInterval(interval);
        scoreContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }, 2000);
}