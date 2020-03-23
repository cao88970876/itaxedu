export default {
    path: 'myStudy',
    name: 'myStudy',
    component: () => import('../../views/user/myStudy/index'),
    redirect: {name: 'myContent'},
    children: [{
        path: 'myContent',
        name: 'myContent',
        meta: {
            title: '个人中心-我的学习'
        },
        component: () => import('../../views/user/myStudy/my-content')
    }]
}
