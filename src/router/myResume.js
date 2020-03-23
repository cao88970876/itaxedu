export default {
    path: 'myResume',
    name: 'myResume',
    component: () => import('../views/user/myResume'),
    redirect: {name: 'userResume'},
    children: [
        {
            path: 'resume',
            name: 'userResume',
            meta: {
                title: '个人中心-我的简历'
            },
            component: () => import('../views/user/myResume/resume')
        },
    ]
}
