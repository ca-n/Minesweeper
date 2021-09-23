import React from 'react'

const Button = ({inner='&#8203;', foreground, background, onLeftClick, onRightClick, inset=false}) => {
    function onClick(e) {
        e.preventDefault();
        onLeftClick();
    }

    function onContextMenu(e) {
        e.preventDefault();
        onRightClick();
    }

    return (
        <button type={'button'}
                style={{color:foreground,
                    backgroundColor:background,
                    fontWeight:'bold',
                    borderStyle:`${inset ? 'inset' : 'outset'}`}}
                onClick={onClick}
                onContextMenu={onContextMenu}>{inner}</button>
    );
}

export default Button