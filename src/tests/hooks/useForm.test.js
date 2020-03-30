import { renderHook, act } from '@testing-library/react-hooks';
import { validationTd } from '../helpers/validationTestData';

import useForm from '../../hooks/useForm/useForm';


const base = {
    phone: {
        id: 'phone',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'frm_login_user'
        },
        value: '',
        validation: {
            isRequired: {
                errMsg: 'is required'
            },
            isStringNumeric: {
                errMsg: 'not string numeric'
            },
            isPhone: {
                errMsg: 'not a phone'
            }
        },
        touched: false,
        valid: false,
        shouldValidate: true,
        errorMsg: [],
    },
    role: {
        id: 'role',
        elementType: 'select',
        elementConfig: {
            placeholder: 'frm_staff_role',
            options: [
                {_id: '123', value: 'staff'},
                {_id: '456', value: 'sub admin'},
                {_id: '789', value: 'admin'}
            ]
        },
        value: '123',
        validation: {
            isRequired:{
                errMsg: 'is required'
            }
        },
        touched: false,
        valid: false,
        shouldValidate: true,
        errorMsg: []
    },
    baseId: {
        id: 'baseId',
        elementType: 'multiple',
        elementConfig: {
            placeholder: 'frm_staff_loc',
            options: []
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        shouldValidate: false,
        errorMsg: []
    },
    image: {
        id: 'image',
        elementType: 'image',
        elementConfig: {
            type: 'file',
            placeholder: 'frm_prod_image'
        },
        value: null,
        validation: {},
        valid: false,
        touched: false,
        shouldValidate: false,
        errorMsg: [],
        constraints: null
    },
}


const options = {
    locations: [
        { _id: '123', displayValue: 'test1' },
        { _id: '123456', displayValue: 'test2' },
        { _id: '123789', displayValue: 'test3' },
    ]
}


const formConfig = {
    form: base
};

