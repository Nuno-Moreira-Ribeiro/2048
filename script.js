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

function addRandomNumbers() {
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    if (board[row][col] === 0) {
        board[row][col] = 2;
    } else {
        addRandomNumbers()
    }
}


function moveLeft() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 1; j < board[i].length; j++) {
            if (board[i][j] !== 0) {
                let canMove = true;
                for (let k = 0; k < j; k++) {
                    if (board[i][k] === 0 && noObstacles(i, k, j, board)) {
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        bouge=true;
                    } else if (board[i][k] === board[i][j] && noObstacles(i, k, j, board) && canMove) {
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        canMove = false;
                        bouge =true;
                    } else if (board[i][k] !== 0 && board[i][k] !== board[i][j]) {
                        canMove = false;
                    }
                }
            }
        }
    }
}

function moveUp() {
    for (let j = 0; j < board[0].length; j++) {
        for (let i = 1; i < board.length; i++) {
            if (board[i][j] !== 0) {
                let canMove = true;
                for (let k = i - 1; k >= 0; k--) {
                    if (board[k][j] === 0 && noObstacles(k, j, i, board)) {
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        bouge =true;
                    } else if (board[k][j] === board[i][j] && noObstacles(k, j, i, board) && canMove) {
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        canMove = false;
                        bouge =true;
                    }
                    else if (board[i][k] !== 0 && board[i][k] !== board[i][j]) {
                        canMove = false;
                    }
                }
            }
        }
    }
}

function moveRight() {
    for (let i = 0; i < board.length; i++) {
        for (let j = board[i].length - 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                let canMove = true;
                for (let k = board[i].length - 1; k > j; k--) {
                    if (board[i][k] === 0 && noObstacles(i, j, k, board)) {
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        bouge =true;
                    } else if (board[i][k] === board[i][j] && noObstacles(i, j, k, board) && canMove) {
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        canMove = false;
                        bouge =true;
                    }
                    else if (board[i][k] !== 0 && board[i][k] !== board[i][j]) {
                        canMove = false;
                    }
                }
            }
        }
    }
}

function moveDown() {
    for (let j = 0; j < board[0].length; j++) {
        for (let i = board.length - 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
                let canMove = true;
                for (let k = board.length - 1; k > i; k--) {
                    if (board[k][j] === 0 && noObstacles(j, i, k, board)) {
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        bouge =true;
                    } else if (board[k][j] === board[i][j] && noObstacles(j, i, k, board) && canMove) {
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        canMove = false;
                        bouge =true;
                    }
                    else if (board[i][k] !== 0 && board[i][k] !== board[i][j]) {
                        canMove = false;
                    }
                }
            }
        }
    }
}

// function noObstacles(row, col1, col2, board) {
//     for (let i = col1 + 1; i < col2; i++) {
//         if (board[row][i] !== 0) {
//             return false;
//         }
//     }
//     return true;
// }
function noObstacles(row, col1, col2, board) {
    for (let i = col1 + 1; i < col2; i++) {
        if (board[row][i] !== board[row][col1] && board[row][i] !== 0) {
            return false;
        }

    }
    return true;
}

/**
 * @param {Array<Array<number>>} boardGive
 */
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

document.addEventListener('keydown', function (event) {
    if (loss !== true && win !== true) {
        bouge=false;
        switch (event.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowDown":
                moveDown();
                break;
            case "!":
                cheatCode();
                break;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown","!"].includes(event.key)) {
            updateBoard();
            getMax();
            checkWinOrLoss();
            if (win === false && loss === false) {
                setTimeout(function() {
                    if(bouge === true){
                        addRandomNumbers();
                    }
                    updateBoard();
                  }, 200);
            }
        }
    }else{
        updateBoard();
    } 
});

function cheatCode(){
    for(let i = 0; i< board.length; i++){
        for(let j = 0; j<board[i].length; j++){
            if(board[i][j] === 0){
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
    addRandomNumbers();
    addRandomNumbers();
    updateBoard();
}

document.getElementById('new-game').addEventListener('click', function () {
    newGame();
});