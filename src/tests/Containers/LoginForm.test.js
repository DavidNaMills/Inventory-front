import React from 'react';
import '../testHelpers/context';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import LoginForm from '../../Containers/LoginForm/LoginForm';
import Title from '../../Components/Title/Title';
import Form from '../../Components/Form/Form';

jest.mock('../../hooks/useDispatchHook/useDispatchHook');
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';

const mockUserLoginDispatch = jest.fn();
const mockInitTypesDispatch = jest.fn();

describe('<LoginForm/> test suite', () => {
    beforeEach(()=>{
        useDispatchHook.mockImplementation(()=>({
            userLoginDispatch: mockUserLoginDispatch,
            initTypesDispatch: mockInitTypesDispatch
        }));
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });

    it('matches snapshot', () => { 
        const comp = renderer.create(<LoginForm />);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', () => { 
        const wrapper = mount(<LoginForm />);
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('renders a <Title/> components', () => { 
        const wrapper = shallow(<LoginForm />);
        const title = wrapper.find(Title);

        expect(title.length).toBe(1);
        expect(title.props()).toHaveProperty('size', 'h1');
        expect(title.props()).toHaveProperty('message', 'login');
    });
    
    it('renders a <Form/> components', () => { 
        const wrapper = mount(<LoginForm />);
        const tForm = wrapper.find(Form);

        expect(tForm.length).toBe(1);
        expect(tForm.props()).toHaveProperty('title', 'Login');
        expect(tForm.props()).toHaveProperty('formName', 'login');
    });
});