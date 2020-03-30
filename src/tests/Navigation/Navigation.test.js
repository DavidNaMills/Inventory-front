import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import '../testHelpers/context';
import Navigation from '../../Navigation/Navigation/Navigation';
import NavItem from '../../Navigation/Navigation/NavItem/NavItem';

import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PeopleIcon from '@material-ui/icons/People';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const testRoutes = [
    { to: '/dashboard', label: 'nav_home' },
    { to: '/products', label: 'nav_prod_man' },
    { to: '/productTypes', label: 'nav_prod_ty' },
    { to: '/locations', label: 'nav_location' },
    { to: '/staff', label: 'nav_staff' },
    { to: '/test', label: 'nav_staff' }
]

describe('<Navigation/> test suite', () => {
    it('matches snapshot', () => {
        const comp = renderer.create(
            <BrowserRouter>
                <Navigation userRoutes={testRoutes} isMobile={false} />
            </BrowserRouter>
        )
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('exists', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <Navigation userRoutes={testRoutes} isMobile={false} />
            </BrowserRouter>
        );
        expect(wrapper.exists).toBeTruthy();
    });

    describe('className tests', () => {
        it('sets className to "navigation" if not mobile', () => {
            const wrapper = mount(
                <BrowserRouter>
                    <Navigation userRoutes={testRoutes} isMobile={false} />
                </BrowserRouter>
            );
            expect(wrapper.find('div').props().className).toEqual('navigation');
        });

        it('sets className to "navigationMobile" if mobile', () => {
            const wrapper = mount(
                <BrowserRouter>
                    <Navigation userRoutes={testRoutes} isMobile={true} />
                </BrowserRouter>
            );
            expect(wrapper.find('div').props().className).toEqual('navigationMobile');
        });
    });

    describe.only('route tests: displays Icons', () => {
        const wrapper = mount(
            <BrowserRouter>
                <Navigation userRoutes={testRoutes} isMobile={true} />
            </BrowserRouter>
        )


        it('renders 6 NavItems', () => {
            expect(wrapper.find(NavItem).length).toBe(6);
        });
        
        it('renders <NavItem /> with Icons', () => {
            const icons = wrapper.find(NavItem);
            expect(icons.at(0).find(HomeIcon).length).toBe(1);
            expect(icons.at(1).find(LocalCafeIcon).length).toBe(1);
            expect(icons.at(2).find(MenuBookIcon).length).toBe(1);
            expect(icons.at(3).find(LocationCityIcon).length).toBe(1);
            expect(icons.at(4).find(PeopleIcon).length).toBe(1);
        });
    });
});