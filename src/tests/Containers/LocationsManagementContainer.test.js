import React from 'react';
import '../testHelpers/context';
import './containerHelper';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import LocationManagementContainer from '../../Containers/LocationsManagementContainer/LocationsManagementContainer';
import Form from '../../Components/Form/Form';
import TableDisplay from '../../Components/TableDisplay/TableDisplay';
import Popup from '../../Components/PopupComponents/Popup';
import Title from '../../Components/Title/Title';




describe('<LocationManagementContainer/> test suite', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<LocationManagementContainer />);
    })

    it('matches snapshot', ()=>{
        const comp = renderer.create(<LocationManagementContainer />);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('renders a <Title/> component', ()=>{
        const title = wrapper.find(Title);
        expect(title.length).toBe(1);
        expect(title.props()).toHaveProperty('size', 'h1');
        expect(title.props()).toHaveProperty('message', 'Locations Management');
        expect(title.props()).toHaveProperty('center', true);
    });
    
    it('renders a <Form/> component', ()=>{
        const form = wrapper.find(Form);
        expect(form.length).toBe(1);
        expect(form.props()).toHaveProperty('formName', 'locationTypes');
    });
    
    it('renders a <TableDisplay/> component', ()=>{
        const td = wrapper.find(TableDisplay);
        expect(td.length).toBe(1);
        expect(td.props()).toHaveProperty('formName', 'locationTypes');
        expect(td.props()).toHaveProperty('isSelected', null);

    });
    
    it('renders a <Popup/> component', ()=>{
        expect(wrapper.find(Popup).length).toBe(1);
    });
});