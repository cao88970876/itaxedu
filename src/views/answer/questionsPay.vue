<template>
    <div class="questionPay_page page-content">
        <div class="nav">
            <navigation></navigation>
        </div>
        <div class="answerDetails_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/answer/answerList' }">财税问答</el-breadcrumb-item>
                <el-breadcrumb-item>订单结算</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="pay_price">
            支付：<span>￥100</span>
            <del>100</del>
        </div>
        <div class="pay_way">
            <div class="pay-type">
                <div class="title">支付方式</div>
                <ul class="clear">
                    <li class="left" :class="{'active': payType===1}" @click="payType=1">
                        <span class="icon wechat-pay"></span>
                        <span>微信支付</span>
                    </li>
                    <li class="left" :class="{'active': payType===2}" @click="payType=2">
                        <span class="icon ali-pay"></span>
                        <span>支付宝支付</span>
                    </li>
                    <li class="left" :class="{'active': payType===3}" @click="payType=3">
                        <span class="icon balance-pay"></span>
                        <span>余额支付</span>
                    </li>
                </ul>
                <div class="tip">您将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请斟酌确认。</div>
                <div class="commit">
                    <a class="commit-btn" @click="pay">立即支付</a>
                </div>
            </div>
            <div v-show="payType===1" class="qr-code"></div>
        </div>
    </div>
</template>

<script>
    import navigation from '../../components/public/navigation'
    import api from '@/api/answerApi'
    import QRCodeJs from 'qrcodejs2'

    export default {
        name: "questions-pay",
        data() {
            return {
                payType: 1,
                invoice: true,
                invoiceType: 1,
                form: {
                    name: '',
                },
                id: '',
            }
        },
        components: {
            navigation,
        },
        mounted() {
            this.$parent.showCourseNav = false
            this.id = this.$route.query.id;


        },
        methods: {
            // 微信支付
            weChatPay(params) {
                params.pay_type = '2'
                api.answerPay(params).then(resp => {
                    alert(res.msg)
                    if (resp.status === 1) {
                        new QRCodeJs(this.$el.querySelector('.qr-code'), unescape(resp.data))
                    }
                })
            },
            // 支付宝支付
            aliPay(params) {
                params.pay_type = '1'
                api.answerPay(params).then(resp => {
                    alert(resp.msg)
                    const div = document.createElement('div')
                    div.innerHTML = resp
                    document.body.appendChild(div)
                    document.forms.alipaysubmit.submit()
                })
            },
            // 余额支付
            balancePay(params) {
                params.pay_type = '3'
                api.answerPay(params).then(resp => {

                    if (resp.status === 99) {
                        alert(resp.msg)
                        this.$router.push({name: 'pay', params: {status: resp.status}})
                    } else {
                        this.$router.push({name: 'alreadyPaid', params: {id: this}})
                    }

                })
            },

            pay() {
                const logintoken = this.$helper.utils.storage.get('userInfo').logintoken;
                let params = {
                    logintoken: logintoken,
                    answer_id: this.id,
                    type: 'pc',
                };
                //判断 是啥子支付方式
                if (this.payType === 1)
                    this.weChatPay(params)
                else if (this.payType === 2)
                    this.aliPay(params)
                else if (this.payType === 3)
                    this.balancePay(params)
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .questionPay_page {
        .nav {
            padding-bottom: 20px;
            border-bottom: 2px solid #f1f1f1;
        }
        .answerDetails_breadcrumb {
            margin-top: 20px;
        }
        .pay_price {
            margin-top: 20px;
            font-weight: bold;
            font-size: 14px;
            border-bottom: 1px solid #f1f1f1;
            padding-bottom: 10px;
            span {
                color: #f44336;
            }
            del {
                color: #999999;
                margin-left: 10px;
                font-size: 12px;
            }
        }
        .pay_way {
            margin-top: 20px;
            font-size: 14px;
            .pay-type {
                & > ul {
                    list-style: none;
                    margin-top: 20px;
                    user-select: none;

                    li {
                        border: 1px solid #f1f1f1;
                        border-radius: 10px;
                        font-size: 14px;
                        line-height: 50px;
                        padding: 20px 30px;
                        cursor: pointer;
                        transition: border-color .5s;

                        .icon {
                            width: 54px;
                            height: 50px;
                            margin-right: 10px;
                        }

                        span {
                            vertical-align: bottom;
                        }

                        &:hover, &.active {
                            border-color: $fontColorRed;
                        }

                        & + li {
                            margin-left: 20px;
                            .icon {
                                width: 50px;
                            }
                        }
                    }
                }
            }
            .tip {
                color: #999999;
                margin-top: 10px;
            }
            .commit {
                text-align: center;
                margin: 50px 0;
                a {
                    display: inline-block;
                    background-color: $fontColorRed;
                    color: #fff;
                    padding: 10px 60px;
                    font-size: 16px;
                    border-radius: 10px;
                    cursor: pointer;
                }
            }
        }
    }
</style>

