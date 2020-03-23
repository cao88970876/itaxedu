<template>
    <div class="myOrder_page ">
        <div class="myOrder_title">
            我的订单
        </div>
        <div class="shoppingType clear">
            <div class="type left">'
                <div @click="orderType(type=1)" :class="{'active':type===1}">待支付</div>
                <div @click="orderType(type=2)" :class="{'active':type===2}">待发货</div>
                <div @click="orderType(type=3)" :class="{'active':type===3}">待收货</div>
                <div @click="orderType(type=4)" :class="{'active':type===4}">待评价</div>
                <div @click="orderType(type=5)" :class="{'active':type===5}">已完成</div>
            </div>
            <div class="refund right" @click="refund(type=6)" :class="{'active':type===6}">
                <span>退款</span> /
                <span>售后</span>
            </div>
        </div>
        <div class="orderNav">
            <div>商品信息</div>
            <div>商品属性</div>
            <div>金额</div>
            <div>数量</div>
            <div>订单编号</div>
            <div>操作</div>
        </div>
        <div class="mains" v-show="normalOrder">
            <ul>
                <li v-for="item in orderList" @click="goDetail(item)">
                    <div class="goods">
                        <div class="goods_show">
                            <img :src="imgPath+item.goods_cover_img" alt="">
                        </div>
                        <div class="goods_name">
                            <div v-text="item.goods_name"></div>
                            <div>{{item.add_time | timeFilter}}</div>
                        </div>
                        <div class="goods_attribute" v-text="item.goods_spec"></div>
                        <div class="goods_price money" v-text="item.money"></div>
                        <div class="goods_count">数量：<span v-text="item.num"></span></div>
                        <div class="goods_num" v-text="item.order_num"></div>
                        <div class="orderPay_btn" v-show="type===1">
                            <div @click.stop="cancelBtn(item)">取消订单</div>
                            <div>付款</div>
                        </div>
                        <div class="orderComplete_btn" v-show="type===2">
                            <div @click.stop="$router.push({name:'afterSale',query: {id:item.id}})">售后申请</div>
                        </div>
                        <div class="orderSend_btn" v-show="type===3">
                            <div @click.stop="$router.push({name:'afterSale',query: {id:item.id}})">售后申请</div>
                            <div @click="determine(item)">确认收货</div>
                        </div>
                        <div class="orderEvaluate_btn" v-show="type===4">
                            <div @click.stop="$router.push({name:'afterSale',query: {id:item.id}})">售后申请</div>
                            <div
                                @click.stop="$router.push({name:'commentGoods',query: {id:item.id,orderId:item.order_num}})">
                                立即评价
                            </div>
                        </div>
                        <div class="orderComplete_btn" v-show="type===5">
                            <div @click.stop="$router.push({name:'afterSale',query: {id:item.id}})">售后申请</div>
                        </div>
                        <div class="refund_btn" v-show="type===6">
                            <div class="refund_type">处理中</div>
                            <div class="btn" @click.stop="$router.push({name:'refund',query: {id:item.id}})">售后申请</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="mains" v-show="!normalOrder">
            <ul>
                <li v-for="item in refundList">
                    <div class="goods">
                        <div class="goods_show">
                            <img :src="imgPath+item.order.goods_cover_img" alt="">
                        </div>
                        <div class="goods_name">
                            <div v-text="item.order.goods_name"></div>
                            <div>{{item.order.add_time | timeFilter}}</div>
                        </div>
                        <div class="goods_attribute" v-text="item.order.goods_spec"></div>
                        <div class="goods_price money" v-text="item.order.money"></div>
                        <div class="goods_count">数量：<span v-text="item.order.num"></span></div>
                        <div class="goods_num"></div>
                        <div class="refund_btn">
                            <div class="refund_type" v-show="item.status===1">退款中</div>
                            <div class="refund_type" v-show="item.status===2">退款成功</div>
                            <div class="refund_type" v-show="item.status===3">退款失败</div>
                            <div class="btn" @click.stop="$router.push({name:'refund',query: {id:item.id}})">查看详情</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--弹出层-->

        <self-modal :modal-width="300" :show.sync="showModal" class="popup">
            <div slot="modal-heading" class="popup_header">请选择取消订单的理由</div>
            <div class="check">
                <ul>
                    <li v-for="item in cancel">
                        <div class="btn">
                            <label>
                                <input type="checkbox" :value="item.id" @click="CheckItem(item)" v-model="isPublic"/>
                                <i class="icon radio-no-checked" :class="{'cancel-checked':isChecked(item.id)}"></i>
                                <div v-text="item.reason" style="user-select: none;"></div>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="popup_footer">
                <div @click="hiden">取消</div>
                <div @click="dontBuy">确定</div>
            </div>
        </self-modal>
    </div>
