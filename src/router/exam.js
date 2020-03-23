export default {
    path: 'exam',
    name: 'exam',
    component: () => import('../views/exam'),
    redirect: {name: 'examNote'},
    children: [
        {
            path: 'examNote',
            name: 'examNote',
            meta: {
                title: '考试须知'
            },
            component: () => import('../views/exam/examNote')
        },
        {
            path: 'examinfor',
            name: 'examinfor',
            meta: {
                title: '完善信息'
            },
            component: () => import('../views/exam/examInformation')
        },{
            path: 'examStudy',
            name: 'examStudy',
            meta: {
                title: '课程学习'
            },
            component: () => import('../views/exam/examStudy')
        },{
            path: 'examPage',
            name: 'examPage',
            meta: {
                title: '考试'
            },
            component: () => import('../views/exam/examPage')
        },{
            path: 'examCertificate',
            name: 'examCertificate',
            meta: {
                title: '考试'
            },
            component: () => import('../views/exam/examCertificate')
        },{
            path: 'examEntrance',
            name: 'examEntrance',
            meta: {
                title: '考试入口'
            },
            component: () => import('../views/exam/examEntrance')
        },{
            path: 'notifyPage',
            name: 'notifyPage',
            meta: {
                title: '学习信息'
            },
            component: () => import('../views/exam/notifyPage')
        },{
            path: 'notifyPageDetail',
            name: 'notifyPageDetail',
            meta: {
                title: '学习信息详情'
            },
            component: () => import('../views/exam/notifyPageDetail')
        },
        
    ]
}
