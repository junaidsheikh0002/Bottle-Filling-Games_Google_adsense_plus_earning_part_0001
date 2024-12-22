const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let score = 0;
let currentColor = 'red';
let bottles = [];

// Initialize bottles
function initBottles() {
    for (let i = 0; i < 5; i++) {
        bottles.push({
            x: 80 * i + 20,
            y: 500,
            width: 60,
            height: 100,
            fillLevel: 0,
            color: null,
        });
    }
}

// Draw bottles
function drawBottles() {
    bottles.forEach((bottle) => {
        // Draw bottle outline
        ctx.strokeStyle = 'black';
        ctx.strokeRect(bottle.x, bottle.y, bottle.width, bottle.height);

        // Fill bottle
        if (bottle.color) {
            ctx.fillStyle = bottle.color;
            ctx.fillRect(
                bottle.x,
                bottle.y + bottle.height - bottle.fillLevel,
                bottle.width,
                bottle.fillLevel
            );
        }
    });
}

// Handle bottle filling
function fillBottle(x, y) {
    bottles.forEach((bottle) => {
        if (
            x >= bottle.x &&
            x <= bottle.x + bottle.width &&
            y >= bottle.y &&
            y <= bottle.y + bottle.height
        ) {
            if (bottle.fillLevel < bottle.height) {
                bottle.fillLevel += 20;
                bottle.color = currentColor;
                score++;
            }
        }
    });
}

// Change fill color
function changeColor(color) {
    currentColor = color;
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBottles();
    requestAnimationFrame(gameLoop);
}

// Event listener for clicks
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    fillBottle(x, y);
});

// Start game
initBottles();
gameLoop();