import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Inform from '../../../Components/PopupComponents/Inform';

const mockStyle = {
    height: '100%',
    backgroundColor: 'rgb(237, 237, 237)',
    width: '300px',
    padding: '50px'
}

const mockProps = {
    message: 'hello world',
    onClose: jest.fn()
};

afterEach(()=>{
    jest.clearAllMocks();
})

describe('<Inform/> popup component test suite', ()=>{
    const wrapper = shallow(<Inform {...mockProps}/>);

    it('matches snapshot', ()=>{
        const comp = renderer.create(<Inform {...mockProps}/>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('renders a <div> with inline styles === mockStyle', ()=>{
        const div = wrapper.find('div');
        expect(div.length).toBe(1);
        expect(div.props().style).toEqual(mockStyle);
    });
    
    it('renders a <p> element containing the message', ()=>{
        const p = wrapper.find('p');
        expect(p.length).toBe(1);
        expect(p.text()).toEqual(mockProps.message);
    });
    
    it('renders a <button/> element and reacts to it being clicked', ()=>{
        const btn = wrapper.find('button');
        expect(btn.length).toBe(1);
        expect(btn.text()).toEqual('Close');
        btn.simulate('click');
        expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });
});