export default {
    path: 'myCourse',
    name: 'myCourse',
    component: () => import('../../views/user/myCourse'),
    redirect: {name: 'myContentList'},
    children: [{
        path: 'list',
        name: 'myContentList',
        meta: {
            title: '个人中心-我的课程'
        },
        component: () => import('../../views/user/myCourse/my-course')
    },{
        path: 'addComments/:type/:contentId',
        name: 'addComments',
        meta: {
            title: '个人中心-我的课程-评价'
        },
        component: () => import('../../views/user/myCourse/add-comments')
    }]
}
