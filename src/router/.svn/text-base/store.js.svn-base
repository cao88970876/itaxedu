export default {
    path: 'store',
    name: 'store',
    component: () => import('../views/store/store'),
    children: [
        {
            path: 'storeCourse/:id',
            name: 'storeCourse',
            meta: {
                title: '商铺-课程'
            },
            component: () => import('../views/store/store-course')
        },
        {
            path: 'storeSpecial/:id',
            name: 'storeSpecial',
            meta: {
                title: '商铺-专栏'
            },
            component: () => import('../views/store/store-special')
        },
        {
            path: 'storeBook/:id',
            name: 'storeBook',
            meta: {
                title: '商铺-电子书'
            },
            component: () => import('../views/store/store-book')
        },
        {
            path: 'storeShoppe/:id',
            name: 'storeShoppe',
            meta: {
                title: '商铺-商城'
            },
            component: () => import('../views/store/store-shoppe')
        },
        {
            path: 'storeProject/:id',
            name: 'storeProject',
            meta: {
                title: '商铺-项目'
            },
            component: () => import('../views/store/store-project')
        },
    ]
}
