<template>
    <div class="onlineOrder_page page-content">
        <div class="nav">
            <navigation></navigation>
        </div>
        <div class="onlineOrder_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ name: 'projectPlanning' }">项目策划</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/projectPlanning/onlineOorder' }">订单结算</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--课程详情-->
        <div class="class_show">
            <div class="video_img"><img :src="imgPath+projectDetails.cover_img"></div>
            <div class="video_text">
                <div class="title" v-text="projectDetails.name"></div>
                <div class="price money" v-text="projectDetails.discounts_price"></div>
            </div>
        </div>
        <el-form ref="invoice" :model="invoice" label-width="100px">
            <div class="coupon" v-if="projectDetails.is_coupon===1">
                <div class="title">优惠券</div>
                <goodsCoupon2 v-model="couponInfo" :type="2" :content-id="goodsCouponId"
                              :price="projectDetails.discounts_price"></goodsCoupon2>
                <div class="integral_type" v-show="projectDetails.is_integral===1">
                    <div class="integral_text"><span v-text="projectDetails.integral"></span>积分抵扣<span
                        v-text="projectDetails.integral_money" class="money"></span></div>
                    <div class="check_type">
                        <el-switch v-model="isIntegral" active-color="#13ce66" @change="howIntegral"
                                   inactive-color="#999999"></el-switch>
                    </div>
                </div>
            </div>
            <!--发票-->
            <div class="invoice">
                <div class="btn-group">
                    <a :class="{active:!havInvoice}" @click="havInvoice=0">不要发票</a>
                    <a :class="{active:havInvoice}" @click="havInvoice=1;$refs.invoice.resetFields()">要发票</a>
                </div>
                <div v-show="havInvoice">
                    <div class="title">电子发票</div>
                    <div class="invoice-type">
                        <a :class="{active:invoice.type===1}" @click="invoice.type=1;$refs.invoice.resetFields()">个人</a>
                        <a :class="{active:invoice.type===2}" @click="invoice.type=2;$refs.invoice.resetFields()">单位</a>
                    </div>
                    <el-form-item label="抬头名称" prop="name" :rules="$rules.invoiceName" style="height: 50px">
                        <el-input v-model="invoice.name"></el-input>
                    </el-form-item>
                    <el-form-item label="税号" v-if="invoice.type===2" prop="ein" :rules="$rules.invoiceEin" style="height: 50px">
                        <el-input v-model="invoice.ein"></el-input>
                    </el-form-item>
                    <el-form-item label="发票明细" prop="detail" :rules="$rules.invoiceDetail">
                        <el-select v-model="invoice.detail" placeholder="请选择发票明细" style="width: 100%;">
                            <el-option :label="item.name" v-for="item in detailOption" :key="item.id"
                                       :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱地址" prop="email" :rules="$rules.email" style="height: 50px">
                        <el-input v-model="invoice.email"></el-input>
                    </el-form-item>
                </div>
            </div>
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
                <div class="commit" @click="buyBtn">
                    <a class="commit-btn">立即支付(<span
                        class="money">{{finalPrice}}</span>)</a>
                </div>
            </div>
        </el-form>
        <!--支付宝和余额支付跳转弹框-->
        <self-modal heading="完成支付" :show.sync="finishAliPay">
            <div class="modalAli-body">如您已支付，请点击完成支付。</div>
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
    import {Navigation, SelfModal, goodsCoupon2} from '../../components/public'
    import api from '@/api/projectApi'
    import utils from '../../assets/js/utils';
    import Coupon from '../../components/public/coupon';
    import QRCodeJs from 'qrcodejs2'
    import Alert from "../../components/public/Alert";
    import {payApi, myAccountApi} from '../../api'

    export default {
        name: "online-order",
        components: {goodsCoupon2, Navigation, SelfModal, Alert},
        data() {
            return {
                imgPath: utils.api,
                //支付方式
                payType: 1,
                //是否用要发票
                havInvoice: 0,
                //invoice: true,
                invoiceType: 1,
                //优惠卷
                couponInfo: '',
                //表单里面的东西
                invoice: {
                    //抬头名称
                    name: '',
                    //发票类型
                    type: 1,
                    //税号
                    ein: '',
                    email: '',
                    //发表详细
                    detail: '',
                },
                //商品ID
                id: '',
                //商品内容
                projectDetails: {},
                //是否用积分
                isIntegral: false,
                //发票明细
                detailOption: [],
                goodsCouponId: '',
                finishAliPay: false,
                finishWeChatPay: false,
                OrderId: '',
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                showAlert: false,
            }
        },
        computed: {
            finalPrice() {
                let result = this.projectDetails.discounts_price
                if (this.couponInfo) {
                    if (this.couponInfo.type === 1) {
                        result = (result * 100 - this.couponInfo.discounts * 100) / 100
                    } else if (this.couponInfo.type === 2) {
                        result = (result * 100) * (this.couponInfo.discounts * 100) / 10000
                    }
                }
                if (this.isIntegral) {
                    result = (result * 100 - this.projectDetails.integral_money * 100) / 100
                }
                if (result) {
                    return (result * 1).toFixed(2)
                } else {
                    return (0).toFixed(2)
                }
            },
        },
        mounted() {
            this.$parent.showCourseNav = false;
            this.id = this.$route.query.id;
            //获取付款内容的信息
            api.projectDetails({
                id: this.id
            }).then((res) => {
                console.log("商品", res.data)
                this.projectDetails = res.data
            });
            //获取发票明细
            payApi.detailOption().then(res => {
                this.detailOption = res.data
            });
            //拿用户的信息
            myAccountApi.accountInfo({
                uid: this.userInfo.uid,
            }).then(resp => {
                if (resp.status === 1) {
                    this.integral = resp.data.integral
                    console.log(this.integral)
                }
            })

        },
        methods: {
            howIntegral() {
                if (this.projectDetails.integral > this.integral) {
                    this.isIntegral = false
                    this.$message.error('积分不足')
                }
            },
            //去充值
            SureRecharge() {
                this.$router.push({name: 'recharge'})
            },
            // 微信支付
            weChatPay(params) {
                this.finishWeChatPay = true
                params.pay_type = '2'
                api.buyProject(params).then(resp => {
                    if (resp.status === 1) {
                        if (this.qrInstance) {
                            this.qrInstance.clear()
                            this.qrInstance.makeCode(decodeURIComponent(resp.data.data))
                        } else {
                            this.OrderId = resp.data.id
                            console.log("eee", resp)
                            this.qrInstance = new QRCodeJs(this.$el.querySelector('.qr-code'), {
                                text: decodeURIComponent(resp.data.data),
                                width: 128,
                                height: 128,
                                colorDark: "#000000",
                                colorLight: "#ffffff"
                            })
                        }
                    } else {
                        this.$message.error(resp.msg)
                    }
                })
            },
            // 支付宝支付
            aliPay(params) {
                this.finishAliPay = true
                params.pay_type = '1'
                api.buyProject(params).then(resp => {
                    const div = document.createElement('div')
                    div.innerHTML = resp
                    document.body.appendChild(div)
                    document.forms.alipaysubmit.submit()
                    this.OrderId = resp.split('script>"')[1] * 1
                    div.innerHTML = ''
                })
            },
            // 余额支付
            balancePay(params) {
                params.pay_type = '3'
                if (this.userInfo.balance*1 < this.projectDetails.discounts_price*1) {
                    this.showAlert = true
                    return false
                } else {
                    api.buyProject(params).then(resp => {
                        if (resp.status === 1) {
                            this.$router.push({
                                name: 'prokectOrderType',
                                query: {id: this.id, OrderId: resp.data.id}
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
            buyBtn() {
                this.$refs.invoice.validate(valid => {
                    let flag = true
                    let params = {
                        item_id: this.id,
                        is_integral: this.isIntegral ? 1 : 0,
                        coupon_id: this.couponInfo ? this.couponInfo.id : null,
                        is_invoice: this.havInvoice,
                        invoice_type: this.invoice.type,
                        invoice_name: this.invoice.name,
                        invoice_email: this.invoice.email,
                        invoice_info: this.invoice.detail,
                        invoice_number: this.invoice.ein,
                        type: 'pc',
                    }
                    if (this.havInvoice) {
                        flag = valid
                    }
                    if (flag) {
                        if (this.payType === 1)
                            this.weChatPay(params)
                        else if (this.payType === 2)
                            this.aliPay(params)
                        else if (this.payType === 3)
                            this.balancePay(params)
                    }
                })
            },
            finishPay() {
                this.$router.push({
                    name: 'prokectOrderType',
                    query: {id: this.id, OrderId: this.OrderId}
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .onlineOrder_page {
        .nav {
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 20px;
        }
        .onlineOrder_breadcrumb {
            margin-top: 15px;
        }
        .class_show {
            padding: 15px 0;
            display: flex;
            border-bottom: 4px solid #f1f1f1;
            .video_img {
                width: 280px;
                height: 200px;
                background: #999999;
                border-radius: 4px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .video_text {
                margin-left: 15px;
                font-size: 16px;
                font-weight: bold;
                .price {
                    margin-top: 160px;
                    color: #f44336;
                }
            }
        }
        .coupon_choice {
            margin-top: 15px;
        }
        &-info {
            padding: 0 0 20px 0;
            border-bottom: 5px solid #eee;
            margin-top: 10px;
            $height: 190px;

            * {
                box-sizing: border-box;
            }
            .video {
                @include size(342px, $height);
                background-color: #ccc;
            }
            .info {
                @include size(855px, $height);
                padding: 5px 10px 0 25px;

                & > div + div {
                    margin-top: 10px;
                }
                &-name {
                    font-size: 16px;
                    font-weight: bold;
                }
                &-type {
                    div {
                        display: inline-block;
                        &:nth-of-type(2) {
                            background-color: $fontColorBlue;
                            color: #fff;
                            font-size: 12px;
                            border-radius: 10px;
                            padding: 0 12px;
                            line-height: 21px;
                        }
                    }
                }
                &-type, &-teacher, &-time {
                    font-size: 16px;
                }
                &-count {
                    color: #999;
                }
                &-type2 {
                    & > div {
                        background-color: #30babe;
                        color: #fff;
                        display: inline-block;
                        line-height: 1;
                        padding: 10px;
                        border-radius: 8px;
                    }
                }
                &-price {
                    color: $fontColorRed;
                    font-size: 16px;
                }
                &-ctrl {
                    ul {
                        list-style: none;
                        background-color: #f1f1f1;
                        display: inline-block;
                        padding: 7px 15px;
                        border-radius: 5px;

                        li {
                            a {
                                color: #666;
                                font-size: 14px;
                                line-height: 22px;
                                cursor: pointer;
                            }
                            span.icon {
                                vertical-align: bottom;
                                margin-right: 5px;
                                @include size(22px, 22px);
                            }
                            & + li {
                                margin-left: 10px;

                                a {
                                    margin-left: 10px;
                                }

                                &:before {
                                    content: '';
                                    display: block;
                                    @include size(1px, 21px);
                                    margin-top: 1px;
                                    background-color: #666;
                                    color: #666;
                                    float: left;
                                }
                            }
                        }
                    }
                }

                &-share {
                    dl {
                        dt {
                            line-height: 40px;
                            font-size: 14px;
                        }
                        dd {
                            margin: 0 0 0 10px;
                            a {
                                cursor: pointer;
                            }
                        }
                    }
                    .icon {
                        @include size(40px, 40px);
                    }
                }

                .buy {
                    a {
                        display: inline-block;
                        font-size: 16px;
                        color: #fff;
                        background-color: $fontColorBlue;
                        padding: 10px 35px;
                        border-radius: 5px;
                        cursor: pointer;

                        &:nth-of-type(2) {
                            margin-left: 10px;
                            background-color: $fontColorRed;
                        }
                    }
                }
            }
        }

        .coupon {
            margin-top: 10px;
            .title {
                padding: 10px 0;
            }
            .integral_type {
                margin-top: 12px;
                display: flex;
                .integral_text {
                    & span {
                        color: #f44336;
                    }
                }
                .check_type {
                    margin-left: 10px;
                }
            }
        }

        .invoice {
            width: 420px;
            margin-top: 20px;

            .btn-group {
                border: 1px solid $fontColorBlue;
                display: inline-block;
                border-radius: 5px;
                margin-bottom: 10px;

                a {
                    display: inline-block;
                    color: $fontColorBlue;
                    width: 70px;
                    line-height: 28px;
                    text-align: center;
                    cursor: pointer;

                    & + a {
                        margin-left: -4px;
                    }

                    &.active {
                        color: #fff;
                        background-color: $fontColorBlue;
                    }
                }
            }

            .invoice-type {
                margin: 10px 0;
                a {
                    display: inline-block;
                    width: 80px;
                    line-height: 28px;
                    text-align: center;
                    border: 1px solid #999;
                    color: #999;
                    border-radius: 5px;
                    cursor: pointer;

                    &.active {
                        background-color: $fontColorRed;
                        border-color: $fontColorRed;
                        color: #fff;
                    }
                    & + a {
                        margin-left: 10px;
                    }
                }
            }
        }
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

        .el-form-item {
            margin-bottom: 10px;
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
        .modal-body {
            text-align: center;
            line-height: 60px;
            font-size: 14px;
            padding: 20px 0 20px 135px;
        }
        .modalAli-body {
            text-align: center;
            padding: 20px 0;
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
