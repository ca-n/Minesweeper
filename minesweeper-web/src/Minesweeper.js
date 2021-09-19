import React from 'react'

const Minesweeper = () => {

    /*
    '0'-'8': Revealed, x bombs adjacent
    ' '    : Unrevealed
    '*'    : Unrevealed mine
    '='    : Flagged
    '#'    : Flagged mine
    */

    function initializeArray(cols, rows) {
        var array = new Array(cols);
        for (var x = 0; x < array.length; x++) {
            array[x] = new Array(rows);
            for (var y = 0; y < array[i].length; y++) {
                array[x][y] = ' ';
            }
        }
        return array;
    }

    function placeMines(array, cols, rows, mines) {
        for (var i = 0; i < mines; i++) {
            var placed = false;
            do {
                var x = getRandomInt(cols);
                var y = getRandomInt(rows);
                if (array[x][y] !== '*') {
                    array[x][y] = '*';
                    placed = true;
                }
            } while(!placed);
        }
        return array;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    return (
        <div>
            
        </div>
    )
}

export default Minesweeper
