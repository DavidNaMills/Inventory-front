import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import '../../testHelpers/context';

import FormFactory from '../../../Components/Form/Factory/FormFactory';

import { formFactoryTestData } from '../form/formConfigTestData';

// elementConfig: {
//     type: 'text',
//     placeholder: 'phone'
// },

const mockOnChange = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
})

const displayFields = {
    phone: 'phone',
    numberTest: 'numberTest',
    password: 'password',
    image: 'image',
    role: 'role',
    baseId: 'baseId',
    fail: 'fail',
    withErrors: 'withErrors'
};

const baseProps = {
    config: formFactoryTestData.phone,
    displayFields,
    onChange: mockOnChange
}

describe('<FormFactory/> test suite', () => {
    it('matches snapshot', () => {
        const comp = renderer.create(<FormFactory {...baseProps} />);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('exists', () => {
        const wrapper = shallow(<FormFactory {...baseProps} />);
        expect(wrapper.exists).toBeTruthy();
    });

    describe('form elements tests', () => {
        [
            {
                msg: 'renders an <input/> element and reacts to onChange',
                config: formFactoryTestData.phone,
                type: 'input',
                id: 'phone',
                calledWith: 'dsa123'
            },
            {
                msg: 'renders an <input/> element with number property and reacts to onChange',
                config: formFactoryTestData.numberTest,
                type: 'input',
                id: 'numberTest',
                calledWith: '123'
            },
            {
                msg: 'renders an <input/> element with password property and reacts to onChange',
                config: formFactoryTestData.password,
                type: 'input',
                id: 'password',
                calledWith: 'pwe45d'
            },

        ].forEach(x => {

            it(x.msg, () => {
                const newProps = { ...baseProps, config: x.config };
                const wrapper = shallow(<FormFactory {...newProps} />);
                expect(wrapper.find('input').length).toBe(1);
                wrapper.find('input').simulate('change', x.calledWith)
                expect(mockOnChange).toHaveBeenCalledTimes(1);
                expect(mockOnChange).toHaveBeenCalledWith(x.calledWith, x.id);
            });
        });

        it('renders a <select/> element and reacts to onChange', () => {
            const newProps = { ...baseProps, config: formFactoryTestData.role };
            const wrapper = shallow(<FormFactory {...newProps} />);
            expect(wrapper.find('select').length).toBe(1);
            wrapper.find('select').simulate('change', 'admin')
            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledWith('admin', 'role');
        });

        it('renders a <select/> element with multiple property and reacts to onChange', () => {
            const newProps = { ...baseProps, config: formFactoryTestData.baseId };
            const wrapper = shallow(<FormFactory {...newProps} />);
            expect(wrapper.find('select').length).toBe(1);
            wrapper.find('select').simulate('change', ['admin', 'tests', 'super tests'])
            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledWith(['admin', 'tests', 'super tests'], 'baseId');
            expect(wrapper.find('select').props()).toHaveProperty('multiple', true);
        });

        it('renders a <file/> element and reacts to onChange', () => {
            const newProps = { ...baseProps, config: formFactoryTestData.image };
            const wrapper = shallow(<FormFactory {...newProps} />);
            expect(wrapper.find('input').length).toBe(1);
            wrapper.find('input').simulate('change', ['test file'])
            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledWith(['test file'], 'image');
            expect(wrapper.find('input').props()).toHaveProperty('type', 'file');
        });

        it('renders a <p> tag if element is not supported', () => {
            const newProps = { ...baseProps, config: { id: 'fail', elementType: 'fail', elementConfig: { placeholder: 'test' } } };
            const wrapper = shallow(<FormFactory {...newProps} />);
            expect(wrapper.find('p').length).toBe(1);
        });
    });

    describe.only('display tests', () => {
        it('renders a <div> with class="formFactory", a label with class="formFactory__label", and the element', () => { 
            const wrapper = shallow(<FormFactory {...baseProps} />);
            expect(wrapper.find('div').props()).toHaveProperty('className', 'formFactory');
            expect(wrapper.find('label').props()).toHaveProperty('className', 'formFactory__label');
        });
        
        it('renders a <div> with class="formFactory__errorMsg" and a <p> tag for each error', () => {
            const newProps = { ...baseProps, config: formFactoryTestData.withErrors };
            const wrapper = shallow(<FormFactory {...newProps} />);
            
        });
    });
});