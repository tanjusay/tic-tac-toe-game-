const cells = document.querySelectorAll(".cell");
const infoText = document.querySelector("#infoText");
const ngButton = document.querySelector("#btn");
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8],
  [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]
];

let currentPlayer = "X";
let gameActive = true;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
    cell.textContent = "";
  });
  ngButton.addEventListener("click", newGame);
  infoText.textContent = `Player ${currentPlayer}'s Turn`;
}

function handleCellClick() {
  if (!gameActive || this.textContent !== "") {
    return;
  }

  this.textContent = currentPlayer;
  checkResult();
  togglePlayer();
}

function checkResult() {
  let won = false ;
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
    won = true ;
    highlightWinningCells(winningCombos[i]);
    }
}      
  if (won){
  infoText.textContent = `Player ${currentPlayer} Won !`;
  highlightWinningCells(winningCombos[i]);
  return ;
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  infoText.textContent = `Player ${currentPlayer}'s Turn`;
  if (Array.from(cells).every((cell) => cell.textContent !== "")) {
    infoText.textContent = "It's a Draw!";
    gameActive = false;
  } 
}

function highlightWinningCells(winningCombo) {
  winningCombo.forEach((index) => {
    cells[index].classList.add("winning-cell");
  });
  gameActive = false ;
  return ;
}

function newGame() {
  currentPlayer = "X";
  gameActive = true;
  infoText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winning-cell");
  });
}
