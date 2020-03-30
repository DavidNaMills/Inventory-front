import React from 'react';
import {Redirect} from 'react-router-dom';
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';

const Logout = () =>{
    const {userLogoutDispatch} = useDispatchHook();
    userLogoutDispatch();
    return(
        <Redirect to='/' />
    )
}

export default Logout;