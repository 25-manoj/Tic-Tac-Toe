const gameBoard = document.querySelector('#gameboard');
const startCells = ['', '', '', '', '', '', '', '', ''];
const infoDisplay = document.querySelector('#info');
let go = 'circle';
infoDisplay.textContent = 'circle goes first';

function creatBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener('click', addGo);
    gameBoard.append(cellElement);
  });
}
creatBoard();

function addGo(e) {
  const goDisplay = document.createElement('div');
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === 'circle' ? 'cross' : 'circle';
  infoDisplay.textContent = 'it is now ' + go + "'s go";
  e.target.removeEventListener('click', addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll('.square');
  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombo.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains('circle')
    );
    if (circleWins) {
      infoDisplay.textContent = 'circle wins!';
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
    }
  });
  winningCombo.forEach((array) => {
    const CrossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains('cross')
    );
    if (CrossWins) {
      infoDisplay.textContent = 'cross wins!';
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
    }
  });
}
