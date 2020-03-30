import {
    INIT_TYPES,
    ADD_PROD_TYPE, 
    ADD_LOCATION,
    REMOVE_LOCATION
} from './typesStoreActionTypes';

const defaultState = {
    locations: {},
    products: {}
};

export const typesReducer = (state=defaultState, action)=>{
    const tempState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case INIT_TYPES:
            return action.payload;
        
        case ADD_PROD_TYPE:
            tempState.products[action.payload._id] = action.payload;
            return tempState;
        
            case ADD_LOCATION:
            tempState.locations[action.payload._id] = action.payload;
            return tempState;

        case REMOVE_LOCATION:
            delete tempState.locations[action.payload];
            return tempState;


        default:
            return state;
    }
}