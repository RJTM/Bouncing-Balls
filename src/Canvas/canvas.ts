import Ball from "../Ball/ball";
import { getWindowSize, onDelayChangeUpdate, onResizeUpdate } from "../util";

class Canvas {
    private ctx: CanvasRenderingContext2D;
    private height: number;
    private width: number;

    private balls: Ball[] = [];
    private paused: boolean = false;

    private delay: number = 0;
    constructor(private element: HTMLCanvasElement) {
        // Get the 2d context from the element
        this.element = element;
        this.ctx = this.element.getContext("2d");

        const {height, width} = getWindowSize();
        this.height = this.element.height = height;
        this.width = this.element.width = width;

        // fill the canvas with a white background
        this.ctx.fillStyle = "rgba(255,255,255,1)";
        this.ctx.fillRect(0, 0, this.width, this.height);
        // make the canvas responsive
        onResizeUpdate((newWidth, newHeight) => {
            this.height = this.element.height = newHeight;
            this.width = this.element.width = newWidth;
        });

        onDelayChangeUpdate((newDelay) => {
            this.delay = newDelay;
        });
    }

    public addBall(ball: Ball) {
        this.balls.push(ball);
    }

    public pause() {
        this.paused = !this.paused;
    }

    public loop() {
        if (this.paused) {
            // if the animation is paused, skip the redraw of the scene
            requestAnimationFrame(this.loop.bind(this));
            return;
        }
        this.ctx.fillStyle = "rgba(255,255,255,0.25)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.balls.forEach((ball) => {
            ball.draw(this.ctx);
            ball.update();
        });

        Ball.collisionDetect(this.balls);

        setTimeout(() => {
            requestAnimationFrame(this.loop.bind(this));
        }, this.delay);

    }

    public getBallNumber() {
        return this.balls.length;
    }

    public reset() {
        this.balls = [];
    }

}

export default Canvas;
