let dodgeState = null;
let dodgeColor = 0;

function dodge(dodgeTime) {
    if (Mathf.getRndInteger(0, 2) === 0) {
        dodgeState = "right";
    } else {
        dodgeState = "left";
    }

    if (dodgeState === "right") {
        console.log("draw1")
        secondContext.beginPath();
        secondContext.fillStyle = `rgba(200, 0, 0, 0.5)`;
        secondContext.fillRect(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
        secondContext.closePath();
    }

    if (dodgeState === "left") {
        console.log("draw2")
        secondContext.beginPath();
        secondContext.fillStyle = `rgba(200, 0, 0, 0.5)`;
        secondContext.fillRect(0, 0, window.innerWidth / 2, window.innerHeight);
        secondContext.closePath();
    }


    setTimeout(function () {
            secondContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

            let hasDodged = true;

            for (const value of pose.keypoints) {
                if (value.score < 0.5) continue;

                if (dodgeState === "right") {
                    if (value.position.x < window.innerWidth/2) {
                        hasDodged = false;
                        console.log(value.position)
                        console.log(value.part)
                        break;
                    }
                } else {
                    if (value.position.x > window.innerWidth/2) {
                        console.log(value.position)
                        console.log(value.part)
                        hasDodged = false;
                        break;
                    }
                }
            }

            if (hasDodged) {
                drawScoreText("AWSOME!! you did a super dodge");
            } else {
                drawScoreText("better luck next time")
            }
        }, dodgeTime);
}
