export default {
    path: '/fineGoods',
    name: 'fineGoods',
    meta: {
        title: '精品商品'
    },
    component: () => import('../views/fineGoods'),
    redirect: {name: 'goodsAll'},
    children: [
        {
            path: 'goodsAll',
            name: 'goodsAll',
            meta: {
                title: '商品列表'
            },
            component: () => import('../views/fineGoods/fineGoods'),
        },
        {
            path: 'goodsDetailed',
            name: 'goodsDetailed',
            meta: {
                title: '商品详细'
            },
            component: () => import('../views/fineGoods/goodsDetailed'),
        },
        {
            path: 'searchGoods',
            name: 'searchGoods',
            meta: {
                title: '搜索结果'
            },
            component: () => import('../views/fineGoods/searchGoods'),
        },
        {
            path: 'goodsOrder',
            name: 'goodsOrder',
            meta: {
                title: '单品购买'
            },
            component: () => import('../views/fineGoods/goodsOrder'),
        },
        {
            path: 'addressManagemen',
            name: 'addressManagemen',
            meta: {
                title: '地址管理'
            },
            component: () => import('../views/fineGoods/addressManagemen'),
        },
        {
            path: 'shoppingCart',
            name: 'shoppingCart',
            meta: {
                title: '购物车'
            },
            component: () => import('../views/fineGoods/shoppingCart'),
        },
        {
            path: 'shoppingCarts',
            name: 'shoppingCarts',
            meta: {
                title: '购物车'
            },
            component: () => import('../views/fineGoods/shoppingCarts'),
        },
        {
            path: 'multipleBuy',
            name: 'multipleBuy',
            meta: {
                title: '确认购买'
            },
            component: () => import('../views/fineGoods/multipleBuy'),
        },
        {
            path: 'singleGoods',
            name: 'singleGoods',
            meta: {
                title: '单个购买'
            },
            component: () => import('../views/fineGoods/singleGoods'),
        },
        {
            path: 'goodsPayType',
            name: 'goodsPayType',
            meta: {
                title: '支付状态'
            },
            component: () => import('../views/fineGoods/goodsPayType'),
        },
        {
            path: 'multipleFindOrder',
            name: 'multipleFindOrder',
            meta: {
                title: '支付状态'
            },
            component: () => import('../views/fineGoods/multipleFindOrder'),
        },
    ]
}
