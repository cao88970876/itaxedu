import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    courseList: ['get', '/api/admin_root/course/index'],
    courseDetail: ['get', '/api/admin_root/course/detail'],
    courseTeacher: ['get', '/api/admin_root/course/teacher'],
    courseComment: ['get', '/api/admin_root/course/comments'],
    courseTable: ['get', '/api/admin_root/course/tables'],
    courseJoin: ['post', '/api/admin_root/course_apply/add'],
    giving: ['post', '/api/admin_root/course/giving'],
    freePay: ['post', '/api/admin_root/content_order/free_add'],
    courseProgress: ['post', '/api/admin_root/course/inventory'],
    liveSign: ['post', '/api/admin_root/course/wei_sign'],
    getSpecialList: ['get', '/api/admin_root/knowledge/index'],
    getSpecialDetail: ['get', '/api/admin_root/knowledge/detail'],
    getSpecialCatalogList: ['get', '/api/admin_root/knowledge/catalog'],
    getSpecialCatalogDetail: ['get', '/api/admin_root/knowledge/catalog_detail'],
    getCatalogCommentList: ['get', '/api/admin_root/knowledge/log_comment'],
    createSpecialComment: ['post', '/api/admin_root/knowledge/log_add'],
    specialLikeAdd: ['post', '/api/admin_root/knowledge/like_add'],
    specialLikeCancel: ['post', '/api/admin_root/knowledge/use_like'],
    getBookList: ['get', '/api/admin_root/book/index'],
    getBookDetail: ['get', '/api/admin_root/book/detail'],
    getBookCatalog: ['get', '/api/admin_root/book/catalog'],
    getBookCatalogDetail: ['get', '/api/admin_root/book/catalog_detail'],
    getQuestion: ['get', '/api/admin_root/course/question'],
    courseQuestion: ['get', '/api/admin_root/course/user_option'],//提交试题
})
