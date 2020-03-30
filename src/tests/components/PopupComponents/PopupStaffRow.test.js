import React from 'react';
import '../../testHelpers/context';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

import PopupStaffRow from '../../../Components/PopupComponents/Rows/PopupStaffRow';
import StaffTypeRow from '../../../Components/TableDisplay/Row/StaffTypeRow';
import Title from '../../../Components/Title/Title';

const config = {main: ['', 'name', 'role']};
// const tempScrollableStaff = {
//     overflowY: 'auto',
//     maxHeight: isPortrait ? '30vh' : '15vw',
// }

const staff = [
    { name: 'david', role: '2' },
    { name: 'alan', role: '1' },
]


describe('<PopupStaffRow/> test suite', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<PopupStaffRow staff={staff} isPortrait={false}/>);
    });

    it('matches snapshot', ()=>{
        const comp = renderer.create(<PopupStaffRow staff={staff} isPortrait={false}/>)
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('renders a <p> element with text if staff array prop is empty', ()=>{
        const tW = shallow(<PopupStaffRow staff={[]} isPortrait={false}/>);
        const p = tW.find('p');
        expect(p.length).toBe(1);
        expect(p.props()).toHaveProperty('className', 'popup__mediumSpacing');
        expect(p.text()).toEqual('No staff at this location');
    });
    
    it('renders a <div> element with className "popup__color1"', ()=>{
        const div = wrapper.find('div');
        expect(div.length).toBe(5);
        expect(div.at(0).props()).toHaveProperty('className', 'popup__color1');
    });
    
    it('renders a <Title/> component', ()=>{
        const div = wrapper.find('div');
        const ttl = div.at(1).find(Title);
        expect(div.at(1).props()).toHaveProperty('className', 'popup__mediumSpacing');
        expect(ttl.length).toBe(1);
        expect(ttl.props()).toHaveProperty('message', `Staff: ${staff.length} in total`);
        expect(ttl.props()).toHaveProperty('size', 'h4');
    });
    
    it('renders a <div> with styling if isPortrait = false', ()=>{
        const div = wrapper.find('div');
        expect(div.at(2).props().style).toHaveProperty('overflowY', 'auto');
        expect(div.at(2).props().style).toHaveProperty('maxHeight', '15vw');
    });
    
    it('renders a <div> with styling if isPortrait = true', ()=>{
        const tW = shallow(<PopupStaffRow staff={staff} isPortrait={true}/>);
        const div = tW.find('div');
        expect(div.at(2).props().style).toHaveProperty('overflowY', 'auto');
        expect(div.at(2).props().style).toHaveProperty('maxHeight', '30vh');
    });

    it('renders 2 <StaffTypeRow/> components', ()=>{
        const row = wrapper.find('div').at(2).find(StaffTypeRow);
        expect(row.length).toBe(2);
    });
});