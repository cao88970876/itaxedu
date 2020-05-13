import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    // 获取规则
    rule: ['get', '/api/admin_root/xuefen_rule/index'],
    // 获取表单
    getForm: ['get', '/api/admin_root/xuefen/index'],
    // 提交表单
    setForm: ['post', '/api/admin_root/xuefen/add'],
    // 学分状态
    xueFenType: ['get', '/api/admin_root/xuefen/study_time'],
    // 课程学历列表
    getList: ['get', '/api/admin_root/xuefen/getList'],
    // 考试及考试状态
    basic: ['get', '/api/admin_root/basic/index2'],
    // 往期考试
    wqBasic: ['post', '/api/admin_root/basic/jilu'],
    // 开始考试地址
    xuefenSign: ['post', '/api/admin_root/xuefen_sign/index'],
    // 证书列表
    xuefenHistory: ['get', '/api/admin_root/xuefen_history/index'],
    // 证书详情
    xuefenCertificate: ['post', '/api/admin_root/xuefen_certificate/index'],
    // 身份证验证
    validate: ['post', '/api/admin_root/xuefen/validate'],
    // 管理员验证登录
    examLogin: ['post', '/api/user/login'],
    // 验证登录
    getUidData: ['get', '/api/admin_root/user/getUidData'],
    // 进入考试系统
    openEntrance: ['post', '/api/admin_root/xuefen_sign/index'],
    // 获取地区域名
    addressUrl: ['get', 'api/admin_root/xuefen/domain'],
    // 学分数据以及学习课程列表
    studyTime: ['get', 'api/admin_root/xuefen/study_time']
})
