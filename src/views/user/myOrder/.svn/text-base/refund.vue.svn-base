<template>
    <div class="refund_page">
        <div class="receipt_title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/user/myOrder/myOrder' }">我的订单</el-breadcrumb-item>
                <el-breadcrumb-item>退款售后</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="refund_type" v-show="refundGoods.status===1">
            退款中
        </div>
        <div class="refund_type" v-show="refundGoods.status===2">
            退款成功
        </div>
        <div class="refund_type" v-show="refundGoods.status===3">
            退款失败
        </div>
        <div class="orderNav">
            <div>商品信息</div>
            <div>商品属性</div>
            <div>金额</div>
            <div>数量</div>
            <div>订单编号</div>
        </div>
        <div class="mains">
            <ul>
                <li>
                    <div class="goods">
                        <div class="goods_show">
                            <img :src="imgPath+refundGoods.order.goods_cover_img" alt="">
                        </div>
                        <div class="goods_name">
                            <div v-text="refundGoods.order.goods_name"></div>
                            <div>2018-5-20  18:20:30</div>
                        </div>
                        <div class="goods_attribute" v-text="refundGoods.order.goods_spec">属性</div>
                        <div class="goods_price money" v-text="refundGoods.order.money">300</div>
                        <div class="goods_count">数量：<span v-text="refundGoods.order.num"></span></div>
                        <div class="goods_num" v-text="refundGoods.order.order_num"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="reason">
            <div class="title">退款原因：</div>
            <div class="text" v-text="refundGoods.reasons">
                详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容
            </div>
        </div>
        <div class="reason">
            <div class="title">货物状态：</div>
            <div class="text" v-show="refundGoods.goods_type===1">未收到货</div>
            <div class="text" v-show="refundGoods.goods_type===2">已收到货物</div>
        </div>
        <div class="reason">
            <div class="title">订单号：</div>
            <div class="text" v-text="refundGoods.order.order_num">123213213</div>
        </div>
        <div class="reason">
            <div class="title">退款金额：</div>
            <div class="text money price_color" v-text="refundGoods.order.money">123</div>
        </div>
        <div class="reason">
            <div class="title">退款凭证：</div>
            <div class="text">
                <div v-for="item in refundGoods_show">
                    <img :src="imgPath+item" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api/myOrderApi'
    import utils from '../../../assets/js/utils';

    export default {
        name: "refund",
        data() {
            return {
                imgPath: utils.api,
                id: '',
                refundGoods: {
                    order: {}
                },
                refundGoods_show: []
            }
        },
        mounted() {
            this.id = this.$route.query.id
            api.afterSaleDetails({
                id: this.id
            }).then((res) => {
                console.log(res.data)
                this.refundGoods = res.data
                this.refundGoods_show = res.data.img_data
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .refund_page {
        padding-bottom: 100px;
        .receipt_title {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
        }
        .refund_type {
            padding: 20px;
            font-size: 30px;
        }
        .orderNav {
            width: 1016px;
            margin: 0 auto;
            background: #f1f1f1;
            border-radius: 4px;
            height: 40px;
            line-height: 40px;
            display: flex;
            div {
                flex: 1;
                text-align: center;
            }
        }
        .mains {
            margin-top: 15px;
            ul {
                margin-left: 15px;
                li {
                    margin-bottom: 15px;
                    width: 1024px;
                    border: 1px solid #f1f1f1;
                    border-radius: 10px;
                    padding: 15px;
                    box-sizing: border-box;
                    .goods {
                        display: flex;
                        .goods_show {
                            width: 76px;
                            height: 76px;
                            background: #999999;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .goods_name {
                            margin-left: 5px;
                            width: 150px;
                            div:nth-child(1) {
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                display: -webkit-box;
                                overflow: hidden;
                            }
                            div:nth-child(2) {
                                color: #999999;
                                margin-top: 20px;
                            }

                        }
                        .goods_attribute {
                            flex: 1;
                            line-height: 70px;

                        }
                        .goods_price {
                            flex: 1;
                            line-height: 70px;

                            color: #f44336;
                        }
                        .goods_count {
                            flex: 1;
                            line-height: 70px;

                        }
                        .goods_num {
                            flex: 1;
                            line-height: 70px;

                        }

                    }
                    div + div {
                        text-align: center;
                    }
                }
            }
        }
        .reason {
            padding: 0 20px;
            display: flex;
            margin-top: 10px;
            .title {
                width: 8%;
                color: #666666;
                font-size: 14px;
            }
            .text {
                display: flex;
                div {
                    width: 100px;
                    height: 100px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                div + div {
                    margin-left: 15px;
                }
            }
            .price_color {
                color: #f44336;
            }
        }
    }
</style>
