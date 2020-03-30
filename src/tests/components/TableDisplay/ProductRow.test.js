import React from 'react';
import '../../testHelpers/context';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import * as device from 'react-device-detect';

import ProductRow from '../../../Components/TableDisplay/Row/ProductRow/ProductRow';
import ImageDisplay from '../../../Components/ImageDisplay/ImageDisplay';
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

describe('<ProductRow/> test suite', ()=>{
    it('matches snapshot', ()=>{
        const comp = renderer.create(<ProductRow {...baseProps}/>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        const wrapper = shallow(<ProductRow {...baseProps} />);
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('renders a container <div> with className: "productRow"', ()=>{
        const wrapper = shallow(<ProductRow {...baseProps} />);
        const div = wrapper.find('div');
        expect(div.length).toBe(3);
        expect(div.at(0).props()).toHaveProperty('className', 'productRow');
    });
    
    describe('default props values', ()=>{
        const wrapper = mount(<ProductRow {...baseProps} />);

        it('renders an inner <div> with className: "productRow__infoCont"', ()=>{
            expect(wrapper.find('div').at(1).props()).toHaveProperty('className', 'productRow__infoCont');
        });
        
        it('renders an <ImageDisplay/> <Title/> components', ()=>{
            expect(wrapper.find(ImageDisplay).length).toBe(1);
            expect(wrapper.find(ImageDisplay).props()).toHaveProperty('url', '/productImages/test.jpg');
            expect(wrapper.find(ImageDisplay).props()).toHaveProperty('alt', `${baseProps.data.name}-${baseProps.data.code}`);
            expect(wrapper.find(ImageDisplay).props()).toHaveProperty('size', 'medium');
            
            expect(wrapper.find(Title).length).toBe(1);
            expect(wrapper.find(Title).props()).toHaveProperty('message', baseProps.data.name);
            expect(wrapper.find(Title).props()).toHaveProperty('size', 'h4');
        });
        
        it('renders a third <div> with className: "productRow__cellCont"', ()=>{
            expect(wrapper.find('div').at(3).props()).toHaveProperty('className', 'productRow__cellCont');
        });
        
        it('renders 2 <p> elements with data', ()=>{
            const p = wrapper.find('p');
            expect(p.length).toBe(2);
            expect(p.at(0).text()).toEqual(`${baseProps.config.main[1]}:${baseProps.data[baseProps.config.main[1]]}`);
            expect(p.at(1).text()).toEqual(`${baseProps.config.main[2]}:${baseProps.data[baseProps.config.main[2]]}`);
        });
    });

    describe('Optional props tests', ()=>{
        it('does not render an <ImageDisplay/> component', ()=>{
            const tW = shallow(<ProductRow {...baseProps} withImage={false} />);
            expect(tW.find(ImageDisplay).length).toBe(0);
        });
        
        it('does not render a <Title/> component if withTitle is false', ()=>{
            const tW = shallow(<ProductRow {...baseProps} withTitle={false} />);
            expect(tW.find(Title).length).toBe(0);
        });
        
        it('only renders 2 <div> elements with classNames: "productRow" and "productRow__infoCont" when withInfo is false', ()=>{
            const tW = shallow(<ProductRow {...baseProps} withInfo={false} />);
            const p = tW.find('div');
            expect(p.length).toBe(2);
            expect(p.at(0).props()).toHaveProperty('className', 'productRow');
            expect(p.at(1).props()).toHaveProperty('className', 'productRow__infoCont');
        });
    });


});