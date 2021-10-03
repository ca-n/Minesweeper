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
                    textAlign:'center',
                    margin: '0',
                    padding: '0',
                    height: '38px',
                    width: '38px'}}
                onClick={onClick}
                onContextMenu={onContextMenu}>
                    <img alt={image} src={loadImage(image)}
                    style={{margin: '0',
                    padding: '0',
                    height: '32px',
                    width: '32px',
                        backgroundColor: background,
                        // eslint-disable-next-line no-dupe-keys
                    imageRendering: 'pixelated',
                        // eslint-disable-next-line no-dupe-keys
                    imageRendering: '-moz-crisp-edges',
                        // eslint-disable-next-line no-dupe-keys
                    imageRendering: 'crisp-edges'}} />
                </button>
    );
}

export default Button