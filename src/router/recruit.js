export default {
    path: '/recruit',
    name: 'recruit',
    meta: {
        title: '企业招聘'
    },
    component: () => import('../views/recruit'),
    children: [
        {
            path: 'recruitList',
            name: 'recruitList',
            meta: {
                title: '企业招聘'
            },
            component: () => import('../views/recruit/recruitList'),
        },
        {
            path: 'recruitSearch',
            name: 'recruitSearch',
            meta: {
                title: '搜索结果'
            },
            component: () => import('../views/recruit/recruitSearch'),
        },
        {
            path: 'recruitDetails',
            name: 'recruitDetails',
            meta: {
                title: '职位详情'
            },
            component: () => import('../views/recruit/recruitDetails'),
        },
        {
            path: 'resumeDetail',
            name: 'resumeDetail',
            meta: {
                title: '求职者详情'
            },
            component: () => import('../views/recruit/resumeDetail'),
        },
        {
            path: 'searchResult',
            name: 'recruitSearchResult',
            meta: {
                title: '搜索结果'
            },
            component: () => import('../views/recruit/searchResult'),
        },{
            path: 'recruitTaskDetails',
            name: 'recruitTaskDetails',
            meta: {
                title: '职位详情'
            },
            component: () => import('../views/recruit/recruitTaskDetails'),
        },{
            path: 'paySee',
            name: 'recruitPaySee',
            meta: {
                title: '支付'
            },
            component: () => import('../views/recruit/paySee'),
        },{
            path: 'pay-status',
            name: 'recruitPayStatus',
            meta: {
                title: '支付方式'
            },
            component: () => import('../views/recruit/pay-status'),
        }
    ]
}
