import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    getResume: ['get', '/api/recruit/user_resume/my_resume'],//我的简历
    addwork: ['post', '/api/recruit/user_resume/create_work'],//添加工作经历
    editwork: ['post', '/api/recruit/user_resume/update_work'],//修改工作经历
    deletework: ['post', '/api/recruit/user_resume/delete'],//删除工作经历
    addeducation: ['post', '/api/recruit/user_resume/create_education'],//添加教育经历
    updatededucation: ['post', '/api/recruit/user_resume/update_education'],//编辑教育经历
    update: ['post', '/api/recruit/user_resume/update'],//编辑-更换头像,添加基本信息,求职意向,技能评价,自我描述
    addproject: ['post', '/api/recruit/user_resume/create_item'],//添加项目经验
    editproject: ['post', '/api/recruit/user_resume/update_item'],//编辑项目经验
    getrecruidictionary: ['get', '/api/recruit/recruit_dictionary/index'],//获取所有状态
    positiontype: ['get', '/api/recruit/recruit_dictionary/position_type'],//获取职位类型
    getRecruitDetail: ['get', '/api/recruit/recruit_user/show'],//招聘详情
    course_tag: ['get', '/api/admin_root/course_tag/index'],//职位标签
    update_enterprise_recruit: ['post', '/api/recruit/enterprise_recruit/update'],//编辑职位
    create_enterprise_recruit: ['post', '/api/recruit/enterprise_recruit/create'],//发布新职位
    enterprise_recruit: ['get', '/api/recruit/enterprise_recruit/show'],//在线职位详情
    businessList: ['get', '/api/admin_root/business/index'],//  机构行业
    financList: ['get', '/api/admin_root/financing/index'],    //  融资情况
    create_task: ['post', '/api/recruit/enterprise_recruit/create_task'],    //  发布招聘任务
    failurePosition: ['get', '/api/recruit/enterprise_recruit/failure'],    //  下线
    task_order_show: ['get', '/api/recruit/recruit_user/task_order_show/id/:id'],    //  查询任务是否支付成功
    accountInfo: ['get', '/api/admin_root/user/info'],
})
