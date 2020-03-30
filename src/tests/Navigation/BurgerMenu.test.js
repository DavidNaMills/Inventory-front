import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import BurgerMenu from '../../Navigation/BurgerMenu/BurgerMenu';
import Toggle from '../../Navigation/BurgerMenu/Toggle';
import Navigation from '../../Navigation/Navigation/Navigation';

jest.mock('../../hooks/useShowHook/useShowHook');
import useShowHook from '../../hooks/useShowHook/useShowHook';


describe('BurgerMenu test auite', () => {
    describe('with isShow set to false', () => {
        let wrapper;
        beforeEach(()=>{
            useShowHook.mockImplementation(() => ({
                isShow: false,
                reverseBoolean: jest.fn()
            }));
            wrapper = shallow(<BurgerMenu />);
        });


        it('matches snapshot', () => {
            const comp = renderer.create(<BurgerMenu />);
            const app = comp.toJSON();
            expect(app).toMatchSnapshot();
        });

        it('exists', () => {
            expect(wrapper.exists).toBeTruthy();
        });

        it('renders a <Toggle/> component if isOpen === false', () => {
            expect(wrapper.find(Toggle).length).toBe(1);
            expect(wrapper.find(Navigation).length).toBe(0);
        });
    });


    it('renders a <Navigation/> component if isOpen === true', () => {
        useShowHook.mockImplementation(() => ({
            isShow: true,
            reverseBoolean: jest.fn()
        }));
        const wrapper2 = shallow(<BurgerMenu />);
        expect(wrapper2.find(Toggle).length).toBe(1);
        expect(wrapper2.find(Navigation).length).toBe(1);
    });
});