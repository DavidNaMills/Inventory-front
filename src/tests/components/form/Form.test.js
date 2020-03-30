import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as device from 'react-device-detect';

import '../../testHelpers/context';

import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';

import Form from '../../../Components/Form/Form';
import FormFactory from '../../../Components/Form/Factory/FormFactory';
import Button from '../../../Components/Button/Button';
import Title from '../../../Components/Title/Title';

import objToArray from '../../../helpers/objToArray/objToArray';
import { formTestConfig } from './formConfigTestData';


const props = {
    displayFields: ['phone', 'password'],
    user: { role: 3 },
    fullForm: formTestConfig,
    controlForm: {},
    updating: false,

    submitCb: jest.fn(),
    clearCb: null
};

afterEach(()=>{
    jest.clearAllMocks();
});

describe('Form test suite', () => {
    it('matches snapshot', () => {
        const comp = renderer.create(<Form {...props} />);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    describe('using shared component', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(<Form {...props} />);
        })

        it('exists', () => {
            expect(wrapper.exists).toBeTruthy();
        });

        it('renders a <div> with className "form__normal" if not mobile device', () => {
            expect(wrapper.find('.blur__normal').length).toBe(1);
        });

        it('contains a <Title/> component', () => {
            expect(wrapper.find(Title).length).toBe(1);
        });
    });

    it('renders a <div> with className "form_mobile" if mobile device', () => {
        const origValue = device.isMobileOnly;
        device.isMobileOnly = true;

        const wrapper = mount(<Form {...props} />);
        expect(wrapper.find('.blur_mobile').length).toBe(1);
        device.isMobileOnly = origValue;
    });


    describe('<form> element tests', ()=>{
        let form;
        beforeEach(()=>{
            form = mount(<Form {...props}/>);
        });

        it('contains a <form> element with 2 <FormFactory/> and a <Button/> elements', () => { 
            expect(form.find('form').length).toBe(1);
            expect(form.find(FormFactory).length).toBe(2);
            expect(form.find(Button).length).toBe(1);
        });
    });

    describe('button tests', ()=>{
        it('renders 2 <Button/> component2 if clearCb is present', () => { 
            const newProps = {
                ...props,
                clearCb: jest.fn()
            };

            const wrapper2 = mount(<Form {...newProps}/>);
            expect(wrapper2.find(Button).length).toBe(2);
        });
    });
});