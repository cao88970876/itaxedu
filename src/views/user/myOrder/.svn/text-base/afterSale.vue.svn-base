<template>
    <div class="afterSale_page">
        <div class="receipt_title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/user/myOrder/myOrder' }">我的订单</el-breadcrumb-item>
                <el-breadcrumb-item>申请售后</el-breadcrumb-item>
            </el-breadcrumb>
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
                        <div class="goods_show"><img :src="imgPath+goods.goods_cover_img" alt=""></div>
                        <div class="goods_name">
                            <div v-text="goods.goods_name"></div>
                            <div>{{goods.add_time | timeFilter}}</div>
                        </div>
                        <div class="goods_attribute" v-text="goods.goods_spec">属性</div>
                        <div class="goods_price money" v-text="goods.money">300</div>
                        <div class="goods_count">数量：<span v-text="goods.num"></span></div>
                        <div class="goods_num" v-text="goods.order_num"></div>
                    </div>
                </li>
            </ul>
        </div>
        <el-form class="release_inp" ref="ruleForm" :rules="rules" :model="ruleForm" @submit.native.prevent>
            <div class="service">
                <div class="returnGoods">
                    <div @click="banck(type=1)" :class="{active:type===1}">仅退款</div>
                    <div @click="banck(type=2)" :class="{active:type===2}">退货退款</div>
                </div>
                <div class="reason">
                    <div class="title">退款原因:</div>
                    <div class="reason_text">
                        <el-form-item prop="reason">
                            <el-input type="textarea" maxlength="1000" :autosize="{ minRows: 10, maxRows: 50}"
                                      placeholder="请输入退款原因" resize="none" v-model="ruleForm.reason">
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="goods_type" v-if="type===1">
                    <div class="title">货物状态：</div>
                    <div class="check">
                        <label>
                            <input type="radio" :value="1" v-model="ruleForm.isPublic"/>
                            <i class="icon radio-no-checked" :class="{'radio-checked':ruleForm.isPublic===1}"></i>未收到货
                        </label>
                        <label>
                            <input type="radio" :value="2" v-model="ruleForm.isPublic"/>
                            <i class="icon radio-no-checked" :class="{'radio-checked':ruleForm.isPublic===2}"></i>已收到货物
                        </label>
                    </div>
                </div>
                <div class="goods_num">
                    <div class="title">订单号：</div>
                    <div class="num" v-text="goods.order_num"></div>
                </div>
                <div class="goods_price">
                    <div class="title">退款金额:</div>
                    <div class="price money" v-show="ruleForm.isPublic===1 || type===2" v-text="goods.money"></div>
                    <div v-show="ruleForm.isPublic===2 && type===1">
                        <el-form-item prop="money">
                            <el-input v-model="ruleForm.money" ></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="goodsOrder" v-show="type==2">
                    <div class="title">物流公司:</div>
                    <div>
                        <el-form-item prop="logisticsSelect">
                            <el-select placeholder="请选择物流公司" v-model="ruleForm.logisticsType">
                                <el-option v-for="(item,index) in logistics"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="goodsOrder" v-show="type==2">
                    <div class="title">物流单号:</div>
                    <div>
                        <el-form-item prop="logistics_num">
                            <el-input v-model="ruleForm.logistics_num"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="voucher">
                    <div class="title">
                        上传凭证:
                    </div>
                    <div class="comment_img">
                        <saleUpload ref="Expertcard"></saleUpload>
                    </div>
                </div>
                <div class="sale_btn">
                    <button @click="refundGoods">提交</button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import api from '@/api/myOrderApi'
    import utils from '../../../assets/js/utils';
    import {saleUpload} from '../../../components/public'
    import ElAlert from "element-ui/packages/alert/src/main";

    export default {
        name: "after-sale",
        components: {
            ElAlert,
            saleUpload
        },
        data() {
            return {
                type: 1,
                isPublic: 1,
                dialogImageUrl: '',
                dialogVisible: false,
                imgPath: utils.api,
                goods: {},
                address: {},
                //快递地理位置
                expressMap: {},
                id: '',
                goods_money: '',
                refund: '',
                //快递公司分类
                logistics: [],
                //订单号
                order_num: '',
                //表单
                ruleForm: {
                    //快递
                    logisticsType: '',
                    //理由
                    reason: '',
                    //快递号
                    logistics_num: '',
                    //金额
                    money: '',
                    //退货类型
                    isPublic: 1,
                },
                rules: {
                    // reason: [{required: true, message: '请输入退款原因', trigger: 'blur'},],
                    // money:[  {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'},]
                }
            }
        },
        methods: {
            banck(obj) {
                this.refund = obj
            },
            getRes() {
                api.refundGoods({
                    id: this.id,
                    type: this.type,
                    goods_type: this.ruleForm.isPublic,
                    reasons: this.ruleForm.reason,
                    logistics_id: this.ruleForm.logisticsType,
                    logistics_num: this.order_num,
                    money: this.ruleForm.money,
                    img_data: this.$refs.Expertcard.images,
                }).then((res) => {
                    console.log(res.data)
                    if (res.status === 1) {
                        this.$router.push({name: 'myOrder'})
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            refundGoods() {
                // if (this.ruleForm.money*1>this.goods.money*1 ||this.ruleForm.money=="") {
                //     this.$message.error("请输入正确的退款金额")
                //     return false
                // }
                if (this.type === 1 && this.ruleForm.isPublic === 1) {
                    if (this.ruleForm.reason !== "") {
                        if (this.$refs.Expertcard.images.length > 0) {
                            this.getRes()
                        } else {
                            this.$message.error("请上传凭证")
                        }
                    } else {
                        this.$message.error("请输入退款原因")
                    }
                } else if (this.type === 1 && this.ruleForm.isPublic === 2) {
                    if (this.ruleForm.reason !== "") {
                        if (this.ruleForm.money < this.goods_money && this.ruleForm.money > 0 && this.ruleForm.money !== '') {
                            if (this.$refs.Expertcard.images.length > 0) {
                                this.getRes()
                            } else {
                                this.$message.error("请上传凭证")
                            }
                        } else {
                            this.$message.error("请输入正确的金额")
                        }
                    } else {
                        this.$message.error("请输入退款原因")
                    }
                } else if (this.type === 2) {
                    if (this.ruleForm.reason !== "") {
                        if (this.ruleForm.logisticsType !== '') {
                            if (this.ruleForm.logistics_num !== '') {
                                if (this.$refs.Expertcard.images.length > 0) {
                                    this.getRes()
                                } else {
                                    this.$message.error("请上传凭证")
                                }
                            } else {
                                this.$message.error("请填写物流单号")
                            }
                        } else {
                            this.$message.error("请选择物流公司")
                        }
                    } else {
                        this.$message.error("请输入退款原因")
                    }
                }
                // api.refundGoods({
                //     id: this.id,
                //     type: this.type,
                //     goods_type: this.ruleForm.isPublic,
                //     reasons: this.ruleForm.reason,
                //     logistics_id: this.ruleForm.logisticsType,
                //     logistics_num: this.order_num,
                //     money: this.ruleForm.money,
                //     img_data: this.$refs.Expertcard.images,
                // }).then((res) => {
                //     console.log(res.data)
                //     if (res.status === 1) {
                //         this.$router.push({name: 'myOrder'})
                //     } else if (res.status === 0) {
                //         this.$message.error(res.msg);
                //     }
                // })
            }
        },
        mounted() {
            this.id = this.$route.query.id
            //快递公司
            api.logistics().then((res) => {
                this.logistics = res.data
            })
            api.goodsDetailsList({
                id: this.id
            }).then((res) => {
                //console.log("物品", res.data.money)
                this.expressMap = res.data.invoice_info
                this.address = res.data.addr
                this.goods = res.data
                this.order_num = res.data.order_num
                this.goods_money = res.data.money
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .afterSale_page {
        .receipt_title {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
        }
        .orderNav {
            width: 1016px;
            margin: 20px auto;
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
                                object-fit: cover;
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
        .service {
            padding: 0 20px;
            .returnGoods {
                display: flex;
                div {
                    width: 120px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    background: #f1f1f1;
                    color: #666666;
                    cursor: pointer;
                }
                div + div {
                    margin-left: 15px;
                }
                .active {
                    background: #f44336;
                    color: #ffffff;
                }
            }
            .reason, .goods_type, .goods_num, .goods_price, .voucher, .goodsOrder {
                margin-top: 20px;
                display: flex;
                .title {
                    width: 8%;
                    color: #666666;
                    font-size: 14px;
                }
                .comment_img {
                    width: 92%;
                    height: 160px;
                }
                .reason_text {
                    width: 92%;
                }
                .check {
                    & > label {
                        margin-right: 30px;
                        cursor: pointer;
                        line-height: 20px;
                        font-size: 14px;

                        & > input[type=radio] {
                            display: none;
                        }
                        .icon {
                            @include size(19px, 19px);
                            vertical-align: bottom;
                            margin-right: 10px;
                            position: relative;
                            top: -1px;
                        }
                    }

                }
                .num, .price {
                    font-size: 14px;
                }
            }
            .sale_btn {
                margin-top: 50px;
                margin-bottom: 100px;
                button {
                    width: 300px;
                    height: 40px;
                    outline: none;
                    border: 0;
                    background: #f44336;
                    color: #ffffff;
                    border-radius: 4px;
                }
            }
        }
    }


</style>
