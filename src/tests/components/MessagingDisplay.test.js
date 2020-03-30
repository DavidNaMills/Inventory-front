import React from 'react';
import '../testHelpers/context';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

jest.mock('react-redux');
import { useSelector } from 'react-redux';

import MessagingDisplay from '../../Components/MessagingDisplay/MessagingDisplay';

import ErrorIcon from '@material-ui/icons/Error';
import CheckIcon from '@material-ui/icons/Check';


describe('MessagingDisplay', ()=>{
    describe('basic creation tests', ()=>{
        beforeEach(()=>{
            useSelector.mockImplementation(()=>({
                display: {
                    messageType: 'errType',
                    message: 'hello world'
                }
            }));
        });

        it('matches snapshot', ()=>{
            const comp = renderer.create(<MessagingDisplay />)
            const app = comp.toJSON();
            expect(app).toMatchSnapshot();
        });
        
        it('exists', ()=>{
            const wrapper = shallow(<MessagingDisplay />);
            expect(wrapper.exists).toBeTruthy();
        });
    });
        
    describe('error type messages', ()=>{
        let wrapper;
        let mockMsg = 'horribly wrong';

        beforeEach(()=>{
            useSelector.mockImplementation(()=>({
                display: {
                    messageType: 'errType',
                    message: mockMsg 
                }
            }));
            wrapper = mount(<MessagingDisplay />);
        });

        it('renders a <div/> with className = "messagingDisplay__errStyle"', ()=>{
            const div = wrapper.find('div');
            expect(div.length).toBe(1);
            expect(div.props()).toHaveProperty('className', 'messagingDisplay__errStyle');
        });
        
        it('renders a <p> element with the message. element has className: "messagingDisplay_p" ', ()=>{
            const p = wrapper.find('p');
            expect(p.length).toBe(1);
            expect(p.props()).toHaveProperty('className', 'messagingDisplay_p');
            expect(p.text()).toEqual(mockMsg);
        });
        
        it('renders a <ErrorIcon/> icon component ', ()=>{
            expect(wrapper.find(ErrorIcon).length).toBe(1);
        });
    });
    
    describe('success type messages', ()=>{
        let wrapper;
        let mockMsg = 'looking good';

        beforeEach(()=>{
            useSelector.mockImplementation(()=>({
                display: {
                    messageType: 'succType',
                    message: mockMsg 
                }
            }));
            wrapper = mount(<MessagingDisplay />);
        });

        it('renders a <div/> with className = "messagingDisplay__succStyle"', ()=>{
            const div = wrapper.find('div');
            expect(div.length).toBe(1);
            expect(div.props()).toHaveProperty('className', 'messagingDisplay__succStyle');
        });
        
        it('renders a <p> element with the message. element has className: "messagingDisplay_p" ', ()=>{
            const p = wrapper.find('p');
            expect(p.length).toBe(1);
            expect(p.props()).toHaveProperty('className', 'messagingDisplay_p');
            expect(p.text()).toEqual(mockMsg);
        });
        
        it('renders a <CheckIcon/> icon component ', ()=>{
            expect(wrapper.find(CheckIcon).length).toBe(1);
        });
    });

    it('doesnt render anything if no message within the display state', ()=>{
        useSelector.mockImplementation(()=>({
            display: null
        }));
        const wrapper = mount(<MessagingDisplay />);
        expect(wrapper.exist).toBeFalsy();
    });
});