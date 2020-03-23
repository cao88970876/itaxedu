export default {
    path: 'books',
    name: 'books',
    component: () => import('../views/books'),
    redirect: {name: 'booksIndex'},
    children: [
        {
            path: 'booksIndex',
            name: 'booksIndex',
            meta: {
                title: '电子书'
            },
            component: () => import('../views/books/books-index')
        },
        {
            path: 'booksSearch',
            name: 'booksSearch',
            meta: {
                title: '搜索结果'
            },
            component: () => import('../views/books/books-search')
        },
        {
            path: 'booksDetail/:id',
            name: 'booksDetail',
            meta: {
                title: '电子书详情'
            },
            component: () => import('../views/books/books-detail')
        },
        {
            path: 'bookReader/:bookId/:catalogId',
            name: 'bookReader',
            meta: {
                title: '电子书'
            },
            component: () => import('../views/books/book-reader')
        },
        {
            path: 'booksPay/:id',
            name: 'booksPay',
            meta: {
                title: '电子书支付'
            },
            component: () => import('../views/books/books-pay')
        },
        {
            path: 'booksPayStatus/:orderNum/:id',
            name: 'booksPayStatus',
            meta: {
                title: '电子书支付'
            },
            component: () => import('../views/books/pay-status')
        },
    ]
}
