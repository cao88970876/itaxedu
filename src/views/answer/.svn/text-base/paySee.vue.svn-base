<template>
    <div class="paySee_page page-content">
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
            支付：<span class="money">{{money}}</span>
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
        </div>
        <!--支付宝和余额支付跳转弹框-->
        <self-modal heading="完成支付" :show.sync="finishAliPay">
            <div class="modal-body">如您已支付，请点击完成支付。</div>
            <div class="modal-footer"><a class="finish-btn pointer" @click="finishPay">完成支付</a></div>
        </self-modal>
        <!--微信支付跳转弹框-->
        <self-modal heading="扫码完成支付" :show.sync="finishWeChatPay">
            <div class="modal-body">
                <div v-show="payType===1" class="qr-code"></div>
            </div>
            <div class="modal-footer"><a class="finish-btn pointer" @click="finishPay">完成支付</a></div>
        </self-modal>
        <alert message="余额不足，无法完成支付" cancelText="取消" confirmText="充值" v-model="showAlert"
               @confirm="SureRecharge"></alert>
    </div>
</template>

<script>
    import api from '@/api/answerApi'
    import QRCodeJs from 'qrcodejs2'
    import {Navigation, SelfModal} from '../../components/public'
    import Alert from "../../components/public/Alert";

    export default {
        name: "pay-see",
        data() {
            return {

                payType: 1,
                invoice: true,
                invoiceType: 1,
                form: {
                    name: '',
                },
                id: '',
                money: '',
                finishAliPay: false,
                finishWeChatPay: false,
                quzi_id: '',
                showAlert: false,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                OrderId: '',
            }
        },
        components: {
            Navigation,
            SelfModal,
            Alert,
        },
        mounted() {
            this.$parent.showCourseNav = false
            this.id = this.$route.query.id;
            console.log("回答", this.id)
            this.quzi_id = this.$route.query.quzi;
            console.log("问题", this.quzi_id)

            //获取 查看金额
            api.PaySee({
                type: 2,
            }).then((res) => {
                this.money = res.data.money
            })
        },
        methods: {
            //去充值
            SureRecharge(){
                this.$router.push({name:'recharge'})
            },
            // 微信支付
            weChatPay(params) {
                this.finishWeChatPay = true
                params.pay_type = '2'

                api.answerPay(params).then(resp => {
                    if (resp.status === 1) {
                        if (this.qrInstance) {
                            this.qrInstance.clear()
                            this.qrInstance.makeCode(decodeURIComponent(resp.data.data))
                        } else {
                            this.OrderId = resp.data.id
                            this.qrInstance = new QRCodeJs(this.$el.querySelector('.qr-code'), {
                                text: decodeURIComponent(resp.data.data),
                                width: 128,
                                height: 128,
                                colorDark: "#000000",
                                colorLight: "#ffffff"
                            })
                        }
                    }
                })
            },
            // 支付宝支付
            aliPay(params) {
                this.finishAliPay = true
                params.pay_type = '1'
                api.answerPay(params).then(resp => {
                    const div = document.createElement('div')
                    div.innerHTML = resp
                    document.body.appendChild(div)
                    document.forms.alipaysubmit.submit()
                    this.OrderId = resp.split('script>"')[1] * 1
                })
            },
            // 余额支付
            balancePay(params) {
                params.pay_type = '3'
                if (this.userInfo.balance < this.money) {
                    this.showAlert = true
                    return false
                } else {
                    api.answerPay(params).then(resp => {
                        if (resp.status === 1) {
                            this.$router.push({
                                name: 'answerStatus',
                                query: {OrderId: resp.data.id}
                            })
                        } else {
                            this.$message({
                                message: resp.msg,
                                type: 'error'
                            })
                        }
                    })
                }


            },
            pay() {
                let params = {
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
            },
            finishPay() {
                this.$router.push({
                    name: 'answerStatus',
                    query: {OrderId: this.OrderId}
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .paySee_page {
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
        .modal-body {
            text-align: center;
            line-height: 60px;
            font-size: 14px;
            padding: 20px 0 20px 135px;
        }
        .modal-footer {
            padding: 0 15px 15px;
            text-align: center;
            .finish-btn {
                display: inline-block;
                padding: 10px 30px;
                color: #fff;
                background-color: $fontColorRed;
                border-radius: 7px;
            }
        }
    }
</style>
