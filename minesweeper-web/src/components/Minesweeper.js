import React from 'react'
import {useState, useEffect} from "react";
import Board from "./Board";

const Minesweeper = ({cols, rows, mines}) => {

    const [seconds, setSeconds] = useState(0);

    const initializeArray2D = (cols, rows) => {
        let array = new Array(cols);
        for (let x = 0; x < array.length; x++) {
            array[x] = new Array(rows);
            for (let y = 0; y < array[x].length; y++) {
                array[x][y] = ' ';
            }
        }
        return array;
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

    let board = gameState.board;
    let state = gameState.state;
    let minesRemaining = gameState.minesRemaining;
    let emptyRemaining = gameState.emptyRemaining;


    const placeMines = (exceptX, exceptY) => {
        for (let i = 0; i < mines; i++) {
            let placed = false;
            do {
                let x = getRandomInt(cols);
                let y = getRandomInt(rows);
                if (isAdjacent(exceptX, exceptY, x, y)) continue;
                if (board[x][y] !== '*') {
                    board[x][y] = '*';
                    placed = true;
                }
            } while(!placed);
        }
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const isAdjacent = (x1, y1, x2, y2) => {
        return Math.abs(x1-x2) < 2 && Math.abs(y1-y2) < 2;
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
        // if it is the first move
        if (state === 0) {
            placeMines(x, y);
            //TODO: Start timer
            // state = in game
            state = 1;
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
        if (emptyRemaining === 0) {
            gameWon();
        }

        updateGameState();
    }

    const onFlag = (x, y) => {
        if (!isStarted()) return;
        if (!isInbounds) return;

        switch(board[x][y]) {
            case '=': //flagged
                board[x][y] = ' ';
                minesRemaining++;
                break;
            case '#': //flagged mine
                board[x][y] = '*';
                minesRemaining++;
                break;
            case '*': //mine
                board[x][y] = '#';
                minesRemaining--;
                break;
            case ' ': //unrevealed
                board[x][y] = '=';
                minesRemaining--;
                break;
            default:
                //already revealed, do nothing
                break;
        }
        updateGameState();
    }

    const reveal = (x, y) => {
        if (!isInbounds(x, y)) return;
        if (isRevealed(x, y)) return;
        let n = countAdjacentMines(x, y);
        board[x][y] = n.toString();
        emptyRemaining--;
        if (n === 0) {
            revealAdjacent(x, y);
        }
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
        let c = board[x][y];
        return (c >= '0' && c <= '8');
    }

    const isInbounds = (x, y) => {
        return (0 <= x) && (x < cols) && (0 <= y) && (y < rows);
    }

    const hasMine = (x, y) => {
        if (!isInbounds(x, y)) return false;
        let c = board[x][y];
        return (c === '*' || c === '#');
    }

    const isStarted = () => {
        return (state >= 0);
    }

    const gameLost = (x, y) => {
        //TODO: stop timer
        // state = loss
        board[x][y] = '%';
        state = -2;
    }

    const gameWon = () => {
        console.log("Game WON");
        //TODO: stop timer
        // state = win
        state = -1;
    }

    const updateGameState = () => {
        setGameState(last => ({
            board: board,
            cols: last.cols,
            rows: last.rows,
            state: state,
            minesRemaining: minesRemaining,
            emptyRemaining: emptyRemaining
        }));
    }

    useEffect(() => {
        if (state !== 1) return;
        const sec = setInterval(() => {
            if (state === 1) {
                setSeconds(seconds => seconds + 1)
            }
        }, 1000);
        return () => clearInterval(sec);
    }, [state]);

    return (
        <table style={{width: '50%'}}>
        <tbody>
            <tr>
                <td style={{width: '50%', textAlign: 'left'}}>{mines}</td>
                <td style={{width: '50%', textAlign: 'right'}}>{seconds}</td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <Board gameState={gameState}
                   onClick={onClick}
                       onFlag={onFlag} />
                </td>
            </tr>
        </tbody>
        </table>
    )
}

export default Minesweeper
