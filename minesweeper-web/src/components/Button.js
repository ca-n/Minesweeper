import React from 'react'
import { loadImage } from '../utils/ImageLoader';

const Button = ({image='none', background, onLeftClick=(() => {}), onRightClick=(() => {}), inset=false}) => {
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
                style={{backgroundColor:background,
                    fontWeight:'bold',
                    borderStyle:`${inset ? 'inset' : 'outset'}`,
                    height:'30px',
                    width:'30px',
                    textAlign:'center'}}
                onClick={onClick}
                onContextMenu={onContextMenu}><img alt={image} src={loadImage(image)} /></button>
    );
}

export default Button