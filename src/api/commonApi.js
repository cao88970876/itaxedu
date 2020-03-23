import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    // (课程专栏电子书)收藏
    addCollect: ['post', '/api/admin_root/user/add_collect'],
    // (课程专栏电子书)取消收藏
    delCollect: ['post', '/api/admin_root/user/del_collect'],
    // 分享内容
    shareContent: ['post', '/api/admin_root/integral_config/content'],
    // bannerApi
    bannerList: ['get', '/api/common/banner/index'],
    //项目收藏
    projectCollect:['post','/api/shopping/item/collect'],
    // 获取手续费&联系电话
    serverConf: ['post', '/api/admin_root/platform_config/index'],

})
