import React from 'react'
import Button from "../Button";
const Empty = ({x, y, onClick, onFlag}) => {
    return (
        <Button inner={' '}
                foreground={'black'}
                background={'lightgray'}
                onLeftClick={onClick(x, y)}
                onRightClick={onFlag(x, y)} />
    )
}

export default Empty
