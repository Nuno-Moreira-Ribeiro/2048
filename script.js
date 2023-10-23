let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let win = false;
let loss = false;
let max = 0;
let bouge = false;

addRandomNumbers();
addRandomNumbers();
updateBoard();

function addRandomNumbers() {
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    if (board[row][col] === 0) {
        board[row][col] = 2;
    } else {
        addRandomNumbers()
    }
}

function isEmpty(value) {
    return value === 0;
}

function canMerge(value1, value2) {
    return value1 === value2 && value1 !== 0;
}

/**
 * @param {Array<Array<number>>} boardGive
 */
function moveLeft(board) {
    for (let i = 0; i < board.length; i++) {
        let newRow = [];

        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== 0) {
                newRow.push(board[i][j]);
            }
        }

        for (let j = newRow.length; j < board[i].length; j++) {
            newRow.push(0);
        }

        for (let j = 0; j < newRow.length - 1; j++) {
            if (newRow[j] === newRow[j + 1]) {
                newRow[j] *= 2;
                newRow[j + 1] = 0;
            }
        }

        let resultRow = [];
        for (let j = 0; j < newRow.length; j++) {
            if (newRow[j] !== 0) {
                resultRow.push(newRow[j]);
            }
        }

        while (resultRow.length < board[i].length) {
            resultRow.push(0);
        }

        board[i] = resultRow;
    }
}

function moveRight(board) {
    for (let i = 0; i < board.length; i++) {
        let newRow = [];

        for (let j = board[i].length - 1; j >= 0; j--) {
            if (board[i][j] !== 0) {
                newRow.push(board[i][j]);
            }
        }

        for (let j = newRow.length; j < board[i].length; j++) {
            newRow.push(0);
        }

        for (let j = 0; j < newRow.length - 1; j++) {
            if (newRow[j] === newRow[j + 1]) {
                newRow[j] *= 2;
                newRow[j + 1] = 0;
            }
        }

        let resultRow = [];
        for (let j = 0; j < newRow.length; j++) {
            if (newRow[j] !== 0) {
                resultRow.push(newRow[j]);
            }
        }

        while (resultRow.length < board[i].length) {
            resultRow.unshift(0);
        }

        board[i] = resultRow;
    }
}

function moveUp(board) {
    for (let j = 0; j < board[0].length; j++) {
        let newColumn = [];

        for (let i = 0; i < board.length; i++) {
            if (board[i][j] !== 0) {
                newColumn.push(board[i][j]);
            }
        }

        for (let i = newColumn.length; i < board.length; i++) {
            newColumn.push(0);
        }

        for (let i = 0; i < newColumn.length - 1; i++) {
            if (newColumn[i] === newColumn[i + 1]) {
                newColumn[i] *= 2;
                newColumn[i + 1] = 0;
            }
        }

        let resultColumn = [];
        for (let i = 0; i < newColumn.length; i++) {
            if (newColumn[i] !== 0) {
                resultColumn.push(newColumn[i]);
            }
        }

        while (resultColumn.length < board.length) {
            resultColumn.push(0);
        }

        for (let i = 0; i < board.length; i++) {
            board[i][j] = resultColumn[i];
        }
    }
}
function moveDown(board) {
    for (let j = 0; j < board[0].length; j++) {
        let newColumn = [];

        for (let i = 0; i < board.length; i++) {
            if (board[i][j] !== 0) {
                newColumn.push(board[i][j]);
            }
        }

        while (newColumn.length < board.length) {
            newColumn.unshift(0);
        }

        for (let i = newColumn.length - 1; i > 0; i--) {
            if (newColumn[i] === newColumn[i - 1]) {
                newColumn[i] *= 2;
                newColumn[i - 1] = 0;
            }
        }

        let resultColumn = [];

        for (let i = 0; i < newColumn.length; i++) {
            if (newColumn[i] !== 0) {
                resultColumn.push(newColumn[i]);
            }
        }

        while (resultColumn.length < board.length) {
            resultColumn.unshift(0);
        }

        for (let i = 0; i < board.length; i++) {
            board[i][j] = resultColumn[i];
        }
    }
}

function noObstacles(row, col1, col2, board) {
    for (let i = col1 + 1; i < col2; i++) {
        if (!isEmpty(board[row][i]) && board[row][i] !== board[row][col1]) {
            return false;
        }
    }
    return true;
}



function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const cell = cells[i * 4 + j];
            cell.textContent = board[i][j] === 0 ? '' : board[i][j];
            cell.className = 'cell';
            if (board[i][j] !== 0) {
                cell.classList.add(`number-${board[i][j]}`);
            }
        }
    }
    Stateverification();
}

function Stateverification() {
    const state = document.querySelector('.State');
    if (loss === true) {
        state.textContent = "Etat : Perdu!!!";
    }
    else if (win === true) {
        state.textContent = "Etat : Gagné!!!";
    }
    else {
        state.textContent = "Etat : En cours ...";
    }
}

function checkWinOrLoss() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 2048) {
                win = true;
                return;
            }
            else if (board[i][j] === 0) {
                return;
            }

        }
    }
    loss = true;
    return;
}

function getMax() {
    max = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            max += board[i][j];
        }
    }
    const score = document.querySelector('.score');
    score.textContent = `Score: ${max}`;
}

/*Start Test Use*/

//need to launch the test.

// module.exports = {
//     moveLeft,
//     moveDown,
//     moveRight,
//     moveUp,
// };

/*End Test Use */

document.addEventListener('keydown', function (event) {
    if (loss !== true && win !== true) {
        bouge = false;
        switch (event.key) {
            case "ArrowLeft":
                moveLeft(board);
                break;
            case "ArrowRight":
                moveRight(board);
                break;
            case "ArrowUp":
                moveUp(board);
                break;
            case "ArrowDown":
                moveDown(board);
                break;
            case "!":
                cheatCode();
                break;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "!"].includes(event.key)) {
            updateBoard();
            getMax();
            checkWinOrLoss();
            if (win === false && loss === false) {
                setTimeout(function () {

                    addRandomNumbers();

                    updateBoard();
                }, 200);
            }
        }
    } else {
        updateBoard();
    }
});

function cheatCode() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
                board[i][j] = 2048;
                bouge = true;
                return;
            }
        }
    }

}

function newGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    win = false;
    loss = false;
    max=0
    addRandomNumbers();
    addRandomNumbers();
    updateBoard();
}

document.getElementById('new-game').addEventListener('click', function () {
    newGame();
});