import ajax from '../assets/js/axios.package';
import url_path from '../assets/js/utils';

const urls = {
    recruitUser: '/api/recruit/recruit_user/index_pc',// 招聘岗位
    taskUser: '/api/recruit/recruit_user/task_index_pc',//招聘任务
    userSearchIndex: '/api/recruit/recruit_institution/search_index_pc',//人才搜索
    workSearchIndex: '/api/recruit/recruit_user/search_index_pc',//岗位搜索
    recruitUserDetail: '/api/recruit/recruit_user/show', //招聘岗位详情
    Sendresume_id: '/api/recruit/recruit_user/send_resume',  //发送简历
    task_show_id: '/api/recruit/recruit_institution/task_show',
    institution: '/api/recruit/recruit_institution/index_pc',//招聘人才
    resumeUser: '/api/recruit/recruit_institution/resume_show',
    // resumeUser: '/api/recruit/recruit_institution/resume_pay_order_show',
    recruit_dictionary: '/api/recruit/recruit_dictionary/index',//赛选条件
    province: '/api/recruit/region/province',//省份列表
    acceptTasks: '/api/recruit/recruit_institution/accept_task',//接受任务
    learnExperiences: '/api/admin_root/content_inventory/study_chart',//  学习经历
    learnInventoryList: '/api/admin_root/content_inventory/study_list',// 学习经历列表数据
    resume_pay: '/api/recruit/recruit_institution/resume_pay',//简历支付
    Isresumepay: '/api/recruit/recruit_institution/resume_pay_order_show',//查看简历是否支付成功
    accountInfo: [ '/api/admin_root/user/info'],
}

url_path.autoPrefix(urls)

export default {
    //G1-企业招聘
    userRecruit(obj) {
        return ajax.get(urls.recruitUser,{
            pageSize: obj.page_size,
            page:obj.page
        })
    },
    //G1-1-招聘任务
    userTask(obj) {
        return ajax.get(urls.taskUser,{
            page_size: obj.pageSize,
            page:obj.page,
        })
    },
    //人才搜索
    usersearch_index(obj){
        return ajax.get(urls.userSearchIndex,{
            page:obj.page,
            page_size:obj.page_size,
            position_type:obj.position_type,
            salary_min:obj.salary_min,
            salary_max:obj.salary_max,
            year_num:obj.year_num,
            education:obj.education,
        })
    },
    //岗位搜索
    worksearch_index(obj){
        return ajax.get(urls.workSearchIndex,{
            page:obj.page,
            page_size:obj.page_size,
            name:obj.name,
            province_id:obj.province_id,
            city_id:obj.city_id,
            salary_min:obj.salary_min,
            salary_max:obj.salary_max,
            work_experience:obj.year_num,
            education:obj.education,
            work_nature:obj.work_nature,//工作性质
        })
    },
    //招聘岗位详情
    recruitUserDetail_id(obj){
        return ajax.get(urls.recruitUserDetail,obj)
    },
    // 招聘获取筛选条件
    recruit_dictionary(obj){
        return ajax.get(urls.recruit_dictionary,obj)
    },
    //发送简历
    Sendresume_id(obj){
        return ajax.get(urls.Sendresume_id,obj)
    },
    acceptTask(obj) { // 接收任务
        return ajax.post(urls.acceptTasks,obj)
    },
    //招聘任务详情
    task_show_id(obj){
        return ajax.get(urls.task_show_id,obj)
    },
    //招聘人才
    EnterpriseInstitution(obj){
        return ajax.get(urls.institution,obj)
    },
    //G12-求职者详情
    resumeUser(obj){
        return ajax.get(urls.resumeUser,obj)
    },
    //招聘人才
    learnExperiences(obj){
        return ajax.get(urls.learnExperiences,obj)
    },
    //G12-求职者详情
    learnInventoryList(obj){
        return ajax.get(urls.learnInventoryList,obj)
    },
    //简历支付
    resume_pay(obj){
        return ajax.post(urls.resume_pay,obj)
    },
    //查看简历是否支付成功
    Isresumepay(obj){
        return ajax.post(urls.Isresumepay,obj)
    },
    //查看用户信息
    accountInfo(obj){
        return ajax.post(urls.accountInfo,obj)
    },

 }
