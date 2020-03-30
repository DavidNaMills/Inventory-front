import React from 'react';
import classes from './Dashboard.module.scss';
import {useSelector} from 'react-redux';
import {useLocale} from '../../Context/LocaleContext';


const Dashboard = () =>{
    const {staff} = useSelector(state=>state);
    const locale = useLocale();
    
    return (
        <div className={classes.dashboard}> 
            <div className={classes.dashboard__msg}>{`${locale['welcome']} ${staff.staff.name}`}</div>
            <div className={classes.dashboard__msg}>{`${locale['under_const']}`}</div>
        </div>
    )
}

export default Dashboard;