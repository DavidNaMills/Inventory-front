import React from 'react';
import classes from './navigation.module.scss';

import { withOrientationChange } from 'react-device-detect'
import NavItem from './NavItem/NavItem';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PeopleIcon from '@material-ui/icons/People';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {useLocale} from '../../Context/LocaleContext';

const Navigation = (props) => {
    const locale = useLocale();
    const { userRoutes, isMobile=false, tempClose=null} = props;
    const width = isMobile ? null : (window.innerWidth-20) / userRoutes.length;

    return (
        <div className={isMobile ? classes.navigationMobile : classes.navigation}>
            {
                userRoutes.map((x, y) => {
                    switch(x.to){
                        case '/dashboard':
                            return <NavItem key={y} to={x.to} label={locale[x.label]} Icon={HomeIcon} width={width} isMobile={isMobile} tempClose={tempClose}/>
                        case '/products':
                            return <NavItem key={y} to={x.to} label={locale[x.label]} Icon={LocalCafeIcon} width={width} isMobile={isMobile} tempClose={tempClose}/>
                        case '/productTypes':
                            return <NavItem key={y} to={x.to} label={locale[x.label]} Icon={MenuBookIcon} width={width} isMobile={isMobile} tempClose={tempClose}/>
                        case '/locations':
                            return <NavItem key={y} to={x.to} label={locale[x.label]} Icon={LocationCityIcon} width={width} isMobile={isMobile} tempClose={tempClose}/>
                        case '/staff':
                            return <NavItem key={y} to={x.to} label={locale[x.label]} Icon={PeopleIcon} width={width} isMobile={isMobile} tempClose={tempClose}/>
                        default:
                            return <NavItem key={y} to={x.to} label={locale[x.label]} width={width} isMobile={isMobile} tempClose={tempClose}/>
                    }
                })
            }
        </div>
    )
};

export default withOrientationChange(Navigation);