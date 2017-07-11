const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const height = canvas.height = window.innerHeight;
const width = canvas.width = window.innerWidth;

import { randomNumber } from './util.js';
import Ball from './Ball/ball.js';
import './main.scss';

let balls = [];

const addBall = function(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log(event);
    const newBall = new Ball(event.x, event.y, randomNumber(-10,10), -10, 'blue', 10);
    balls.push(newBall);
}

canvas.addEventListener('mousedown', addBall, false);

const loop = function() {
    context.fillStyle = 'rgba(0,0,0,0.25)';
    context.fillRect(0,0,width,height);
    
    balls.forEach(function(ball) {
        ball.draw(context);
        ball.update();
    });

    Ball.collisionDetect(balls);

    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 1000);

    ///requestAnimationFrame(loop);

}

loop();