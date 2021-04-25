const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".results");
let currentShooterIndex = 202;
let gridWidth = 15;
let direction = 1;
let invadersID;
let goingRight = true;
let aliensRemoved = [];
let results = 0;

for (let i = 0; i < 225; i++) {
    const square = document.createElement("div");
    square.textContent = i;
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

// prettier-ignore
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function drawInvaders() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader");
        }
    }
}

drawInvaders();

function removeInvaders() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
    }
}

squares[currentShooterIndex].classList.add("shooter");

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % gridWidth !== 0) currentShooterIndex -= 1;
            break;

        case "ArrowRight":
            if (currentShooterIndex % gridWidth < gridWidth - 1)
                currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
    const leftEdge = alienInvaders[0] % gridWidth === 0;
    const rightEdge =
        alienInvaders[alienInvaders.length - 1] % gridWidth === gridWidth - 1;
    removeInvaders();

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += gridWidth + 1;
            direction = -1;
            goingRight = false;
        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += gridWidth - 1;
            direction = 1;
            goingRight = true;
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    drawInvaders();

    if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
        resultDisplay.textContent = "GAME OVER";
        clearInterval(invadersID);
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > squares.length) {
            resultDisplay.innerHTML = "GAME OVER";
            clearInterval(invadersID);
        }
    }

    if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = "YOU WIN";
        clearInterval(invadersID);
    }
}

invadersID = setInterval(moveInvaders, 1500);

function shoot(event) {
    let laserID;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= gridWidth;

        if (currentLaserIndex >= 0) {
            squares[currentLaserIndex].classList.add("laser");

            console.log(currentLaserIndex);
            console.log(squares[currentLaserIndex]);

            if (squares[currentLaserIndex].classList.contains("invader")) {
                results++;
                resultDisplay.innerHTML = results;
                squares[currentLaserIndex].classList.remove("laser");
                squares[currentLaserIndex].classList.remove("invader");
                squares[currentLaserIndex].classList.add("boom");
                setTimeout(
                    () => squares[currentLaserIndex].classList.remove("boom"),
                    300
                );
                clearInterval(laserID);
                const alienRemoval = alienInvaders.indexOf(currentLaserIndex);
                aliensRemoved.push(alienRemoval);
            }
        } else {
            clearInterval(laserID);
        }
    }

    switch (event.keyCode) {
        case 32:
            laserID = setInterval(moveLaser, 100);
    }
}

document.addEventListener("keydown", shoot);
