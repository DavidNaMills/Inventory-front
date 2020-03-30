export const staffConfig = {
    role: 1,
    routes:[
        {to: '/dashboard', label: 'nav_home'},
        {to: '/staff', label: 'nav_staff'}
    ],
    formName: {
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