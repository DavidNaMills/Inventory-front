export const validationTd = ({ age, phone, name, email, password, passwordConfirm }) => ({
    age: {
        id: 'age',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'frm_login_user'
        },
        value: age,
        validation: {
            isNumeric: {
                errMsg: `not numeric`
            }
        },
        touched: false,
        valid: false,
        shouldValidate: true,
        errorMsg: [],
    },
    phone: {
        id: 'phone',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'frm_login_user'
        },
        value: phone,
        validation: {
            isStringNumeric: {
                errMsg: `not string numeric`
            },
            isPhone: {
                errMsg: `not phone`
            }
        },
        touched: false,
        valid: false,
        shouldValidate: true,
        errorMsg: [],
    },
    name: {
        id: 'name',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'frm_login_user'
        },
        value: name,
        validation: {
            minLength: {
                req: 5,
                errMsg: `min length`
            },
            maxLength: {
                req: 10,
                errMsg: `max length`
            }
        },
        touched: false,
        valid: false,
        shouldValidate: true,
        errorMsg: [],
    },
    email: {
        id: 'email',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'frm_login_user'
        },
        value: email,
        validation: {
            isEmail: {
                errMsg: `not email`
            },
        },
        touched: false,
        valid: false,
        shouldValidate: true,
        errorMsg: [],
    },
    password: {
        id: 'email',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'frm_login_user'
        },
        value: password,
        validation: {
            isPassword: {
                field: 'passwordConfirm',
                errMsg: `passwords dont match`
            }
        },
        touched: false,
        valid: false,
        shouldValidate: true,
        errorMsg: [],
    },
    passwordConfirm: {
        id: 'passwordConfirm',
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'frm_staff_pass_conf'
        },
        value: passwordConfirm,
        validation: {},
        touched: false,
        valid: false,
        shouldValidate: false,
        errorMsg: []
    }
});