<template>
    <div class="complete_page">
        <div class="receipt_title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/user/myOrder/myOrder' }">我的订单</el-breadcrumb-item>
                <el-breadcrumb-item>待收货</el-breadcrumb-item>
            </el-breadcrumb>
            <div>订单：<span v-text="goods.order_num"></span></div>
        </div>
        <div class="receipt_user">
            <i class="map_icon"><img src="../../../assets/image/ic_113.png" alt=""></i><span
            v-text="address.name"></span><span class="phone" v-text="address.phone"></span><span class="addres">{{address.provinces}}{{address.citys}}{{address.areas}}{{address.address}}</span><i
            class="arrow right"><img src="../../../assets/image/ic_62.png" alt=""></i>
        </div>
        <div class="orderNav">
            <div>商品信息</div>
            <div>商品属性</div>
            <div>金额</div>
            <div>数量</div>
            <div>订单编号</div>
            <div>操作</div>
        </div>
        <div class="mains">
            <ul>
                <li>
                    <div class="goods">
                        <div class="goods_show"><img :src="imgPath+goods.goods_cover_img" alt=""></div>
                        <div class="goods_name">
                            <div v-text="goods.goods_name"></div>
                            <div>{{goods.add_time | timeFilter}}</div>
                        </div>
                        <div class="goods_attribute" v-text="goods.goods_spec">属性</div>
                        <div class="goods_price money" v-text="goods.money">300</div>
                        <div class="goods_count">数量：<span v-text="goods.num"></span></div>
                        <div class="goods_num" v-text="goods.order_num"></div>
                        <div class="orderSend_btn">
                            <div @click="$router.push({name:'afterSale',query:{id:id}})">售后申请</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="express">
            <ul>
                <li v-for="item in expressMap">
                    <div class="garden"></div>
                    <p class="time_box" v-text="item.context"></p>
                    <p class="content_box" v-text="item.time">

                    </p>
                </li>
            </ul>
        </div>
        <div class="comment">
            <div class="goods_user">
                <div class="user_img"><img :src="imgPath+comments.face" alt=""></div>
                <div class="user_name" v-text="comments.nickname">王二狗</div>
                <div class="user_time">{{comments.add_time | timeFilter}}</div>
            </div>
            <div v-text="comments.contents">
            </div>
            <div class="goods_show">
                <div v-for="item in commemtShow">
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
        name: "complete",
        data() {
            return {
                imgPath: utils.api,
                goods: {},
                address: {},
                //快递地理位置
                expressMap:[],
                id: '',
                comments: {},
                commemtShow:[]
            }
        },
        mounted() {
            this.id = this.$route.query.id
            api.goodsDetailsList({
                id: this.id
            }).then((res) => {
                console.log(res.data.comment)
                this.comments = res.data.comment
                this.commemtShow=res.data.comment.img_data
                this.expressMap = res.data.logistics_info
                this.address = res.data.addr
                this.goods = res.data
                this.orderId = res.data.order_num
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .complete_page {
        .receipt_title {
            padding: 20px 0 20px 0;
            border-bottom: 1px solid #f1f1f1;
            display: flex;
            div {
                margin-left: 15px;
            }
        }
        .receipt_user {
            border-bottom: 1px solid #f1f1f1;
            padding: 20px;
            color: #333333;
            font-size: 14px;
            .map_icon{
                display: inline-block;
                margin-right: 20px;
                img{
                    width: 16px;
                    height: 16px;
                }
            }
            .phone {
                margin: 0 50px 0 15px;
            }
            .arrow {
                img {
                    height: 16px;
                }
            }
            .addres {
                color: #999999;
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
                        .orderSend_btn {
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
                    }
                }
            }
        }
        .express {
            margin-left: 20px;
            ul {
                padding-bottom: 40px;
                margin-bottom: 20px;

                li {
                    & + li:last-child {
                        border-left: none;
                        .garden {
                            left: -8px;
                        }
                    }
                    border-left: 2px solid #F44336;
                    position: relative;
                    font-size: 15px;
                    .garden {
                        width: 16px;
                        height: 16px;
                        background-color: #F44336;
                        position: absolute;
                        top: 0;
                        border-radius: 50%;
                        left: -9px;
                    }
                    p {
                        margin: 0;
                    }
                    .time_box {
                        padding-left: 20px;
                        margin-bottom: 10px;
                    }
                    .content_box {
                        margin: 0;
                        padding-left: 20px;
                        padding-bottom: 30px;
                        color: #999999;
                    }
                    .company {
                        padding-left: 20px;
                        margin-bottom: 5px;
                    }
                    .gardenColor {
                        background: #ffffff;
                        border: 1px solid #f44336;
                        margin-bottom: 20px;
                    }
                }
            }
        }
        .comment {
            padding: 20px 20px 0 20px;
            border-top: 1px solid #f1f1f1;
            .goods_user {
                display: flex;
                .user_img {
                    width: 80px;
                    height: 80px;
                    margin-right: 10px;
                    img{
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                    }
                }
                .user_name, .user_time {
                    line-height: 80px;
                }
                .user_time {
                    margin-left: 780px;
                }
            }
            .goods_show {
                margin: 15px 0;
                display: flex;
                div {
                    width: 100px;
                    height: 100px;
                    background: #999999;
                    & + div {
                        margin-left: 15px;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
