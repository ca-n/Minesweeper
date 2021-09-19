import React from 'react'

const Minesweeper = () => {

    let board;
    let cols;
    let rows;
    let mines;
    let isFirstMove;
    let isStarted = false;

    // for displaying to the player
    let displayedMinesRemaining;

    // for game logic
    let minesRemaining;

    function startGame(_cols, _rows, _mines) {
        board = initializeArray2D(_cols, _rows);
        cols = _cols;
        rows = _rows;
        mines = _mines;
        displayedMinesRemaining = _mines;
        minesRemaining = _mines;
        isFirstMove = true;
        isStarted = true;
    }

    function initializeArray2D(_cols, _rows) {
        let array = new Array(_cols);
        for (let x = 0; x < array.length; x++) {
            array[x] = new Array(_rows);
            for (let y = 0; y < array[x].length; y++) {
                array[x][y] = ' ';
            }
        }
        return array;
    }

    function placeMines(exceptX, exceptY) {
        for (let i = 0; i < mines; i++) {
            let placed = false;
            do {
                let x = getRandomInt(cols);
                let y = getRandomInt(rows);
                if (x === exceptX && y === exceptY) continue;
                if (board[x][y] !== '*' && board) {
                    board[x][y] = '*';
                    placed = true;
                }
            } while(!placed);
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    /*
    '0'-'8': Revealed, x bombs adjacent
    ' '    : Unrevealed
    '*'    : Unrevealed mine
    '='    : Flagged
    '#'    : Flagged mine
    */

    function onClick(x, y) {
        if (!isStarted) return;
        if (!isInbounds(x, y)) return;
        if (isFirstMove) {
            placeMines(x, y);
            //TODO: Start timer
            isFirstMove = false;
        }

        switch(board[x][y]) {
            case ' ':
                reveal(x, y);
                break;
            case '*':
                gameOver(x, y);
                break;
            default:
                break;
        }
    }

    function onFlag(x, y) {
        if (!isStarted) return;
        if (!isInbounds) return;

        switch(board[x][y]) {
            case '=': //flagged
                board[x][y] = ' ';
                displayedMinesRemaining++;
                break;
            case '#': //flagged mine
                board[x][y] = '*';
                displayedMinesRemaining++;
                minesRemaining++;
                break;
            case '*': //mine
                board[x][y] = '#';
                displayedMinesRemaining--;
                minesRemaining--;
                break;
            case ' ': //unrevealed
                board[x][y] = '=';
                displayedMinesRemaining--;
                break;
            default:
                //already revealed, do nothing
                break;
        }
    }

    function reveal(x, y) {
        if (!isInbounds(x, y)) return;
        let n = countAdjacentMines(x, y);
        if (n === 0) {
            revealAdjacent(x, y);
        }
        board[x][y] = n.toString();
    }

    function countAdjacentMines(x, y) {
        if (!isInbounds(x, y)) return;
        let n = 0;
        for (let col = x-1; col <= x+1; col++) {
            for (let row = y-1; row <= y+1; row++) {
                n += (hasMine(col, row) ? 1 : 0);
            }
        }
        return n;
    }

    function revealAdjacent(x, y) {
        if (!isInbounds(x, y)) return;
        for (let col = x-1; col <= x+1; col++) {
            for (let row = y-1; row <= y+1; row++) {
                if (col === x && row === y) continue;
                reveal(col, row);
            }
        }
    }

    function isInbounds(x, y) {
        return (0 <= x) && (x < cols) && (0 <= y) && (y < rows);
    }

    function hasMine(x, y) {
        return isInbounds(x-1, y-1) && board[x][y] === '*';
    }

    function gameOver() {
        //TODO
    }

    return (
        <div>
            
        </div>
    )
}

export default Minesweeper
