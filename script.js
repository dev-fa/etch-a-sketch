function changeBoxColor(e) {
    this.classList.add("sketch-box-active");
}


function setBoardSize(gridSize) {
    const board = document.querySelector(".sketch-board");
    board.setAttribute("style", 
        `grid-template-columns:repeat(${gridSize}, 1fr);
        grid-template-rows:repeat(${gridSize}, 1fr)`);
}


function createSketchBoard(gridNum) {
    setBoardSize(gridNum);
    const gridSize = gridNum * gridNum;
    const sketchBoard = document.querySelector(".sketch-board");
    if (sketchBoard.hasChildNodes()) {
        while (sketchBoard.firstChild) {
            sketchBoard.removeChild(sketchBoard.firstChild);
        }
    }

    const sketchBox = document.createElement("div");
    sketchBox.classList.add("sketch-box");

    for (let i = 0; i < gridSize; i++) {
        sketchBoard.appendChild(sketchBox.cloneNode());
    }

    const sketchBoxes = document.getElementsByClassName("sketch-box");
    for (const box of sketchBoxes) {
        box.addEventListener("mouseover", changeBoxColor);
    }
}

function getUserInput() {
    let userInput;
    userInput = parseInt(prompt("How big do you want the sketch board? (1 - 100 only)"))
    while (userInput < 1 || userInput > 100 || Number.isNaN(userInput)) {
        alert("Please choose a valid number");
        userInput = parseInt(prompt("How big do you want the sketch board? (1 - 100 only)"))
    }
    createSketchBoard(userInput);
}

const sizeBtn = document.querySelector(".size-btn")
sizeBtn.addEventListener("click", getUserInput);