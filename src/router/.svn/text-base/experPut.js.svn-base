export default {
    path: 'experPut',
    name: 'experPut',
    component: () => import('../views/user/experPut'),
    redirect: {name: 'experPutHome'},
    children: [
        {
            path: 'experPutHome',
            name: 'experPutHome',
            meta: {
                title: '专家提问'
            },
            component: () => import('../views/user/experPut/experPutHome')
        },
        // {
        //     path: 'myProjectDetails',
        //     name: 'myProjectDetails',
        //     meta: {
        //         title: '我的项目详情'
        //     },
        //     component: () => import('../views/user/experPut/myProjectDetails')
        // },
    ]
}
