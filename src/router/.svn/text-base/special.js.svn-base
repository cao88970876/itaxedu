export default {
    path: 'special',
    name: 'special',
    component: () => import('../views/special'),
    redirect: {name: 'specialIndex'},
    children: [
        {
            path: 'specialIndex',
            name: 'specialIndex',
            meta: {
                title: '知识专栏'
            },
            component: () => import('../views/special/special-index')
        },
        {
            path: 'specialSearch',
            name: 'specialSearch',
            meta: {
                title: '搜索结果'
            },
            component: () => import('../views/special/special-search')
        },
        {
            path: 'specialDetail/:id',
            name: 'specialDetail',
            meta: {
                title: '专栏详情'
            },
            component: () => import('../views/special/special-detail')
        },
        {
            path: 'specialReader/:specialId/:catalogId/:title',
            name: 'specialReader',
            meta: {
                title: '专栏阅读'
            },
            component: () => import('../views/special/special-reader')
        },
        {
            path: 'specialPay/:id',
            name: 'specialPay',
            meta: {
                title: '专栏支付'
            },
            component: () => import('../views/special/special-pay')
        },
        {
            path: 'specialPayStatus/:orderNum/:id',
            name: 'specialPayStatus',
            meta: {
                title: '专栏支付'
            },
            component: () => import('../views/special/pay-status')
        },
    ]
}
