import React from 'react'
import Button from "../Button";
const Empty = ({x, y, onClick, onFlag}) => {

    const onLeftClick = () => {
        onClick(x, y);
    }

    const onRightClick = () => {
        onFlag(x, y);
    }

    return (
        <Button image={'none'}
                background={'lightgray'}
                onLeftClick={onLeftClick}
                onRightClick={onRightClick} />
    )
}

export default Empty
