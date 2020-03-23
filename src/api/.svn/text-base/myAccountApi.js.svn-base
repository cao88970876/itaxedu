import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    myBankList: ['get', '/api/admin_root/bank/my_bank'],
    allBankList: ['get', '/api/admin_root/bank/index'],
    addBank: ['post', '/api/admin_root/bank/bank_add'],
    accountInfo: ['get', '/api/admin_root/user/info'],
    // 账户明细
    moneyList: ['get', '/api/admin_root/user/money_list'],
    withdraw: ['post', '/api/admin_root/bank/cash'],
    entityCard: ['post', '/api/admin_root/card/find'],
    // 充值金额列表
    rechargeList: ['get', '/api/admin_root/recharge_config/index'],
    //生成充值订单
    addOrder: ['post', '/api/admin_root/recharge_config/recharge'],
    //有效优惠券
    effectiveCoupon:['get','/api/recruit/user_coupon/index_pc'],
    //无效优惠券
    invalidCoupon:['get','/api/recruit/user_coupon/failure_index_pc'],
    //签到
    signs:['post','/api/admin_root/user/sign'],
})
