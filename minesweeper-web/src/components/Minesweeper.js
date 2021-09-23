import React from 'react'
import Board from "./Board";

const Minesweeper = () => {

    let board;
    let cols;
    let rows;
    let mines;

    /*
    -2: Loss
    -1: Win
     0: Pregame
     1: First move
     2: In game
    */
    let state = 0;

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
        state = 1;
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

    /*
    '0'-'8': Revealed, x bombs adjacent
    ' '    : Unrevealed
    '*'    : Unrevealed mine
    '='    : Flagged
    '#'    : Flagged mine
    */

    function onClick(x, y) {
        if (!isStarted()) return;
        if (!isInbounds(x, y)) return;
        console.log(`Click! onClick(${x}, ${y})`)
        // if it is the first move
        if (state === 1) {
            placeMines(x, y);
            //TODO: Start timer
            // state = in game
            state = 2;
        }

        switch(board[x][y]) {
            case ' ':
                reveal(x, y);
                break;
            case '*':
                gameLost(x, y);
                break;
            default:
                break;
        }

        console.log(board);
    }

    function onFlag(x, y) {
        if (!isStarted()) return;
        if (!isInbounds) return;
        console.log(`Flag! onFlag(${x}, ${y})`);

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
        if (minesRemaining === 0) gameWon();
    }

    function reveal(x, y) {
        if (!isInbounds(x, y)) return;
        if (isRevealed(x, y)) return;
        console.log(`reveal(${x}, ${y}) '${board[x][y]}'`);
        let n = countAdjacentMines(x, y);
        board[x][y] = n.toString();
        if (n === 0) {
            revealAdjacent(x, y);
        }
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

    function isRevealed(x, y) {
        let c = board[x][y];
        return (c >= '0' && c <= '8');
    }

    function isInbounds(x, y) {
        return (0 <= x) && (x < cols) && (0 <= y) && (y < rows);
    }

    function hasMine(x, y) {
        if (!isInbounds(x, y)) return false;
        let c = board[x][y];
        return (c === '*' || c === '#');
    }

    function isStarted() {
        return (state > 0);
    }

    function gameLost(x, y) {
        //TODO: stop timer
        // state = loss
        state = -2;
    }

    function gameWon() {
        //TODO: stop timer
        // state = win
        state = -1;
    }

    startGame(10, 10, 20);

    return (
        <Board board={board}
               cols={cols}
               rows={rows}
               state={state}
               onClick={onClick}
               onFlag={onFlag} />
    )
}

export default Minesweeper
