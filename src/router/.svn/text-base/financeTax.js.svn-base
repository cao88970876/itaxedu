export default {
    path: 'financeTax',
    name: 'financeTax',
    component: () => import('../views/financeTax'),
    redirect: {name: 'financeTaxHome'},
    children: [
        {
            path: 'financeTaxHome',
            name: 'financeTaxHome',
            meta: {
                title: '财税库'
            },
            component: () => import('../views/financeTax/financeTaxHome')
        },
        {
            path: 'searchFinanceTax',
            name: 'searchFinanceTax',
            meta: {
                title: '搜索结果'
            },
            component: () => import('../views/financeTax/searchFinanceTax')
        },
        {
            path: 'financeTaxClassify',
            name: 'financeTaxClassify',
            meta: {
                title: '财税分类'
            },
            component: () => import('../views/financeTax/financeTaxClassify')
        },
        {
            path: 'financeTaxDetail',
            name: 'financeTaxDetail',
            meta: {
                title: '财税库详情'
            },
            component: () => import('../views/financeTax/financeTaxDetail')
        },
    ]
}
