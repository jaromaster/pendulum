const length = 1; //m
const pixelLength = length*300; //px


// get angle of pendulum at time t
function f(t) {
    let g = 9.81; //m/s^2
    let initialAngle = Math.PI; //rad
    let frequency = Math.sqrt(g / length);

    return initialAngle * Math.cos(frequency*t);
}


// draw pendulum
function draw(t) {
    const canvas = document.getElementById("pendulumCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    ctx.lineWidth = 4;

    ctx.beginPath();
    let [x,y] = [canvas.width/2,canvas.height/4];
    ctx.arc(x,y,5,0,Math.PI*2);
    ctx.moveTo(x,y);
    
    let angle = f(t);
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