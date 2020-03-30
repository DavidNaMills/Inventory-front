import axios from './axiosInstance';

export const  setAuthorizationToken = (token=null) =>{
    if(token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['authorization'];
    }
}