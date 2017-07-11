const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const height = canvas.height = window.innerHeight;
const width = canvas.width = window.innerWidth;

context.fillStyle = 'rgba(0,0,0,1)';
context.fillRect(0,0,width,height);

import { randomNumber } from './util.js';
import Ball from './Ball/ball.js';
import './main.scss';

let balls = [];
let paused = false;

const addBall = function(event) {
    event.stopPropagation();
    event.preventDefault();
    const newBall = new Ball(event.x, event.y, randomNumber(-10,10), -10, 'blue', 10);
    balls.push(newBall);
}

const pause = function(event) {
    paused = !paused;
}

canvas.addEventListener('click', addBall, false);
window.addEventListener('keydown', (event) => {
    if (event.key === " ") {
        pause();
    }
});

const loop = function() {
    if (paused) {
        requestAnimationFrame(loop);
        return;
    }
    context.fillStyle = 'rgba(0,0,0,0.25)';
    context.fillRect(0,0,width,height);
    
    balls.forEach(function(ball) {
        ball.draw(context);
        ball.update();
    });

    Ball.collisionDetect(balls);

    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 10);

    ///requestAnimationFrame(loop);

}

loop();