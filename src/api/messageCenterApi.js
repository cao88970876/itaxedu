import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    //系统消息
    SystemNotification: ['get', '/api/recruit/message/system_index'],//系统消息
    delSystemMsg:['get','/api/recruit/message/system_delete'],//删除系统消息
    logisticsNews:['get','/api/recruit/message/logistics_index'],//物流消息
    delLogisticsNews:['get','/api/recruit/message/logistics_delete'],//删除物流消息
    headerList:['post','/api/recruit/user_resume/info_list'],//头像列表
})
