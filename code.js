
const gameBoard = document.querySelector(".game__board");
const messageTurn = document.querySelector(".game__turn");
const endGame = document.querySelector(".endgame");
const endGameResult = document.querySelector(".endgame__result");
const buttonReset = document.querySelector(".endgame__button");

let isTurnX = true;
let turn = 0;
const maxTurn = 9;
let players = {
  x: "cross",
  o: "circle"
};
const winningPosition = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

startGame();

function startGame() {
  createBoard();
  messageTurn.textContent = isTurnX ? "X" : "O";
  isTurnX = true;
  turn = 0;
  endGame.classList.remove("show");
}

function createBoard() {
  const cell = 9;
  while (gameBoard.firstElementChild) {
    gameBoard.firstElementChild.remove();
  }
  for (let i = 0; i < cell; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.addEventListener("click", handleGame, {once: true});
    gameBoard.append(div);
  }
}

function handleGame(e) {
  const currentCell = e.currentTarget;
  const currentTurn = isTurnX ? players.x : players.o;
  drawShape(currentCell, currentTurn);
  turn++;
  
  if (checkWinner(currentTurn)) {
    return;
  }
  
  if (turn === maxTurn) {
    showEndGame(false);
    return;
  }
  
  changeTurn();
}

function drawShape(element, newClass) {
  element.classList.add(newClass);
}

function changeTurn() {
  isTurnX = !isTurnX;
  messageTurn.textContent = isTurnX ? "X" : "O";
}

function checkWinner(currentPlayer) {
  const cells = document.querySelectorAll(".cell");
  const winner = winningPosition.some(array => {
    return array.every(position => {
      return cells[position].classList.contains(currentPlayer);
    });
  });
  
  if (!winner) {
    return false;
  }
  
  showEndGame(true);
  return true;
}

function showEndGame(winner) {
  endGame.classList.add("show");
  if (winner) {
    endGameResult.textContent = `Player ${isTurnX ? "X" : "O"} wins!`;
  } else {
    endGameResult.textContent = "It's a draw!";
  }
}

buttonReset.addEventListener("click", startGame);


