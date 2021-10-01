import React from 'react'
import { loadImage } from '../utils/ImageLoader';

const Button = ({image='none', background, onLeftClick=(() => {}), onRightClick=(() => {}), inset=false}) => {
    const onClick = (e) => {
        e.preventDefault();
        onLeftClick();
    }

    const onContextMenu = (e) => {
        e.preventDefault();
        onRightClick();
    }

    return (
        <button type={'button'}
                style={{backgroundColor:background,
                    borderStyle:`${inset ? 'inset' : 'outset'}`,
                    height:'30px',
                    width:'30px',
                    textAlign:'center',
                    margin: '0',
                    padding: '0'}}
                onClick={onClick}
                onContextMenu={onContextMenu}>
                    <img alt={image} src={loadImage(image)}
                    style={{margin: '0',
                    padding: '0',
                    height: '100%',
                    width: '100%',
                    imageRendering: 'pixelated',
                    imageRendering: '-moz-crisp-edges',
                    imageRendering: 'crisp-edges'}} />
                </button>
    );
}

export default Button