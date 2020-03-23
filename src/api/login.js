import ajax from '@/assets/js/axios.package';
import url_path from '../assets/js/utils';

let urls = {
//登录
    loginUrl: '/api/admin_root/user/login',
// 身份证登录
     loginCardUrl: '/api/admin_root/user/xuefenLogin',   
//注册
    registerUrl: '/api/admin_root/user/add',
//获取验证码
    getCode: '/api/common/check_code/getcode',
//忘记密码
    forgetPwdUrl: '/api/admin_root/user/edit_password',
    //注册后分类 平台
    platformUrl:'/api/admin_root/category/index',
    //行业
    industryUrl :'/api/admin_root/course_tag/index',
    //身份
    identityUrl:'/api/admin_root/identity/index',
    //完成身份列表
    completeList:'/api/admin_root/user/edit_hb',
}
url_path.autoPrefix(urls)

export default {
    //登陆
    login(obj) {
        return ajax.post(urls.loginUrl, {
            phone: obj.phone || '',
            password: obj.password || '',
            login_type: obj.login_type || '',
            code: obj.code || ''
        })
    },
    login_card(obj) {
        return ajax.post(urls.loginCardUrl, {
            card: obj.card || '',
            name: obj.name || ''
        })
    },
    //获取验证码
    getCode(obj) {
        //console.log('参数对象', obj);
        return ajax.get(urls.getCode, {
            phone: obj.phone,
            type: obj.type
        })
    },
    //注册
    register(obj) {
        return ajax.post(urls.registerUrl, obj)
    },
    //忘记密码
    forgetPassword(obj) {
        return ajax.post(urls.forgetPwdUrl, {
            phone: obj.phone,
            code: obj.code,
            password: obj.password,
            type: obj.type,
            uid: obj.uid || ''
        })
    },
    platformList(obj){
        return ajax.post(urls.platformUrl, obj)
    },
    //行业
    industryUser(obj){
        return ajax.get(urls.industryUrl, obj)
    },
    //身份
    identityList(obj){
        return ajax.get(urls.identityUrl, obj)
    },
    //登录后选择
    goSeeIndex(obj){
        return ajax.post(urls.completeList, obj)
    },
}
