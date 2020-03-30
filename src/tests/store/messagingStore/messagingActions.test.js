import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {SET_MESSAGE, REMOVE_MESSAGE} from '../../../store/messagingStore/messagingActionTypes';
import {setMessage, removeMessage, createMessage} from '../../../store/messagingStore/messagingActions';

const mockStore = configureStore([thunk]);
const message = 'this is a test message';
const messageType = 'success';

describe('messagingActions test suite', ()=>{
    it('creates a setMessage action type with default values', ()=>{
        const action = setMessage({message});
        expect(action).toEqual({
            type: SET_MESSAGE,
            payload: {
                message,
                messageType: 'errTy'
            }
        })
    });

    it('creates a setMessage action type with a set messageType', ()=>{
        const action = setMessage({message, messageType});
        expect(action).toEqual({
            type: SET_MESSAGE,
            payload: {
                message,
                messageType
            }
        })
    });

    it('creates a remove action type', ()=>{
        expect(removeMessage()).toEqual({type: REMOVE_MESSAGE});
    });

    it('should dispatch a setMessage action', async(done)=>{
        const store = mockStore();
        await store.dispatch(createMessage({message, messageType}));
        setTimeout(()=>{
            const actions = store.getActions();
            expect(actions.length).toBe(2);
            expect(actions[0]).toEqual({
                type: SET_MESSAGE,
                payload: {
                    message,
                    messageType
                }
            });
            expect(actions[1]).toEqual({type: REMOVE_MESSAGE})
            done();
        }, 7000);
    }, 15000);
});