import React from 'react'
import Button from "../Button";
const Revealed = ({adjacentMines}) => {

    let image;

    switch (adjacentMines) {
        case '1':
            image = 'one';
            break;
        case '2':
            image = 'two';
            break;
        case '3':
            image = 'three';
            break;
        case '4':
            image = 'four';
            break;
        case '5':
            image = 'five';
            break;
        case '6':
            image = 'six';
            break;
        case '7':
            image = 'seven';
            break;
        case '8':
            image = 'eight';
            break;
        default:
            break;
    }

    return (
        <Button image={image}
                background={'silver'}
                inset={true}/>
    )
}

export default Revealed
