import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import '../testHelpers/context';

import TopBar from '../../Navigation/NavigationContainer/TopBar';
import RenderMenu from '../../Navigation/NavigationContainer/RenderMenu';
import NavigationContainer from '../../Navigation/NavigationContainer/NavigationContainer';

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
});

const DummyComp = () => (<div><p>I Am Child</p></div>)

const Full = () => (
    <BrowserRouter>
        <NavigationContainer>
            <DummyComp />
        </NavigationContainer>
    </BrowserRouter>
)

afterEach(() => {
    jest.clearAllMocks();
});

describe('<NavigationContainer/> test suite', () => {
    describe('with staff.token', () => {
        let wrapper;

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
            wrapper = mount(<Full />);
        })

        it('matches snapshot', () => {
            const comp = renderer.create(<Full />)
            const app = comp.toJSON();
            expect(app).toMatchSnapshot();
        });

        it('exists', () => {
            expect(wrapper.exists).toBeTruthy();
        });

        it('renders <TopBar/> and <RenderMenu /> and <DummyComp/>', () => {
            expect(wrapper.find(TopBar).length).toBe(1);
            expect(wrapper.find(RenderMenu).length).toBe(1);
            expect(wrapper.find(DummyComp).length).toBe(1);
        });
    });

    it('only renders children if no staff.token', () => {
        useSelector.mockImplementation(() => ({
            staff: { token: null },
            types: {
                locations: {
                    '123': { displayValue: 'home' },
                    '456123': { displayValue: 'home2' },
                }
            }
        }));
        const wrapper = mount(<Full />);
        expect(wrapper.find(TopBar).length).toBe(0);
        expect(wrapper.find(RenderMenu).length).toBe(0);
        expect(wrapper.find(DummyComp).length).toBe(1);
    });
});