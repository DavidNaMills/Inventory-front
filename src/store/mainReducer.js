import {combineReducers} from 'redux';
import {userReducer} from './userStore/userReducer';
import {typesReducer} from './typesStore/typesStoreReducer';
import {messagingReducer} from './messagingStore/messagingReducer';

const rootReducer = combineReducers({
    staff: userReducer,
    types: typesReducer,
    display: messagingReducer
});

export default rootReducer;