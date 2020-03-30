import {STAFF_LOGIN, STAFF_LOGOUT, CHANGE_CURRENT_LOCATION} from './userActionTypes';

const defaultState = {
    staff: null,
    token: null,
    config: null,
    currentLoc: null
}

export const userReducer = (state=defaultState, action)=>{
    const temp = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case STAFF_LOGIN:
            return {
                staff: action.payload.user,
                token: action.payload.token,
                config: action.payload.config,
                currentLoc: action.payload.currentLoc
            }
        case STAFF_LOGOUT:
            return defaultState;
        
        case CHANGE_CURRENT_LOCATION:
            const t = {
                ...temp,
                currentLoc: action.payload
            };
            return t;

            default:
                return state;
    }
}