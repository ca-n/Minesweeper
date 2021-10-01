import React from 'react'
import {useState} from "react";
import Board from "./Board";

const Minesweeper = ({cols, rows, mines}) => {

    const initializeArray2D = (cols, rows) => {
        console.log("initializeArray2D");
        let array = new Array(cols);
        for (let x = 0; x < array.length; x++) {
            array[x] = new Array(rows);
            for (let y = 0; y < array[x].length; y++) {
                array[x][y] = ' ';
            }
        }
        return array;
    }

    const placeMines = (exceptX, exceptY) => {
        console.log("placeMines")
        for (let i = 0; i < mines; i++) {
            let placed = false;
            do {
                let x = getRandomInt(cols);
                let y = getRandomInt(rows);
                if (x === exceptX && y === exceptY) continue;
                if (gameState.board[x][y] !== '*') {
                    setCell(x, y, '*');
                    placed = true;
                }
            } while(!placed);
        }
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    /*
    '0'-'8': Revealed, x bombs adjacent
    ' '    : Unrevealed
    '*'    : Unrevealed mine
    '='    : Flagged
    '#'    : Flagged mine
    */

    const onClick = (x, y) => {
        if (!isStarted()) return;
        if (!isInbounds(x, y)) return;
        console.log(`Click! onClick(${x}, ${y}) state: ${gameState.state}`)
        // if it is the first move
        if (gameState.state === 0) {
            placeMines(x, y);
            //TODO: Start timer
            // state = in game
            setState(1);
            console.log(`state set to 1, actual state: ${gameState.state}`);
        }

        switch(gameState.board[x][y]) {
            case ' ':
                reveal(x, y);
                break;
            case '*':
                gameLost(x, y);
                break;
            default:
                break;
        }
        if (gameState.emptyRemaining === 0) gameWon();
    }

    const onFlag = (x, y) => {
        if (!isStarted()) return;
        if (!isInbounds) return;
        console.log(`Flag! onFlag(${x}, ${y})`);

        switch(gameState.board[x][y]) {
            case '=': //flagged
                setCell(x, y, ' ');
                updateMinesRemaining(1);
                break;
            case '#': //flagged mine
                setCell(x, y, '*');
                updateMinesRemaining(1);
                break;
            case '*': //mine
                setCell(x, y, '#');
                updateMinesRemaining(-1);
                break;
            case ' ': //unrevealed
                setCell(x, y, '=');
                updateMinesRemaining(-1);
                break;
            default:
                //already revealed, do nothing
                break;
        }
    }

    const reveal = (x, y) => {
        if (!isInbounds(x, y)) return;
        if (isRevealed(x, y)) return;
        let n = countAdjacentMines(x, y);
        setCell(x, y, n.toString());
        decrementEmptyRemaining();
        if (n === 0) {
            revealAdjacent(x, y);
        }
        console.log(`reveal(${x}, ${y}) ${gameState.board[x][y]}`);
    }

    const countAdjacentMines = (x, y) => {
        if (!isInbounds(x, y)) return;
        let n = 0;
        for (let col = x-1; col <= x+1; col++) {
            for (let row = y-1; row <= y+1; row++) {
                n += (hasMine(col, row) ? 1 : 0);
            }
        }
        return n;
    }

    const revealAdjacent = (x, y) => {
        if (!isInbounds(x, y)) return;
        for (let col = x-1; col <= x+1; col++) {
            for (let row = y-1; row <= y+1; row++) {
                reveal(col, row);
            }
        }
    }

    const isRevealed = (x, y) => {
        let c = gameState.board[x][y];
        return (c >= '0' && c <= '8');
    }

    const isInbounds = (x, y) => {
        return (0 <= x) && (x < cols) && (0 <= y) && (y < rows);
    }

    const hasMine = (x, y) => {
        if (!isInbounds(x, y)) return false;
        let c = gameState.board[x][y];
        return (c === '*' || c === '#');
    }

    const isStarted = () => {
        return (gameState.state >= 0);
    }

    const gameLost = (x, y) => {
        //TODO: stop timer
        // state = loss
        updateGameStateLost(x, y);
    }

    const updateGameStateLost = (x, y) => {
        let updatedBoard = gameState.board;
        updatedBoard[x][y] = '%';
        setGameState(last => ({
            board: updatedBoard,
            cols: last.cols,
            rows: last.rows,
            state: -2,
            minesRemaining: last.minesRemaining,
            emptyRemaining: last.emptyRemaining
        }));
    }

    const gameWon = () => {
        //TODO: stop timer
        // state = win
        setState(-1);
    }

    const setCell = (x, y, c) => {
        let updated = gameState.board;
        updated[x][y] = c;

        setBoard(updated);
    }

    const setState = (state) => {
        setGameState(last => ({
            board: last.board,
            cols: last.cols,
            rows: last.rows,
            state: state,
            minesRemaining: last.minesRemaining,
            emptyRemaining: last.emptyRemaining
        }));
    }

    const updateMinesRemaining = (change) => {
        setGameState(last => ({
            board: last.board,
            cols: last.cols,
            rows: last.rows,
            state: last.state,
            minesRemaining: last.minesRemaining + change,
            emptyRemaining: last.emptyRemaining
        }));
    }

    const decrementEmptyRemaining = () => {
        setGameState(last => ({
            board: last.board,
            cols: last.cols,
            rows: last.rows,
            state: last.state,
            minesRemaining: last.minesRemaining,
            emptyRemaining: last.emptyRemaining - 1
        }));
    }

    const setBoard = (board) => {
        setGameState(last => ({
            board: board,
            cols: last.cols,
            rows: last.rows,
            state: last.state,
            minesRemaining: last.minesRemaining,
            emptyRemaining: last.emptyRemaining
        }));
    }

    /*
    gameState.state legend
    -2: Loss
    -1: Win
     0: Pregame (First move)
     1: In game
    */
    const [gameState, setGameState] = useState(
        {
            board: initializeArray2D(cols, rows),
            cols: cols,
            rows: rows,
            state: 0,
            minesRemaining: mines,
            emptyRemaining: (cols * rows) - mines
        }
    )

    return (
        <Board gameState={gameState}
               onClick={onClick}
               onFlag={onFlag} />
    )
}

export default Minesweeper
