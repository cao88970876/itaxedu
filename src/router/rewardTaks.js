export default {
    path: 'myTask',
    name: 'myTask',
    component: () => import('../views/user/rewardtask'),
    redirect: {name: 'myTaskHome'},
    children: [
        {
            path: 'myTaskHome',
            name: 'myTaskHome',
            meta: {
                title: '悬赏任务'
            },
            component: () => import('../views/user/rewardTask/myTaskHome')
        },
        {
            path: 'postingDetails',
            name: 'postingDetails',
            meta: {
                title: '发布任务详情'
            },
            component: () => import('../views/user/rewardtask/postingDetails')
        },
        {
            path: 'accept',
            name: 'accept',
            meta: {
                title: '接收任务详情'
            },
            component: () => import('../views/user/rewardtask/accept')
        },
        {
            path: 'completeDetails',
            name: 'completeDetails',
            meta: {
                title: '已完成'
            },
            component: () => import('../views/user/rewardtask/completeDetails')
        },
    ]
}
