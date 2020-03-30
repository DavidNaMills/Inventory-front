import {ADMIN, SUB_ADMIN, STAFF} from '../../consts/roles';



export const staffFormConfig = (loc)=>({
    title: 'newStaffForm_title',
    select: [{
        field: 'baseId',
        add: 'locations'
    }],
    form: {
        name: {
            id: 'name',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'frm_staff_name'
            },
            value: '',
            validation: {
                isRequired: {
                    errMsg: `${loc.is_req}`
                },
                maxLength:{
                    req: 25,
                    errMsg: `${loc.input_too_long} 2 ${loc.chara}`
                }
            },
            touched: false,
            valid: false,
            shouldValidate: true,
            errorMsg: []
        },
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
                }
            },
            touched: false,
            valid: false,
            shouldValidate: true,
            errorMsg: []
        },
        role: {
            id: 'role',
            elementType: 'select',
            elementConfig: {
                placeholder: 'frm_staff_role',
                options: [
                    {_id: STAFF.level, value: STAFF.level, displayValue: loc[STAFF.name]},
                    {_id: SUB_ADMIN.level, value: SUB_ADMIN.level, displayValue: loc[SUB_ADMIN.name]},
                    {_id: ADMIN.level, value: ADMIN.level, displayValue: loc[ADMIN.name]}
                ]
            },
            value: STAFF.level,
            validation: {
                isRequired:{
                    errMsg: `${loc.is_req}`
                }
            },
            touched: false,
            valid: false,
            shouldValidate: true,
            errorMsg: []
        },
        baseId: {           // pull from the DB
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
    }
})