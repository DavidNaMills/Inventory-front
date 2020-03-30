import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import * as device from 'react-device-detect';

import '../../testHelpers/context';

jest.mock('../../../hooks/useAxios/useAxios')
import useAxios from '../../../hooks/useAxios/useAxios';

import ProductTypePopup from '../../../Components/PopupComponents/ProductTypePopup';
import ProductRow from '../../../Components/TableDisplay/Row/ProductRow/ProductRow';
import Button from '../../../Components/Button/Button';
import Title from '../../../Components/Title/Title';
import Spinner from '../../../Components/Spinner/Spinner';

const item = {
    _id: '123123123',
    displayValue: 'dsadsdas'
    // description: 'ddsdsdsdsdsds'
};

const mockClose = jest.fn();
const mockCall = jest.fn();

const mockFetchState = {
    isLoading: false,
    errors: null,
    data: {
        count: 2,
        products: [
            { _id: '2121', name: 'cups', qtyInstock: '123' },
            { _id: '7894512', name: 'plates', qtyInstock: '789' },
        ]
    },
    id: null
}


describe('<ProductTypePopup /> component test suite', () => {
    describe('happy route', () => {
        let wrapper;
        let orig;
        let div;

        beforeEach(() => {

            useAxios.mockImplementation(() => ({
                fetchState: mockFetchState,
                makeCall: mockCall
            }));

            orig = device.isMobileOnly;
            wrapper = shallow(<ProductTypePopup item={item} onClose={mockClose} />);
            div = wrapper.find('div');
        });

        afterEach(() => {
            device.isMobileOnly = orig;
            jest.clearAllMocks();
        })


        it('matches snapshot', () => {
            const comp = renderer.create(<ProductTypePopup item={item} onClose={mockClose} />);
            const app = comp.toJSON();
            expect(app).toMatchSnapshot();
        });

        it('exists', () => {
            expect(wrapper.exists).toBeTruthy();
        });

        it.skip('invokes makeCall() in useAxios hook ', ()=>{
            // expect(mockCall).toHaveBeenCalledTimes(1);
            // expect(mockCall).toHaveBeenCalledTimes(1);
        });

        it('renders a <div> with classname "popup"', () => {
            expect(div.length).toBe(6);
            expect(div.at(0).props()).toHaveProperty('className', 'popup');
        });

        it('renders a <Title/> component', () => { 
            const ttl = wrapper.find(Title);
            expect(ttl.length).toBe(2);
            expect(ttl.at(0).props()).toHaveProperty('message', item.displayValue);
            expect(ttl.at(0).props()).toHaveProperty('size', 'h2');
            expect(ttl.at(0).props()).toHaveProperty('center', true);
        });

        it('does not render the description IF description is null', () => { 
            expect(wrapper.find('p').length).toBe(0);
        });

        it('renders a <div> with className "popup__color1"', () => { 
            expect(div.at(1).props()).toHaveProperty('className', 'popup__color1');
        });

        it('renders a <div> with className "popup__mediumSpacing" and <Title/> component', () => { 
            const ttl = wrapper.find(Title);
            expect(div.at(2).props()).toHaveProperty('className', 'popup__mediumSpacing');
            expect(ttl.at(1).props()).toHaveProperty('message', 'Products: 2 in total');
            expect(ttl.at(1).props()).toHaveProperty('size', 'h4');
        });
        
        it('renders a <div> with className "popup__scrollable"', () => { 
            expect(div.at(3).props()).toHaveProperty('className', 'popup__scrollable');
            expect(div.at(3).props().style).toHaveProperty('maxHeight', '50vh');

        });
        
        it('renders 2 <div>s with classnames "popup__row_odd" and "popup__row_even" and 2 <ProductRow/> components', () => { 
            expect(div.at(4).props()).toHaveProperty('className', 'popup__row_even');
            expect(div.at(5).props()).toHaveProperty('className', 'popup__row_odd');
            
            expect(div.at(4).find(ProductRow).length).toBe(1);
            expect(div.at(4).find(ProductRow).props()).toHaveProperty('withTitle', false);
            expect(div.at(4).find(ProductRow).props()).toHaveProperty('withImage', true);
            expect(div.at(4).find(ProductRow).props()).toHaveProperty('stack', false);
            
            expect(div.at(5).find(ProductRow).length).toBe(1);
            expect(div.at(5).find(ProductRow).props()).toHaveProperty('withTitle', false);
            expect(div.at(5).find(ProductRow).props()).toHaveProperty('withImage', true);
            expect(div.at(5).find(ProductRow).props()).toHaveProperty('stack', false);
        });
        
        it('renders a <Button/> component', () => { 
            const btn = wrapper.find(Button);
            expect(btn.length).toBe(1);
            expect(btn.props()).toHaveProperty('onClick', mockClose);
            expect(btn.props()).toHaveProperty('label', 'Close');
            expect(btn.props()).toHaveProperty('full', true);
        });
    });
    
    
    
    describe('variations', ()=>{
        it('renders a <div> with className "popup__mediumSpacing" and <Title/> component with message indicating 0 products', () => { 
            useAxios.mockImplementation(() => ({
                fetchState: {
                    ...mockFetchState,
                    data: {
                        count: 0,
                        products: []
                    }
                },
                makeCall: mockCall
            }));
            const wrapper = shallow(<ProductTypePopup item={item} onClose={mockClose} />)
            const ttl = wrapper.find(Title);
            expect(wrapper.find('div').at(2).props()).toHaveProperty('className', 'popup__mediumSpacing');
            expect(ttl.at(1).props()).toHaveProperty('message', 'Products: 0 in total');
            expect(ttl.at(1).props()).toHaveProperty('size', 'h4');
        });
        

        it('renders a <p> element with the description IF description is not null', () => { 
            const itemDescription = {
                _id: '123123123',
                displayValue: 'dsadsdas',
                description: 'ddsdsdsdsdsds'
            };

            useAxios.mockImplementation(() => ({
                fetchState: {
                    ...mockFetchState,
                    data: {
                        count: 0,
                        products: []
                    }
                },
                makeCall: mockCall
            }));
            const wrapper = shallow(<ProductTypePopup item={itemDescription} onClose={mockClose} />)
            expect(wrapper.find('p').length).toBe(1);
        });
        
        it('renders a <p> and a message if data property returned is null ', () => { 
            useAxios.mockImplementation(() => ({
                fetchState: {
                    ...mockFetchState,
                    data: null
                },
                makeCall: mockCall
            }));
            const wrapper = shallow(<ProductTypePopup item={item} onClose={mockClose} />)
            const p = wrapper.find('p');
            expect(p.length).toBe(1);
            expect(p.text()).toEqual('No products of this type');
        });
        
        it('renders <ProductRow/> with changes to props if isMobileOnly is true', () => { 
            const orig = device.isMobileOnly;
            device.isMobileOnly = true;
            useAxios.mockImplementation(() => ({
                fetchState: mockFetchState,
                makeCall: mockCall
            }));
            const wrapper = shallow(<ProductTypePopup item={item} onClose={mockClose} />)

            const row = wrapper.find(ProductRow);
            expect(row.length).toBe(2);
            expect(row.at(0).props()).toHaveProperty('withTitle', false);
            expect(row.at(0).props()).toHaveProperty('withImage', false);
            expect(row.at(0).props()).toHaveProperty('stack', true);
            
            expect(row.at(1).props()).toHaveProperty('withTitle', false);
            expect(row.at(1).props()).toHaveProperty('withImage', false);
            expect(row.at(1).props()).toHaveProperty('stack', true);

            device.isMobileOnly = orig;
        });
        
        it('renders <Spinner/> component if loading', () => { 
            useAxios.mockImplementation(() => ({
                fetchState: {
                    ...mockFetchState,
                    isLoading: true
                },
                makeCall: mockCall
            }));
            const wrapper = shallow(<ProductTypePopup item={item} onClose={mockClose} />);
            expect(wrapper.find('div').length).toBe(1);
            expect(wrapper.find(Spinner).length).toBe(1);
        });
    });
});