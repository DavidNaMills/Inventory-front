import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../Axios/axiosInstance';

import {
    INIT_TYPES,
    ADD_PROD_TYPE,
    ADD_LOCATION,
    REMOVE_LOCATION
} from '../../../store/typesStore/typesStoreActionTypes';

import {
    initTypes,
    addNewProductType,
    addNewLocation,
    removeLocationType,
    startInitTypes
} from '../../../store/typesStore/typesStoreActions';

import { URLS } from '../../../Axios/urls';

const mockStore = configureStore([thunk]);
const moxios = new MockAdapter(axios);


describe('typesActions test suite', () => {
    it('initTypes action creator', () => {
        const allTypes = {
            locations: ['1'],
            products: ['2'],
        }
        const action = initTypes(allTypes);
        expect(action).toHaveProperty('type', INIT_TYPES);
        expect(action.payload).toEqual(allTypes);
    });

    it('creates new addNewLocation action', () => {
        const test = 'test';
        const action = addNewLocation(test);
        expect(action).toHaveProperty('type', ADD_LOCATION);
        expect(action.payload).toEqual(test);
    });

    it('creates removeLocationType action', ()=>{
        const test = 'test';
        const action = removeLocationType(test);
        expect(action).toHaveProperty('type', REMOVE_LOCATION);
        expect(action.payload).toEqual(test);
    });

    it('creates addNewProductType action', ()=>{
        const test = 'test';
        const action = addNewProductType(test);
        expect(action).toHaveProperty('type', ADD_PROD_TYPE);
        expect(action.payload).toEqual(test);
    });

    it('makes an axios request and dispatches initTypes on success', async()=>{
        moxios.onGet(URLS.allTypes).reply(200, {
            data: {
                locations: ['loc1', 'loc2'],
                products: ['prod1', 'prod2']
            }
        });
        const store = mockStore([]);
        await store.dispatch(startInitTypes());
        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions).toEqual([{
            type: INIT_TYPES,
            payload: {
                locations: ['loc1', 'loc2'],
                products: ['prod1', 'prod2']
            }
        }])

    });
});