import ajax from '@/assets/js/axios.package';
import url_path from '../assets/js/utils';
//帮助中心问题分类
// let helpUrl = url_path.api+'/api/admin_root/help_cate/index'
// //问题列别
// let helplistUrl = url_path.api+'/api/admin_root/help/index'
let urls = {
//登录
    helpUrl: '/api/admin_root/help_cate/index',
//注册
    helplistUrl: '/api/admin_root/help/index',
//
}
url_path.autoPrefix(urls)
export default{
    helpCate() {
        return ajax.post(urls.helpUrl)
    },
    helpList(obj) {
        return ajax.post(urls.helplistUrl,obj)
    },



}
