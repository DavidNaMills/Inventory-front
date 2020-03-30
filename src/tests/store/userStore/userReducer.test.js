import { STAFF_LOGIN, STAFF_LOGOUT, CHANGE_CURRENT_LOCATION } from '../../../store/userStore/userActionTypes';
import { userReducer } from '../../../store/userStore/userReducer';

const spyStringify = jest.spyOn(JSON, 'stringify');
const spyParse = jest.spyOn(JSON, 'parse');

const defaultState = {
    staff: null,
    token: null,
    config: null,
    currentLoc: null
}

const completeState = {
    staff: {
        name: 'david'
    },
    token: '4fd56sa4fg5d6asf4d5s3a',
    config: { someConfig: 'all set' },
    currentLoc: 'v78d945fgr31vd23as4v5d6as'
}

afterEach(() => {
    jest.clearAllMocks();
})

describe('userReducer test suite', () => {
    it('sets the default state on @@INIT', () => {
        const state = userReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual(defaultState);
    });

    it('adds the staff to state on STAFF_LOGIN', () => {
        const action = {
            type: STAFF_LOGIN,
            payload: {
                user: {
                    name: 'david'
                },
                token: '4fd56sa4fg5d6asf4d5s3a',
                config: { someConfig: 'all set' },
                currentLoc: 'v78d945fgr31vd23as4v5d6as'
            }
        };
        const state = userReducer(defaultState, action);
        expect(spyStringify).toHaveBeenCalledTimes(1);
        expect(spyStringify).toHaveBeenCalledWith(defaultState);
        expect(spyParse).toHaveBeenCalledTimes(1);
        expect(state).toEqual(completeState);
    });

    it('removes the staff from the state on STAFF_LOGOUT', () => {
        const state = userReducer(completeState, {type: STAFF_LOGOUT});
        expect(spyStringify).toHaveBeenCalledTimes(1);
        expect(spyStringify).toHaveBeenCalledWith(completeState);
        expect(state).toEqual(defaultState)
    });

    it('changes the current location with CHANGE_CURRENT_LOCATION', () => {
        const id = 'thisismynewid';
        const action = {
            type: CHANGE_CURRENT_LOCATION, 
            payload: id
        }
        const state = userReducer(completeState, action);
        expect(spyStringify).toHaveBeenCalledTimes(1);
        expect(spyStringify).toHaveBeenCalledWith(completeState);
        expect(state).toEqual({
            staff: {
                name: 'david'
            },
            token: '4fd56sa4fg5d6asf4d5s3a',
            config: { someConfig: 'all set' },
            currentLoc: id
        })
    });

    it('returns state if type is not recognised', () => {
        const state = userReducer(completeState, {type: 'fsdafdsa'});
        expect(state).toEqual(completeState);
    });
});