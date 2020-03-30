import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { mount } from 'enzyme';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import NavItem from '../../Navigation/Navigation/NavItem/NavItem';


describe('<NavItem/> test suite', () => {
    it('matches snapshot', () => {
        const comp = renderer.create(<BrowserRouter>
            <NavItem to='/' label='test' />
        </BrowserRouter>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('exists', () => {
        const wrapper = mount(
            <BrowserRouter>
                <NavItem to='/' label='test' />
            </BrowserRouter>
        );
        expect(wrapper.exists).toBeTruthy();
    });

    it('renders with an icon', () => { 
        const wrapper = mount(
            <BrowserRouter>
                <NavItem to='/' label='test' Icon={MenuBookIcon}/>
            </BrowserRouter>
        );
        expect(wrapper.find(MenuBookIcon).length).toBe(1);
    });
});