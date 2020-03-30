import {SET_MESSAGE, REMOVE_MESSAGE} from './messagingActionTypes';

const defaultState = null;

export const messagingReducer = (state=defaultState, action)=>{
    switch(action.type){
        case SET_MESSAGE:
            return {
                message: action.payload.message,
                messageType: action.payload.messageType
            };

        case REMOVE_MESSAGE:
            return defaultState;

        default:
            return state;
    }
}