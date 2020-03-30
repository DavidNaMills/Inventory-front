import { validationTd } from './validationTestData';
import formValidation, {
    isNumeric,
    minLength,
    maxLength,
    isEmail,
    isStringNumeric,
    isPhone,
    isPassword
} from '../../helpers/validation/validation';



describe('validation test suite', () => {
    describe('individual function tests', () => {
        describe('isNumeric tests', () => {
            it('[isNumeric] validates a numeric value', () => {
                expect(isNumeric(123)).toBeTruthy();
            });

            it('[isNumeric] returns false if not  a numeric value', () => {
                expect(isNumeric('123')).toBeFalsy();
            });
        });

        describe('minLength tests', () => {
            it('[minLength]type string: returns true if greater than minimum', () => {
                expect(minLength(2, '132')).toBeTruthy();
            });

            it('[minLength]type string: returns true if equal to minimum', () => {
                expect(minLength(1, '12')).toBeTruthy();
            });

            it('[minLength]type string: returns false if less than minimum', () => {
                expect(minLength(3, '12')).toBeFalsy();

            });

            it('[minLength]type numeric: returns true if greater than minimum', () => {
                expect(maxLength(20, 13)).toBeTruthy();
            });

            it('[minLength]type numeric: returns true if equal to minimum', () => {
                expect(maxLength(20, 20)).toBeTruthy();
            });

            it('[minLength]type numeric: returns false if less than minimum', () => {
                expect(maxLength(20, 21)).toBeFalsy();
            });

            it('[minLength] returns false if not type string or numeric:', () => {
                expect(maxLength(20, ['cfd'])).toBeFalsy();
            });
        });

        describe('masLength tests', () => {
            it('[maxLength]type string: returns true if less than maximum', () => { 
                expect(maxLength(5, 'test')).toBeTruthy();
            });

            it('[maxLength]type string: returns true if equal to maximum', () => {
                expect(maxLength(4, 'test')).toBeTruthy();
            });

            it('[maxLength]type string: returns false if less than maximum', () => {
                expect(maxLength(3, 'test')).toBeFalsy();
            });

            it('[maxLength]type numeric: returns true if greater than maximum', () => {
                expect(maxLength(5, 4)).toBeTruthy();
            });

            it('[maxLength]type numeric: returns true if equal to maximum', () => {
                expect(maxLength(5, 5)).toBeTruthy();
            });

            it('[maxLength]type numeric: returns false if less than maximum', () => {
                expect(maxLength(5, 6)).toBeFalsy();
            });

            it('[maxLength] returns false if not type string or numeric:', () => { 
                expect(maxLength(12, ['fdsa'])).toBeFalsy();
            });
        });

        describe('isEmail tests', ()=>{
            it('[isEmail]: returns true if a valid email .com', () => { 
                expect(isEmail('test@test.com')).toBeTruthy();
            });
            
            it('[isEmail]: returns true if a valid email .co.uk', () => { 
                expect(isEmail('test@test.co.uk')).toBeTruthy();
            });
            
            it('[isEmail]: returns true if a valid email .cn', () => {
                expect(isEmail('test@test.cn')).toBeTruthy();
            });
            
            it('[isEmail]: returns false if an invalid email', () => {
                expect(isEmail('test@test')).toBeFalsy();
                expect(isEmail('testtest.com')).toBeFalsy();
                expect(isEmail('@test.com')).toBeFalsy();
            });
        });

        describe('isNumeric tests', ()=>{
            it('[isStringNumeric]: returns true if sring only contains numeric characters', () => { 
                expect(isStringNumeric('123456789')).toBeTruthy();
            });
           
            it('[isStringNumeric]: returns false if string contains a character', () => {
                expect(isStringNumeric('456f456')).toBeFalsy();
            });
           
            it('[isStringNumeric]: returns false if string contains a symbol', () => {
                expect(isStringNumeric('456#789')).toBeFalsy();
            });
        });

        describe('isPhone tests', ()=>{
            it('[isPhone]: returns true if valid Chinese phone number 1xxxxxxxxxx', () => {
                expect(isPhone('13111111111')).toBeTruthy();
            });
            
            it('[isPhone]: returns false if invalid Chinese number', () => {
                expect(isPhone('22203777777')).toBeFalsy();
            });
            
            it('[isPhone]: returns false if length is less than 11', () => {
                expect(isPhone('111111111')).toBeFalsy();
            });
            
            it('[isPhone]: returns false if length is more than 11', () => {
                expect(isPhone('111111111111111')).toBeFalsy();
            });
            
            it('[isPhone]: returns false if string contains characters', () => {
                expect(isPhone('131e24d5478')).toBeFalsy();
            });

            it('[isPhone]: returns trueif value is numeric', () => {
                expect(isPhone(11111111111)).toBeTruthy();
            });
        });

        describe('isPassword tests', ()=>{
            it('[isPassword]: returns true if both passwords are equal', () => { 
                expect(isPassword('password1', 'password1')).toBeTruthy();
            });
            it('[isPassword]: returns false if passwords are not equal', () => {
                expect(isPassword('password1', 'password3')).toBeFalsy();
            });
        });
    });


    describe('formValidation function test suite', () => {
        it('ignores item if property shouldValidate is false', () => { });

        describe('validate tests', () => {
            it('validates the data when all are correct ', () => { 
                const testData = validationTd({
                    age: 12,
                    phone: '11111111111',
                    name: 'david',
                    email: 'test@test.com',
                    password: 'testing1',
                    passwordConfirm: 'testing1'
                });
                const res = formValidation({theForm:testData});
                expect(Object.keys(res).length).toEqual(2);
                expect(res).toHaveProperty('isValid', true);
                expect(res).toHaveProperty('updatedForm', testData);
            });


            it('adds error messages when minLength, isNumeric, email, isStringNumeric, isPhone and isPassword fails', () => { 
                const testData = validationTd({
                    age: '12',
                    phone: '123fdsa',
                    name: 'dav',
                    email: 'tetest.com',
                    password: 'testing1',
                    passwordConfirm: 'testing99'
                });
                const res = formValidation({theForm:testData});
                expect(Object.keys(res).length).toEqual(2);
                expect(res).toHaveProperty('isValid', false);

                expect(res.updatedForm.age.isValid).toBeFalsy();
                expect(res.updatedForm.age.errorMsg).toEqual(['not numeric']);

                expect(res.updatedForm.name.isValid).toBeFalsy();
                expect(res.updatedForm.name.errorMsg).toEqual(['min length']);

                expect(res.updatedForm.email.isValid).toBeFalsy();
                expect(res.updatedForm.email.errorMsg).toEqual(['not email']);

                expect(res.updatedForm.phone.isValid).toBeFalsy();
                expect(res.updatedForm.phone.errorMsg).toEqual(['not string numeric', 'not phone']);

                expect(res.updatedForm.password.isValid).toBeFalsy();
                expect(res.updatedForm.password.errorMsg).toEqual(['passwords dont match']);
            });
            
            it('adds error messages when maxLength, isNumeric, email, isStringNumeric, isPhone and isPassword fails', () => { 
                const testData = validationTd({
                    age: '12',
                    phone: '111111111111',
                    name: 'davasdasdasd',
                    email: 'tetest@',
                    password: 'testing1',
                    passwordConfirm: 'testing99'
                });
                const res = formValidation({theForm:testData});
                expect(Object.keys(res).length).toEqual(2);
                expect(res).toHaveProperty('isValid', false);

                expect(res.updatedForm.age.isValid).toBeFalsy();
                expect(res.updatedForm.age.errorMsg).toEqual(['not numeric']);

                expect(res.updatedForm.name.isValid).toBeFalsy();
                expect(res.updatedForm.name.errorMsg).toEqual(['max length']);

                expect(res.updatedForm.email.isValid).toBeFalsy();
                expect(res.updatedForm.email.errorMsg).toEqual(['not email']);

                expect(res.updatedForm.phone.isValid).toBeFalsy();
                expect(res.updatedForm.phone.errorMsg).toEqual(['not phone']);

                expect(res.updatedForm.password.isValid).toBeFalsy();
                expect(res.updatedForm.password.errorMsg).toEqual(['passwords dont match']);
            });

        });

    });
});