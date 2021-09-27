import React from 'react';
import { loadImage } from '../../utils/ImageLoader';
import Button from "../Button";
const Flag = ({x, y, onFlag}) => {
    return (
        <Button image={'flag'}
                background={'lightgray'}
                onRightClick={onFlag} />
    )
}

export default Flag
