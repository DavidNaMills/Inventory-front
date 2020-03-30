import React from 'react';
import '../testHelpers/context';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import {BrowserRouter, NavLink} from 'react-router-dom';

import PersonalButton from '../../Components/PersonalButton/PersonalButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'


describe('<PersonalButton/> test suite', ()=>{
    let wrapper = mount(<BrowserRouter><PersonalButton/></BrowserRouter>);

    it('matches snapshot', ()=>{
        const comp = renderer.create(<BrowserRouter><PersonalButton/></BrowserRouter>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('renders a <NavLink/> component', ()=>{
        expect(wrapper.find(NavLink).length).toBe(1);
        expect(wrapper.find(NavLink).props()).toHaveProperty('to', '/personal');
        expect(wrapper.find(NavLink).props()).toHaveProperty('activeClassName', 'personalButton__active');
        expect(wrapper.find(NavLink).props()).toHaveProperty('className', 'personalButton');
    });
    
    it('renders a <AccountCircleIcon/> component', ()=>{
        expect(wrapper.find(AccountCircleIcon).length).toBe(1);
        expect(wrapper.find(AccountCircleIcon).props()).toHaveProperty('size', 50);
    });
});