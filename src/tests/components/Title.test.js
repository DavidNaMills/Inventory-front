import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import Title from '../../Components/Title/Title';

const mockMessage = 'My Test Title';


describe('<Title/> component test suite', ()=>{
    it('matches snapshot', ()=>{
        const comp = renderer.create(<Title message={mockMessage} size='h2' center/>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('exists', ()=>{
        const wrapper = shallow(<Title message={mockMessage} size='h2' center/>);
        expect(wrapper.exists).toBeTruthy();
    });

    [
        {msg: 'renders a <Title/> component of size "h1"', size: 'h1', center: false, classRes: 'title_h1 '},
        {msg: 'renders a <Title/> component of size "h1" with center option set', size: 'h1', center: true, classRes: 'title_h1 title__center'},

        {msg: 'renders a <Title/> component of size "h2"', size: 'h2', center: false, classRes: 'title_h2 '},
        {msg: 'renders a <Title/> component of size "h2" with center option set', size: 'h2', center: true, classRes: 'title_h2 title__center'},
 
        {msg: 'renders a <Title/> component of size "h3"', size: 'h3', center: false, classRes: 'title_h3 '},
        {msg: 'renders a <Title/> component of size "h3" with center option set', size: 'h3', center: true, classRes: 'title_h3 title__center'},

        {msg: 'renders a <Title/> component of size "h4"', size: 'h4', center: false, classRes: 'title_h4 '},
        {msg: 'renders a <Title/> component of size "h4" with center option set', size: 'h4', center: true, classRes: 'title_h4 title__center'},
        
        {msg: 'renders a <Title/> component of size "h5"', size: 'h5', center: false, classRes: 'title_h5 '},
        {msg: 'renders a <Title/> component of size "h5" with center option set', size: 'h5', center: true, classRes: 'title_h5 title__center'},

        {msg: 'renders a <Title/> component of size "h6"', size: 'h6', center: false, classRes: 'title_h6 '},
        {msg: 'renders a <Title/> component of size "h6" with center option set', size: 'h6', center: true, classRes: 'title_h6 title__center'},
    ].forEach(x=>{
        it(x.msg, ()=>{
            const wrapper = mount(<Title message={mockMessage} size={x.size} center={x.center}/>);
            const elem = wrapper.find(x.size);
            expect(elem.length).toBe(1);
            expect(elem.props()).toHaveProperty('className', x.classRes);
            expect(elem.text()).toEqual(mockMessage);
        });
    });

    it.only('render a <Title/> component with default size "h2"', ()=>{
        const wrapper = mount(<Title message={mockMessage} center={true}/>);
        const elem = wrapper.find('h2');
        expect(elem.length).toBe(1);
        expect(elem.props()).toHaveProperty('className', 'title_h2 title__center');
        expect(elem.text()).toEqual(mockMessage);
    });
});