import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import '../testHelpers/context';
import './containerHelper';

import Form from '../../Components/Form/Form';
import TableDisplay from '../../Components/TableDisplay/TableDisplay';
import Popup from '../../Components/PopupComponents/Popup';
import Title from '../../Components/Title/Title';
import ProductManagementContainer from '../../Containers/ProductManagementContainer/ProductManagementContainer';

jest.mock('../../hooks/useDispatchHook/useDispatchHook');
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';

const mockCreateMessageDispatch = jest.fn();

describe('<ProductManagementContainer/> test suite', ()=>{
    let wrapper;

    beforeEach(() => {
        useDispatchHook.mockImplementation(() => ({
            userLogoutDispatch: mockCreateMessageDispatch
        }));
        wrapper = shallow(<ProductManagementContainer/>);
    });

    it('matches snapshot', ()=>{
        const comp = renderer.create(<ProductManagementContainer />);
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
        expect(title.props()).toHaveProperty('message', 'Product Management');
        expect(title.props()).toHaveProperty('center', true);
    });
    
    it('renders a <Form/> component', ()=>{
        const form = wrapper.find(Form);
        expect(form.length).toBe(1);
        expect(form.props()).toHaveProperty('formName', 'products');
    });
    
    it('renders a <TableDisplay/> component', ()=>{
        const td = wrapper.find(TableDisplay);
        expect(td.length).toBe(1);
        expect(td.props()).toHaveProperty('formName', 'products');
        expect(td.props()).toHaveProperty('isSelected', null);

    });
    
    it('renders a <Popup/> component', ()=>{
        expect(wrapper.find(Popup).length).toBe(1);
    });
});