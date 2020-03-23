import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    /*-----------------------------我的学习-----------------------------*/
    getContentByStatus: ['get', '/api/admin_root/content_inventory/index'],
    studyRecord: ['get', '/api/admin_root/study_log/index'],
    /*-----------------------------我的课程-----------------------------*/
    myCourse: ['get', '/api/admin_root/Course/my_index'],
    mySpecial: ['get', '/api/admin_root/knowledge/my_index'],
    myBook: ['get', '/api/admin_root/book/my_index'],
    addComments: ['post', '/api/admin_root/user/add_comments'],
    /*-----------------------------我的收藏-----------------------------*/
    collectionList: ['get', '/api/recruit/user_collect/index_pc'],
})

