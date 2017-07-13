import { randomNumber } from './util.js';
import Ball from './Ball/ball.js';
import Canvas from './Canvas/canvas.js';
import './main.scss';

const canvasElement = document.getElementById('canvas');
const canvas = new Canvas(canvasElement);

const counter = document.querySelector('.ball-number');
const updateCounter = () => {
    counter.textContent = canvas.getBallNumber();
}

canvasElement.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const newBall = new Ball(event.x, event.y, randomNumber(-10,10), randomNumber(-10, 10), 'gray', 10);
    canvas.addBall(newBall);    
    updateCounter();
}, false);

window.addEventListener('keydown', (event) => {
    if (event.key === " ") {
        canvas.pause();
    }
});

document.querySelector('.reset-button').onclick = () => {
    canvas.reset();
    updateCounter();
};

canvas.loop();