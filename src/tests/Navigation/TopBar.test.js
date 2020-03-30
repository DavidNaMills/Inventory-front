import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import TopBar from '../../Navigation/NavigationContainer/TopBar';
import LocationChanger from '../../Components/LocationChanger/LocationChanger';
import PersonalButton from '../../Components/PersonalButton/PersonalButton';


jest.mock('react-redux');
import { useSelector } from 'react-redux';

const mockStaff = (token) => ({
    token: token,
    staff: {
        name: 'David',
        baseId: ['123', '456123']
    },
    config: {
        routes: [
            { to: '/dashboard', label: 'nav_home' },
            { to: '/products', label: 'nav_prod_man' },
            { to: '/productTypes', label: 'nav_prod_ty' },
            { to: '/locations', label: 'nav_location' },
            { to: '/staff', label: 'nav_staff' },
            { to: '/test', label: 'nav_staff' }
        ]
    }

})

let wrapper;

afterEach(() => {
    jest.clearAllMocks();
});


beforeEach(() => {
    useSelector.mockImplementation(() => ({
        staff: { ...mockStaff('123123123') },
        types: {
            locations: {
                '123': { displayValue: 'home' },
                '456123': { displayValue: 'home2' },
            }
        }
    }));

    wrapper = mount(<BrowserRouter><TopBar name={'David'} /></BrowserRouter>);
})


describe('TopBar test suite', () => {
    
    it('matches snapshot', () => {
        const comp = renderer.create(<BrowserRouter><TopBar name={'David'} /></BrowserRouter>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('exists', ()=>{
        expect(wrapper.exists).toBeTruthy()
    });

    it('renders <LocationChanger/> and <PersonalButton/> components', ()=>{
        expect(wrapper.find(LocationChanger).length).toBe(1);
        expect(wrapper.find(PersonalButton).length).toBe(1);
    });
});