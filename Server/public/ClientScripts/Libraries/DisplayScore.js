let texts = [];

function drawScoreText(text) {
    createText(window.innerWidth / 2, window.innerHeight / 2, 0, 0.5, 1000, text)
}


function createText(x, y, velX, velY, lifespan, text) {
    let t = {};
    t.x = x;
    t.y = y;
    t.velX = velX;
    t.velY = velY;
    t.lifespan = lifespan;
    t.text = text;
    t.textwidth = scoreContext.measureText(text).width;
    t.lifetime = 0;

    texts.push(t);
}


scoreContext.font = '48px serif';

console.log("starting text drawer");
setInterval(function () {
    context.beginPath();
   scoreContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let toRemove = [];

    texts.forEach(value => {
        value.lifetime += 10;
        scoreContext.fillText(value.text, (value.x += value.velX) - (value.textwidth / 2), value.y -= value.velY);

        console.log(value.lifetime + "  " + value.lifespan)
        if (value.lifetime >= value.lifespan) {
            toRemove.push(value);
        }
    });

        for (let j = 0; j < toRemove.length; j++) {
            let obj = toRemove[j];
            texts = texts.filter(value => value !== obj);
        }

        context.closePath()

}, 10);

