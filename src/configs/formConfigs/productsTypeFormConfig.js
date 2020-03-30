
const filterProducts = (data)=>data.filter(x=>x.which==='PRODUCTS');

export const productsTypeFormConfig = (loc)=>({
    title: 'productsTypeForm_title',
    preFilter: filterProducts,
    form: {
        displayValue: {
            id: 'displayValue',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'frm_prodT_name'
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
            valid: false,
            touched: false,
            shouldValidate: true,
            errorMsg: []
        },
        description: {
            id: 'description',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'frm_prod_desc'
            },
            value: '',
            validation: {
                maxLength: {
                    req: 20,
                    errMsg: `${loc.input_too_long} 20 ${loc.chara}`
                }
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            errorMsg: []
        }
    }
})