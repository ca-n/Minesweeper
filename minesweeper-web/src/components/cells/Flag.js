import React from 'react';
import Button from "../Button";
const Flag = ({x, y, onFlag = () => {}}) => {

    const onRightClick = () => {
        onFlag(x, y)
    }

    return (
        <Button image={'flag'}
                background={'lightgray'}
                onRightClick={onRightClick} />
    )
}

export default Flag
