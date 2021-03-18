let dodgeState = null;
let dodgeColor = 0;

function dodge() {
    if (Mathf.getRndInteger(0, 2) === 0) {
        // Dodge right
        dodgeState = "right";
    } else {
        // Dodge left
        dodgeState = "left";
    }

    let i = 0;
    const interval = setInterval(function () {
        i += 0.0392156862745098;
        dodgeColor = Mathf.easeOutQuint(i) * 255;
        if (i >= 1) {
            clearInterval(interval);
            dodgeState = null;
            dodgeColor = 0;
            dodgeDelayEnd();
        }
    }, 196.07843137254903);
}


function dodgeDelayEnd() {
    console.log("checking if the player dodged correctly.")
    let correct = false;

    for (let i = 0; i < 17; i++) {
        if (pose.keypoints[i].position.x)
    }
}