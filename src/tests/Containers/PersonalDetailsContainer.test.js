import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import '../testHelpers/context';
import './containerHelper';

import PersonalDetailsContainer from '../../Containers/PersonalDetailsContainer/PersonalDetailsContainer';
import Form from '../../Components/Form/Form';
import Title from '../../Components/Title/Title';
import Button from '../../Components/Button/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

jest.mock('../../hooks/useDispatchHook/useDispatchHook');
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';

const mockCreateMessageDispatch = jest.fn();


describe('<PersonalDetailsContainer/> test suite', ()=>{
    let wrapper;

    beforeEach(() => {
        useDispatchHook.mockImplementation(() => ({
            userLogoutDispatch: mockCreateMessageDispatch
        }));
        wrapper = shallow(<PersonalDetailsContainer/>);
    });

    it('matches snapshot', ()=>{
        const comp = renderer.create(<PersonalDetailsContainer/>);
        const app = comp.toJSON();
        expect(app.exists).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('renders a <Title/> component', ()=>{
        const title = wrapper.find(Title);
        expect(title.length).toBe(1);
        expect(title.props()).toHaveProperty('size', 'h1');
        expect(title.props()).toHaveProperty('message', 'Personal');
        expect(title.props()).toHaveProperty('center', true);
    });
    
    it('renders a <Form/> component', ()=>{
        const form = wrapper.find(Form);
        expect(form.length).toBe(1);
        expect(form.props()).toHaveProperty('formName', 'personal');
        expect(form.props()).toHaveProperty('updating', 'details');
    });
    
    it('renders a <Button/> component', ()=>{
        const btn = wrapper.find(Button);
        expect(btn.length).toBe(1);
        expect(btn.props()).toHaveProperty('label', 'Logout');
        expect(btn.props()).toHaveProperty('type', 'information');
        expect(btn.props()).toHaveProperty('full', false);
        expect(btn.props()).toHaveProperty('Icon', ExitToAppIcon);
    });
});