const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, width: 30, height: 30, dy: 0, gravity: 0.5, jumpPower: -10, onGround: true };
let obstacles = [];
let score = 0;
let gameRunning = true;

function drawDino() {
    ctx.fillStyle = "green";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
    ctx.fillStyle = "red";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    if (Math.random() < 0.02) {
        obstacles.push({ x: canvas.width, y: 170, width: 20, height: 30 });
    }
    obstacles.forEach(obstacle => obstacle.x -= 5);
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

function checkCollision() {
    for (let obstacle of obstacles) {
        if (dino.x < obstacle.x + obstacle.width && dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height && dino.y + dino.height > obstacle.y) {
            gameRunning = false;
            alert("¡Game Over! Puntuación: " + score);
            document.location.reload();
        }
    }
}

function updateDino() {
    dino.y += dino.dy;
    dino.dy += dino.gravity;
    if (dino.y >= 150) {
        dino.y = 150;
        dino.dy = 0;
        dino.onGround = true;
    }
}

function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    drawObstacles();
    updateDino();
    updateObstacles();
    checkCollision();
    score++;
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && dino.onGround) {
        dino.dy = dino.jumpPower;
        dino.onGround = false;
    }
});

gameLoop();
