import React from 'react';
import '../../testHelpers/context';
import '../../Containers/containerHelper';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import StaffPopup from '../../../Components/PopupComponents/StaffPopup';
import Title from '../../../Components/Title/Title';
import Button from '../../../Components/Button/Button';


const staffMember = {
    name: 'david',
    role: 3,
    phone: '12312312312',
    wechat: 'g4fd56s78fg9ds',
    baseId: ['123', '456123']
};

const mockClose = jest.fn();

describe('<StaffPopup/> component test suite', ()=>{
    let wrapper;
    
    beforeEach(()=>{
        wrapper = shallow(<StaffPopup item={staffMember} onClose={mockClose}/>);
    });

    it('matches snapshot', ()=>{
        const comp = renderer.create(<StaffPopup item={staffMember} onClose={mockClose}/>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('renders a <div> with inline styles', ()=>{
        const div = wrapper.find('div');
        expect(div.length).toBe(5);
        expect(div.at(0).props().style).toEqual({
            backgroundColor: 'rgb(237, 237, 237)',
            padding: '50px',
            border: 'solid black 2px',
            minWidth: '80%'
        });
    });
    
    it('renders a <Title/> component', ()=>{
        const title = wrapper.find(Title);
        expect(title.length).toBe(1);
        expect(title.props()).toHaveProperty('message', staffMember.name);
        expect(title.props()).toHaveProperty('size', 'h2');
    });
    
    it('renders a <div> with classname "popup__smallSpacing" label and <p> for Role ', ()=>{
        const div = wrapper.find('div');
        expect(div.at(1).props()).toHaveProperty('className', 'popup__smallSpacing');
        expect(div.at(1).find('label').props().style).toHaveProperty('fontWeight', 'bold');
        expect(div.at(1).find('label').text()).toEqual('Role');
        expect(div.at(1).find('p').text()).toEqual(`${staffMember.role}`);

    });
    
    it('renders a <div> with classname "popup__smallSpacing" label and <p> for Phone ', ()=>{
        const div = wrapper.find('div');
        expect(div.at(2).props()).toHaveProperty('className', 'popup__smallSpacing');
        expect(div.at(2).find('label').props().style).toHaveProperty('fontWeight', 'bold');
        expect(div.at(2).find('label').text()).toEqual('Phone');
        expect(div.at(2).find('p').text()).toEqual(`${staffMember.phone}`);
    });
    
    it('renders a <div> with classname "popup__mediumSpacing" label and <p> for wechat ', ()=>{
        const div = wrapper.find('div');
        expect(div.at(3).props()).toHaveProperty('className', 'popup__mediumSpacing');
        expect(div.at(3).find('label').props().style).toHaveProperty('fontWeight', 'bold');
        expect(div.at(3).find('label').text()).toEqual('Wechat');
        expect(div.at(3).find('p').text()).toEqual(`${staffMember.wechat}`);
    });
    
    it('renders a <div> with classname "popup__mediumSpacing" label and 2 <p> for locations ', ()=>{
        const div = wrapper.find('div');
        expect(div.at(4).props()).toHaveProperty('className', 'popup__mediumSpacing');
        expect(div.at(4).find('label').props().style).toHaveProperty('fontWeight', 'bold');
        expect(div.at(4).find('label').text()).toEqual('Locations');
        expect(div.at(4).find('p').length).toBe(2);
    });
    
    it('renders a <Button /> component', ()=>{
        const btn = wrapper.find(Button);
        expect(btn.length).toBe(1);
        expect(btn.props()).toHaveProperty('label', 'Close');
        expect(btn.props()).toHaveProperty('full', true);
        expect(btn.props()).toHaveProperty('onClick', mockClose);
    });
});