export default {
    path: 'myAccount',
    name: 'myAccount',
    component: () => import('../../views/user/myAccount'),
    redirect: {name: 'accountInfo'},
    children: [
        {
            path: 'accountInfo',
            name: 'accountInfo',
            meta: {
                title: '个人中心-我的账户'
            },
            component: () => import('../../views/user/myAccount/account-info')
        },
        {
            path: 'recharge',
            name: 'recharge',
            meta: {
                title: '个人中心-充值'
            },
            component: () => import('../../views/user/myAccount/income')
        },
        {
            path: 'withdraw',
            name: 'withdraw',
            meta: {
                title: '个人中心-提现'
            },
            component: () => import('../../views/user/myAccount/withdraw')
        },
        {
            path: 'addCard',
            name: 'addCard',
            meta: {
                title: '个人中心-添加银行卡'
            },
            component: () => import('../../views/user/myAccount/add-card')
        },
        {
            path: 'myCoupon',
            name: 'myCoupon',
            meta: {
                title: '我的优惠券'
            },
            component: () => import('../../views/user/myAccount/myCoupon')
        },
        {
            path: 'payStatus/:orderNum',
            name: 'myAccountPayStatus',
            meta: {
                title: '充值状态'
            },
            component: () => import('../../views/user/myAccount/pay-status')
        },
    ]
}
