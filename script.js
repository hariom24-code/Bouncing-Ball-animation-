const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];

class Ball {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
            this.split();
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
            this.split();
        }

        this.draw();
    }

    split() {
        if (this.radius > 2) {  // Stop splitting if the balls are too small
            const newBalls = [];
            balls.forEach(ball => {
                newBalls.push(new Ball(ball.x, ball.y, ball.radius / 2, ball.dx, ball.dy));
                newBalls.push(new Ball(ball.x, ball.y, ball.radius / 2, -ball.dx, -ball.dy));
            });
            balls.push(...newBalls);
        }
    }
}

// Initialize the first ball
balls.push(new Ball(canvas.width / 2, canvas.height / 2, 30, 4, 4));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => ball.update());

    // Remove balls that are too small to be seen
    balls = balls.filter(ball => ball.radius > 1);

    if (balls.length > 0) {
        requestAnimationFrame(animate);
    }
}

animate();
