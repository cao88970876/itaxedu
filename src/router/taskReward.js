export default {
    path: 'task',
    name: 'task',
    meta: {
        title: '任务悬赏'
    },
    component: () => import('../views/taskReward'),
    children: [
        {
            path: 'taskReward',
            name: 'taskReward',
            meta: {
                title: '任务悬赏'
            },
            component: () => import('../views/taskReward/taskReward')
        },
        {
            path: 'taskDetails',
            name: 'taskDetails',
            meta: {
                title: '任务详情'
            },
            component: () => import('../views/taskReward/taskDetails')
        },
        {
            path: 'release',
            name: 'release',
            meta: {
                title: '发布任务'
            },
            component: () => import('../views/taskReward/release')
        },
        {
            path: 'promptlyPay',
            name: 'promptlyPay',
            meta: {
                title: '立即支付'
            },
            component: () => import('../views/taskReward/promptlyPay')
        },
        {
            path: 'payTask',
            name: 'payTask',
            meta: {
                title: '立即成功'
            },
            component: () => import('../views/taskReward/payTask')
        },
    ]
}
