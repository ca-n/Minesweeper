import React from 'react'
import Mine from "./cells/Mine";
import NoMine from "./cells/NoMine";
import Flag from "./cells/Flag";
import Revealed from "./cells/Revealed";
import Empty from "./cells/Empty";

const Board = ({gameState, onClick, onFlag}) => {
    const generateTable = () => {
        console.log("generateTable(), state=" + JSON.stringify(gameState));
        let table = [];
        for (let y = 0; y < gameState.rows; y++) {
            let row = [];
            for (let x = 0; x < gameState.cols; x++) {
                row.push(
                    <td style={{padding:'0', margin:'0'}} key={`${x}-${y}`}>
                        {getCell(x, y)}
                    </td>
                );
            }
            table.push(<tr key={y} style={{padding:'0', margin:'0'}}>{row}</tr>);
        }
        return table;
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
    const getCell = (x, y) => {
        let c = gameState.board[x][y];
        switch (c) {
            case '*':
                if (gameState.state < 0) return (<Mine />);
                break;
            case '=':
                if (gameState.state < 0) return (<NoMine />);
            // flagnext-line no-fallthrough
            case '#':
                return (<Flag x={x} y={y} onFlag={onFlag} />);
            case '%':
                return (<Mine clicked={true} />);
            default:
                if (isNumber(c)) {
                    return (<Revealed adjacentMines={c} />);
                }
        }
        return (<Empty x={x} y={y} onClick={onClick} onFlag={onFlag} />);
    }

    const isNumber = (c) => {
        return (c >= '0' && c <= '8');
    }

    return (
        <div>
            <table cellSpacing={'0'}>
                <tbody style={{margin: '0', padding: '0'}}>{generateTable()}</tbody>
            </table>
        </div>
    )
}

export default Board
