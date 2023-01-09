export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            // {
            //     name: 'menu.admin.crud',link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manager-doctor'
            },
            { 
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    },
    
    { //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    { //quản lý cam nang
        name: 'Cẩm nang',
        menus: [
            {
                name: 'Quản lý cẩm nang', link: '/system/manage-handbook'
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.manage-doctor', link: '/system/manager-doctor'
            },
            { //quản lý kế hoạch khám bệnh của bác sĩ   
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            { //quản lý benh nhan khám bệnh của bác sĩ   
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            }
        ]
    }
];
