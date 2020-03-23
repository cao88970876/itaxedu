import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    getPublished: ['get', '/api/recruit/user_task/published_index_pc'],//发布列表
    getAlready:['get','/api/recruit/user_task/accept_index_pc'],//接收列表
    getcompleted:['get','/api/recruit/user_task/perform_index_pc'],//完成
    getRelease:['get','/api/recruit/user_task/task_show'],//发布详情
    cancel:['get','/api/recruit/user_task/cancel_task'],//取消任务
    getconfirmUser:['get','/api/recruit/user_task/confirm_task'],//发的人确认
    getacceptUser:['get','/api/recruit/user_task/perform_task'],//接收的人确认
    //个人中心里面的 我的问答
    myAnswerHome:['get','/api/recruit/user_finance/quiz_index_pc'],//提问
    goAnswerDetails:['get','/api/recruit/user_finance/quiz_show'],//提问详情
    doCancelQuz:['get','/api/recruit/user_finance/cancel_quiz'],//取消提问
    doAdoptQuz:['post','/api/recruit/user_finance/accept_quiz'],//采纳问题
    inquiriesList:['get','/api/recruit/user_finance/asked_index_pc'],//追问
    toPeekList:['get','/api/recruit/user_finance/peep_index_pc'],//偷看
    goInquiriesDetail:['get','/api/recruit/user_finance/asked_show'],//追问详情
    goToPeekDetail:['get','/api/recruit/user_finance/peep_show'],//偷看详情
    goQuiriesPay:['post','/api/recruit/user_finance/create_asked'],//追问
    //专家的我的问答        /api/recruit/user_finance/create_asked
    expertAnswer:['get','/api/recruit/expert_finance/index'],//专家我的回答
    alreadyAnswer:['get','/api/recruit/expert_finance/answer_index'],//已回答
    expertNoAnswer:['get','/api/recruit/expert_finance/show'],//问题详情
    expertImmediatelyAnswer:['post','/api/recruit/expert_finance/answer'],//提交回答问题
    expertInquiries:['get','/api/recruit/expert_finance/asked_index'],//专家追问
    expertInquiriesDetail:['get','/api/recruit/expert_finance/asked_show'],//专家追问详情
    immediatelyInquiries:['post','/api/recruit/expert_finance/answer_asked'],//立即回答追问
    //个人中心里面的邀请
    makeMoney:['get','/api/recruit/user_distribution/index'],//邀请赚钱
    getMyAccount:['get','/api/recruit/user_distribution/history'],//账户明细
    MemberDetail:['get','/api/recruit/user_distribution/show'],//会员详情
    hisMember:['get','/api/recruit/user_distribution/subordinate_user'],//他的会员
    hisMemberDetail:['get','/api/recruit/user_distribution/subordinate_user_show'],//他的会员详情
    //个人中心的个人信息 资料认证
    getFinancing:['get','/api/admin_root/financing/index'],//融资情况
    getIndustry:['get','/api/recruit/enterprise_recruit/business_index'],//机构行业列表
    attestation:['post','/api/admin_root/user_auth/add'],//资料认证
    //个人中心我的项目
    getMyProject:['get','/api/recruit/user_item/index_pc'], //我的项目
    myProjectDetails:['get','/api/recruit/user_item/show'],//我的项目详情
})
