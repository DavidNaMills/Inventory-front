import React from 'react';
import '../testHelpers/context';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import * as device from 'react-device-detect';

import Navigation from '../../Navigation/Navigation/Navigation';
import BurgerMenu from '../../Navigation/BurgerMenu/BurgerMenu';

import RenderMenu from '../../Navigation/NavigationContainer/RenderMenu';

const routes = [
    { to: '/dashboard', label: 'nav_home' },
    { to: '/products', label: 'nav_prod_man' },
    { to: '/productTypes', label: 'nav_prod_ty' },
    { to: '/locations', label: 'nav_location' },
    { to: '/staff', label: 'nav_staff' },
    { to: '/test', label: 'nav_staff' }
];

const locations = ['123', '456123'];

describe('RenderMenu test suite', () => {
    it('matches snapshot', () => {
        const comp = renderer.create(
            <BrowserRouter>
                <RenderMenu routes={routes} locations={locations} />
            </BrowserRouter>
        );
        const app =comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('renders a <BurgerMenu/> if isMobileOnly === true', ()=>{
        const origValue = device.isMobileOnly;
        device.isMobileOnly = true;
        const wrapper = mount(
        <BrowserRouter>
            <RenderMenu routes={routes} locations={locations} />
        </BrowserRouter>
        )
        expect(wrapper.find(BurgerMenu).length).toBe(1);
        device.isMobileOnly = origValue;
    });

    it('renders a <Navigation/> if isMobileOnly === false', ()=>{
        const wrapper = mount(
        <BrowserRouter>
            <RenderMenu routes={routes} locations={locations} />
        </BrowserRouter>
        )
        expect(wrapper.find(Navigation).length).toBe(1);
    });
});