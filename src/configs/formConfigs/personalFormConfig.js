
export const personalFormConfig = (loc) =>({
    title: 'personal_details',
    form:{
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
                    errMsg: `${loc.is_req}`
                },
                isStringNumeric: {
                    errMsg: `${loc.only_numbers}`
                },
                isPhone: {
                    errMsg: `${loc.valid_phone}`
                }
            },
            touched: false,
            valid: false,
            shouldValidate: true,
            errorMsg: []
        },
        wechat: {
            id: 'wechat',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'frm_staff_wechat'
            },
            value: '',
            validation: {
                isRequired: {
                    errMsg: `${loc.is_req}`
                },
                maxLength: {
                    req: 20,
                    errMsg: `${loc.input_too_long} 20 ${loc.chara}`
                }
            },
            touched: false,
            valid: false,
            shouldValidate: true,
            errorMsg: []
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
                    errMsg: `${loc.is_req}`
                },
                maxLength: {
                    req: 15,
                    errMsg: `${loc.input_too_long} 15 ${loc.chara}`
                },
                isPassword: {
                    field: 'passwordConfirm',
                    errMsg: `${loc.pass_not_match}`
                }
            },
            touched: false,
            valid: false,
            shouldValidate: true,
            errorMsg: []
        },
        passwordConfirm: {
            id: 'passwordConfirm',
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'frm_staff_pass_conf'
            },
            value: '',
            validation: {},
            touched: false,
            valid: false,
            shouldValidate: false,
            errorMsg: []
        }
    }
})