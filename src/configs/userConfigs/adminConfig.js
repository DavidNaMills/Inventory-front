export const adminConfig = {
    role: 3,
    routes:[
        {to: '/dashboard', label: 'nav_home'},
        {to: '/products', label: 'nav_prod_man'},
        {to: '/productTypes', label: 'nav_prod_ty'},
        {to: '/locations', label: 'nav_location'},
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
                update: true,
                toDisplay:{ // fields to display
                    main: ['displayValue', 'description'],
                    popup: ['displayValue', 'description']

                    //TODO: show more details in the table from backend

                }
            }   // end of tableDisplay
        },      // end of types
        locationTypes:{
            title: 'cont_location_type',
            create:{    // elements to display for creating a record
                displayValue: true,
                description: true
            },
            update:{  // elements to display when updating
                displayValue: true,
                description: true
            },

            tableDisplay: {     // display table options
                update: true,
                toDisplay:{ // fields to display
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
                costPrice: true,
                sellPrice: true,
                qtyInStock: true,
                prodType: true

                // isReserve
                // isDirect

            },
            update: {
                name: true,
                code: true,
                description: true,
                image: true,
                costPrice: true,
                sellPrice: true,
                qtyInStock: true,
                prodType: true
            },

            tableDisplay: {
                update: true,
                toDisplay:{
                    main: ['name', 'code', 'qtyInStock' ],
                    popup: ['qtyInStock', 'costPrice', 'sellPrice']
                    //onClick, show more details
                }
            }

        },   // end of products
        staff: {
            title: 'cont_staff',
            create: {
                name: true,
                phone: true,
                wechat: true,
                password: true,
                role: true,
                baseId: true
            },
            update: {
                role: true,
                baseId: true
            },
            tableDisplay: {
                update: true,
                toDisplay:{
                    main: ['name', 'phone', 'role']
                }
            }   // end of tableDisplay
        },
        personal: {
            title: 'Personal',
            create: {
                phone: true,
                wechat: true,
                password: true,
                passwordConfirm: true,
            },
        }
    }
}