export default {
    path: 'myOrder',
    name: 'myOrder',
    component: () => import('../views/user/myOrder'),
    redirect: {name: 'myOrderHome'},
    children: [
        {
            path: 'myOrderHome',
            name: 'myOrderHome',
            meta: {
                title: '我的订单'
            },
            component: () => import('../views/user/myOrder/myOrderHome')
        },
        {
            path: 'receiptGoods',
            name: 'receiptGoods',
            meta: {
                title: '我的订单详情'
            },
            component: () => import('../views/user/myOrder/receiptGoods')
        },
        {
            path: 'evaluateGoods',
            name: 'evaluateGoods',
            meta: {
                title: '我的订单详情'
            },
            component: () => import('../views/user/myOrder/evaluateGoods')
        },
        {
            path: 'commentGoods',
            name: 'commentGoods',
            meta: {
                title: '立即评价'
            },
            component: () => import('../views/user/myOrder/commentGoods')
        },
        {
            path: 'complete',
            name: 'complete',
            meta: {
                title: '已完成详情'
            },
            component: () => import('../views/user/myOrder/complete')
        },
        {
            path: 'afterSale',
            name: 'afterSale',
            meta: {
                title: '申请售后'
            },
            component: () => import('../views/user/myOrder/afterSale')
        },
        {
            path: 'refund',
            name: 'refund',
            meta: {
                title: '售后处理'
            },
            component: () => import('../views/user/myOrder/refund')
        },
    ]
}
