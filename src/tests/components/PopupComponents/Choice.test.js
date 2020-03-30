import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Choice from '../../../Components/PopupComponents/Choice';

const mockProps = {
    message: 'are you sure?',
    onAccept: jest.fn(),
    onCancel: jest.fn(),
}

afterEach(()=>{
    jest.clearAllMocks();
})

describe('<Choice/> popup component test suite', ()=>{
    const wrapper = shallow(<Choice {...mockProps} />);

    it('matches snapshot', ()=>{
        const comp = renderer.create(<Choice {...mockProps} />);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('renders a <div>, a <p> with the message, and 2 <button> elements', ()=>{
        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.find('p').length).toBe(1);
        expect(wrapper.find('p').text()).toEqual(mockProps.message);
    });
    
    it('fires the onAccept method when clicked', ()=>{
        wrapper.find('button').at(0).simulate('click');
        expect(mockProps.onAccept).toHaveBeenCalledTimes(1);
    });
    
    it('fires the onCancel method when clicked', ()=>{
        wrapper.find('button').at(1).simulate('click');
        expect(mockProps.onCancel).toHaveBeenCalledTimes(1);

    });
});