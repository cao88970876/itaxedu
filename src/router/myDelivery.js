export default {
    path: 'myDelivery',
    name: 'myDelivery',
    component: () => import('../views/user/myDelivery'),
    redirect: {name: 'deliveryList'},
    children: [
        {
            path: 'deliveryList',
            name: 'deliveryList',
            meta: {
                title: '个人中心-我的投递'
            },
            component: () => import('../views/user/myDelivery/deliveryList')
        },
        {
            path: 'deliveryListDetail',
            name: 'deliveryListDetail',
            meta: {
                title: '个人中心-职位详情'
            },
            component: () => import('../views/user/myDelivery/deliveryListDetail')
        },
    ]
}
