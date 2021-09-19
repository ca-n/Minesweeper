import React from 'react'

const Minesweeper = () => {

    let board;
    let cols;
    let rows;

    /*
    '0'-'8': Revealed, x bombs adjacent
    ' '    : Unrevealed
    '*'    : Unrevealed mine
    '='    : Flagged
    '#'    : Flagged mine
    */

    function initializeArray2D(cols, rows) {
        let array = new Array(cols);
        for (let x = 0; x < array.length; x++) {
            array[x] = new Array(rows);
            for (let y = 0; y < array[i].length; y++) {
                array[x][y] = ' ';
            }
        }
        return array;
    }

    function placeMines(cols, rows, mines) {
        for (let i = 0; i < mines; i++) {
            let placed = false;
            do {
                let x = getRandomInt(cols);
                let y = getRandomInt(rows);
                if (board[x][y] !== '*') {
                    board[x][y] = '*';
                    placed = true;
                }
            } while(!placed);
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function onClick(x, y) {
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

    return (
        <div>
            
        </div>
    )
}

export default Minesweeper
