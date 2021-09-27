import React from 'react'
import Mine from "./cells/Mine";
import NoMine from "./cells/NoMine";
import Flag from "./cells/Flag";
import Revealed from "./cells/Revealed";
import Empty from "./cells/Empty";

const Board = ({board, cols, rows, state, onClick, onFlag}) => {
    const array = new Array(rows);
    fillArray();

    function fillArray() {
        for (let row = 0; row < rows; row++) {
            array[row] = new Array(cols);
            for (let col = 0; col < cols; col++) {
                array[row][col] = getCell(col, row);
            }
        }
    }

    

    /* STATES
        -2: Loss
        -1: Win
        0: Pregame
        1: First move
        2: In game
    */
    /* CELLS
        '0'-'8': Revealed, x bombs adjacent
        ' '    : Unrevealed
        '*'    : Unrevealed mine
        '='    : Flagged
        '#'    : Flagged mine
    */
    function getCell(x, y) {
        console.log(`getCell(${x}, ${y})`);
        let c = board[x][y];
        switch (c) {
            case '*':
                if (state < 0) return (<Mine />);
                break;
            case '=':
                if (state < 0) return (<NoMine />);
            // flagnext-line no-fallthrough
            case '#':
                return (<Flag x={x} y={y} onFlag={onFlag} />);
            default:
                if (isNumber(c)) {
                    return (<Revealed adjacentMines={c} />);
                }
        }
        return (<Empty x={x} y={y} onClick={onClick} onFlag={onFlag} />);
    }

    function isNumber(c) {
        return (c >= '0' && c <= '8');
    }

    return (
        <div>
            <table cellSpacing={'0'}>
                <tbody>
                    {array.map((col, y) => {
                        return (
                            <tr>
                                {col.map((cell, x) => {
                                    return <td style={{padding:'0', margin:'0'}} key={'x'+x+'y'+y}>{cell}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Board
