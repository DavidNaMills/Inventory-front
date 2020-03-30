import React from 'react';
import classes from './NavStyle.module.scss';
import { NavLink } from 'react-router-dom';


const NavHome = ({ to, label, Icon=null, width='50px', isMobile=false, tempClose=null}) => {

    return (
        <NavLink 
            onClick={tempClose}
            to={to} 
            className={isMobile ? classes.mobileNavItem : classes.navItem} 
            style={{width}}
            activeClassName={classes.navItem__active}
        >
            {Icon && <Icon/>}
            {label}
        </NavLink>
    )
}

export default NavHome;