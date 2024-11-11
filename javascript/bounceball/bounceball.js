// This JavaScript animate a bounce ball on canvas
// Author: Ronaldo Prado
// Date: 11/03/2024
// Assume You was already created myCanvas on your HTML file

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const ball = {
    x: 20, // Start at the top-left corner (radius)
    y: 20, // Start at the top-left corner (radius)
    radius: 20,
    dx: 2,
    dy: 2,
    gravity: 0.1,
    friction: 0.99,
    bounce: 0.7,
    rightWallCollisions: 0
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    ball.dy = ball.dy + ball.gravity;
    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;

    // Check for collision with the floor
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.dy = -ball.dy * ball.bounce;
        ball.dy = ball.dy * ball.friction;
    }

    // Check for collision with the right wall
    if (ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
        ball.rightWallCollisions = ball.rightWallCollisions + 1;

        if (ball.rightWallCollisions == 2) {
            ball.x = ball.radius;
            ball.y = ball.radius;
            ball.dx = 2;
            ball.dy = 2;
            ball.rightWallCollisions = 0;
        }
    }

    // Check for collision with the left wall
    if (ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    // Check for collision with the ceiling
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
