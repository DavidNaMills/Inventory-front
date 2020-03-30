import React from 'react';
import classes from './messagingDisplay.module.scss';
import { useSelector } from 'react-redux';
import ErrorIcon from '@material-ui/icons/Error';
import CheckIcon from '@material-ui/icons/Check';


const MessagingDisplay = () => {
    const { display } = useSelector(state => state);

    return (
        display &&
        <div className={display.messageType === 'errType' ? classes.messagingDisplay__errStyle : classes.messagingDisplay__succStyle}>
            {display.messageType === 'errType' ? <ErrorIcon/> : <CheckIcon/>} <p className={classes.messagingDisplay_p}>{display.message}</p>
        </div>
    )
}

export default MessagingDisplay;