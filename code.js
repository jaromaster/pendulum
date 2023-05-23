// constants
const length = 0.1; //m
const pixelLength = length*3000; //px
const g = 9.81; //m/s^2
const pendulumColor = "rgb(89, 172, 228)";

// global vars
let t = 0.0;
let dampingCoeff = 0.3;


// get angle of pendulum at time t (damped)
function fDamped(t) {
    let initialAngle = Math.PI/2+Math.PI/4; //rad
    let frequency = Math.sqrt(g / length);
    let frequencyDamped = Math.sqrt(Math.pow(frequency,2)-Math.pow(dampingCoeff,2));

    return initialAngle * (Math.pow(Math.E, -1*dampingCoeff*t)) * Math.cos(frequencyDamped*t);
}


// draw pendulum
function draw(t,ctx) {
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    ctx.lineWidth = 4;
    ctx.strokeStyle = pendulumColor;
    ctx.fillStyle = pendulumColor;

    ctx.beginPath();
    let [x,y] = [canvas.width/2,canvas.height/3];
    ctx.arc(x,y,5,0,Math.PI*2);
    ctx.moveTo(x,y);
    
    let angle = fDamped(t); // get angle for time t
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


// update damping coefficient
function updateCoeff() {
    dampingCoeff = document.getElementById("dampingInput").value;
    t = 0;
}