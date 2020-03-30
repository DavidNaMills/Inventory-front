import { STAFF_LOGIN, STAFF_LOGOUT, CHANGE_CURRENT_LOCATION } from './userActionTypes';
import { loginRoles } from '../../consts/roles';
import allConfigs from '../../configs/userConfigs/index';
import { setAuthorizationToken } from '../../Axios/setHeaders';

export const userLoginStart = ({ staff, token }) => ({
    type: STAFF_LOGIN,
    payload: {
        user: {
            ...staff,
            role: loginRoles[staff.role].level,
        },
        token,
        config: allConfigs()[staff.role],
        currentLoc: staff.baseId[0]
    },
});


const userLogoutStart = () => ({
    type: STAFF_LOGOUT
});


export const changeCurrentLocation = (id) => ({
    type: CHANGE_CURRENT_LOCATION,
    payload: id
});


export const userLogin = (userData) => dispatch => {
    setAuthorizationToken(userData.token);
    dispatch(userLoginStart({ staff: userData.staff, token: userData.token }));
}

export const userLogout = () => dispatch => {
    setAuthorizationToken();
    dispatch(userLogoutStart());
}