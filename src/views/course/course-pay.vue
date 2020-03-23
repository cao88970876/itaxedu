<template>
    <div class="course-pay page-content">
        <navigation class="mt-20"></navigation>
        <ul class="crumbs clear mt-20">
            <li class="left">课程学习</li>
            <li class="left">订单结算</li>
        </ul>
        <!--课程详情-->
        <div class="course-pay-info clear">
            <div class="video left">
                <img v-if="courseDetail.thumb" :src="courseDetail.thumb">
            </div>
            <div class="info left">
                <div class="info-name"><span class="icon business"></span><span v-text="courseDetail.title"></span>
                </div>
                <div class="info-type">
                    <div>类型：</div>
                    <div v-text="courseDetail.tag_name"></div>
                </div>
                <div class="info-teacher">
                    <span v-text="courseDetail.nickname"></span>
                    <span v-text="`[${courseDetail.experts_name}]`" v-if="courseDetail.experts_name"></span>
                </div>
                <div class="info-time">
                    <template v-if="courseDetail.type===1">
                        时间：<span v-text="timeLong" :title="timeLong"></span>
                    </template>
                    <template v-if="courseDetail.type===2">
                        时长：<span v-text="videoTimeLong" :title="videoTimeLong"></span>
                    </template>
                    <template v-if="courseDetail.type===3">
                        时间：<span v-text="lineTimeLong" :title="lineTimeLong"></span>
                    </template>
                </div>
                <div class="info-count"><span v-text="courseDetail.sales_volume||0"></span>人已购买</div>
                <div class="info-price money" v-text="courseDetail.price"></div>
            </div>
        </div>
        <el-form ref="invoice" :model="invoice" label-width="100px">
            <div class="coupon-div">
                <div class="title">优惠券</div>
                <coupon ref="coupon" class="mb-10" v-model="couponInfo" :type="1" :content-id="courseId" :price="courseDetail.price"></coupon>
                <div class="integral" v-if="courseDetail.integral">
                    <span v-text="`${courseDetail.integral}积分抵扣`"></span>
                    <span class="money" v-text="courseDetail.money"></span>
                    <el-switch
                        v-model="isIntegral"
                        @change="checkIntegral"
                        active-color="#f44336"
                        inactive-color="#CCCCCC">
                    </el-switch>
                </div>
            </div>
            <div class="invoice">
                <div class="btn-group">
                    <a :class="{active:!havInvoice}" @click="havInvoice=false">不要发票</a>
                    <a :class="{active:havInvoice}" @click="havInvoice=true;$refs.invoice.resetFields()">要发票</a>
                </div>
                <div v-show="havInvoice">
                    <div class="title">电子发票</div>
                    <div class="invoice-type">
                        <a :class="{active:invoice.type===1}" @click="invoice.type=1;$refs.invoice.resetFields()">个人</a>
                        <a :class="{active:invoice.type===2}" @click="invoice.type=2;$refs.invoice.resetFields()">单位</a>
                    </div>
                    <el-form-item label="抬头名称" prop="name" :rules="$rules.invoiceName">
                        <el-input v-model="invoice.name"></el-input>
                    </el-form-item>
                    <el-form-item label="税号" v-if="invoice.type===2" prop="ein" :rules="$rules.invoiceEin">
                        <el-input v-model="invoice.ein"></el-input>
                    </el-form-item>
                    <el-form-item label="发票明细" prop="detail" :rules="$rules.invoiceDetail">
                        <el-select v-model="invoice.detail" placeholder="请选择发票明细" style="width: 100%;">
                            <el-option v-for="item in detailOption" :key="item.id" :label="item.name"
                                       :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱地址" prop="email" :rules="$rules.email">
                        <el-input v-model="invoice.email"></el-input>
                    </el-form-item>
                </div>
            </div>
            <!--支付方式-->
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
                    <a class="commit-btn" @click="commitPay">立即支付（¥<span v-text="finalPrice"></span>）</a>
                </div>
            </div>
        </el-form>
        <self-modal heading="完成支付" :show.sync="finishAliPay">
            <div class="modal-body">如您已支付，请点击完成支付。</div>
            <div class="modal-footer"><a class="finish-btn pointer" @click="finishPay">完成支付</a></div>
        </self-modal>
        <self-modal heading="扫码完成支付" :show.sync="finishWeChatPay">
            <div class="modal-body">
                <div v-show="payType===1" class="qr-code"></div>
            </div>
            <div class="modal-footer"><a class="finish-btn pointer" @click="finishPay">完成支付</a></div>
        </self-modal>
        <self-modal :show.sync="balanceTip">
            <div class="pb-30">
                <div class="login-tip">余额不足</div>
                <div class="modal-btn">
                    <a class="pointer" @click="$router.push({name: 'recharge'})">立即充值</a>
                    <a class="pointer ml-20" @click="balanceTip=false">取消</a>
                </div>
            </div>
        </self-modal>
    </div>
</template>

