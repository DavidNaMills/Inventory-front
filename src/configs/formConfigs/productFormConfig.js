// import { ADMIN } from '../../../Consts/roles';

const ADMIN = {
    level: 3
};

export const productFormConfig = (loc)=>({
    title: 'productform_title',
    
    select: [{
        field: 'prodType',
        add: 'products'
    }],

    form: {
        name: {
            id: 'name',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'frm_prod_name'
            },
            value: '',
            validation: {
                isRequired: {
                    errMsg: `${loc.is_req}`
                },
                maxLength: {
                    req: 25,
                    errMsg: `${loc.input_too_long} 25 ${loc.chara}`
                }
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            errorMsg: [],
        },
        code: {
            id: 'code',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'frm_prod_code'
            },
            value: '',
            validation: {
                isRequired: {
                    errMsg: `${loc.is_req}`
                },
                maxLength: {
                    req: 25,
                    errMsg: `${loc.input_too_long} 25 ${loc.chara}`
                }
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            errorMsg: [],
            constraints: null
        },
        description: {
            id: 'description',
            elementType: 'input',
            elementConfig: {
                type: 'textarea',
                placeholder: 'frm_prod_desc'
            },
            value: '',
            validation: {
                maxLength: {
                    req: 50,
                    errMsg: `${loc.input_too_long} 50 ${loc.chara}`
                }
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            errorMsg: [],
            constraints: null
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

        costPrice: {
            id: 'costPrice',
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'frm_prod_costP'
            },
            value: 1,
            validation: {},
            valid: true,
            touched: true,
            shouldValidate: false,
            errorMsg: [],
        },
        sellPrice: {
            id: 'sellPrice',
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'frm_prod_sellP'
            },
            value: 1,
            validation: {},
            valid: false,
            touched: false,
            shouldValidate: false,
            errorMsg: [],
        },

        qtyInStock: {
            id: 'qtyInStock',
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'frm_prod_qty'
            },
            value: 0,
            validation: {},
            valid: false,
            touched: false,
            shouldValidate: false,
            errorMsg: [],
        },
        supplierId: {
            id: 'supplierId',
            elementType: 'select',
            elementConfig: {
                placeholder: 'frm_prod_supp',
                options: []
            },
            value: null,
            validation: {},
            valid: true,
            touched: false,
            shouldValidate: false,
            errorMsg: []
        },
        isReserve: {
            id: 'isReserve',
            elementType: 'inputcheckbox',
            elementConfig: {
                type: 'checkbox',
                placeholder: 'frm_prod_resr'
            },
            value: false,
            validation: {},
            valid: false,
            touched: false,
            shouldValidate: false,
            errorMsg: []
        },
        isDirect: {
            id: 'isDirect',
            elementType: 'inputcheckbox',
            elementConfig: {
                type: 'checkbox',
                placeholder: 'frm_prod_dirc'
            },
            value: false,
            validation: {},
            valid: false,
            touched: false,
            shouldValidate: false,
            errorMsg: []
        },
        prodType: {
            id: 'prodType',
            elementType: 'select',
            elementConfig: {
                placeholder: 'frm_prod_type',
                options: []
            },
            value: '',
            validation: {
                isRequired:{
                    errMsg: `${loc.select_one}`
                }
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            errorMsg: []
        }
    }
})