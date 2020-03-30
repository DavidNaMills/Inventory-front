import React from 'react';
import '../../testHelpers/context';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

import LocationPopup from '../../../Components/PopupComponents/LocationPopup';

import PopupProductRow from '../../../Components/PopupComponents/Rows/PopupProductRow';
import PopupStaffRow from '../../../Components/PopupComponents/Rows/PopupStaffRow';
import Button from '../../../Components/Button/Button';
import Title from '../../../Components/Title/Title';

jest.mock('../../../hooks/useAxios/useAxios');
import useAxios from '../../../hooks/useAxios/useAxios';

// jest.mock('react-device-detect');
import {withOrientationChange} from 'react-device-detect';

const mockClose = jest.fn();
const mockCall = jest.fn();

const item = {
    _id: '123',
    displayValue: 'Home',
    description: 'this is a description'
};

const mockFetchState = {
    isLoading: false,
    errors: null,
    data: {
        data: [
            {name: 'test1'}
        ],
        products: [
            { _id: '2121', name: 'cups', qtyInstock: '123' },
            { _id: '7894512', name: 'plates', qtyInstock: '789' },
        ]
    },
    id: null
}


describe('<LocationPopup/> component test suite', ()=>{
    describe('all options true', ()=>{
        let wrapper;

        beforeEach(()=>{
            useAxios.mockImplementation(()=>({
                fetchState: mockFetchState,
                makeCall: mockCall
            }));

            jest.mock('react-device-detect', ()=>({
                withOrientationChange: (component)=>{
                    component.defaultProps = {
                        ...component.defaultProps,
                        isPortrait: true
                    };
                    return component;
                }
            }))

            wrapper = mount(<LocationPopup item={item} onClose={mockClose}/>);
        })

        it('matches snapshot', ()=>{
            const comp = renderer.create(<LocationPopup item={item} onClose={mockClose}/>);
            const app = comp.toJSON();
            expect(app).toMatchSnapshot();
        });
        
        it('exists', ()=>{
            expect(wrapper.exists).toBeTruthy();
        });
        
        it('renders a <div> container with classname "popup"', ()=>{
            const div = wrapper.find('div');
            expect(div.length).toBe(3);
            expect(div.at(0).props()).toHaveProperty('className', 'popup');
        });
        
        it('renders a <Title/> component', ()=>{
            const ttl = wrapper.find(Title);
            expect(ttl.length).toBe(1);
            expect(ttl.props()).toHaveProperty('message', item.displayValue);
            expect(ttl.props()).toHaveProperty('size', 'h2');
            expect(ttl.props()).toHaveProperty('center', true);
        });
        
        it('renders a <p> element with className "popup__mediumSpacing" with the product description', ()=>{
            const p = wrapper.find('p');
            expect(p.length).toBe(4);
            expect(p.at(0).props()).toHaveProperty('className', 'popup__mediumSpacing');
            expect(p.at(0).text()).toEqual(item.description);
        });
        
        it('renders a <PopupStaffRow/> and <PopupProductRow/> components', ()=>{
            const stff = wrapper.find(PopupStaffRow);
            expect(stff.length).toBe(1);
            expect(stff.props()).toHaveProperty('staff', mockFetchState.data.data)
        });
        
        it('renders a <Button/> component', ()=>{});
    });

    describe('alternative conditions tested', ()=>{
        it('does not render a <p> element if description is null', ()=>{});
    });
});