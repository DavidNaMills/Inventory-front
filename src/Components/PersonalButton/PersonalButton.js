import React from 'react';
import classes from './personalButton.module.scss';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



const PersonalButton = () => (
    <div>
        <NavLink
            to='/personal'
            activeClassName={classes.personalButton__active}
            className={classes.personalButton}
        >
            <AccountCircleIcon size={50} />
        </NavLink>
    </div>
)

export default React.memo(PersonalButton);