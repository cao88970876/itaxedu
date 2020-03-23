export default {
    path: 'myProject',
    name: 'myProject',
    component: () => import('../views/user/myProject'),
    redirect: {name: 'myProjectHome'},
    children: [
        {
            path: 'myProjectHome',
            name: 'myProjectHome',
            meta: {
                title: '我的项目'
            },
            component: () => import('../views/user/myProject/myProjectHome')
        },
        {
            path: 'myProjectDetails',
            name: 'myProjectDetails',
            meta: {
                title: '我的项目详情'
            },
            component: () => import('../views/user/myProject/myProjectDetails')
        },
    ]
}
