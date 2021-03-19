let dodgeState = null;
let dodgeColor = 0;

function dodge() {
    if (Mathf.getRndInteger(0, 2) === 0) {
        dodgeState = "right";
    } else {
        dodgeState = "left";
    }

    let i = 0;
    const interval = setInterval(function () {
        i += 0.05;
        dodgeColor = Mathf.easeOutQuint(i) * 255;
        if (i >= 1) {
            clearInterval(interval);
            dodgeColor = 0;
            dodgeDelayEnd();
        }
    }, 100);
}


function dodgeDelayEnd() {
    console.log("checking if the player dodged correctly.")
    let correct = true;

    for (let i = 0; i < 17; i++) {
        if (pose.keypoints[i].score < 0.5) continue;
        if (dodgeState === "right") {
            if (!(pose.keypoints[i].position.x < window.innerWidth/2)) {
                correct = false;
            }
        }


        if (dodgeState === "left") {
            if (!(pose.keypoints[i].position.x > window.innerWidth/2)) {
                correct = false;
            }
        }
    }


    dodgeState = null;
    console.log("has dodged?" + correct)
}


function updateDodgeGame() {
    if (dodgeState === "right") {
        gameContext.beginPath();
        let green = dodgeColor/255;
        gameContext.fillStyle = `rgb(${dodgeColor}, ${green}, 0)`;
        gameContext.fillRect(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight);
        gameContext.closePath();
    }

    if (dodgeState === "left") {
        gameContext.beginPath();
        let green = dodgeColor/255;
        gameContext.fillStyle = `rgb(${dodgeColor}, ${green}, 0)`;
        gameContext.fillRect(0,0,window.innerWidth/2, window.innerHeight);
        gameContext.closePath();
    }
}