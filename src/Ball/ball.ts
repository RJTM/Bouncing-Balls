import { BOUNCE_FACTOR, GRAVITY } from "../constants";
import { getWindowSize, onBounceChangeUpdate, onGravityChangeUpdate, onResizeUpdate } from "../util";

let {width, height} = getWindowSize();
let gravity = GRAVITY;
let bounce = BOUNCE_FACTOR;

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
    public static collisionDetect(balls: Ball[]) {
        for (let i = 0; i < balls.length - 1; i++) {
            // if (balls[i].stopped) continue;
            for (let j = i + 1; j < balls.length; j++) {
                // if (balls[j].stopped) continue;
                if (balls[i].doesCollision(balls[j])) {
                    balls[i].velX = -(balls[i].velX);
                    balls[j].velX = -(balls[j].velX);
                }
            }
        }
    }

    private stopped: boolean;

    constructor(private x: number,
                private y: number,
                private velX: number,
                private velY: number,
                private color: any,
                private size: number) {
        this.stopped = false;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }

    public update() {
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
        if (this.y + this.size + bounce * 10 >= height && this.velY > -(bounce * 2) && this.velY < (bounce * 2)) {
            this.stop();
            return;
        }

        this.x += this.velX;
        this.y += this.velY;
        this.velY += gravity;

    }

    public doesCollision(otherBall: Ball) {
        const dx = this.x - otherBall.x;
        const dy = this.y - otherBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < this.size + otherBall.size;
    }

    public stop() {
        this.stopped = true;
        this.y = height - this.size;
    }
}

export default Ball;
