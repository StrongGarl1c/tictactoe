const allDivs = document.querySelectorAll('div > div');
const p = document.querySelector('p');
const button = document.querySelector('button');
button.addEventListener('click', () => location.reload());
const arr = [];

for (const div of allDivs) {
  arr.push(div);
}

const board = [arr.slice(0, 3), arr.slice(3, 6), arr.slice(6, 9)];

function checkRow() {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0].innerText === 'X' &&
      board[i][1].innerText === 'X' &&
      board[i][2].innerText === 'X'
    ) {
      return 'X';
    } else if (
      board[i][0].innerText === 'O' &&
      board[i][1].innerText === 'O' &&
      board[i][2].innerText === 'O'
    ) {
      return 'O';
    }
  }
  return false;
}

function checkColumn() {
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i].innerText === 'X' &&
      board[1][i].innerText === 'X' &&
      board[2][i].innerText === 'X'
    ) {
      return 'X';
    } else if (
      board[0][i].innerText === 'O' &&
      board[1][i].innerText === 'O' &&
      board[2][i].innerText === 'O'
    ) {
      return 'O';
    }
  }
  return false;
}

function checkDiagonal() {
  for (let i = 0; i < 2; i++) {
    if (
      (board[0][0].innerText === 'X' &&
        board[1][1].innerText === 'X' &&
        board[2][2].innerText === 'X') ||
      (board[0][2].innerText === 'X' &&
        board[1][1].innerText === 'X' &&
        board[2][0].innerText === 'X')
    ) {
      return 'X';
    } else if (
      (board[0][0].innerText === 'O' &&
        board[1][1].innerText === 'O' &&
        board[2][2].innerText === 'O') ||
      (board[0][2].innerText === 'O' &&
        board[1][1].innerText === 'O' &&
        board[2][0].innerText === 'O')
    ) {
      return 'O';
    }
    return false;
  }
}

function checkForGameEnd() {
  const winner = checkRow() || checkColumn() || checkDiagonal();
  return winner;
}

function checkCells() {
  return arr.every((div) => !!div.innerText === true);
}

function rand(number = arr.length) {
  return Math.floor(Math.random() * number);
}

function bot() {
  let index = rand();
  // find empty cell and set it to 'O'
  while (!!arr[index].innerText === true) {
    index = rand();
  }
  arr[index].innerText = 'O';
  const gameEnd = checkForGameEnd();
  if (gameEnd) {
    for (const div of allDivs) {
      div.removeEventListener('click', play);
    }
    p.innerText = gameEnd + ' Won!';
    return;
  } else if (checkCells()) {
    p.innerText = 'Draw!';
    return;
  }
}

function play(e) {
  if (!!e.target.innerText === false) {
    e.target.innerText = 'X';
    // check for game end
    const gameEnd = checkForGameEnd();
    if (gameEnd) {
      for (const div of allDivs) {
        div.removeEventListener('click', play);
      }
      return (p.innerText = gameEnd + ' Won!');
    } else if (checkCells()) {
      p.innerText = 'Draw!';
      return;
    }
    // computer move
    bot();
  }
}

// add event listeners to divs
for (const div of allDivs) {
  div.addEventListener('click', play);
}

// random player start
if (rand(2)) {
  allDivs[rand()].innerText = 'O';
}

// restart game
