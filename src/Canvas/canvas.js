import { getWindowSize, onResizeUpdate } from '../util.js';
import Ball from '../Ball/ball.js';

class Canvas {
    constructor(element) {
        this.element = element;
        this.ctx = this.element.getContext('2d');

        let {height, width} = getWindowSize();
        this.height = this.element.height = height;
        this.width = this.element.width = width;

        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fillRect(0,0,this.width,this.height);
     
        onResizeUpdate((newWidth, newHeight) => {
            this.height = this.element.height = newHeight;
            this.width = this.element.width = newWidth;
        });

        this.balls = [];
        this.paused = false;

        this.delay = 0;
    }

    addBall(ball) {
        this.balls.push(ball);
    }

    pause() {
        this.paused = !this.paused;
    }

    loop() {
        if (this.paused) {
            requestAnimationFrame(this.loop.bind(this));
            return;
        }
        this.ctx.fillStyle = 'rgba(0,0,0,0.25)';
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

}

export default Canvas;