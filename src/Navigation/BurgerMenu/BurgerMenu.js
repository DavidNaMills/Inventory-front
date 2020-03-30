import React from 'react';
import Toggle from './Toggle';
import Navigation from '../Navigation/Navigation';
import useShowHook from '../../hooks/useShowHook/useShowHook';

const style={
    top: '0',
    position: 'sticky',
    zIndex: '9999'
}

const BurgerMenu = (props) => {
    const {userRoutes, locations} = props;
    const {isShow, reverseBoolean, changeShow} = useShowHook(false);

    return (
        <div style={style}>
            <Toggle onClick={() => reverseBoolean()} isOpen={isShow} />
            {isShow &&
                <Navigation userRoutes={userRoutes} locations={locations} isMobile={true} tempClose={()=>changeShow(false)}/>
            }
        </div>
    )
}

export default BurgerMenu;