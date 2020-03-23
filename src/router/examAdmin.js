export default {
    path: 'examAdmin',
    name: 'examAdmin',
    component: () => import('../views/examAdmin'),
    redirect: {name: 'examAdminLogin'},
    children: [
        {
            path: 'examAdminLogin',
            name: 'examAdminLogin',
            meta: {
                title: '学分考试管理员登录'
            },
            component: () => import('../views/examAdmin/examAdminLogin')
        },
        {
            path: 'examAdminCheck',
            name: 'examAdminCheck',
            meta: {
                title: '学分考试管理员验证证书'
            },
            component: () => import('../views/examAdmin/examAdminCheck')
        },
        {
            path: 'examAdminCheckList',
            name: 'examAdminCheckList',
            meta: {
                title: '学分考试管理员验证证书列表'
            },
            component: () => import('../views/examAdmin/examAdminCheckList')
        },
    ]
}
