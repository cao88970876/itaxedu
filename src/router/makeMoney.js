export default {
    path: 'makeMoney',
    name: 'makeMoney',
    component: () => import('../views/user/makeMoney'),
    redirect: {name: 'makeMoneyHome'},
    children: [
        {
            path: 'makeMoneyHome',
            name: 'makeMoneyHome',
            meta: {
                title: '邀请赚佣金'
            },
            component: () => import('../views/user/makeMoney/makeMoneyHome')
        },
        {
            path: 'hisMember',
            name: 'hisMember',
            meta: {
                title: '他的会员'
            },
            component: () => import('../views/user/makeMoney/hisMember')
        },
        {
            path: 'memberDetails',
            name: 'memberDetails',
            meta: {
                title: '会员详情'
            },
            component: () => import('../views/user/makeMoney/memberDetails')
        },
    ]
}
