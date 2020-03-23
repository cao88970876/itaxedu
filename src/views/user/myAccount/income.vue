<template>
    <div class="income">
        <ul class="crumbs clear">
            <li class="left">我的账户</li>
            <li class="left">充值</li>
        </ul>
        <div class="money-group mt-10">
            <div>充值金额</div>
            <ul class="clear mt-10">
                <li class="left pointer"
                    :class="{active: currentMoneyId===item.id,'money-item':item.id}"
                    v-for="item in dataList" v-text="item.price"
                    @click="chanceMoney(item)"></li>
                <!--<li class="left money-item pointer" :class="{active: currentMoney===item}" v-for="item in moneyGroup" v-text="item" @click="chanceMoney(item)"></li>-->
                <!--<li class="left pointer" :class="{active: currentMoney===0}" @click="chanceMoney(0)">其他金额</li>-->
            </ul>
        </div>
        <div class="money-num mt-15" v-show="!currentMoneyId">
            <div>充值金额</div>
            <div class="mt-5">
                <el-form ref="form" :model="form">
                    <el-form-item :rules="[{required: true,message: '该项不能为空'}]" prop="price">
                        <el-input v-model="form.price" type="number" placeholder="请输入充值金额"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="pay-type mt-15">
            <div class="title">支付方式</div>
            <ul class="clear mt-10">
                <li class="left" :class="{'active': payType===1}" @click="payType=1">
                    <span class="icon ali-pay"></span>
                    <span>支付宝支付</span>
                </li>
                <li class="left" :class="{'active': payType===2}" @click="payType=2">
                    <span class="icon wechat-pay"></span>
                    <span>微信支付</span>
                </li>
            </ul>
            <div class="tip mt-10">您将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请斟酌确认。</div>
            <div class="commit">
                <a class="commit-btn" @click="addOrder">立即支付<span v-show="form.price" v-text="`（¥${form.price}）`"></span></a>
            </div>
        </div>
        <self-modal heading="完成支付" :show.sync="finishAliPay">
            <div class="modal-body">如您已支付，请点击完成支付。</div>
            <div class="modal-footer"><a class="finish-btn pointer" @click="finishPay">完成支付</a></div>
        </self-modal>
        <self-modal heading="扫码完成支付" :show.sync="finishWeChatPay">
            <div class="modal-body">
                <div v-show="payType===2" class="qr-code"></div>
            </div>
            <div class="modal-footer"><a class="finish-btn pointer" @click="finishPay">完成支付</a></div>
        </self-modal>
    </div>
</template>

<script>
    import {SelfModal} from "../../../components/public"
    import {myAccountApi, payApi} from '../../../api'
    import QRCodeJs from 'qrcodejs2'

    export default {
        name: "income",
        components: {SelfModal},
        data() {
            return {
                dataList: [],
                currentMoneyId: null,
                payType: 1,
                form: {
                    price: null,
                },
                userInfo: this.$helper.utils.storage.get('userInfo'),
                orderNum: '',
                finishAliPay: false,
                finishWeChatPay: false,
                qrInstance: null,
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            chanceMoney(item) {
                this.currentMoneyId = item.id
                this.form.price = item.price
                if (!item.id) {
                    this.form.price = null
                    this.$refs['form'].resetFields()
                }
            },
            getList() {
                myAccountApi.rechargeList().then(resp => {
                    if (resp.status === 1) {
                        this.dataList = resp.data
                        this.dataList.push({id: null, price: '其他金额'})
                        this.currentMoneyId = this.dataList[0].id
                        this.form.price = this.dataList[0].price
                    }
                })
            },
            addOrder() {
                let params = {
                    uid: this.userInfo.uid,
                    pay_type: this.payType,
                }
                if (this.currentMoneyId) {
                    params.recharge_id = this.currentMoneyId
                } else {
                    params.price = this.form.price
                }
                myAccountApi.addOrder(params).then(resp => {
                    if (resp.status === 1) {
                        this.orderNum = resp.data.order_num
                        let params = {
                            uid: this.userInfo.uid,
                            attach: 'RechargeOrder',
                            pay_type: this.payType,
                            order_num: this.orderNum,
                            type: 'pc'
                        }
                        if (this.payType === 1) {
                            this.finishAliPay = true
                            this.aliPay(params)
                        } else if (this.payType === 2) {
                            this.finishWeChatPay = true
                            this.weChatPay(params)
                        }
                    }
                })
            },
            aliPay(params) {
                payApi.pay(params).then(resp => {
                    const div = document.createElement('div')
                    div.innerHTML = resp
                    document.body.appendChild(div)
                    document.forms.alipaysubmit.submit()
                    div.innerHTML = ''
                })
            },
            weChatPay(params) {
                payApi.pay(params).then(resp => {
                    if (resp.status === 1) {
                        if (this.qrInstance) {
                            this.qrInstance.clear()
                            this.qrInstance.makeCode(decodeURIComponent(resp.data))
                        } else {
                            this.qrInstance = new QRCodeJs(this.$el.querySelector('.qr-code'), {
                                text: decodeURIComponent(resp.data),
                                width: 128,
                                height: 128,
                                colorDark: "#000000",
                                colorLight: "#ffffff"
                            })
                        }
                    }
                })
            },
            finishPay() {
                this.$router.push({name: 'myAccountPayStatus', params: {orderNum: this.orderNum}})
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .income {
        padding: 0 10px 10px;
        .money-group {
            ul {
                margin: 0;

                li {
                    padding: 5px 20px;
                    border: 1px solid #999;
                    border-radius: 7px;
                    user-select: none;

                    & + li {
                        margin-left: 15px;
                    }

                    &.money-item {
                        &:before {
                            content: "¥";
                            margin-right: 2px;
                        }
                    }
                    &.active {
                        color: #fff;
                        background-color: $fontColorRed;
                        border-color: $fontColorRed;
                    }
                }
            }
        }
        .money-num {
            width: 400px;
        }
        .pay-type {
            & > ul {
                list-style: none;
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
            .tip {
                color: #999;
            }
            .commit {
                margin: 100px 0 150px;
                .commit-btn {
                    width: auto;
                    display: inline-block;
                    margin-left: 220px;
                    background-color: $fontColorRed;
                    color: #fff;
                    padding: 3px 20px;
                    font-size: 16px;
                    border-radius: 10px;
                    cursor: pointer;
                }
            }
        }
        .qr-code {
            @include size (128px);
            margin: 40px auto;
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
