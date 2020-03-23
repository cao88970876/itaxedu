<template>
    <div class="myCoupon_page">
        <div class="title">
            我的优惠券
        </div>
        <div class="coupons_type">
            <div @click="effective(type=1)" :class="{'active':type===1}">优惠券</div>
            <div @click="invalid(type=2)" :class="{'active':type===2}">已失效</div>
        </div>
        <div class="coupons_mains">
            <ul class="clear">
                <li class="left" v-for="item in effectiveList" :class="{'active':type===2}">
                    <div class="type">
                        <span v-if="item.model_type===0">全平台</span><span
                        v-if="item.model_type===2">课程学习</span><span v-if="item.model_type===1">商城</span><span
                        v-if="item.model_type===3">专栏</span><span v-if="item.model_type===4">电子书</span><span
                        v-if="item.model_type===5">项目</span>可用 <span v-if="item.status===2 && type===2">(已使用)</span>
                        <span v-if="item.status===3&& type===2">(已过期)</span>
                    </div>
                    <div class="discount">
                        <div class="discount_num left">
                            <span v-show="item.type===2">{{item.discounts*10}}折</span>
                            <span v-if="item.type===1">{{item.discounts}}元</span>
                        </div>
                        <div class="discount_time right">
                            <div v-show="item.type===1" class="condition">满<span v-text="item.condition"></span>元减<span
                                v-text="item.discounts"></span>元
                            </div>
                            <div class="time">
                                有效期至：<span>{{item.etime | timeFilter('Y年M月D日') }}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {myAccountApi, utilsApi} from '../../../api'
    import {Pagination} from "../../../components/public";

    export default {
        name: "my-coupon",
        components: {
            Pagination
        },
        data() {
            return {
                type: 1,
                effectiveList: [],
                pageInfo: {
                    pageSize: 10,
                    total: 1,
                    currentPage: 1
                },
            }
        },
        mounted() {
            this.effective()
        },
        methods: {

            effective() {
                myAccountApi.effectiveCoupon().then((res) => {
                    if (res.status === 1) {
                        console.log(res.data)
                        this.effectiveList = res.data.data
                        this.pageInfo.total = res.data.total * 1 || 0
                    }
                })
            },
            invalid() {
                myAccountApi.invalidCoupon().then((res) => {
                    if (res.status === 1) {
                        console.log(res.data)
                        this.effectiveList = res.data.data
                        this.pageInfo.total = res.data.total * 1 || 0
                    }
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                if (this.type === 1) {
                    this.effective()
                } else {
                    this.invalid()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .myCoupon_page {
        .title {
            padding: 15px 20px;
            font-size: 18px;
            color: #666666;
            border-bottom: 1px solid #f1f1f1;
        }
        .coupons_type {
            padding: 10px 20px;
            display: flex;
            font-size: 14px;
            border-bottom: 1px solid #f1f1f1;
            div {
                padding: 5px 10px;
                margin-right: 30px;
                cursor: pointer;
            }
            .active {
                border-bottom: 2px solid #f44336;
                color: #f44336;
            }
        }
        .coupons_mains {
            padding: 20px;
            ul {
                li {
                    margin-bottom: 20px;
                    @include size(285px, 90px);
                    background: $fontColorRed;
                    border-radius: 10px;
                    padding: 10px;
                    color: #ffffff;
                    box-sizing: border-box;
                    margin-right: 25px;
                    position: relative;
                    .type {
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .discount {
                        .discount_num {
                            font-size: 30px;
                            font-weight: bold;
                            margin-top: 10px;
                        }
                        .discount_time {
                            .time {
                                position: absolute;
                                bottom: 12px;
                                right: 12px;
                            }
                            .condition {
                                padding: 15px;
                                height: 14px;
                            }
                        }
                    }
                }
                .active {
                    background: #999999;
                }
            }
        }
    }
</style>
