import ajax from '@/assets/js/axios.package';
import url_path from '../assets/js/utils';

const urls = {
    //分类
    goodsClassifyUrl: '/api/shopping/goods/classify',
    //商品列别
    goodsListUrl: '/api/shopping/goods/datalist',
    //商品详情；
    goodsDetailsUrl: '/api/shopping/goods/details',
    //商品评论
    goodsCommentUrl: '/api/shopping/goods/commentlist',
    //地址管理api
    addressListUrl: '/api/shopping/Address/addrlist',
    //添加地址
    addAaddressUrl: '/api/shopping/Address/add_addr',
    //修改地址
    modifyAddressUrl: '/api/shopping/Address/edit_addr',
    //删除地址
    deleteAddressUrl: '/api/shopping/Address/del_addr',
    //添加到购物车
    addCartsUrl: '/api/shopping/goods/add_shopping_cart',
    //地址详情
    addressDetailsUrl: '/api/shopping/Address/addr_details',
    //单个商品
    buyGoodsOneUrl: '/api/shopping/order/upd_order',
    //购物车列表
    goodsCartsUrl: '/api/shopping/goods/shopping_cart',
    //添加收藏
    addCollectUrl: '/api/shopping/goods/collect',
    //优惠卷地址
    goodsCouponUrl: '/api/recruit/user_coupon/index',
    //单个商品下单生成订单信息
    firstBuyGoodsUrl: '/api/shopping/order/goods_show',
    //购物车里面删除
    delGoodListUrl: '/api/shopping/goods/del_shoping_cart',
    //通过购物车买 生成订单一类的：
    multipleBuyGoodsUrl: '/api/shopping/order/cart_show_pc',
    //查询订单详情
    getOrderDetailsUrl: '/api/shopping/order/order_details',
    multipleBuyGoodsAllUrl: '/api/shopping/order/upd_cart_order_pc',

}
url_path.autoPrefix(urls)
export default {

    //商品分类
    goodsClassify(obj) {
        return ajax.post(urls.goodsClassifyUrl, obj)
    },
    //商品列表
    getList(obj) {
        return ajax.post(urls.goodsListUrl, obj)
    }
    ,
    //商品详情
    goodsDetails(obj) {
        return ajax.post(urls.goodsDetailsUrl, {
            goods_id: obj.goods_id,
            uid: obj.uid,
        })
    },
    //评论
    goodsComment(obj) {
        return ajax.post(urls.goodsCommentUrl, {
            goods_id: obj.goods_id
        })
    },
    //获取地址
    getAddressList(obj) {
        return ajax.post(urls.addressListUrl, obj)
    },
    //添加地址
    addAddress(obj) {
        return ajax.post(urls.addAaddressUrl, obj)
    },
    //修改地址
    modifyAddress(obj) {
        return ajax.post(urls.modifyAddressUrl, obj)
    },
    //地址详情
    addressDetails(obj) {
        return ajax.post(urls.addressDetailsUrl, obj)
    },
    //删除地址
    deleteAddress(obj) {
        return ajax.post(urls.deleteAddressUrl, obj)
    },
    //加入购物车
    addcarts(obj) {
        return ajax.post(urls.addCartsUrl, obj)
    },
    //购物车列表
    goodsCarts(obj) {
        return ajax.post(urls.goodsCartsUrl, obj)
    },
    //单个商品立即购买
    buyGoodsOne(obj) {
        return ajax.post(urls.buyGoodsOneUrl, obj)
    },
    addCollect(obj) {
        return ajax.post(urls.addCollectUrl, obj)
    },
    //商城优惠卷
    goodsCoupon(obj) {
        return ajax.post(urls.goodsCouponUrl, obj)
    },
    //商城优惠卷
    generateNum(obj) {
        return ajax.post(urls.firstBuyGoodsUrl, obj)
    },
    //删除购物车东西
    delGoodsList(obj) {
        return ajax.post(urls.delGoodListUrl, obj)
    },
    multipleBuyGoods(obj) {
        return ajax.post(urls.multipleBuyGoodsUrl, obj)
    },
    // getOrderDetails(obj) {
    //     return ajax.get(urls.multipleBuyGoodsUrl, obj)
    // }
    //多个商品购买
    multipleBuyGoodsAll(obj) {
        return ajax.post(urls.multipleBuyGoodsAllUrl, obj)
    },
}
