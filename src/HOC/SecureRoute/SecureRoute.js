import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';


const SecureRoute = ({component:Component, level, ...rest}) =>{
    const {staff} = useSelector(state=>state);
    const tempRole = staff.staff ? +staff.staff.role : -1;
    let Comp = <Redirect to='/' />
    if(
        staff.staff 
        && staff.token
        && (+staff.staff.role >= +level)
    ){
        Comp = +tempRole >= level
        ? <Route {...rest} component={Component}/>
        : <Redirect to='/dashboard' />
    } else {
        Comp = <Redirect to='/' />
    }
    return (
        <React.Fragment>
            { Comp }
        </React.Fragment>
    )
}

export default SecureRoute;