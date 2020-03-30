import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Toggle from '../../Navigation/BurgerMenu/Toggle';

const tempClick = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

describe('Toggle test suite', () => {
    it('matches snapshot', () => {
        const comp = renderer.create(<Toggle onClick={tempClick} isOpen={false} />);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });


    describe('with isOpen as false', () => {
        let wrapper;

        beforeEach(()=>{
            wrapper = shallow(<Toggle onClick={tempClick} isOpen={false} />);
        });

        it('exists', () => {
            expect(wrapper.exists).toBeTruthy();
        });

        it('renders a button with class "hamburger hamburger--collapse" when isOpen === false', () => {
            const btn = wrapper.find('button');
            expect(btn.length).toBe(1);
            expect(btn.props().className).toEqual('hamburger hamburger--collapse');
        });

        it('renders 2 <span/> elements with classes of "hamburger-box" and "hamburger-inner"', () => {
            const spn = wrapper.find('span');
            expect(spn.length).toBe(2);
            expect(spn.at(0).props().className).toEqual('hamburger-box');
            expect(spn.at(1).props().className).toEqual('hamburger-inner');
        });

        it('fires click event on button click', () => {
            wrapper.find('button').simulate('click');
            expect(tempClick).toHaveBeenCalledTimes(1);
        });
    });


    it('renders a button with class "hamburger hamburger--collapse is-active" when isOpen === true', () => {
        const withOpen = shallow(<Toggle onClick={tempClick} isOpen={true} />);
        const btn = withOpen.find('button');
        expect(btn.length).toBe(1);
        expect(btn.props().className).toEqual('hamburger hamburger--collapse is-active');
    });
});