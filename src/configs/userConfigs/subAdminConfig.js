export const subAdminConfig = {
    role: 3,
    routes:[
        {to: '/dashboard', label: 'nav_home'},
        {to: '/products', label: 'nav_prod_man'},
        {to: '/productTypes', label: 'nav_prod_ty'},
        {to: '/staff', label: 'nav_staff'}
    ],
    formName: {
        productTypes:{
            title: 'cont_product_type',
            create:{    // elements to display for creating a record
                displayValue: true,
                description: true
            },
            update:{  // elements to display when updating
                displayValue: true,
                description: true
            },

            tableDisplay: {     // display table options

                toDisplay:{ // fields to display
                    update: true,
                    main: ['displayValue', 'description']
                }
            }   // end of tableDisplay
        },      // end of types
        products: {
            title: 'cont_product',
            create: {
                name: true,
                code: true,
                description: true,
                image: true,
                sellPrice: true,
                qtyInStock: true,
                prodType: true

                // isReserve
                // isDirect

            },
            update: {
                description: true,
                image: true,
                sellPrice: true,
                qtyInStock: true,
                prodType: true
            },

            tableDisplay: {
                toDisplay:{
                    update: true,
                    main: ['name', 'code', 'qtyInStock' ],
                    popup: ['qtyInStock', 'sellPrice']

                    //onClick, show more details
                }
            }

        },   // end of products
        personal: {
            title: 'cont_personal',
            create: {
                phone: true,
                wechat: true,
                password: true,
                passwordConfirm: true,
            },
        }
    }
}