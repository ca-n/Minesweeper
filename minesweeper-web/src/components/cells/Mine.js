import React from 'react'
import Button from "../Button";
const Mine = ({clicked = false}) => {
    return (
        <Button image={'mine'}
                background={`${clicked ? 'red' : 'silver'}`}
                inset={true}/>
    )
}

export default Mine
