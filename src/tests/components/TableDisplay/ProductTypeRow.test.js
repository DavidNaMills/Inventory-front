import React from 'react';
import '../../testHelpers/context';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import * as device from 'react-device-detect';

import ProductTypeRow from '../../../Components/TableDisplay/Row/ProductTypeRow/ProductTypeRow';
import Title from '../../../Components/Title/Title';

const baseProps = {
    config: {main : ['name', 'location', 'qty']},
    data: {
        name: 'Blue dogs',
        location: 'Dundee',
        qty: '12345678',
        price: '187.56',
        code: 'abc123',
        url: 'test.jpg'
    }
}

describe('<ProductTypeRow/> test suite', ()=>{
    it('matches snapshot', ()=>{
        const comp = renderer.create(<ProductTypeRow {...baseProps}/>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        const wrapper = shallow(<ProductTypeRow {...baseProps} />);
        expect(wrapper.exists).toBeTruthy();
    });

    describe('isMobileOnly === false tests', ()=>{
        const orig = device.isMobileOnly;
        let wrapper;

        beforeEach(()=>{
            device.isMobileOnly = false;
            wrapper = mount(<ProductTypeRow {...baseProps}/>);
        });

        afterAll(()=>{
            device.isMobileOnly = orig;
        });
        
        it('renders 3 <div>s with classNames: "productTypeRow", "productTypeRow__title", "productTypeRow__cellCont"', ()=>{
            const tempW = shallow(<ProductTypeRow {...baseProps}/>);
            const div = tempW.find('div');
            expect(div.length).toBe(3);
            expect(div.at(0).props()).toHaveProperty('className', 'productTypeRow');
            expect(div.at(1).props()).toHaveProperty('className', 'productTypeRow__title');
            expect(div.at(2).props()).toHaveProperty('className', 'productTypeRow__cellCont');
        });
        
        it('renders a <Title/> component', ()=>{
            const t = wrapper.find(Title);
            expect(t.length).toBe(1);
            expect(t.props()).toHaveProperty('message', baseProps.data[baseProps.config.main[0]]);
            expect(t.props()).toHaveProperty('size', 'h4');
        });
        
        it('renders a <p> element with text', ()=>{
            expect(wrapper.find('p').length).toBe(1);
            expect(wrapper.find('p').text()).toEqual('location:Dundee');
        });
    });

    describe('isMobileOnly === true tests', ()=>{
        const orig = device.isMobileOnly;
        let wrapper;

        beforeEach(()=>{
            device.isMobileOnly = true;
            wrapper = mount(<ProductTypeRow {...baseProps}/>);
        });

        afterAll(()=>{
            device.isMobileOnly = orig;
        });

        it('only renders 2 <div> elements with classNames: productTypeRow and productTypeRow__title', ()=>{
            const tW = shallow(<ProductTypeRow {...baseProps}/>);
            const div = tW.find('div');
            expect(div.length).toBe(2);
            expect(div.at(0).props()).toHaveProperty('className', 'productTypeRow');
            expect(div.at(1).props()).toHaveProperty('className', 'productTypeRow__title');
        });
        
        it('renders a <Title/> component', ()=>{
            expect(wrapper.find(Title).length).toBe(1);
        });

        it('no <p> elements are rendered', ()=>{
            expect(wrapper.find('p').length).toBe(0);
        });
    });
});