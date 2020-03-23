import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    getStore: ['get', '/api/admin_root/user/stores'],
    // 点击关注/取消
    favStore: ['get', '/api/recruit/user_attention/attention'],
    myFocus: ['get', '/api/recruit/user_attention/index_pc'],
    xuefenNotify: ['get', '/api/admin_root/xuefen_notify/list'],
    notifyPage: ['get', '/api/admin_root/xuefen_notify/page'],
    notifyPageDetail: ['get', '/api/admin_root/xuefen_notify/detail'],
})
