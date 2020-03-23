<template>
    <div class="paySee_page projectDetails_page page-content">
        <div class="details_nav">
            <navigation></navigation>
        </div>
        <div class="answerDetails_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/recruit/recruitList' }">企业招聘</el-breadcrumb-item>
                <el-breadcrumb-item>查看完整简历</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="pay_price">
            支付：<span class="money">{{money}}</span>
            <!--<del>100</del>-->
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
                    <a class="commit-btn" @click="pay">立即支付(￥{{money}})</a>
                </div>
            </div>
            <!--支付宝和余额支付跳转弹框-->
            <self-modal heading="完成支付" :show.sync="finishOtherPay">
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
            <alert message="余额不足，无法完成支付"  cancelText="取消" confirmText="充值" v-model="showAlert" @confirm="SureRecharge()"></alert>
        </div>
    </div>
</template>

<script>
    import navigation from '../../components/public/navigation'
    import {SelfModal} from '../../components/public'
    import {recruitUserApi} from '../../api'
    import QRCodeJs from 'qrcodejs2'
    import Alert from "../../components/public/Alert";
    export default {
        name: "paySee",
        data() {
            return {
                userinfo:this.$helper.utils.storage.get('userInfo'),
                payType: 1,
                invoice: true,
                invoiceType: 1,
                form: {
                    name: '',
                },
                id: '',
                showAlert:false,
                money:'',
                code:"",
                finishWeChatPay: false,
                finishOtherPay: false,
                qrInstance: null,
                orderInfo:{
                    order_num:""
                }
            }
        },
        components: {
            Alert,
            navigation,
            SelfModal,
            recruitUserApi
        },
        mounted() {
            //获取 查看金额
            this.money = this.$route.query.money;
        },
        methods: {
            // 微信支付
            weChatPay(params) {
                params.pay_type = '2'
                recruitUserApi.resume_pay(params).then(resp => {
                    console.log(resp)
                    if (resp.status === 1) {
                        this.orderInfo.order_num=resp.data.id
                        this.finishWeChatPay = true
                        if (this.qrInstance) {
                            this.qrInstance.clear()
                            this.qrInstance.makeCode(decodeURIComponent(resp.data.data))
                        } else {
                            this.qrInstance = new QRCodeJs(this.$el.querySelector('.qr-code'), {
                                text: unescape(resp.data.data),
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
                this.finishOtherPay = true
                params.pay_type = '1'
                recruitUserApi.resume_pay(params).then(resp => {
                    const div = document.createElement('div')
                    div.innerHTML = resp
                    this.orderInfo.order_num= resp.split('script>"')[1]*1
                    document.body.appendChild(div)
                    document.forms.alipaysubmit.submit()
                    div.innerHTML=''
                })
            },
            // 余额支付
            balancePay(params) {
                recruitUserApi.accountInfo({
                    uid: this.userinfo.uid
                }).then(resp => {
                    if (resp.status === 1) {
                        if(resp.data.balance<this.money){
                            this.showAlert=true
                            return false
                        }else {
                            params.pay_type = '3'
                            recruitUserApi.resume_pay(params).then(resp => {
                                console.log(resp.msg)
                                    this.orderInfo.order_num=resp.data.id
                                    this.$router.push({name:'recruitPayStatus', params: {orderNum: this.orderInfo.order_num, id:this.$route.query.id,}})
                            })
                        }
                    }
                })
            },
            // 完成支付
            finishPay() {
                this.$router.push({
                    name: 'recruitPayStatus',
                    params: {orderNum: this.orderInfo.order_num, id:this.$route.query.id,}
                })
            },
            pay() {
                let params = {
                    id :this.$route.query.id,
                    type:"pc"
                };
                //判断 是啥子支付方式
                if (this.payType === 1)
                    this.weChatPay(params)
                else if (this.payType === 2)
                    this.aliPay(params)
                else if (this.payType === 3)
                    this.balancePay(params)
            },
            //去充值
            SureRecharge(){
                this.$router.push({name:'recharge'})
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";
    .paySee_page {
        padding: 20px;
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
        .qr-code {
            @include size (128px);
            margin: 40px auto;
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
