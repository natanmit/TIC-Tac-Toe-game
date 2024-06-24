const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('reset-button');

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

resetButton.addEventListener('click', resetBoard);

function handleCellClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);
    makeMove(cell, index);
}

function makeMove(cell, index) {
    if (board[index] === '') {
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;
        if (checkWin()) {
            setTimeout(() => alert('Player ' + currentPlayer + ' wins!'), 100);
            cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        } else if (checkDraw()) {
            setTimeout(() => alert('It\'s a draw!'), 100);
            cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].style.backgroundColor = 'blue';
            cells[b].style.backgroundColor = 'blue';
            cells[c].style.backgroundColor = 'blue';
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function resetBoard() {
    board.fill('');
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = 'white';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}