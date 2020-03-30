import {
    INIT_TYPES,
    ADD_PROD_TYPE,
    ADD_LOCATION,
    REMOVE_LOCATION
} from '../../../store/typesStore/typesStoreActionTypes';

import {typesReducer} from '../../../store/typesStore/typesStoreReducer';

const defaultState = {
    locations: {},
    products: {}
};


describe('typesReducer test suite', ()=>{
    it('initialises the default state on load', ()=>{
        const state = typesReducer(undefined, {type: '@@INIT'});
        expect(state).toEqual({
            locations: {},
            products: {}
        })
    });
    
    it('adds all types with INIT_TYPES', ()=>{
        const action = {
            type: INIT_TYPES,
            payload: {
                locations: {test:'qwe', test2: 'fvdsfda'},
                products: {test:'qwe', test2: 'fvdsfda'}
            }
        };
        const state = typesReducer(defaultState, action);
        expect(state).toEqual({
            locations: {test:'qwe', test2: 'fvdsfda'},
            products: {test:'qwe', test2: 'fvdsfda'}
        });
    });
    
    it('adds a single type with ADD_PROD_TYPE', ()=>{
        const action = {
            type: ADD_PROD_TYPE,
            payload: {_id: 'asd', test4:'qwe'}
        };
        const state = typesReducer(defaultState, action);
        expect(state).toEqual({
            locations: {},
            products: {asd: {_id: 'asd', test4:'qwe'}}
        })
    });
    
    it('adds a location with ADD_LOCATION', ()=>{
        const action = {
            type: ADD_LOCATION,
            payload: {_id: 'asd', test4:'qwe'}
        };
        const state = typesReducer(defaultState, action);
        expect(state).toEqual({
            locations: {asd: {_id: 'asd', test4:'qwe'}},
            products: {}
        })
    });
    
    it('removes a location on REMOVE_LOCATION', ()=>{
        const action = {
            type: REMOVE_LOCATION,
            payload: 'asd'
        };
        const tState = {
            locations: {asd: {_id: 'asd', test4:'qwe'}},
            products: {}
        };

        const state = typesReducer(tState, action);
        expect(state).toEqual({
            locations: {},
            products: {}
        });
    });
}); 