<script>
    import {Navigation, Coupon, SelfModal} from '../../components/public'
    import {contentApi, payApi, utilsApi, myAccountApi} from '../../api'
    import QRCodeJs from 'qrcodejs2'

    export default {
        name: "course-pay",
        components: {Navigation, Coupon, SelfModal,},
        data() {
            return {
                payType: 1,
                havInvoice: false,
                invoice: {
                    name: '',
                    type: 1,
                    email: '',
                    ein: '',
                    detail: '',
                },
                courseId: this.$route.params.courseId,
                couponInfo: null,
                orderInfo: null,
                courseDetail: {},
                detailOption: [],
                // 是否积分兑换
                isIntegral: false,
                finishWeChatPay: false,
                finishAliPay: false,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                qrInstance: null,
                isGive: this.$route.query.isGive,
                integral: 0,
                balanceTip: false,
            }
        },
        computed: {
            lineTimeLong() {
                let result = this.$filter.timeFilter(this.courseDetail.line_start_time, 'M月DD日 HH:mm') + '-' + this.$filter.timeFilter(this.courseDetail.line_end_time, 'HH:mm');
                if (this.courseDetail.is_one === 2) {
                    result += `/${this.courseDetail.table_count}节课`
                }
                return result
            },
            timeLong() {
                let result = this.$filter.timeFilter(this.courseDetail['start_time']) + '-' + this.$filter.timeFilter(this.courseDetail.end_time);
                if (this.courseDetail.is_one === 2) {
                    result += `/${this.courseDetail.table_count}节课`
                }
                return result
            },
            videoTimeLong() {
                let result = this.$filter.timeLongFilter(this.courseDetail.duration);
                if (this.courseDetail.is_one === 2) {
                    result += `/${this.courseDetail.table_count}节课`
                }
                return result
            },
            finalPrice() {
                let result = this.courseDetail.price
                if (this.couponInfo) {
                    if (this.couponInfo.type === 1) {
                        result = (result * 100 - this.couponInfo.discounts * 100) / 100
                    } else if (this.couponInfo.type === 2) {
                        result = (result * 100) * (this.couponInfo.discounts * 100) / 10000
                    }
                }
                if (this.isIntegral) {
                    result = (result * 100 - this.courseDetail.money * 100) / 100
                }
                if (result) {
                    return (result * 1).toFixed(2)
                } else {
                    return (0).toFixed(2)
                }
            },
        },
        mounted() {
            contentApi.courseDetail({
                id: this.courseId
            }).then(resp => {
                this.courseDetail = resp.data
                this.courseDetail.thumb = utilsApi.api + this.courseDetail.thumb
            })
            payApi.detailOption().then(resp => {
                this.detailOption = resp.data
            })
            myAccountApi.accountInfo({
                uid: this.userInfo.uid,
            }).then(resp => {
                if (resp.status === 1) {
                    this.integral = resp.data.integral
                }
            })
        },
        methods: {
            checkIntegral() {
                if (this.courseDetail.integral > this.integral) {
                    this.isIntegral = false
                    this.$message.error('积分不足')
                }
            },
            weChatPay(params) {
                params.pay_type = '2'
                payApi.pay(params).then(resp => {
                    if (resp.status === 1) {
                        this.finishWeChatPay = true
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
                    } else {
                        this.$message.error(resp.msg)
                    }
                })
            },
            aliPay(params) {
                params.pay_type = '1'
                payApi.pay(params).then(resp => {
                    if (resp.status === 2) {
                        this.$message.error(resp.msg)
                    } else {
                        this.finishAliPay = true
                        const div = document.createElement('div')
                        div.innerHTML = resp
                        document.body.appendChild(div)
                        document.forms.alipaysubmit.submit()
                        document.body.removeChild(div)
                    }
                })
            },
            balancePay(params) {
                params.pay_type = '3'
                payApi.pay(params).then(resp => {
                    if (resp.status === 1) {
                        this.$router.push({
                            name: 'coursePayStatus',
                            params: {orderNum: this.orderInfo.order_num, courseId: this.courseId},
                            query: {isGive: this.isGive, orderId: this.orderInfo.id}
                        })
                    } else {
                        this.balanceTip = true
                    }
                })
            },
            invoiceAdd(params) {
                payApi.invoice(Object.assign(this.invoice, params)).then(resp => {
                    console.log(resp)
                })
            },
            commitPay() {
                this.$refs.invoice.validate(valid => {
                    let flag = true
                    if (this.havInvoice) {
                        flag = valid
                    }
                    if (flag) {
                        payApi.contentOrder({
                            uid: this.userInfo.uid,
                            content_id: this.courseId,
                            type: '1',
                            is_give: this.isGive ? 1 : 0,
                        }).then(resp => {
                            if (resp.status === 1) {
                                this.orderInfo = resp.data
                                // 如果要发票就生成发票信息
                                if (this.havInvoice)
                                    this.invoiceAdd({
                                        uid: this.userInfo.uid,
                                        order_id: this.orderInfo.id,
                                        category: '1',
                                    })
                                //支付接口参数
                                let params = {
                                    uid: this.userInfo.uid,
                                    order_num: this.orderInfo.order_num,
                                    attach: 'ContentOrder',
                                    type: 'pc',
                                    user_coupon_id: this.couponInfo ? this.couponInfo.id : null,
                                    is_integral: this.isIntegral ? 1 : 0,
                                }
                                if (this.payType === 1)
                                    this.weChatPay(params)
                                else if (this.payType === 2)
                                    this.aliPay(params)
                                else if (this.payType === 3)
                                    this.balancePay(params)
                            } else {
                                this.$message({
                                    message: resp.msg,
                                    type: 'error'
                                })
                            }
                        })
                    }
                })
            },
            finishPay() {
                this.$router.push({
                    name: 'coursePayStatus',
                    params: {orderNum: this.orderInfo.order_num, courseId: this.courseId,},
                    query: {isGive: this.isGive, orderId: this.orderInfo.id}
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .course-pay {
        .title {
            font-size: 14px;
        }
        img {
            width: 100%;
            height: 100%;
        }
        .crumbs {
            border-top: 5px solid #f1f1f1;
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

        .coupon-div {
            border-bottom: 1px solid #f1f1f1;
            margin-top: 10px;
            .title {
                padding: 10px 0;
            }
            .integral {
                margin: 10px 0;
                font-size: 14px;

                .money {
                    color: $fontColorRed;
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
