import React from 'react';

const style = {
    height: '100%',
    backgroundColor: 'rgb(237, 237, 237)',
    width: '300px',
    padding: '50px'
}

const Inform = (props) =>{
    const {message, onClose} = props;

    return (
        <div style={style}>
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default Inform;