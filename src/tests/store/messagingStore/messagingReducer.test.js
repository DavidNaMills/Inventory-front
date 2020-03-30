import {SET_MESSAGE, REMOVE_MESSAGE} from '../../../store/messagingStore/messagingActionTypes';
import {messagingReducer} from '../../../store/messagingStore/messagingReducer';
const defaultState = null;

const message = 'hello';
const messageType = 'penalty_try';
const payload = {message, messageType};

describe('messagingReducer test suite', ()=>{
    it('sets the state to null on @@init', ()=>{
        const state = messagingReducer(null, {type: '@@INIT'});
        expect(state).toEqual(null);
    });
    
    it('sets the state when a SET_MESSAGE action is dispatched', ()=>{
        const action = {type: SET_MESSAGE, payload};
        const state = messagingReducer(null, action);
        expect(Object.prototype.toString.call(state)).toEqual('[object Object]');
        expect(state).toHaveProperty('message', message);
        expect(state).toHaveProperty('messageType', messageType);
    });

    it('removes the message when a REMOVE_MESSAGE action is dispatched', ()=>{
        const action = {type: REMOVE_MESSAGE};
        const state = messagingReducer(payload, action);
        expect(state).toEqual(null);
    });

    it('returns state if type is not recognised', ()=>{
        const state = messagingReducer(payload, {type: 'thatchers'});
        expect(state).toEqual(payload);
    });
});