import React from 'react'
import { loadImage } from '../utils/ImageLoader';

/* CELLS
    '0'-'8': Revealed, x bombs adjacent
    ' '    : Unrevealed
    '*'    : Unrevealed mine
    '='    : Flagged
    '#'    : Flagged mine
*/
/* STATES
    -2: Loss
    -1: Win
    0: Pregame
    1: First move
    2: In game
*/
const Cell = ({board, x, y, state, onClick, onFlag}) => {
    let char = board[x][y];

    function isNumber(c) {
        return (c >= '0' && c <= '8');
    }

    return (
        <div className={`cell 
        ${(char === '*' && state === -2) ? 'mine ' : '' }
        ${(char === '=' || (char === '#' && state > 0)) ? 'flagged ' : '' }
        ${(char === '#' && state < 0) ? 'flaggedmine ' : '' }
        ${char === '0' ? 'zero ' : '' }
        ${char === '1' ? 'one ' : '' }
        ${char === '2' ? 'two ' : '' }
        ${char === '3' ? 'three ' : '' }
        ${char === '4' ? 'four ' : '' }
        ${char === '5' ? 'five ' : '' }
        ${char === '6' ? 'six ' : '' }
        ${char === '7' ? 'seven ' : '' }
        ${char === '8' ? 'eight ' : '' }`}>
            {isNumber(char) ? char : ''}
        </div>
    )
}

export default Cell
