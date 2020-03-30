import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Popup from '../../../Components/PopupComponents/Popup';

jest.mock('../../../hooks/usePositionHook/usePositionHook');
import usePositionHook from '../../../hooks/usePositionHook/usePositionHook';

const tPos = 789;

const mockStyle = {
    position: 'absolute',
    top: `${tPos}px`,
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(232, 255, 253, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9999'
}

const TempChild = () =>(<p>I am child in time</p>)


describe('<Popup/> container test suite', ()=>{
    let wrapper;

    beforeEach(()=>{
        usePositionHook.mockImplementation(()=>({
            posRef: tPos
        }));
    
        wrapper = mount(<Popup isOpen={true}><TempChild/></Popup>);
    })


    it('matches snapshot', ()=>{
        const comp = renderer.create(<Popup isOpen={true}><TempChild/></Popup>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        expect(wrapper.exists).toBeTruthy();
    });
    
    it('returns null if isOpen === false', ()=>{
        const tWrapper = mount(<Popup isOpen={false}><TempChild/></Popup>);
        expect(tWrapper.find('div').length).toBe(0);
    });
    
    it('renders 2 <div> elements, first div with inline style equal to mockStyle when isOpen === true', ()=>{
        const div = wrapper.find('div');
        expect(div.length).toBe(2);
        expect(div.at(0).props().style).toEqual(mockStyle);
    });
    
    it('renders the child component when isOpen === true', ()=>{
        const div = wrapper.find('div');
        expect(div.find(TempChild).length).toBe(1);
    });
});