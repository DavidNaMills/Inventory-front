import React from 'react';
import { isMobileOnly } from 'react-device-detect';

import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';


const RenderMenu = ({routes, baseId}) => (
    isMobileOnly
        ? <BurgerMenu userRoutes={routes} locations={baseId} />
        : <Navigation userRoutes={routes} locations={baseId} />
);

export default RenderMenu;