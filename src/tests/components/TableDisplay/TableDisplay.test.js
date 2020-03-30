import React from 'react';
import '../../testHelpers/context';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import {TableDisplay} from '../../../Components/TableDisplay/TableDisplay';
import Button from '../../../Components/Button/Button';
import StaffTypeRow from '../../../Components/TableDisplay/Row/StaffTypeRow';
import ProductTypeRow from '../../../Components/TableDisplay/Row/ProductTypeRow/ProductTypeRow';
import ProductRow from '../../../Components/TableDisplay/Row/ProductRow/ProductRow';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CreateIcon from '@material-ui/icons/Create';

const baseProps = {
    config: { main: ['name', 'code', 'qtyInStock'] },
    list: [
        {
            name: 'Blue dogs',
            location: 'Dundee',
            qtyInStock: '12345678',
            code: '187wertt56',
            url: 'test.jpg'
        }
    ]
}


describe('<TableDisplay /> component test suite', () => {
    it('matches snapshot', () => {
        const comp = renderer.create(<TableDisplay {...baseProps} formName='staff'/>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('exists', () => { 
        const wrapper = mount(<TableDisplay {...baseProps} formName='staff'/>);
        expect(wrapper.exists).toBeTruthy();
    });

    describe('Row component renders', () => {
        [
            { type: 'StaffTypeRow', form: 'staff', a: 0, b: 0, c: 1 },
            { type: 'ProductTypeRow', form: 'productTypes', a: 1, b: 0, c: 0 },
            { type: 'ProductTypeRow', form: 'locationTypes', a: 1, b: 0, c: 0 },
            { type: 'ProductRow', form: 'products', a: 0, b: 1, c: 0 },

            { type: 'StaffTypeRow', form: 'staff', a: 0, b: 0, c: 1 },
            { type: 'StaffTypeRow', form: 'staff', a: 0, b: 0, c: 1 },
        ]. forEach(x=>{

            it(`renders a <${x.type}/> component if formName = "${x.form}"`, () => { 
                const wrapper = mount(<TableDisplay {...baseProps} formName={x.form}/>);
                expect(wrapper.find(ProductTypeRow).length).toBe(x.a);
                expect(wrapper.find(ProductRow).length).toBe(x.b);
                expect(wrapper.find(StaffTypeRow).length).toBe(x.c);
                
                expect(wrapper.find(x.type).props()).toHaveProperty('config', baseProps.config);
                expect(wrapper.find(x.type).props()).toHaveProperty('data', baseProps.list[0]);
            });

        });
        
        it('renders a <p> element with text "ERROR"', () => { 
            const wrapper = mount(<TableDisplay {...baseProps} formName='invalid'/>);
            expect(wrapper.find('p').length).toBe(1);
            expect(wrapper.find('p').text()).toEqual('ERROR');

            expect(wrapper.find(StaffTypeRow).length).toBe(0);
            expect(wrapper.find(ProductTypeRow).length).toBe(0);
            expect(wrapper.find(ProductRow).length).toBe(0);
        });
    });

    describe('Styles and options', () => {
        it('renders 2 <div> elements with classNames: tableDisplay and tableDisplay__optionsStyle ', () => { 
            const wrapper = mount(<TableDisplay {...baseProps} formName='staff'/>);
            const div = wrapper.find('div');
            expect(div.length).toBe(7);
            expect(div.at(1).props()).toHaveProperty('className', 'tableDisplay tableDisplay__odd');
            expect(div.at(6).props()).toHaveProperty('className', 'tableDisplay__optionsStyle');
        });
        
        it('renders a Button if update is not null and there are at least 1 row', () => { 
            const t = jest.fn();
            const wrapper = mount(<TableDisplay {...baseProps} formName='staff' update={t} />);
            const btn = wrapper.find(Button);
            expect(btn.length).toBe(1);
            expect(btn.props()).toHaveProperty('noStyle', true);
            expect(btn.props()).toHaveProperty('Icon', CreateIcon);
        });
        
        it('does not render a Button if update is not null but there are 0 rows', () => { 
            const t = jest.fn();
            const wrapper = mount(<TableDisplay {...baseProps} list={[]} formName='staff' update={t} />);
            const btn = wrapper.find(Button);
            expect(btn.length).toBe(0);
        });

        it('renders a Button if remove is not null and there are at least 1 row', () => { 
            const t = jest.fn();
            const wrapper = mount(<TableDisplay {...baseProps} formName='staff' remove={t} />);
            const btn = wrapper.find(Button);
            expect(btn.length).toBe(1);
            expect(btn.props()).toHaveProperty('type', 'danger');
            expect(btn.props()).toHaveProperty('label', 'remove');
        });
        
        it('does not render a Button if remove is not null but there are 0 rows', () => { 
            const t = jest.fn();
            const wrapper = mount(<TableDisplay {...baseProps} list={[]} formName='staff' remove={t} />);
            const btn = wrapper.find(Button);
            expect(btn.length).toBe(0);
        });


        it('renders a Button if viewMore is not null and there are at least 1 row', () => {
            const t = jest.fn();
            const wrapper = mount(<TableDisplay {...baseProps} formName='staff' viewMore={t} />);
            const btn = wrapper.find(Button);
            expect(btn.length).toBe(1);
            expect(btn.props()).toHaveProperty('type', 'base');
            expect(btn.props()).toHaveProperty('noStyle', true);
            expect(btn.props()).toHaveProperty('Icon', MoreHorizIcon);
         });
        
        it('does not render a Button if viewMore is not null but there are 0 rows', () => {
            const t = jest.fn();
            const wrapper = mount(<TableDisplay {...baseProps} formName='staff' list={[]} viewMore={t} />);
            const btn = wrapper.find(Button);
            expect(btn.length).toBe(0);
         });
    });
});