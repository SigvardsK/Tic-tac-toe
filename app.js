
// define variables
let playerOneScore = 0;
let playerTwoScore = 0;
const playerOneScore_span = document.getElementById('playerOne-score');
const playerTwoScore_span = document.getElementById('playerTwo-score');
const scoreBoard_div = document.querySelector(".score-board");
const playerOne_Won = 'PlayerOne_Won';
const playerTwo_Won = 'PlayerTwo_Won';
const announcer = document.querySelector('.game--status');

// state when game happens -- so that know when to end
let gameActive = true;
// can be player one or player two
let currentPlayer = "X";
// key moment --> each game board with each cell as a variable
let gameState = ["", "", "", "", "", "", "", "", ""]; 

const statusDisplay = document.querySelector('.game--status');

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;


statusDisplay.innerHTML = currentPlayerTurn();

// winning conditions - when 3 cells have the same value. 
// Numbers - from html file - id of each cell
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// function that checks if a cell is played and if not fils it
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// player change function
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// main game function - checking result and changing players
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        announce(currentPlayer === 'X' ? playerOne_Won : playerTwo_Won);
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

const announce = (type) => {
    switch (type) {
        case playerOne_Won:
            playerOneScore++;
            playerOneScore_span.innerHTML =playerOneScore;
            playerTwoScore_span.innerHTML = playerTwoScore;
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        case playerTwo_Won:
            playerTwoScore++;
            playerTwoScore_span.innerHTML = playerTwoScore;
            playerOneScore_span.innerHTML =playerOneScore;
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
    }    
};

// click function in cell
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// restart game function
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// click functions on cells and restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);