export default {
    path: 'myCollection',
    name: 'myCollection',
    component: () => import('../../views/user/myCollection'),
    redirect: {name: 'collectionList'},
    children: [{
        path: 'collectionList',
        name: 'collectionList',
        meta: {
            title: '个人中心-我的课程'
        },
        component: () => import('../../views/user/myCollection/collection-list')
    }]
}
