export default {
    path: 'anwserAi',
    name: 'anwserAi',
    meta: {
        title: '智能疑答'
    },
    component: () => import('../views/intelligence'),
    children: [
        {
            path: 'intelligence',
            name: 'intelligence',
            meta: {
                title: '智能疑答'
            },
            component: () => import('../views/intelligence/intelligence')
        },
    ]
}
