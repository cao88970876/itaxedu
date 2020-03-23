import ajax from '@/assets/js/axios.package';
import url_path from '../assets/js/utils';
const urls = {
    //分类
    projectClassificationUrl :'/api/shopping/item/home',
    //项目详情列表
    projectDetailsListUrl:'/api/shopping/item/datalist',
    //单个项目详情
    projectDetailsUrl:'/api/shopping/item/details',
    //在线报名
    signUpUrl:'/api/shopping/item/apply',
    //购买项目
    buyProjectUrl:'/api/shopping/item/add_order'
}
url_path.autoPrefix(urls)
export default {
    //项目分类
    projectClassification(obj){
        return ajax.post(urls.projectClassificationUrl,obj)
    },
    //项目列表
    projectDetailsList(obj) {
        return ajax.post(urls.projectDetailsListUrl,obj)
    },
    //项目详情
    projectDetails(obj){
        return ajax.post(urls.projectDetailsUrl,obj)
    },
    //在线报名
    signUp(obj){
        return ajax.post(urls.signUpUrl,obj)
    },
    //购买
    buyProject(obj){
        return ajax.post(urls.buyProjectUrl,obj)
    }


}