describe('useForm hook test suite', () => {
    describe('controlForm and updateSelectOption tests', () => {
        it('configures the form on load without select options', () => {

            const { result } = renderHook(() => useForm({ formConfig }));
            expect(result.current.fullForm).toEqual(base);
        });

        it('configures the form on load with select options', () => {
            const formConfig = {
                select: [{
                    field: 'baseId',
                    add: 'locations'
                }],
                form: base
            };
            const { result } = renderHook(() => useForm({ formConfig, state: options }));
            expect(result.current.fullForm.baseId.elementConfig.options.length).toBe(options.locations.length);
            expect(result.current.fullForm.baseId.elementConfig.options).toEqual(options.locations);
        });

        it('configures the form on load with select options present but 0 length', () => {
            const formConfig = {
                select: [{
                    field: 'baseId',
                    add: 'locations'
                }],
                form: base
            };
            const { result } = renderHook(() => useForm({ formConfig, state: { locations: [] } }));
            expect(result.current.fullForm.baseId.elementConfig.options.length).toBe(0);
            expect(result.current.fullForm.baseId.elementConfig.options).toEqual([]);
        });
    });

    describe('populateValues tests', () => {
        it('populates the value if key exists within the object', () => {
            const valsToPopulate = {
                phone: '123456789123',
                drink: 'coca cola'
            }
            const { result } = renderHook(() => useForm({ formConfig }));
            expect(result.current.fullForm).toEqual(base);
            act(() => {
                result.current.populateValues(valsToPopulate);
            });
            expect(result.current.fullForm.phone.value).toEqual('123456789123');
        });

        it('does not update if the key is not present in form object', () => {
            const valsToPopulate = {
                drink: 'coca cola'
            }
            const { result } = renderHook(() => useForm({ formConfig }));
            expect(result.current.fullForm).toEqual(base);
            act(() => {
                result.current.populateValues(valsToPopulate);
            });
            expect(result.current.fullForm).toEqual(base);
        });
    });

    describe('controlForm tests', () => {
        it('updates the values if type is of select-multiple', () => { 
            const e = {target: {
                type:'select-multiple',
                options: [
                    {selected: false, value: 'test 1'},
                    {selected: true, value: 'test 2'},
                    {selected: false, value: 'test 3'},
                    {selected: true, value: 'test 4'},
                ]
            }};
            const {result} = renderHook(()=>useForm({ formConfig }));
            expect(result.current.fullForm).toEqual(base);
            act(()=>{
                result.current.controlForm(e, 'baseId');
            });

            expect(result.current.fullForm.baseId.value.length).toBe(2);
            expect(result.current.fullForm.baseId.value).toEqual(['test 2', 'test 4']);
        });
        
        it('updates the values if type is of file', () => { 
            const e = {target: {
                type:'file',
                files: [{filename: 'test filename'}]
            }};
            const {result} = renderHook(()=>useForm({ formConfig }));
            expect(result.current.fullForm).toEqual(base);
            act(()=>{
                result.current.controlForm(e, 'image');
            });
            
            expect(result.current.fullForm.image.value).toEqual([{filename: 'test filename'}]);
        });
        
        it('updates the values as default type', () => { 
            const e = {target: {
                value: 'super test 123'
            }};
            const {result} = renderHook(()=>useForm({ formConfig }));
            expect(result.current.fullForm).toEqual(base);
            act(()=>{
                result.current.controlForm(e, 'phone');
            });
            
            expect(result.current.fullForm.phone.value).toEqual('super test 123');
        });
        
        it('updates the file values if the type is uppercase', () => { 
            const e = {target: {
                type:'FILE',
                files: [{filename: 'test filename'}]
            }};
            const {result} = renderHook(()=>useForm({ formConfig }));
            expect(result.current.fullForm).toEqual(base);
            act(()=>{
                result.current.controlForm(e, 'image');
            });
            
            expect(result.current.fullForm.image.value).toEqual([{filename: 'test filename'}]);
        });
    });


    describe('buildFormObject', () => {
        it('adds the value to new object if touched===false and the value exists', () => { 
            const temp = JSON.parse(JSON.stringify(base));
            for(let x in base){
                temp[x].value = `test-${x}`;
            };

            const formConfig2 = {
                form: temp
            };
            const {result} = renderHook(()=>useForm({ formConfig: formConfig2 }));
            expect(result.current.fullForm).toEqual(temp);
            let res;
            act(()=>{ res = result.current.buildFormObject(); });
            expect(Object.keys(res).length).toBe(4);
            
            for(let x in res){
                expect(res[x]).toEqual(`test-${x}`);
            };
        });
        
        it('does not add the value to new object if touched===false and the value is null ', () => {
            const temp = JSON.parse(JSON.stringify(base));
            for(let x in base){
                temp[x].value = `test-${x}`;
            };
            temp.image.value = null;

            const formConfig2 = {
                form: temp
            };
            const {result} = renderHook(()=>useForm({ formConfig: formConfig2 }));
            expect(result.current.fullForm).toEqual(temp);
            let res;
            act(()=>{ res = result.current.buildFormObject(); });
            expect(Object.keys(res).length).toBe(3);
            
            expect(res.phone).toEqual('test-phone');
            expect(res.baseId).toEqual('test-baseId');
            expect(res.role).toEqual('test-role');
            expect(res).not.toHaveProperty('image');
         });


        it('adds the property to the object if touched is true, and the property value exists', () => { 
            const temp = JSON.parse(JSON.stringify(base));
            for(let x in base){
                temp[x].value = `test-${x}`;
                temp[x].touched = true;
            };

            const formConfig2 = {
                form: temp
            };
            const {result} = renderHook(()=>useForm({ formConfig: formConfig2 }));
            expect(result.current.fullForm).toEqual(temp);
            let res;
            act(()=>{ res = result.current.buildFormObject(); });
            expect(Object.keys(res).length).toBe(4);
            
            for(let x in res){
                expect(res[x]).toEqual(`test-${x}`);
            };
        });
        
        it('does not add the property to the object if touched is true, and the property value does not exist', () => {
            const temp = JSON.parse(JSON.stringify(base));
            for(let x in base){
                temp[x].value = `test-${x}`;
                temp[x].touched = true;
            };
            temp.image.value = null;

            const formConfig2 = {
                form: temp
            };
            const {result} = renderHook(()=>useForm({ formConfig: formConfig2 }));
            expect(result.current.fullForm).toEqual(temp);
            let res;
            act(()=>{ res = result.current.buildFormObject(); });
            expect(Object.keys(res).length).toBe(3);
            
            expect(res.phone).toEqual('test-phone');
            expect(res.baseId).toEqual('test-baseId');
            expect(res.role).toEqual('test-role');
            expect(res).not.toHaveProperty('image');
         });
    });


    describe('clearForm tests', () => {
        it('sets the form to the original state including select options if required', () => {
            const {result} = renderHook(()=>useForm({ formConfig }));
            const temp = {};
            for(let x in base){
                temp[x] = `test-${x}`;
            };

            act(()=>{
                result.current.populateValues(temp);
            });
            expect(result.current.fullForm.phone.value).toEqual('test-phone');
            expect(result.current.fullForm.role.value).toEqual('test-role');
            expect(result.current.fullForm.image.value).toEqual('test-image');
            expect(result.current.fullForm.baseId.value).toEqual('test-baseId');

            act(()=>{
                result.current.clearForm();
            });
            expect(result.current.fullForm).toEqual(base);
         });
    });

    describe.skip('validationFull tests', () => {
        it('calls the validation function sets the form to validated state and returns isValid: true when form is valid', () => { });
        
        it('calls the validation function sets the form to validated state (with errors) and returns isValid: false when form is invalid', () => { });
    });

    describe.skip('validatePartial tests', () => {
        it('calls the validate function with a subset of the original form (that have been touched) sets full form with updated subset and returns isValid: true if valid', () => { });
        it('calls the validate function with a subset of the original form (that have been touched) sets full form with updated subset (with errors) and returns isValid: false if invalid', () => { });
        it('returns isValid: false if no fields have been touched', () => { });

    });
});