</template>
<script>
    import {SelfModal} from '../../../components/public'
    import api from '@/api/myOrderApi'
    import utils from '../../../assets/js/utils';

    export default {
        name: "my-order",
        components: {SelfModal},
        data() {
            return {
                imgPath: utils.api,
                checked: false,
                type: 1,
                showModal: false,
                //订单正常交易显示状态
                normalOrder: true,
                orderList: [],
                cancel: [],
                //取消原因
                isPublic: [],

                //取消拿商品的ID
                goods_order: '',
                cancelOne: '',
                //售后
                refundList: []
            }
        },
        mounted() {
            this.orderType(1);
            api.cancelOrderList().then((res) => {
                this.cancel = res.data
                console.log("取消订单", res.data)
            })
        },
        methods: {
            CheckItem(item) {
                console.log(item.id)
                this.cancelOne = item.id
            },

            //取消订单按钮
            isChecked(item) {
                let flag = false
                for (let i of this.isPublic) {
                    if (item === i) {
                        flag = true
                        break
                    }
                }
                return flag
            },
            //获取到订单
            cancelBtn(item) {
                console.log("订单", item)
                this.goods_order = item.id
                this.showModal = true;
            },
            //取消订单
            dontBuy() {
                console.log("选择取消信息", this.isPublic);
                api.cancelOrder({
                    order_id: this.goods_order,
                    cancel_notes: this.cancelOne,
                }).then((res) => {
                    alert('取消成功')
                    this.showModal = false;
                    this.orderType(1);
                })
            },
            //关闭模态
            hiden() {
                this.showModal = false
            },
            //传TYPE拿数据
            orderType(obj) {
                //console.log(obj)
                this.normalOrder = true
                api.myOrder({
                    status: obj,
                }).then((res) => {
                    console.log(res.data)
                    this.orderList = res.data
                })
            },
            //申请售后 接口文档没说要传啥子 但是 返回得错误要传订单状态   "status": 2, 退款状态  1退款中 2退款成功 3退款失败
            refund() {
                this.normalOrder = false
                api.afterSaleList({}).then((res) => {
                    console.log("售后列表", res.data)
                    this.refundList = res.data

                })
            },
            //已完成
            determine(item) {
                console.log("确认收货", item.id)
                api.alreadyCompleted({
                    id: item.id
                }).then((res) => {
                    if(res.status===1){
                        this.$message.success(res.msg);
                        this.orderType(3);
                    }
                })
            },


            //跳转到详情  订单状态 1-待支付 2-待发货（已支付） 3-待收货 4-待评价 5-已完成 6-取消订单
            goDetail(item) {
                console.log(item.id)
                if (this.type === 1) {
                    return
                    // this.$router.push({name: 'evaluateGoods', query: {id: item.id}})
                } else if (this.type === 2) {
                    this.$router.push({name: 'receiptGoods', query: {id: item.id}})
                } else if (this.type === 3) {
                    this.$router.push({name: 'receiptGoods', query: {id: item.id}})
                } else if (this.type === 4) {
                    this.$router.push({name: 'evaluateGoods', query: {id: item.id}})
                } else if (this.type === 5) {
                    this.$router.push({name: 'complete', query: {id: item.id}})
                }
            }

        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .myOrder_page {
        .myOrder_title {
            padding: 20px 0 20px 20px;
            font-size: 18px;
            color: #666666;
            cursor: pointer;
        }
        .shoppingType {
            border-top: 1px solid #f1f1f1;
            border-bottom: 1px solid #f1f1f1;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            .type {
                display: flex;
                div {
                    width: 43px;
                    height: 40px;
                    margin: 0 20px;
                    cursor: pointer;
                }
            }
            .refund {
                margin-right: 20px;
                cursor: pointer;
            }
            .active {
                color: #f44336;
                border-bottom: 2px solid #f44336;
            }
        }
        .orderNav {
            width: 1016px;
            margin: 0 auto;
            margin-top: 20px;
            background: #f1f1f1;
            border-radius: 4px;
            height: 40px;
            line-height: 40px;
            display: flex;
            div {
                width: 160px;
                text-align: center;
            }
            div:nth-child(1) {
                width: 210px;
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
                                height: 50px;
                            }
                            div:nth-child(2) {
                                color: #999999;
                            }

                        }
                        .goods_attribute {
                            width: 140px;
                            line-height: 70px;
                            margin-left: 30px;
                        }
                        .goods_price {
                            width: 140px;
                            line-height: 70px;
                            margin-left: 30px;
                            color: #f44336;
                        }
                        .goods_count {
                            width: 140px;
                            line-height: 70px;
                            margin-left: 20px;
                        }
                        .goods_num {
                            width: 130px;
                            line-height: 70px;
                            margin-left: 20px;
                        }
                        .orderPay_btn, .orderSend_btn, .orderEvaluate_btn {
                            margin-left: 10px;
                            div:nth-child(odd) {
                                padding: 5px 15px;
                                border: 1px solid #999999;
                                color: #999999;
                                border-radius: 50px;
                                cursor: pointer;
                            }
                            div:nth-child(even) {
                                padding: 5px 15px;
                                border: 1px solid #f44336;
                                color: #f44336;
                                text-align: center;
                                border-radius: 50px;
                                cursor: pointer;
                            }
                            div + div {
                                margin-top: 20px;
                            }
                        }
                        .orderComplete_btn {
                            margin-left: 10px;
                            div {
                                padding: 5px 15px;
                                border: 1px solid #999999;
                                color: #999999;
                                border-radius: 50px;
                                cursor: pointer;
                            }
                        }
                        .refund_btn {
                            margin-left: 10px;
                            .refund_type {
                                padding: 5px 15px;
                                font-size: 14px;
                            }
                            .btn {
                                padding: 5px 15px;
                                border: 1px solid #999999;
                                color: #999999;
                                border-radius: 50px;
                                cursor: pointer;
                                margin-top: 15px;
                            }
                        }
                    }
                }
            }
        }
        .popup {
            .popup_header {
                text-align: center;
                font-size: 14px;
                padding: 10px;
            }
            .check {
                padding: 20px;
                ul {
                    li {
                        margin-bottom: 15px;
                        .btn {
                            & > label {
                                display: flex;
                                cursor: pointer;
                                line-height: 20px;
                                font-size: 14px;
                                & > input[type=checkbox] {
                                    display: none;
                                }
                                .icon {
                                    @include size(20px, 20px);
                                    vertical-align: bottom;
                                    margin-right: 10px;
                                    position: relative;
                                    top: -1px;
                                }
                            }
                        }
                    }
                }
            }
            .popup_footer {
                height: 40px;
                text-align: center;
                line-height: 40px;
                display: flex;
                border-top: 1px solid #f1f1f1;
                margin-top: 20px;
                div:nth-child(1) {
                    width: 50%;
                    cursor: pointer;
                }
                div:nth-child(2) {
                    width: 50%;
                    border-left: 1px solid #f1f1f1;
                    color: #f44336;
                    cursor: pointer;
                }
            }
        }
    }
</style>
