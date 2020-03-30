import React from 'react';
import '../../Containers/containerHelper';
import '../../testHelpers/context';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ProductPopup from '../../../Components/PopupComponents/ProductPopup';
import * as device from 'react-device-detect';
import Title from '../../../Components/Title/Title';
import ImageDisplay from '../../../Components/ImageDisplay/ImageDisplay';
import Button from '../../../Components/Button/Button';

const mockClose = jest.fn();
const item = {
    _id: 'dsa',
    name: 'cups',
    url: 'super url',
    code: '456dsa',
    type: 'def',
    description: 'fdsa',
    qtyInStock: '789',
    sellPrice: '45',
    test1: 'hello',
    test2: 'goodbye'
}
const fields = ['qtyInStock', 'sellPrice'];

describe('<ProductPopup/> component test suite', () => {
    describe('default settings tests', () => {
        let wrapper;
        let div;

        beforeEach(()=>{
            wrapper = shallow(<ProductPopup item={item} onClose={mockClose} fields={fields}/>);
            div = wrapper.find('div');
        })

        it('matches snapshot', () => { 
            const comp = renderer.create(<ProductPopup item={item} onClose={mockClose} fields={fields}/>);
            const app = comp.toJSON();
            expect(app).toMatchSnapshot();
        });
        
        it('exists', () => { 
            expect(wrapper.exists).toBeTruthy();
        });

        it('renders a container <div> with classname "popup"', () => { 
            expect(div.length).toBe(9)
            expect(div.at(0).props()).toHaveProperty('className', 'popup');
        });
        
        it('renders a <span> with classname "popup__mediumSpacing" and <Title/> component', () => { 
            expect(div.at(1).props()).toHaveProperty('className', 'popup__mediumSpacing');
            const ttl = div.at(1).find(Title);
            expect(ttl.length).toBe(1);
            expect(ttl.props()).toHaveProperty('message', item.name);
            expect(ttl.props()).toHaveProperty('size', 'h2');
            expect(ttl.props()).toHaveProperty('center', true);
        });
        
        it('renders a <span> with classname "popup__mediumSpacing" and <ImageDisplay/> component. URL is present', () => { 
            expect(div.at(2).props()).toHaveProperty('className', 'popup__mediumSpacing');
            const img = div.at(2).find(ImageDisplay);
            expect(img.length).toBe(1);
            expect(img.props()).toHaveProperty('url', `/productImages/${item.url}`)
            expect(img.props()).toHaveProperty('size', 'desktop');
            expect(img.props()).toHaveProperty('blur', true);
        });
        
        [
            {
                msg: 'renders a container <div> with classname "popup__smallSpacing" with a <label> and <p> displaying type',
                divPos: 3,
                divCls: 'popup__smallSpacing',
                lblProp:{
                    name:'fontWeight', 
                    value:'bold',
                    txt: 'Type:'
                },
                pProp: 'yellow cups'
            },
            {
                msg: 'renders a container <div> with classname "popup__smallSpacing" with a <label> and <p> displaying code',
                divPos: 4,
                divCls: 'popup__smallSpacing',
                lblProp:{
                    name:'fontWeight', 
                    value:'bold',
                    txt: 'Code:'
                },
                pProp: item.code
            },
            {
                msg: 'renders a container <div> with classname "popup__smallSpacing" with a <label> and <p> if description is present',
                divPos: 5,
                divCls: 'popup__smallSpacing',
                lblProp:{
                    name:'fontWeight', 
                    value:'bold',
                    txt: 'Description:'
                },
                pProp: item.description
            },
            {
                msg: `renders a <div> with classname "popup__smallSpacing" and <label> and <p> for item ${fields[0]} in the fields array`,
                divPos: 6,
                divCls: 'popup__smallSpacing',
                lblProp:{
                    name:'fontWeight', 
                    value:'bold',
                    txt: 'qtyInStock:'
                },
                pProp: item.qtyInStock
            },
            {
                msg: `renders a <div> with classname "popup__smallSpacing" and <label> and <p> for item ${fields[1]} in the fields array`,
                divPos: 7,
                divCls: 'popup__smallSpacing',
                lblProp:{
                    name:'fontWeight', 
                    value:'bold',
                    txt: 'sellPrice:'
                },
                pProp: item.sellPrice
            },
        ].forEach(x=>{
            it(x.msg, () => { 
                    expect(div.at(x.divPos).props()).toHaveProperty('className', x.divCls);
                    const lbl = div.at(x.divPos).find('label');
                    const p = div.at(x.divPos).find('p');
                
                    expect(lbl.length).toBe(1);
                    expect(lbl.props().style).toHaveProperty(x.lblProp.name, x.lblProp.value);
                    expect(lbl.text()).toEqual(x.lblProp.txt);
                    expect(p.length).toBe(1);
                    expect(p.text()).toEqual(x.pProp);
                });
            })

        it('renders a container <div> with classname "popup__smallSpacing" and a <Button/> component', () => { 
            expect(div.at(8).props()).toHaveProperty('className', 'popup__smallSpacing');
            const btn = div.at(8).find(Button);
            expect(btn.length).toBe(1);
            expect(btn.props()).toHaveProperty('onClick', mockClose)
            expect(btn.props()).toHaveProperty('label', 'Close');
            expect(btn.props()).toHaveProperty('full', true);
        });
    });

    describe('with isMobile === true and alternative option tests', () => {
        it('renders the <ImageDisplay/> component with a null URL and size is "medium" if isMobileOnly is true', () => { 
            const orig = device.isMobileOnly;
            device.isMobileOnly = true;
            const tempItem = {
                ...item,
                url: null
            }

            const wrapper = shallow(<ProductPopup item={tempItem} onClose={mockClose} fields={fields}/>);
            const img = wrapper.find(ImageDisplay);
            expect(img.length).toBe(1);
            expect(img.props()).toHaveProperty('url', null);
            expect(img.props()).toHaveProperty('size', 'medium');

            device.isMobileOnly = orig;
        });

        it('doesnt render description if description is not present in the item object', ()=>{
            const tempItem = {
                _id: 'dsa',
                name: 'cups',
                url: 'super url',
                code: '456dsa',
                type: 'def',
                qtyInStock: '789',
                sellPrice: '45'
            };
            const wrapper = shallow(<ProductPopup item={tempItem} onClose={mockClose} fields={fields}/>);
            expect(wrapper.find('div').length).toBe(8);
            expect(wrapper.find('div').at(5).find('p').text()).toEqual(item.qtyInStock);
        });
    });
});