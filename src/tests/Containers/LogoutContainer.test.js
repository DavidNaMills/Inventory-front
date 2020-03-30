import React from 'react';
import '../testHelpers/context';
import './containerHelper';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Logout from '../../Containers/LogoutContainer/LogoutContainer';
import { Redirect, BrowserRouter } from 'react-router-dom';

jest.mock('../../hooks/useDispatchHook/useDispatchHook');
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';

const mockLogoutDispatch = jest.fn();

describe('<LogoutContainer/> component test suite', () => {
    let wrapper;

    beforeEach(() => {
        useDispatchHook.mockImplementation(() => ({
            userLogoutDispatch: mockLogoutDispatch
        }));
        wrapper = mount(
            <BrowserRouter>
                <Logout />
            </BrowserRouter>
        );
    });

    it('matches snapshot', () => {
        const comp = renderer.create(
            <BrowserRouter>
                <Logout />
            </BrowserRouter>
        );
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('exists', () => {
        expect(wrapper.exists).toBeTruthy();
    });

    it('renders a <Redirect/> component', () => { 
        expect(wrapper.find(Redirect).length).toBeTruthy();
        expect(wrapper.find(Redirect).props()).toHaveProperty('to', '/');
    });

    it('invokes userLogoutDispatch() on render', () => { 
        expect(mockLogoutDispatch).toHaveBeenCalledTimes(1);
    });
});