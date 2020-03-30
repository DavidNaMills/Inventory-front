import React from 'react';

const Choice = (props) =>{
    const {message, onCancel, onAccept} = props;

    return (
        <div>
            <p>{message}</p>
            <button onClick={onAccept}>Accept</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )
}

export default Choice;