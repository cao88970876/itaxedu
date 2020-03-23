import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    recruitmentList: ['get', '/api/recruit/enterprise_recruitment/index_pc'],//招聘管理
    recruitmentDetail: ['get', '/api/recruit/enterprise_recruitment/show'],//简历详情
    enterprise_recruit: ['get', '/api/recruit/enterprise_recruit/index_pc'],//职位管理
    recruit_weed_out: ['get', '/api/recruit/enterprise_recruitment/weed_out'],//淘汰
    interview: ['get', '/api/recruit/enterprise_recruitment/interview'],//面试
    getReactive: ['get', '/api/recruit/enterprise_recruitment/recovery'],//取消淘汰
    learnExperiences: ['get', '/api/admin_root/content_inventory/study_chart'],//  学习经历
    learnInventoryList: ['get', '/api/admin_root/content_inventory/study_list'],// 学习经历列表数据
})
