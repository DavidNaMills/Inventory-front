export const loginConfig = (loc) =>({
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
                    errMsg: `${loc.is_req}`
                },
                isStringNumeric: {
                    errMsg: `${loc.string_numeric}`
                },
                isPhone: {
                    errMsg: `${loc.is_phone}`
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
                    errMsg: `${loc.is_req}`
                },
                maxLength: {
                    req: 20,
                    errMsg: `${loc.input_too_long} 20 ${loc.chara}`
                },
                isRequired: {
                    errMsg: `${loc.is_req}`
                }
            },
            touched: false,
            valid: false,
            shouldValidate: true,
            errorMsg: [],
        }
    }
})