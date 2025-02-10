const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, width: 30, height: 30, dy: 0, gravity: 0.5, jumpPower: -10, onGround: true };

// Cargar la imagen del dinosaurio
const dinoImage = new Image();
dinoImage.src = 'dino_sprite.png'; // Asegúrate de tener la imagen en la misma carpeta que tu script

let obstacles = [];
let score = 0;
let gameRunning = true;

// Función para dibujar el dinosaurio con la imagen
function drawDino() {
    ctx.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height); // Usa la imagen cargada
}

// Función para dibujar los obstáculos como rectángulos
function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = "brown"; // Color del obstáculo
        ctx.fillRect(obstacle.x - obstacle.radius, 150 - obstacle.radius, obstacle.radius * 2, obstacle.radius * 2); // Rectángulo en lugar de círculo
    });
}

function updateObstacles() {
    if (Math.random() < 0.02) {
        let radius = Math.random() * 15 + 10; // Obstáculo con tamaño aleatorio
        obstacles.push({ x: canvas.width, y: 170 - radius, radius: radius });
    }
    obstacles.forEach(obstacle => obstacle.x -= 5);
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.radius > 0); // Mantén los obstáculos en pantalla
}

function checkCollision() {
    for (let obstacle of obstacles) {
        const distX = Math.abs(dino.x + dino.width / 2 - obstacle.x);
        const distY = Math.abs(dino.y + dino.height / 2 - obstacle.y);
        
        if (distX < obstacle.radius && distY < obstacle.radius) {
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
