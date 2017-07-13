import { getWindowSize, onResizeUpdate, onDelayChangeUpdate } from '../util.js';
import Ball from '../Ball/ball.js';

class Canvas {
    constructor(element) {
        // Get the 2d context from the element
        this.element = element;
        this.ctx = this.element.getContext('2d');

        let {height, width} = getWindowSize();
        this.height = this.element.height = height;
        this.width = this.element.width = width;

        // fill the canvas with a white background
        this.ctx.fillStyle = 'rgba(255,255,255,1)';
        this.ctx.fillRect(0,0,this.width,this.height);
     
        // make the canvas responsive
        onResizeUpdate((newWidth, newHeight) => {
            this.height = this.element.height = newHeight;
            this.width = this.element.width = newWidth;
        });

        this.balls = [];
        this.paused = false;

        this.delay = 0;

        onDelayChangeUpdate((newDelay) => {
            this.delay = newDelay;
        });
    }

    addBall(ball) {
        this.balls.push(ball);
    }

    pause() {
        this.paused = !this.paused;
    }

    loop() {
        if (this.paused) {
            // if the animation is paused, skip the redraw of the scene
            requestAnimationFrame(this.loop.bind(this));
            return;
        }
        this.ctx.fillStyle = 'rgba(255,255,255,0.25)';
        this.ctx.fillRect(0,0,this.width,this.height);
        
        this.balls.forEach((ball) => {
            ball.draw(this.ctx);
            ball.update();
        });
    
        Ball.collisionDetect(this.balls);
    
        setTimeout(() => {
            requestAnimationFrame(this.loop.bind(this));
        }, this.delay);
    
    }

    getBallNumber() {
        return this.balls.length;
    }

    reset() {
        this.balls = [];
    }

}

export default Canvas;