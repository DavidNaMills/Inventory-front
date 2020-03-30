import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import Button from '../../Components/Button/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const mockClick = jest.fn();

afterEach(()=>{
    mockClick.mockClear();
});

const props = {
    onClick: mockClick,
    label: 'test'
};

describe('Button test suite', ()=>{
    describe('behavioural tests', ()=>{
        let wrapper;

        beforeEach(()=>{
            wrapper = shallow(<Button {...props}/>);
        })

        it('matches snapshot', ()=>{
            const comp = renderer.create(<Button {...props}/>)
            const app = comp.toJSON();
            expect(app).toMatchSnapshot();
        });

        it('exists', ()=>{
            expect(wrapper.exists).toBeTruthy();
        });
        
        it('invokes the function when clicked', ()=>{
            const btn = wrapper.find('button')
            expect(btn.length).toBe(1);
            btn.simulate('click');
            expect(mockClick).toHaveBeenCalledTimes(1);
        });

        it('adds the label', ()=>{
            expect(wrapper.find('button').text()).toEqual(props.label);
        });

        it('sets button not disabled as default', ()=>{
            expect(wrapper.find('button').props().disabled).toBeFalsy();
        });
        
        it('removes style from button', ()=>{
            const tw = shallow(<Button {...props} noStyle/>);
            expect(tw.find('.button_noStyle').length).toBe(1);
        });
        
        it('adds the bold style', ()=>{
            const tw = shallow(<Button {...props} bold/>);
            expect(tw.find('.button_bold').length).toBe(1);
        });
        
        it('adds base style as default', ()=>{
            expect(wrapper.find('.button__base').length).toBe(1);
        });

        it('adds an Icon', ()=>{
            const tw = mount(<Button {...props} Icon = {MenuBookIcon}/>)
            expect(tw.find(MenuBookIcon).length).toBe(1);
            expect(tw.find('button').text()).toEqual(props.label);
        });
    });

    describe('styles tests', ()=>{
        const baseCN = (type)=>`button__${type}`;
        const shadow = (type)=>`button__${type}_shadow`;
        const border = (type)=>`button__${type}_border`;
        const skeleton = (type)=>`button__${type}_skeleton`;

        [
            {msg:'sets classNames for BASE type with shadow and border set', props: {...props, type: 'base', raised: true, border: true}},
            {msg:'sets classNames for SUBMIT type with shadow and border set', props: {...props, type: 'submit', raised: true, border: true}},
            {msg:'sets classNames for CLEAR type with shadow and border set', props: {...props, type: 'clear', raised: true, border: true}},
            {msg:'sets classNames for DANGER type with shadow and border set', props: {...props, type: 'danger', raised: true, border: true}},
            {msg:'sets classNames for INFORMATION type with shadow and border set', props: {...props, type: 'information', raised: true, border: true}},
        ].forEach(x=>{
            it(x.msg, ()=>{
                const btnWrap = shallow(<Button {...x.props}/>);
                expect(btnWrap.find(`.${baseCN(x.props.type)}`).length).toBe(1);
                expect(btnWrap.find(`.${border(x.props.type)}`).length).toBe(1);
                expect(btnWrap.find(`.${shadow(x.props.type)}`).length).toBe(1);
            });
        });

        [
            {msg:'sets classNames for BASE type with skeleton and full options set', props: {...props, type: 'base', skeleton: true, full: true}},
            {msg:'sets classNames for SUBMIT type with skeleton and full options set', props: {...props, type: 'submit', skeleton: true, full: true}},
            {msg:'sets classNames for CLEAR type with skeleton and full options set', props: {...props, type: 'clear', skeleton: true, full: true}},
            {msg:'sets classNames for DANGER type with skeleton and full options set', props: {...props, type: 'danger', skeleton: true, full: true}},
            {msg:'sets classNames for INFORMATION type with skeleton and full options set', props: {...props, type: 'information', skeleton: true, full: true}},
        ].forEach(x=>{
            it(x.msg, ()=>{
                const btnWrap = shallow(<Button {...x.props}/>);
                expect(btnWrap.find(`.${baseCN(x.props.type)}`).length).toBe(1);
                expect(btnWrap.find(`.${skeleton(x.props.type)}`).length).toBe(1);
                expect(btnWrap.find('.button_full').length).toBe(1);
            });
        })
    });
});