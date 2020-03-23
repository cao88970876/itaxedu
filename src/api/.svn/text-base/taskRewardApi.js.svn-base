import ajax from '@/assets/js/axios.package';
import url_path from '../assets/js/utils';
const urls = {
    //任务分类
    taskClassifyUrl:'/api/shopping/task/classify',
    //任务列表
    taskRewardListUrl:'/api/shopping/task/datalist',
    //任务详情
    taskDetailsUrl:'/api/shopping/task/details',
    //发布任务
    taskReleaseUrl:'/api/shopping/task/add',
    //接受任务
    doTaskUrl:'/api/shopping/task/accept_task',
};
url_path.autoPrefix(urls)
export default {
    //分类
    taskclassifyList(obj){
        return ajax.post(urls.taskClassifyUrl,obj)
    },
    //主页列表
    taskRewardList(obj){
        return ajax.post(urls.taskRewardListUrl,obj)
    },
    //任务详情
    taskDetails(obj){
        return ajax.post(urls.taskDetailsUrl,obj)
    },
    //发布悬赏
    taskRelease(obj){
        return ajax.post(urls.taskReleaseUrl,obj)
    },
    doTask(obj){
        return ajax.post(urls.doTaskUrl,obj)
    }
}

