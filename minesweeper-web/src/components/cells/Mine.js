import React from 'react'
//import { loadImage } from '../utils/ImageLoader';
import Button from "../Button";
const Mine = () => {
    return (
        <Button inner={'*'}
                foreground={'black'}
                background={'red'}
                inset={true}/>
    )
}

export default Mine
