import React from 'react'
import Button from "../Button";
const Empty = ({x, y, onClick, onFlag}) => {

    function onLeftClick() {
        onClick(x, y);
    }

    function onRightClick(){
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
