import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { STAFF_LOGIN, STAFF_LOGOUT, CHANGE_CURRENT_LOCATION } from '../../../store/userStore/userActionTypes';
import { userLogin, userLogout, userLoginStart, changeCurrentLocation } from '../../../store/userStore/userActions';

jest.mock('../../../configs/userConfigs/index');
import allConfigs from '../../../configs/userConfigs/index';

import * as headers from '../../../Axios/setHeaders';
const setAuthSpy = jest.spyOn(headers, 'setAuthorizationToken');

const mockStore = configureStore([thunk]);

jest.mock('../../../consts/roles', () => ({
    loginRoles: {
        "3": {
            level: 3,
            name: 'admin'
        },
        "2": {
            level: 2,
            name: 'subadmin'
        },
        "1": {
            level: 1,
            name: 'staff'
        }
    }
}))
import { loginRoles } from '../../../consts/roles';


allConfigs.mockImplementation(() => ({
    '1': 'staffConfig',
    '2': 'subAdminConfig',
    '3': 'adminConfig'
}))

const mockStaff = {
    name: 'David',
    phone: '123456789',
    role: '3',
    baseId: ['123123123']
}

afterEach(() => {
    jest.clearAllMocks();
});

describe('userActions test suite', () => {
    it('creates a userloginStart action', () => {
        const token = 'gfd456s4df56s4sd56a';
        const action = userLoginStart({ staff: mockStaff, token });
        
        expect(action.type).toEqual(STAFF_LOGIN);
        expect(action.payload.user).toEqual({
            ...mockStaff,
            role: 3
        });
        expect(action.payload).toHaveProperty('token', token);
        expect(action.payload).toHaveProperty('config', 'adminConfig');
        expect(action.payload).toHaveProperty('currentLoc', '123123123');
        
        expect(allConfigs).toHaveBeenCalledTimes(1);
    });

    it('userLogin dispatches userLogoutStart and invokes setAuthorizationToken function', async()=>{
        const token = 'gfd456s4df56s4sd56a';
        const full = {
            staff: mockStaff,
            token
        }
        const store = mockStore();
        await store.dispatch(userLogin(full));
        const action = store.getActions();

        expect(setAuthSpy).toHaveBeenCalledTimes(1);
        expect(setAuthSpy).toHaveBeenCalledWith(token);
        expect(action.length).toBe(1);
        expect(action[0].type).toEqual(STAFF_LOGIN);
        expect(action[0].payload.user).toEqual({
            ...mockStaff,
            role: 3
        });
        expect(action[0].payload).toHaveProperty('token', token);
        expect(action[0].payload).toHaveProperty('config', 'adminConfig');
        expect(action[0].payload).toHaveProperty('currentLoc', '123123123');
    });

    it('userLogout dispatches userLogoutStart and invokes userLogout', async()=>{
        const store = mockStore();
        await store.dispatch(userLogout());
        const action = store.getActions();

        expect(setAuthSpy).toHaveBeenCalledTimes(1);
        expect(setAuthSpy).toHaveBeenCalledWith();
        expect(action.length).toBe(1);

        expect(action[0].type).toEqual(STAFF_LOGOUT);
    });

    it('created a changeCurrentLocation object', ()=>{
        const id = '4sdf56af4das56'
        const action = changeCurrentLocation(id);
        expect(action.type).toEqual(CHANGE_CURRENT_LOCATION);
        expect(action.payload).toEqual(id);
    });
});