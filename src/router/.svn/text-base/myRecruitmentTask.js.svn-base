export default {
    path: 'myRecruitmentTask',
    name: 'myRecruitmentTask',
    component: () => import('../views/user/myRecruitmentTask'),
    redirect: {name: 'taskList'},
    children: [
        {
            path: 'taskList',
            name: 'taskList',
            meta: {
                title: '个人中心-招聘任务'
            },
            component: () => import('../views/user/myRecruitmentTask/taskList')
        },
        {
            path: 'taskListDetail',
            name: 'taskListDetail',
            meta: {
                title: '个人中心-任务详情'
            },
            component: () => import('../views/user/myRecruitmentTask/taskListDetail')
        },
        {
            path: 'add_task',
            name: 'add_task',
            meta: {
                title: '个人中心-发布任务'
            },
            component: () => import('../views/user/myRecruitmentTask/add_task')
        },{
            path: 'tasksuccess',
            name: 'tasksuccess',
            meta: {
                title: '个人中心-取消发布任务'
            },
            component: () => import('../views/user/myRecruitmentTask/tasksuccess')
        },{
            path: 'paySee',
            name: 'TaskpaySee',
            meta: {
                title: '个人中心-支付中心'
            },
            component: () => import('../views/user/myRecruitmentTask/paySee')
        },{
            path: 'pay-status',
            name: 'myRecruitmentTaskPay',
            meta: {
                title: '个人中心-发布任务支付'
            },
            component: () => import('../views/user/myRecruitmentTask/pay-status')
        }
    ]
}
