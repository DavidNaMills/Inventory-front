import React from 'react';
import '../../testHelpers/context';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import * as device from 'react-device-detect';

import StaffTypeRow from '../../../Components/TableDisplay/Row/StaffTypeRow';
import Title from '../../../Components/Title/Title';

const baseProps = {
    config: {main : ['name', 'code', 'qtyInStock']},
    data: {
        name: 'Blue dogs',
        location: 'Dundee',
        qtyInStock: '12345678',
        code: '187wertt56',
        url: 'test.jpg'
    }
}


describe('<StaffTypeRow', ()=>{
    it('matches snapshot', ()=>{
        const comp = renderer.create(<StaffTypeRow {...baseProps} />)
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('exists', ()=>{
        const wrapper = shallow(<StaffTypeRow {...baseProps}/>);
        expect(wrapper.exists).toBeTruthy();
    });


    describe('isMobileOnly === false tests', ()=>{
        let wrapper;
        const orig = device.isMobileOnly;

        beforeEach(()=>{
            device.isMobileOnly = false;
            wrapper = mount(<StaffTypeRow {...baseProps}/>);
        });

        afterAll(()=>{
            device.isMobile = orig;
        });

        it('renders 3 <div> elements with classNames: productTypeRow, productTypeRow__title, productTypeRow__cellCont', ()=>{
            const div = wrapper.find('div');

            expect(div.length).toBe(4);
            expect(div.at(0).props()).toHaveProperty('className', 'productTypeRow');
            expect(div.at(1).props()).toHaveProperty('className', 'productTypeRow__title');
            expect(div.at(3).props()).toHaveProperty('className', 'productTypeRow__cellCont');
        });
        
        it('renders a <Title/> component', ()=>{
            const ttl = wrapper.find(Title);
            expect(ttl.length).toBe(1);
            expect(ttl.props()).toHaveProperty('message', baseProps.data[baseProps.config.main[0]]);
            expect(ttl.props()).toHaveProperty('size', 'h3');
        });
        
        it('renders 2 <p> elements with text', ()=>{
            const p = wrapper.find('p');
            expect(p.length).toBe(2);
            expect(p.at(0).text()).toEqual('code:187wertt56');
            expect(p.at(1).text()).toEqual('qty available:12345678');
        });

        // FIXME: how to override || inject properties from a HOC
        describe.skip('isTablet && isPortait both equal true tests', ()=>{
            let orig2;
            
            beforeEach(()=>{ 
                orig2 = device.isTablet; 
            });
            afterEach(()=>{ 
                device.isTablet = orig2;
             });

            it('sets the 3rd <div> className to productTypeRow__cellContPortrait if isTablet && isPortait equal true', ()=>{
                device.isTablet = true;
                
                const tW = mount(<StaffTypeRow {...baseProps} isPortrait={true}/>);
                const div = tW.find('div');
                expect(div.length).toBe(4);
                expect(div.at(3).props()).toHaveProperty('className', 'productTypeRow__cellContPortrait');
            });
            
            it('does not change the 3rd <div> classname if isTablet is true but in landscape. classname: productTypeRow__cellCont', ()=>{
                device.isTablet = true;
                const tW = mount(<StaffTypeRow {...baseProps} isPortrait={false}/>);
                const div = tW.find('div');
                expect(div.length).toBe(4);
                expect(div.at(3).props()).toHaveProperty('className', 'productTypeRow__cellCont');
            });
            
            it('does not change the 3rd <div> classname if isTablet is false but in portrait. classname: productTypeRow__cellCont', ()=>{
                device.isTablet = false;
                const tW = mount(<StaffTypeRow {...baseProps} isPortrait={true}/>);
                const div = tW.find('div');
                expect(div.length).toBe(4);
                expect(div.at(3).props()).toHaveProperty('className', 'productTypeRow__cellCont');
            });
        });
    });

    describe('isMobileOnly === true tests', ()=>{
        let wrapper;
        const orig = device.isMobileOnly;

        beforeEach(()=>{
            device.isMobileOnly = true;
            wrapper = mount(<StaffTypeRow {...baseProps} showInfo={false}/>);
        });

        afterAll(()=>{
            device.isMobile = orig;
        });

        it('only renders 4 <div> elements with classnames: productTypeRow, productTypeRow__title. 1 div part of <Title/>', ()=>{
            const div = wrapper.find('div');
            expect(div.length).toBe(3);
            expect(div.at(0).props()).toHaveProperty('className', 'productTypeRow');
            expect(div.at(1).props()).toHaveProperty('className', 'productTypeRow__title');
        });
        
        it('renders a <Title/> component', ()=>{
            const ttl = wrapper.find(Title);
            expect(ttl.length).toBe(1);
            expect(ttl.props()).toHaveProperty('message', baseProps.data[baseProps.config.main[0]]);
            expect(ttl.props()).toHaveProperty('size', 'h3');
        });

        it('does not render any <p> elements or information', ()=>{
            expect(wrapper.find('.productTypeRow__cellContPortrait').length).toBe(0);
            expect(wrapper.find('.productTypeRow__cellCont').length).toBe(0);
            expect(wrapper.find('p').length).toBe(0);
        });
    });
});