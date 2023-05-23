// constants
const length = 1; //m
const pixelLength = length*300; //px
const dampingCoeff = 0.3;
const g = 9.81; //m/s^2

// global vars
let t = 0.0;
let mode = "normal";


// get angle of pendulum at time t
function f(t) {
    let initialAngle = Math.PI/2+Math.PI/4; //rad
    let frequency = Math.sqrt(g / length);

    return initialAngle * Math.cos(frequency*t);
}


// get angle of pendulum at time t (damped)
function fDamped(t) {
    let initialAngle = Math.PI/2+Math.PI/4; //rad
    let frequency = Math.sqrt(g / length);
    let frequencyDamped = Math.sqrt(Math.pow(frequency,2)-Math.pow(dampingCoeff,2));

    return initialAngle * (Math.pow(Math.E, -1*dampingCoeff*t)) * Math.cos(frequencyDamped*t);
}


// draw pendulum
function draw(t) {
    const canvas = document.getElementById("pendulumCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    ctx.lineWidth = 4;

    ctx.beginPath();
    let [x,y] = [canvas.width/2,canvas.height/3];
    ctx.arc(x,y,5,0,Math.PI*2);
    ctx.moveTo(x,y);
    

    let angle = fDamped(t); // get angle for time t
    if (mode == "normal") {
        angle = f(t);
    }
    let deltaX = Math.sin(angle)*pixelLength;
    let deltaY = Math.cos(angle)*pixelLength;
    x+=deltaX;
    y+=deltaY;
    ctx.lineTo(x,y);

    ctx.moveTo(x,y);
    ctx.arc(x,y,20,0,Math.PI*2);

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}


// update pendulum mode (normal / damped)
function updateMode() {
    mode = document.getElementById("modeSelect").value;
    t = 0;

    if(mode == "damped") {
        document.getElementById("dampingInputLabel").style = "display: inline";
        document.getElementById("dampingInput").style = "display: inline";
    }
    else {
        document.getElementById("dampingInputLabel").style = "display: none";
        document.getElementById("dampingInput").style = "display: none";
    }
}