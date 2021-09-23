import React from 'react'

const Button = ({inner=' ', foreground, background, onLeftClick=(() => {}), onRightClick=(() => {}), inset=false}) => {
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
                    borderStyle:`${inset ? 'inset' : 'outset'}`,
                    height:'30px',
                    width:'30px',
                    textAlign:'center'}}
                onClick={onClick}
                onContextMenu={onContextMenu}><pre style={{margin:'0'}}>{inner}</pre></button>
    );
}

export default Button