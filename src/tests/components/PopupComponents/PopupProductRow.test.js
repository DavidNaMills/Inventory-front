import React from 'react';
import '../../testHelpers/context';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import * as device from 'react-device-detect';

import PopupProductRow from '../../../Components/PopupComponents/Rows/PopupProductRow';
import Title from '../../../Components/Title/Title';
import ProductRow from '../../../Components/TableDisplay/Row/ProductRow/ProductRow';

const prods = [
    {name: 'cups', qtyInStock: 123},
    {name: 'bowls', qtyInStock: 12223},
];

describe('<PopupProductRow/> component test suite', ()=>{
    let wrapper;
    let orig;

    beforeEach(()=>{
        wrapper = shallow(<PopupProductRow prods={prods} isPortrait={true}/>);
        orig = device.isMobileOnly;
        device.isMobileOnly = false;
    });
    
    afterEach(()=>{
        device.isMobileOnly = orig;
    })

    it('matches snapshot', ()=>{
        const comp = renderer.create(<PopupProductRow prods={prods} isPortrait={false} />);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('renders a <p> element if prods array is empty', ()=>{
        const tW = shallow(<PopupProductRow prods={[]} isPortrait={true}/>);
        const p = tW.find('p');
        expect(p.length).toBe(1);
        expect(p.props()).toHaveProperty('className', 'popup__mediumSpacing');
        expect(p.text()).toEqual('No products at this location');
    });
    
    it('renders a container <div> with classname "popup__color2"', ()=>{
        const div = wrapper.find('div');
        expect(div.length).toBe(5);
        expect(div.at(0).props()).toHaveProperty('className', 'popup__color2');
    });
    
    it('renders a <div> with classname "popup__mediumSpacing" and <Title/> component', ()=>{
        const div = wrapper.find('div');
        const ttl = div.at(1).find(Title);
        expect(div.at(1).props()).toHaveProperty('className', 'popup__mediumSpacing');
        expect(ttl.length).toBe(1);
        expect(ttl.props()).toHaveProperty('message', `Products: ${prods.length} in total`);
        expect(ttl.props()).toHaveProperty('size', `h4`);
    });
    
    it('renders a <div> with scrollable styling with styling for portrait as default', ()=>{
        const div = wrapper.find('div').at(2);
        expect(div.props().style).toHaveProperty('overflowY', 'auto');
        expect(div.props().style).toHaveProperty('maxHeight', '30vh');
    });
    
    it('renders a <div> with scrollable styling with styling for landscape', ()=>{
        const tW = shallow(<PopupProductRow prods={prods} isPortrait={false}/>);
        const div = tW.find('div').at(2);
        expect(div.props().style).toHaveProperty('overflowY', 'auto');
        expect(div.props().style).toHaveProperty('maxHeight', '25vw');
    });
    
    it('renders a <div> with odd and even classnames with a <ProductRow/> component as child', ()=>{
        const div = wrapper.find('div');
        expect(div.at(3).props()).toHaveProperty('className', 'popup__row_even');
        expect(div.at(3).find(ProductRow).length).toBe(1);
        expect(div.at(3).find(ProductRow).props()).toHaveProperty('withImage', true);
        expect(div.at(3).find(ProductRow).props()).toHaveProperty('stack', false);
        
        expect(div.at(4).props()).toHaveProperty('className', 'popup__row_odd');
        expect(div.at(4).find(ProductRow).length).toBe(1);
        expect(div.at(4).find(ProductRow).props()).toHaveProperty('withImage', true);
        expect(div.at(4).find(ProductRow).props()).toHaveProperty('stack', false);
    });
    
    it('renders a <div> with odd and even classnames with a <ProductRow/> component as child with settings for mobiles', ()=>{
        const tOrig = device.isMobileOnly;
        device.isMobileOnly = true;
        const tW = shallow(<PopupProductRow prods={prods} isPortrait={true}/>);
        const div = tW.find('div');
        expect(div.at(3).props()).toHaveProperty('className', 'popup__row_even');
        expect(div.at(3).find(ProductRow).length).toBe(1);
        expect(div.at(3).find(ProductRow).props()).toHaveProperty('withImage', false);
        expect(div.at(3).find(ProductRow).props()).toHaveProperty('stack', true);
        
        expect(div.at(4).props()).toHaveProperty('className', 'popup__row_odd');
        expect(div.at(4).find(ProductRow).length).toBe(1);
        expect(div.at(4).find(ProductRow).props()).toHaveProperty('withImage', false);
        expect(div.at(4).find(ProductRow).props()).toHaveProperty('stack', true);
        
        device.isMobileOnly = tOrig;
    });
});