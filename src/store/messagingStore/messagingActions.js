import {SET_MESSAGE, REMOVE_MESSAGE} from './messagingActionTypes';

export const setMessage = ({message, messageType='errTy'}) =>({
    type: SET_MESSAGE,
    payload: {
        message,
        messageType
    }
});


export const removeMessage = () =>({
    type: REMOVE_MESSAGE
});

export const createMessage = ({message, messageType}) => dispatch => {
    dispatch(setMessage({message, messageType}));
    setTimeout(()=>{
        dispatch(removeMessage());
    }, 6000);
}