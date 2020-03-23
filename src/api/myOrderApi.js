import ajax from '../assets/js/axios.package';
import url_path from '../assets/js/utils';
//我的订单
const urls = {
    //订单分类
    myOrderUrl: '/api/shopping/order/user_order',
    //售后列表
    afterSaleListUrl: '/api/shopping/order/sales_return_index',
    //订单详情
    goodsDetailsListUrl: '/api/shopping/order/order_show',
    //取消订单原因
    cancelOrderListUrl: '/api/shopping/order/cancel_reason',
    //取消订单
    cancelOrderUrl: '/api/shopping/order/cancel_order',
    //评价订单
    commentOrderUrl:'/api/shopping/order/comment_goods',
    //退货
    refundUrl:'/api/shopping/order/sales_return',
    //物流
    logisticsUrl:'/api/shopping/order/logistics',
    //已完成
    alreadyCompletedUrl:'/api/shopping/order/confirm_order',
    //售后详情
    afterSaleDetailsUrl:'/api/shopping/order/sales_return_show',
}
    url_path.autoPrefix(urls)
export default {
    // 订单列表
    myOrder(obj) {
        return ajax.get(urls.myOrderUrl, obj)
    },
    //售后列表
    afterSaleList(obj) {
        return ajax.get(urls.afterSaleListUrl, obj)
    },
    //订单详情
    goodsDetailsList(obj) {
        return ajax.get(urls.goodsDetailsListUrl, obj)
    },
    //取消订单原因
    cancelOrderList(obj) {
        return ajax.get(urls.cancelOrderListUrl, obj)
    },
    //取消订单
    cancelOrder(obj) {
        return ajax.post(urls.cancelOrderUrl, obj)
    },
    //评价订单详情
    commentOrder(obj){
        return ajax.post(urls.commentOrderUrl, obj)
    },
    //退货
    refundGoods(obj){
        return ajax.post(urls.refundUrl, obj)
    },
    //快递公司
    logistics(obj){
        return ajax.get(urls.logisticsUrl, obj)
    },
    //已经完成
    alreadyCompleted(obj){
        return ajax.get(urls.alreadyCompletedUrl, obj)
    },
    //售后详情
    afterSaleDetails(obj){
        return ajax.get(urls.afterSaleDetailsUrl, obj)
    }
}
