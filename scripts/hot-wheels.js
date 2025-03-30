//initialize theme
function initializeTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
}

//enables dark mode
function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
}

//enables light mode
function enableLightMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
}

//event listeners for buttons
function addEventListeners() {
    const darkModeBtn = document.querySelector(".theme-dark-btn");
    const lightModeBtn = document.querySelector(".theme-light-btn");

    darkModeBtn.addEventListener("click", enableDarkMode);
    lightModeBtn.addEventListener("click", enableLightMode);
}

//visitor update count
function updateVisiter() {
    const counter = document.getElementById('visitorCounter');
    if (!counter) return;
    
    let count = localStorage.getItem('visitorCountWheels') || 1000;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCountWheels', count);
    counter.textContent = count.toString().padStart(4, '0');
}

//game logic
function startGame() {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const playButton = document.getElementById("play-button");
    const scoreTracker = document.getElementById("score-tracker");

    //16:9
    const baseWidth = 1230;
    const baseHeight = 692; 
    canvas.width = baseWidth;
    canvas.height = baseHeight;

    const carWidth = 170;
    const carHeight = 76;
    let carY = canvas.height / 2 - carHeight / 2;
    let carX = canvas.width / 2 - carWidth / 2;
    const carSpeed = 5;
    let rocks = [];
    let score = 0;
    let gameRunning = false;

    //keyboard movement
    let movingUp = false;
    let movingDown = false;
    let movingLeft = false;
    let movingRight = false;

    const carImage = new Image();
    carImage.src = "/images/hot-wheel/hotwheel-game.png"; 
    const rockImage = new Image();
    rockImage.src = "/images/hot-wheel/rock.png";

    let rockSpawnSpeed = 1000;
    let gameInterval;
    let difficultyIncrease; 

    //for the road
    let scrollSpeed = 7.5; 
    let gameAnimationFrame; 

    function animateBackground() {
        const container = document.querySelector(".game-container");

        //get the current background position
        let currentPositionX = parseFloat(window.getComputedStyle(container).backgroundPositionX);

        //update the background position to create a scrolling effect
        let newPositionX = currentPositionX - scrollSpeed;

        //apply the new background position
        container.style.backgroundPositionX = newPositionX + "px";

        //request the next frame of the animation
        if (gameRunning) {
            gameAnimationFrame = requestAnimationFrame(animateBackground);
        }
    }

    document.addEventListener("keydown", (e) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && gameRunning) {
            e.preventDefault(); 
        }
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") movingUp = true;
        if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") movingDown = true;
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") movingLeft = true;
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") movingRight = true;
        if (e.key === "Escape") {gameOver(); return;};
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") movingUp = false;
        if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") movingDown = false;
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") movingLeft = false;
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") movingRight = false;
    });

    //create random rocks
    function createRock() {
        const rockWidth = 85;
        const rockHeight = 79;
        const x = (canvas.width);
        const y = Math.random() * (canvas.height - rockHeight);   
        rocks.push({ x, y, width: rockWidth, height: rockHeight });
    }

    //game UPDATE
    function updateGame() {
        if (!gameRunning) return; 

        let dx = 0, dy = 0;

        if (movingUp) dy -= 2;
        if (movingDown) dy += 2;
        if (movingLeft) dx -= 2;
        if (movingRight) dx += 2;

        //normalized speed
        if (dx !== 0 && dy !== 0) {
            dx *= Math.SQRT1_2;
            dy *= Math.SQRT1_2;
        }

        carX += dx * carSpeed;
        carY += dy * carSpeed;

        //car stays inside bounds
        carX = Math.max(0, Math.min(canvas.width - carWidth, carX));
        carY = Math.max(0, Math.min(canvas.height - carHeight, carY));

        let remainingRocks = [];
        rocks.forEach((rock, index) => {
            rock.x -= 10;
            if (rock.x + rock.width >= 0) {
                remainingRocks.push(rock);
            } else{
                score++;
            }
        });
        rocks = remainingRocks;

        //COLLISIONS
        for (let i = 0; i < rocks.length; i++) {
            const rock = rocks[i];
            if (
                carX < rock.x + rock.width &&
                carX + carWidth -10 > rock.x &&
                carY < rock.y -10 + rock.height &&
                carY + carHeight > rock.y
            ) {
                gameOver();
                return;
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(carImage, carX, carY, carWidth, carHeight);

        rocks.forEach((rock) => ctx.drawImage(rockImage, rock.x, rock.y, rock.width, rock.height));

        ctx.fillStyle = "#000"; 
        ctx.font = "30px Lucida Console";
        ctx.fillText("Score: " + score, 20, 40);

        requestAnimationFrame(updateGame);
    }

    //game over
    function gameOver() {
        gameRunning = false;  
        clearInterval(gameInterval);  
        cancelAnimationFrame(gameAnimationFrame); 
        cancelAnimationFrame(animateBackground); 
    
        scoreTracker.textContent = `Game Over! Final Score: ${score}`;
        playButton.textContent = "Play Again";
        playButton.style.display = "block";
    
        //reset movement to prevent the car from moving
        movingUp = false;
        movingDown = false;
        movingLeft = false;
        movingRight = false;
    }

    //start game
    function start() {
        if (gameRunning) return;
        gameRunning = true;
        playButton.style.display = "none";
        animateBackground();
        resetGame();
        gameLoop();
    }

    //reset the game to initial state
    function resetGame() {
        rockSpawnSpeed = 1000;
        carY = canvas.height / 2 - carHeight / 2;
        rocks = [];
        score = 0;
        scoreTracker.textContent = "Score: 0";

        //clear any existing intervals
        clearInterval(gameInterval);
        clearInterval(difficultyIncrease);  

        //restart the rock spawn interval
        gameInterval = setInterval(createRock, rockSpawnSpeed);
    }

    //main game loop
    function gameLoop() {
        difficultyIncrease = setInterval(() => {
                if (rockSpawnSpeed > 401){
                    rockSpawnSpeed -= 200;
                }  
                clearInterval(gameInterval); 
                gameInterval = setInterval(createRock, rockSpawnSpeed); 
        }, 5000);
        gameAnimationFrame = requestAnimationFrame(updateGame);
    }

    //event listener for play button
    playButton.addEventListener("click", () => {
        if (!gameRunning) {
            start();  
        } else {
            resetGame();  
            playButton.textContent = "Play";  
            playButton.style.display = "none";  
            gameLoop();  
        }
    });
}

//main
document.addEventListener("DOMContentLoaded", function () {
    initializeTheme();
    addEventListeners();
    updateVisiter();
    startGame();
});