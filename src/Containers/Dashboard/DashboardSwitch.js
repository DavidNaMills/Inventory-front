import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';

import LoginForm from '../LoginForm/LoginForm';
import Dashboard from './Dashboard';

const DashboardSwitch = () =>{
    const staff = useSelector(state=>state.staff);

    useEffect(()=>{
        if(staff.token){}
    }, [staff]);

    return (
        staff.token
        ? <Dashboard />
        : <LoginForm />
    )
}

export default DashboardSwitch;