const secondCanvas = document.getElementById("dodgeCanvas");
secondCanvas.style.zIndex = "2";
secondCanvas.width = window.innerWidth;
secondCanvas.height = window.innerHeight;

secondContext = secondCanvas.getContext("2d");


const scoreCanvas = document.getElementById("scoreCanvas");
scoreCanvas.style.zIndex = "2";
scoreCanvas.width = window.innerWidth;
scoreCanvas.height = window.innerHeight;

scoreContext = secondCanvas.getContext("2d");