export const formTestConfig = ({
    title: 'loginForm_title',
    form: {
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
                    errMsg: `is_req`
                },
                isStringNumeric: {
                    errMsg: `string_numeric`
                },
                isPhone: {
                    errMsg: `loc.is_phone`
                }
            },
            touched: false,
            valid: false,
            shouldValidate: true,
            errorMsg: [],
        },
        password: {
            id: 'password',
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'frm_login_pass'
            },
            value: '',
            validation: {
                isRequired: {
                    errMsg: `loc.is_req`
                },
                maxLength: {
                    req: 20,
                    errMsg: `loc.input_too_long 20 loc.chara`
                },
                isRequired: {
                    errMsg: `loc.is_req`
                }
            },
            touched: false,
            valid: false,
            shouldValidate: true,
            errorMsg: [],
        }
    }
});


export const formFactoryTestData = {
    phone: {
        id: 'phone',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'phone'
        },
        value: '',
        validation: {
            isRequired: {
                errMsg: `is required`
            },
            isStringNumeric: {
                errMsg: `not numbers`
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
    numberTest: {
        id: 'numberTest',
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'phone'
        },
        value: '',
        validation: {
            isRequired: {
                errMsg: `is required`
            },
            isStringNumeric: {
                errMsg: `not numbers`
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
    password: {
        id: 'password',
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'phone'
        },
        value: '',
        validation: {
            isRequired: {
                errMsg: `is required`
            },
            isStringNumeric: {
                errMsg: `not numbers`
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
    image: {
        id: 'image',
        elementType: 'image',
        elementConfig: {
            type: 'file',
            placeholder: 'image'
        },
        value: null,
        validation: {},
        valid: false,
        touched: false,
        shouldValidate: false,
        errorMsg: [],
        constraints: null
    },
    role: {
        id: 'role',
        elementType: 'select',
        elementConfig: {
            placeholder: 'role',
            options: [
                {_id: 'staff', value: '1', displayValue: 'staff'},
                {_id: 'sub', value: '2', displayValue: 'sub'},
                {_id: 'admin', value: '3', displayValue: 'admin'}
            ]
        },
        value: 'staff',
        validation: {
            isRequired:{
                errMsg: `not selected`
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
            placeholder: 'location',
            options: [
                {_id: 'staff', value: '1', displayValue: 'staff'},
                {_id: 'sub', value: '2', displayValue: 'sub'},
                {_id: 'admin', value: '3', displayValue: 'admin'}
            ]
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        shouldValidate: false,
        errorMsg: []
    },
    withErrors: {
        id: 'withErrors',
        elementType: 'multiple',
        elementConfig: {
            placeholder: 'location',
            options: [
                {_id: 'staff', value: '1', displayValue: 'staff'},
                {_id: 'sub', value: '2', displayValue: 'sub'},
                {_id: 'admin', value: '3', displayValue: 'admin'}
            ]
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        shouldValidate: false,
        errorMsg: ['error1', 'error2', 'error3']
    },
}