export default {
    path: 'myAnswer',
    name: 'myAnswer',
    component: () => import('../views/user/myAnswer'),
    redirect: {name: 'myAnswerHome'},
    children: [
        {
            path: 'myAnswerHome',
            name: 'myAnswerHome',
            meta: {
                title: '问题列表'
            },
            component: () => import('../views/user/myAnswer/myAnswerHome')
        },
        {
            path: 'myQuestions',
            name: 'myQuestions',
            meta: {
                title: '提问详情'
            },
            component: () => import('../views/user/myAnswer/myQuestions')
        },
        {
            path: 'inquiriesDetails',
            name: 'inquiriesDetails',
            meta: {
                title: '追问详情'
            },
            component: () => import('../views/user/myAnswer/inquiriesDetails')
        },
        {
            path: 'toPeek',
            name: 'toPeek',
            meta: {
                title: '偷看详情'
            },
            component: () => import('../views/user/myAnswer/toPeek')
        },
        {
            path: 'noAnswerDetails',
            name: 'noAnswerDetails',
            meta: {
                title: '未回答详情'
            },
            component: () => import('../views/user/myAnswer/noAnswerDetails')
        },
        {
            path: 'alreadyAnswerDetails',
            name: 'alreadyAnswerDetails',
            meta: {
                title: '已回答详情'
            },
            component: () => import('../views/user/myAnswer/alreadyAnswerDetails')
        },
        {
            path: 'expertInquiries',
            name: 'expertInquiries',
            meta: {
                title: '追问详情'
            },
            component: () => import('../views/user/myAnswer/expertInquiries')
        },
    ]
}
