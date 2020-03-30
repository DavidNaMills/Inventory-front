import React from 'react';
import { useSelector } from 'react-redux';

import TopBar from './TopBar';
import RenderMenu from './RenderMenu';


const NavigationContainer = (props) => {
    const state = useSelector(state => state);
    const staff = state.staff;
    
    return (
        staff.token
            ? <div>
                <TopBar name={staff.staff.name}/>
                <RenderMenu routes={staff.config.routes}/>
                
                {props.children}
            </div>
            : props.children

    )
}

export default NavigationContainer;