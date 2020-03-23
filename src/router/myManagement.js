export default {
    path: 'myManagement',
    name: 'myManagement',
    component: () => import('../views/user/myManagement'),
    redirect: {name: 'managementRecruit'},
    children: [
        {
            path: 'managementRecruit',
            name: 'managementRecruit',
            meta: {
                title: '个人中心-招聘管理'
            },
            component: () => import('../views/user/myManagement/managementRecruit')
        },{
            path: 'jobmanagement',
            name: 'jobmanagement',
            meta: {
                title: '个人中心-招聘管理'
            },
            component: () => import('../views/user/myManagement/jobmanagement')
        },{
            path: 'managementRecruitDetail',
            name: 'managementRecruitDetail',
            meta: {
                title: '个人中心-招聘管理详情'
            },
            component: () => import('../views/user/myManagement/managementRecruitDetail')
        },{
            path: 'addJob',
            name: 'addJob',
            meta: {
                title: '个人中心-职位管理'
            },
            component: () => import('../views/user/myManagement/addJob')
        },{
            path: 'modifyjob',
            name: 'modifyjob',
            meta: {
                title: '个人中心-编辑职位'
            },
            component: () => import('../views/user/myManagement/modifyjob')
        }
    ]
}
