import { GRAVITY, BOUNCE_FACTOR } from '../constants.js';

const width = window.innerWidth;
const height = window.innerHeight;

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
            if (balls[i].stopped) continue;
            for (let j=i+1;j<balls.length;j++) {
                if (balls[j].stopped) continue;
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
        if (this.stopped) {
            return;
        }

        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        if ((this.y + this.size) >= height) {
            this.velY *= -BOUNCE_FACTOR;
            this.velX *= BOUNCE_FACTOR;
            this.y = height - this.size;

        }

        if (this.y + this.size + 6 >= height && this.velY > -1.0 && this.velY < 1.0) {
            this.stop();
            return;
        }

        this.x += this.velX;
        this.y += this.velY;
        this.velY += GRAVITY;

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