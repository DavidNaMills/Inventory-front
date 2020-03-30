import { useDispatch } from 'react-redux';

import { userLogin, userLogout, changeCurrentLocation } from '../../store/userStore/userActions';
import { startInitTypes, addNewProductType, addNewLocation, removeLocationType } from '../../store/typesStore/typesStoreActions';
import {createMessage} from '../../store/messagingStore/messagingActions';

const useDispatchHook = () => {
    const dispatch = useDispatch();

    const userLoginDispatch = (userData) => dispatch(userLogin(userData));
    const userLogoutDispatch = () => dispatch(userLogout());
    const changeCurrentLocationDispatch = (id) => dispatch(changeCurrentLocation(id));

    const initTypesDispatch = () => dispatch(startInitTypes());
    const addNewProductDispatch = (newType) => dispatch(addNewProductType(newType));
    const addNewLocationDispatch = (newLocation) => dispatch(addNewLocation(newLocation));
    const removeLocationDispatch = (id) => dispatch(removeLocationType(id));

    const createMessageDispatch = (data) => dispatch(createMessage(data));

    return {
        userLoginDispatch,
        userLogoutDispatch,
        changeCurrentLocationDispatch,

        initTypesDispatch,
        addNewProductDispatch,
        addNewLocationDispatch,
        removeLocationDispatch,

        createMessageDispatch
    }
}

export default useDispatchHook;