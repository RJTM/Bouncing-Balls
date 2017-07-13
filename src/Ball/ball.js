import { GRAVITY, BOUNCE_FACTOR } from '../constants.js';
import { onResizeUpdate, getWindowSize, onGravityChangeUpdate, onBounceChangeUpdate } from '../util.js';

let {width, height} = getWindowSize();
let gravity = GRAVITY, bounce = BOUNCE_FACTOR;

onGravityChangeUpdate((newGravity) => {
    gravity = parseFloat(newGravity);
});

onBounceChangeUpdate((newBounce) => {
    bounce = newBounce;
});

onResizeUpdate((newWidth, newHeight) => {
    width = newWidth;
    height = newHeight;
});

class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.stopped = false;
    }

    static collisionDetect(balls) {
        for (let i=0;i<balls.length-1;i++) {
            //if (balls[i].stopped) continue;
            for (let j=i+1;j<balls.length;j++) {
                //if (balls[j].stopped) continue;
                if (balls[i].doesCollision(balls[j])) {
                    balls[i].velX = -(balls[i].velX);
                    balls[j].velX = -(balls[j].velX);
                }
            }
        }
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }

    update() {
        // Check if the ball should keep moving
        if (this.stopped) {
            return;
        }

        // Check collition on the x axis
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        // Check collition on the y axis
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
            this.y = this.size;
        }

        if ((this.y + this.size) >= height) {
            // If the ball reaches the bottom of the browser window, apply the bouncing factor to 
            // the Y axis to make the ball bounce and to the X axis to simulate some friction
            // And lastly reposition the ball to avoid issues
            this.velY *= -bounce;
            this.velX *= bounce;
            this.y = height - this.size;

        }

        // If the ball is close to the bottom of the window and its speed is low stop it
        if (this.y + this.size + bounce*10 >= height && this.velY > -(bounce*2) && this.velY < (bounce*2)) {
            this.stop();
            return;
        }

        this.x += this.velX;
        this.y += this.velY;
        this.velY += gravity;

    }

    doesCollision(otherBall) {
        const dx = this.x - otherBall.x;
        const dy = this.y - otherBall.y;
        const distance = Math.sqrt(dx*dx + dy*dy);

        return distance < this.size + otherBall.size;
    }

    stop() {
        this.stopped = true;
        this.y = height - this.size;
    }
}

export default Ball;