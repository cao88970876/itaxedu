import utilsApi from '../assets/js/utils'
export default utilsApi.createApi({
    //分类
    answerHomeList: ['post', '/api/shopping/finance/user_home'],
    //详情
    problemDetails: ['post', '/api/shopping/finance/details2'],
    //支付看答案
    answerPay: ['post', '/api/shopping/finance/pay_look'],
    //问题类型
    answerType: ['post', '/api/shopping/finance/category'],
    //提问须知
    answerNeed: ['post', '/api/shopping/finance/protocol'],
    //快速提问
    answerPut: ['post', '/api/shopping/finance/quick_quiz'],
    //专家列表
    expertList: ['post', '/api/shopping/finance/experts_list'],
    //专家详情
    expertDetails: ['post', '/api/shopping/finance/experts_details'],
    //专家未解答
    unanswerList: ['post', '/api/shopping/finance/experts_home'],
    //专家回答
    expertProblem: ['post', '/api/shopping/finance/answer_quiz'],
    //付费情况   type#收费类型 1快速提问 2查看问题答案 3追问(必填）
    PaySee: ['post', '/api/shopping/finance/sys_charge'],
    //专家提问
    expert:['post','/api/shopping/finance/experts_quiz'],
    expertTypeList:['get','/api/recruit/expert_info/expert_type_list'],
    //个人中心里面的 我的问答
    //myAnswerHome:['get','/api/recruit/user_finance/quiz_index'],
    enquiryOrder:['get','/api/shopping/finance/quiz_order_show/id/:id']
})
