import React from 'react'
import Button from "../Button";
const Revealed = ({adjacentMines}) => {

    let color;

    switch (adjacentMines) {
        case '1':
            color = 'blue';
            break;
        case '2':
            color = 'green';
            break;
        case '3':
            color = 'red';
            break;
        case '4':
            color = 'purple';
            break;
        case '5':
            color = 'maroon';
            break;
        case '6':
            color = 'turquoise';
            break;
        case '7':
            color = 'black';
            break;
        case '8':
            color = 'gray';
            break;
        default:
            break;
    }

    return (
        <Button inner={adjacentMines}
                foreground={color}
                background={'lightgray'}
                onLeftClick={() => {}}
                onRightClick={() => {}}
                inset={true}/>
    )
}

export default Revealed
