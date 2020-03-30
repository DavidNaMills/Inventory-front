import { 
    INIT_TYPES, 
    ADD_PROD_TYPE, 
    ADD_LOCATION,
    REMOVE_LOCATION
 } from './typesStoreActionTypes';
import axios from '../../Axios/axiosInstance';
import { URLS } from '../../Axios/urls';


export const initTypes = (allTypes) => ({
    type: INIT_TYPES,
    payload: {
        locations: allTypes.locations,
        products: allTypes.products
    }
});

export const addNewProductType = (newType) =>({
    type: ADD_PROD_TYPE,
    payload: newType
})

export const addNewLocation = (newLocation) =>({
    type: ADD_LOCATION,
    payload: newLocation
})

export const removeLocationType = (removeId)=>({
    type: REMOVE_LOCATION,
    payload: removeId
})

export const startInitTypes = () => dispatch => {
    return axios({
        url: URLS.allTypes,
        method: 'GET'
    })
        .then(res => {
            dispatch(initTypes(res.data.data));
        })
        .catch(err => {
            console.log(err);
        })
}