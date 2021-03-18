document.getElementById("startBtn").addEventListener("click", function () {
    document.getElementById("canvas1").style.display = "block";
    document.getElementById("canvas2").style.display = "block";
    document.getElementById("startBtn").style.display = "none";

    detectPoseInRealTime().then(r => console.log(r));
});