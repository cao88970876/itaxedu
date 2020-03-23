export default {
    path: 'answer',
    name: 'answer',
    meta: {
        title: '财税问答'
    },
    component: () => import('../views/answer'),
    children: [
        {
            path: 'answerList',
            name: 'answerList',
            meta: {
                title: '财税问答'
            },
            component: () => import('../views/answer/answer')
        },
        {
            path: 'answerDetails',
            name: 'answerDetails',
            meta: {
                title: '已解决问题'
            },
            component: () => import('../views/answer/answerDetails')
        },
        {
            path: 'paySee',
            name: 'paySee',
            meta: {
                title: '立即支付'
            },
            component: () => import('../views/answer/paySee')
        },
        {
            path: 'answerSearch',
            name: 'answerSearch',
            meta: {
                title: '搜索结果'
            },
            component: () => import('../views/answer/answerSearch')
        },
        {
            path: 'pay',
            name: 'pay',
            meta: {
                title: '支付'
            },
            component: () => import('../views/answer/pay')
        },
        {
            path: 'alreadyPaid',
            name: 'alreadyPaid',
            meta: {
                title: '已支付'
            },
            component: () => import('../views/answer/alreadyPaid')
        },
        {
            path: 'putQuestions',
            name: 'putQuestions',
            meta: {
                title: '快速提问'
            },
            component: () => import('../views/answer/putQuestions')
        },
        {
            path: 'questionsPay',
            name: 'questionsPay',
            meta: {
                title: '快速提问支付'
            },
            component: () => import('../views/answer/questionsPay')
        },
        {
            path: 'searchExpert',
            name: 'searchExpert',
            meta: {
                title: '找专家'
            },
            component: () => import('../views/answer/searchExpert')
        },
        {
            path: 'expertDetails',
            name: 'expertDetails',
            meta: {
                title: '专家详情'
            },
            component: () => import('../views/answer/expertDetails')
        },
        {
            path: 'immediately',
            name: 'immediately',
            meta: {
                title: '立即提问'
            },
            component: () => import('../views/answer/immediately')
        },
        {
            path: 'unanswered',
            name: 'unanswered',
            meta: {
                title: '财税问答专家'
            },
            component: () => import('../views/answer/unanswered')
        },
        {
            path: 'unansweredDetails',
            name: 'unansweredDetails',
            meta: {
                title: '未解答详情'
            },
            component: () => import('../views/answer/unansweredDetails')
        },
        {
            path: 'immediatelyAnswer',
            name: 'immediatelyAnswer',
            meta: {
                title: '立即解答'
            },
            component: () => import('../views/answer/immediatelyAnswer')
        },
        {
            path: 'searchResult',
            name: 'answerSearchResult',
            meta: {
                title: '搜索结果'
            },
            component: () => import('../views/answer/searchResult')
        },
        {
            path: 'inquiriesPay',
            name: 'inquiriesPay',
            meta: {
                title: '追问支付'
            },
            component: () => import('../views/answer/inquiriesPay')
        },
        {
            path: 'myImmediatel',
            name: 'myImmediatel',
            meta: {
                title: '立即回答'
            },
            component: () => import('../views/answer/myImmediatel')
        },
        {
            path: 'expertsAnswerPuestions',
            name: 'expertsAnswerPuestions',
            meta: {
                title: '立即回答追问'
            },
            component: () => import('../views/answer/expertsAnswerPuestions')
        },
        {
            path: 'fastPaySee',//快速提问
            name: 'fastPaySee',
            meta: {
                title: '快速提问'
            },
            component: () => import('../views/answer/fastPaySee')
        },
        {
            path: 'fastStatus',//快速提问
            name: 'fastStatus',
            meta: {
                title: '支付状态'
            },
            component: () => import('../views/answer/fastStatus')
        },
        {
            path: 'answerStatus',// paysee 跳过去的
            name: 'answerStatus',
            meta: {
                title: '支付状态'
            },
            component: () => import('../views/answer/answerStatus')
        },
        {
            path: 'searchExpertQuzi',// 专家 跳过去的
            name: 'searchExpertQuzi',
            meta: {
                title: '专家提问'
            },
            component: () => import('../views/answer/searchExpertQuzi')
        },
        {
            path: 'searchExpertPay',// 专家提问付费跳过去的
            name: 'searchExpertPay',
            meta: {
                title: '专家提问付费'
            },
            component: () => import('../views/answer/searchExpertPay')
        },
        {
            path: 'expertPayType',// 专家提问付费跳过去的
            name: 'expertPayType',
            meta: {
                title: '专家提问支付'
            },
            component: () => import('../views/answer/expertPayType')
        },
        {
            path: 'inquiriesStatus',// 追问的状态
            name: 'inquiriesStatus',
            meta: {
                title: '支付状态'
            },
            component: () => import('../views/answer/inquiriesStatus')
        },
    ]
}
