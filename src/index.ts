import Ball from "./Ball/ball";
import Canvas from "./Canvas/canvas";
import "./main.scss";
import { randomNumber } from "./util";

const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const canvas = new Canvas(canvasElement);

const counter = document.querySelector(".ball-number");
const updateCounter = () => {
    counter.textContent = canvas.getBallNumber().toString();
};

canvasElement.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    const newBall = new Ball(event.x, event.y, randomNumber(-10, 10), randomNumber(-10, 10), "gray", 10);
    canvas.addBall(newBall);
    updateCounter();
}, false);

window.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        canvas.pause();
    }
});

document.querySelector(".reset-button").addEventListener("click", (event) => {
    canvas.reset();
    updateCounter();
});

canvas.loop();
