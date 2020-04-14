<template>
    <div class="multipleBuy_page page-content">
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ name: 'fineGoods' }">精品商城</el-breadcrumb-item>
                <el-breadcrumb-item>商品订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="address">
            <div class="title clear">
                <span class="left">请选择收货地址</span><span class="right pointer" @click="operation">地址管理</span>
            </div>
            <div class="address_box clear">
                <div>
                    <a class="icon to-left block left pre-btn" :class="{disabled:!this.pageInfo.pageNum}"
                       @click="preClick"></a>
                    <div class="address-content left">
                        <!--<div class="coupon-content left">-->
                        <ul class="address-list"
                            :style="{transform: `translate(-${(outWidth+blockProp.marginLeft) * pageInfo.pageNum}px)`}">
                            <li v-for="(item,index) in addressList"
                                @click="checkAddress(item)"
                                :class="{'active':address_id===item.id}"
                                :key="index"
                                :style="{left: `${(blockProp.width + blockProp.marginLeft) * index}px`}">
                                <label class="pointer">
                                    <div class="name" v-text="item.name">
                                    </div>
                                    <div class="phone" v-text="item.phone">
                                    </div>
                                    <div class="userAddress">
                                        {{item.provinces}}{{item.citys}}{{item.areas}}{{item.address}}
                                    </div>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <a class="icon to-right block right next-btn"
                       :class="{disabled: this.pageInfo.pageNum + 1 >= this.pageInfo.pageCount}" @click="nextClick"></a>
                </div>
            </div>
        </div>
        <ul class="bugList">
            <li v-for="item in goods_data">
                <!--<el-form ref="invoice" :model="invoice" label-width="70px">-->
                <div class="goods clear">
                    <div class="show left">
                        <img :src="imgPath+item.goods_data.cover_img" alt="">
                    </div>
                    <div class="detailed left">
                        <div class="goods_name" v-text="item.goods_data.name">名字</div>
                        <div class="goods_type">
                            <span v-text="item.goods_data.spec_name_one">黑色</span><span
                            v-text="item.goods_data.spec_name">50g</span><span>|</span><span>数量：</span><span
                            v-text="item.goods_data.num"></span>
                        </div>
                        <div class="order_num" v-text="item.order_num">
                        </div>
                        <div class="price money" v-text="item.money">
                        </div>
                    </div>
                </div>
                <div class="couponList" v-if="goodsDetails.goods_data.is_coupon===1">
                    <div class="title">
                        优惠卷
                    </div>
                    <div>
                        <goodsCoupon2 v-model="couponInfo" :type="1" :content-id="goodsCouponId"
                                      :price="goods_data[0].money"></goodsCoupon2>
                    </div>
                </div>
                <div class="integral_type" v-show="item.goods_data.is_integral===1">
                    <div class="integral_text"><span v-text="item.goods_data.integral"></span>积分抵扣<span
                        v-text="item.goods_data.integral_money" class="money"></span></div>
                    <div class="check_type">
                        <el-switch v-model="isIntegral" @change="howIntegral" active-color="#13ce66"
                                   inactive-color="#999999"></el-switch>
                    </div>
                </div>
                <!--发票-->
                <el-form ref="invoice" :model="invoice" label-width="100px">
                    <div class="invoice">
                        <div class="btn-group">
                            <a :class="{active:!havInvoice}" @click="havInvoice=0">不要发票</a>
                            <a :class="{active:havInvoice}" @click="havInvoice=1;$refs.invoice[0].resetFields()">要发票</a>
                        </div>
                        <div v-show="havInvoice">
                            <div class="title">电子发票</div>
                            <div class="invoice-type">
                                <a :class="{active:invoice.type===1}"
                                   @click="invoice.type=1;$refs.invoice[0].resetFields()">个人</a>
                                <a :class="{active:invoice.type===2}"
                                   @click="invoice.type=2;$refs.invoice[0].resetFields()">单位</a>
                            </div>
                            <el-form-item label="抬头名称" prop="name" :rules="$rules.invoiceName" style="height: 50px">
                                <el-input v-model="invoice.name"></el-input>
                            </el-form-item>
                            <el-form-item label="税号" v-show="invoice.type===2" prop="ein" :rules="$rules.invoiceEin"
                                          style="height: 50px">
                                <el-input v-model="invoice.ein"></el-input>
                            </el-form-item>
                            <el-form-item label="发票明细" prop="detail" :rules="$rules.invoiceDetail">
                                <el-select v-model="invoice.detail" placeholder="请选择发票明细"
                                           style="width: 100%;height: 50px">
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
                        <div class="commit">
                            <a class="commit-btn" @click="buyDetermine">立即支付(<span class="money">{{finalPrice}}</span>)</a>
                        </div>
                    </div>
                </el-form>
            </li>
        </ul>
        <!--支付宝和余额支付跳转弹框-->
        <self-modal heading="完成支付" :show.sync="finishAliPay" @close="closePay">
            <div class="modalAli-body">如您已支付，请点击完成支付。</div>
            <div class="modal-footer"><a class="finish-btn pointer" @click="finishPay">完成支付</a></div>
        </self-modal>
        <!--微信支付跳转弹框-->
        <self-modal heading="扫码完成支付" :show.sync="finishWeChatPay" @close="closePay">
            <div class="modal-body">
                <div v-show="payType===1" class="qr-code"></div>
            </div>
            <div class="modal-footer"><a class="finish-btn pointer" @click="finishPay">完成支付</a></div>
        </self-modal>
        <alert message="余额不足，无法完成支付" cancelText="取消" confirmText="充值" v-model="showAlert"
               @confirm="SureRecharge()"></alert>
        <self-modal :modal-width="1200" heading="地址管理" :show.sync="addressManagemen">
            <div class="addressManagemen_inp">
                <div class="add_addres" v-show="add==true">新增收货地址</div>
                <div class="add_addres" v-show="add==false">修改收货地址</div>
                <div class="add_inp">
                    <el-form :model="ruleForm" :label-position="labelPosition" :rules="rules" ref="ruleForm"
                             @submit.native.prevent label-width="80px">
                        <el-form-item label="收    件    人" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="ruleForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="所在城市" prop="province">
                            <el-select placeholder="省" style="width:133px" v-model="provinces">
                                <el-option v-for="item in provinceList" :key="item.code" :label="item.name"
                                           :value="item.name"></el-option>
                            </el-select>
                            <el-select placeholder="市" style="width:133px;margin-left: 5px" v-model="city">
                                <el-option v-for="item in cityList" :label="item.name" :key="item.code"
                                           :value="item.name"></el-option>
                            </el-select>
                            <el-select placeholder="县" style="width:133px;margin-left: 5px" v-model="areas">
                                <el-option v-for="item in countyList" :label="item.name" :key="item.code"
                                           :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收货地址" prop="address">
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="add_addres_btn" v-show=" addresType==true">
                        <button class="btn" @click="preserve('ruleForm')">新增保存</button>
                    </div>
                    <div class="add_addres_btn" v-show=" addresType==false">
                        <button class="btn" @click="editAddres">修改保存</button>
                    </div>
                </div>
            </div>
            <div class="address_list">
                <table class="address_table">
                    <thead>
                    <tr>
                        <!--<td></td>-->
                        <td>收货人</td>
                        <td>联系电话</td>
                        <td>所在城市</td>
                        <td>收货地址</td>
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in addressList" :key="item.id">
                        <td v-text="item.name"></td>
                        <td v-text="item.phone"></td>
                        <td><span v-text="item.provinces"></span>
                            <span v-text="item.citys"></span>
                            <span v-text="item.areas"></span>

                            <span v-text="item.address"></span>
                        </td>
                        <td v-text="item.address"></td>
                        <td>
                            <span style="color: #f44336" @click="modify(item.id)">修改</span> |
                            <span @click="del(item)">删除</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </self-modal>
    </div>
</template>

<script>
    import api from '../../api/goodsApi';
    import utils from '../../assets/js/utils';
    import {payApi, myAccountApi} from '../../api'
    import {Navigation, SelfModal, goodsCoupon2} from '../../components/public'
    import QRCodeJs from 'qrcodejs2'
    import Alert from "../../components/public/Alert";
    import address from "../../assets/json/pca-code.json";

    export default {
        name: "multiple-buy",
        components: {goodsCoupon2, Navigation, SelfModal, Alert},
        data() {
            return {
                showAlert: false,
                imgPath: utils.api,
                // 单个优惠券宽度，修改时需连同样式一起修改
                blockProp: {
                    width: 250,
                    marginLeft: 20,
                },
                pageInfo: {
                    pageNum: 0,
                    pageCount: 1,
                    pageSize: 4
                },
                outWidth: 1060,
                addressList: [],
                couponInfo: null,
                isIntegral: false, //是否用积分按钮
                goodsCouponId: '',
                invoice: {
                    name: '',//抬头名称
                    type: 1, //发票类型
                    ein: '', //税号
                    email: '',
                    detail: '', //发表详细
                },
                havInvoice: 0, //是否用要发票
                detailOption: [],  //发票明细
                payType: 1,
                invoiceType: 1,
                speci_id: '',
                goods_data: [],//全部订单生成的信息
                goodsDetails: {},
                address_id: '',
                finishAliPay: false,
                finishWeChatPay: false,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                id: '',
                //地址***************************
                addressManagemen: false,
                //地址
                labelPosition: 'right',
                //默认地址
                add: true,
                addresType: true,
                checked: '',
                ck: '',
                //三级联动
                provinceList: [],
                cityList: [],
                countyList: [],
                //表单
                ruleForm: {
                    name: '',
                    phone: '',
                    address: '',
                    province: "",
                },
                provinces: '',
                city: '',
                areas: '',
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^1[345789]\d{9}$/, message: '请输入正确的手机号'}
                        // { pattern:/^[a-zA-Z]w{1,4}$/, message: '以字母开头，长度在2-5之间， 只能包含字符、数字和下划线'}
                    ],
                    address: [
                        {required: true, message: '请输入地址', trigger: 'blur'},
                    ],
                    province: [
                        {required: true, message: '请选择所在城市', trigger: 'blur'},
                    ],
                },
                //用户的积分
                integral: '',
            }
        },
        computed: {
            finalPrice() {
                let result = this.goods_data[0].money
                if (this.couponInfo) {
                    if (this.couponInfo.type === 1) {
                        result = (result * 100 - this.couponInfo.discounts * 100) / 100
                    } else if (this.couponInfo.type === 2) {
                        result = (result * 100) * (this.couponInfo.discounts * 100) / 10000
                    }
                }
                if (this.isIntegral) {
                    result = (result * 100 - this.goodsDetails.goods_data.integral_money * 100) / 100
                }
                if (result) {
                    return (result * 1).toFixed(2)
                } else {
                    return (0).toFixed(2)
                }
            },
        },

        mounted() {
            //获取地址请求
            this.AddressList();
            this.$parent.showCourseNav = false
            this.pageInfo.pageCount = Math.ceil(this.addressList.length / this.pageInfo.pageSize)
            //获取id
            this.id = this.$route.query.id;
            this.num = this.$route.query.num;
            this.speci_id = this.$route.query.speci_id;
            this.order_num = this.$route.query.order_num;
            //地址
            //获取联动address
            this.provinceList = address
            //生成订单
            api.generateNum({
                goods_id: this.id,
                num: this.num,
                spec_id: this.spec_id,
            }).then((res) => {
                if (res.status === 1) {
                    console.log("生成订单", res.data.data)
                    this.goodsDetails = res.data.data[0]
                    console.log("商品详细", this.goodsDetails)
                    this.goods_data = res.data.data
                    //进来默认的地址
                    this.address_id = this.goodsDetails.addr_data.id
                } else {
                    this.$message.error(res.msg)
                }
            })
            //获取发票明细
            payApi.detailOption().then(res => {
                this.detailOption = res.data
            })
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
        //3级联动
        watch: {
            provinces(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.provinceList) {
                        if (item.name === v1) {
                            this.ruleForm.province = item.name
                            this.cityList = item.children
                            this.city = this.cityList[0].name
                            this.ruleForm.city = this.cityList[0].name
                            this.$refs['ruleForm'].validate()
                            break
                        }
                    }
                }
            },
            city(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.cityList) {
                        if (item.name === v1) {
                            this.countyList = item.children
                            this.areas = this.countyList[0].name
                            this.ruleForm.areas = this.countyList[0].name
                            break
                        }
                    }
                }
            }
        },
        methods: {
            closePay(){
                this.$router.push({name:'myOrderHome'})
            },
            //去充值
            SureRecharge() {
                this.$router.push({name: 'recharge'})
            },
            howIntegral() {
                debugger
                if (this.goodsDetails.goods_data.integral > this.integral) {
                    this.isIntegral = false
                    this.$message.error('积分不足')
                }
            },
            //地址按钮
            operation() {
                this.addressManagemen = true
            },
            //选中一个的效果
            checkedOne(index) {
                this.check = index;
            },
            //获取地址
            getAddresst() {
                api.getAddressList().then((res) => {
                    this.addressList = res.data.data
                })
            },
            //添加地址
            preserve(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.addAddress({
                            name: this.ruleForm.name,
                            phone: this.ruleForm.phone,
                            provinces: this.provinces,
                            citys: this.city,
                            areas: this.areas,
                            address: this.ruleForm.address,
                        }).then((res) => {
                            if (res.status === 1) {
                                this.$message.success(res.msg)
                                this.getAddresst()
                                this.AddressList()
                                this.ruleForm.name = '',
                                    this.ruleForm.phone = '',
                                    this.provinces = '',
                                    this.ruleForm.province = "",
                                    this.city = '',
                                    this.areas = '',
                                    this.ruleForm.address = ''
                            }
                        })
                    } else {
                        // this.$message.error('请填写完整的表单');
                        return false;
                    }
                })
            },
            //修改地址保存
            editAddres() {
                let _this = this
                api.modifyAddress({
                    id: _this.id,
                    name: _this.ruleForm.name,
                    phone: _this.ruleForm.phone,
                    provinces: _this.provinces,
                    citys: _this.city,
                    areas: _this.areas,
                    address: _this.ruleForm.address,
                }).then((res) => {
                    if (res.status === 1) {
                        this.add = true
                        this.addresType = true
                        this.ruleForm.name = '',
                            this.ruleForm.phone = '',
                            this.provinces = '',
                            this.city = '',
                            this.areas = '',
                            this.ruleForm.address = ''
                        this.getAddresst()
                        this.AddressList()
                    }
                })
            },
            //修改地址
            modify(id) {
                this.add = false
                this.addresType = false
                api.addressDetails({
                    id: id,
                }).then((res) => {
                    console.log(res.data)
                    this.id = res.data.id
                    if (res.status === 1) {
                        this.ruleForm.name = res.data.name
                        this.ruleForm.phone = res.data.phone
                        this.provinces = res.data.provinces
                        this.city = res.data.citys
                        this.areas = res.data.areas
                        this.ruleForm.address = res.data.address
                        this.getAddresst()
                        this.AddressList()
                    }
                })
            },
            //删除
            del(item) {
                const id = item.id
                api.deleteAddress({
                    id: id
                }).then((res) => {
                    if (res.status === 1) {
                        this.$message.success(res.msg)
                        this.getAddresst()
                        this.AddressList()
                    }
                })
            },


            // 上一页
            preClick() {
                if (this.pageInfo.pageNum) {
                    --this.pageInfo.pageNum
                }
            },
            // 下一页
            nextClick() {
                if (this.pageInfo.pageNum + 1 < this.pageInfo.pageCount) {
                    ++this.pageInfo.pageNum
                }
            },
            // 获取地址
            AddressList() {
                api.getAddressList().then((res) => {
                    if (res.status === 1) {
                        this.addressList = res.data.data
                        // 计算总页数
                        this.pageInfo.pageCount = Math.ceil(this.addressList.length / this.pageInfo.pageSize)
                    }
                })
            },
            checkAddress(item) {
                console.log("地址", item)
                this.address_id = item.id
            },
            //修改地址
            address() {
                this.$router.push({name: 'addressManagemen'})
            },
            //点击购买了
            buyDetermine() {
                const params = {
                    order_num: this.goodsDetails.order_num,
                    goods_id: this.id,
                    addr_id: this.address_id,
                    pay_type: this.payType,
                    coupon_id: this.couponInfo ? this.couponInfo.id : null,
                    is_integral: this.isIntegral ? 1 : 0,
                    is_invoice: this.havInvoice,
                    invoice_type: this.invoice.type,
                    invoice_name: this.invoice.name,
                    invoice_email: this.invoice.email,
                    invoice_info: this.invoice.detail,
                    invoice_number: this.invoice.ein,
                    type: 'pc',
                };
                this.$refs.invoice[0].validate(valid => {
                    let flag = true
                    if (this.havInvoice) {
                        flag = valid
                    }
                    if (flag) {
                        if (this.address_id === '') {
                            this.$message.error("请添加收货地址")
                            return false
                        }
                        if (this.payType === 1)
                            this.weChatPay(params)
                        else if (this.payType === 2)
                            this.aliPay(params)
                        else if (this.payType === 3)
                            this.balancePay(params)
                    }
                })
            },
            // 微信支付
            weChatPay(params) {
                this.finishWeChatPay = true
                params.pay_type = '2'
                api.buyGoodsOne(params).then(resp => {
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
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            // 支付宝支付
            aliPay(params) {
                this.finishAliPay = true
                params.pay_type = '1'
                api.buyGoodsOne(params).then(resp => {
                    const div = document.createElement('div')
                    div.innerHTML = resp
                    document.body.appendChild(div)
                    document.forms.alipaysubmit.submit()
                    div.innerHTML = ''
                })
            },
            // 余额支付
            balancePay(params) {
                params.pay_type = '3'
                if (this.userInfo.balance * 1 > this.goodsDetails.money * 1) {
                    api.buyGoodsOne(params).then(resp => {
                        if (resp.status === 1) {
                            this.$router.push({
                                name: 'goodsPayType',
                                params: {orderNum: this.goodsDetails.order_num, goodsId: this.id}
                            })
                        } else {
                            this.$message({
                                message: resp.msg,
                                type: 'error'
                            })
                        }
                    })
                } else {
                    this.showAlert = true
                    return false
                }

            },
            finishPay() {
                this.$router.push({
                    name: 'goodsPayType',
                    params: {orderNum: this.goodsDetails.order_num, goodsId: this.id, num: this.num}
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .multipleBuy_page {
        .breadcrumb {
            margin: 20px 0;
        }
        .address {
            .title {
                font-size: 14px;
                font-weight: bold;
                .right {
                    color: #303f9f;
                }
            }
            .address_box {
                $height: 110px;
                margin-top: 10px;
                * {
                    box-sizing: border-box;
                }
                .block {
                    display: block;
                }
                .pre-btn, .next-btn {
                    @include size(50px, $height);
                    text-align: center;
                    vertical-align: middle;
                    background-color: #f1f1f1;
                    background-size: 40%;
                    cursor: pointer;
                    &.disabled {
                        cursor: not-allowed;
                        opacity: .5;
                    }
                }
                .address-content {
                    width: 1060px;
                    height: $height;
                    margin: 0 20px;
                    overflow: hidden;
                    position: relative;

                    .address-list {
                        list-style: none;
                        transition: all .5s;
                        padding-top: 10px;
                        li {
                            @include size(250px, 90px);
                            border-radius: 10px;
                            position: absolute;
                            top: 10px;
                            border: 1px solid #333333;
                            overflow: hidden;
                            label {
                                display: block;
                                width: 100%;
                                height: 100%;
                                color: #fff;
                                padding: 10px;
                                .name {
                                    font-weight: bold;
                                    font-size: 14px;
                                    color: #333333;
                                }
                                .phone {
                                    font-weight: bold;
                                    font-size: 14px;
                                    margin: 10px 0;
                                    color: #333333;
                                }
                                .userAddress {
                                    color: #999999;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 1;
                                    display: -webkit-box;
                                    overflow: hidden;
                                }
                            }
                            &.active {
                                border: 1px solid #f44336;
                            }
                        }
                    }

                }

            }
        }
        .bugList {
            margin-top: 15px;
            li {
                .goods {
                    border-top: 2px solid #f1f1f1;
                    padding-top: 15px;
                    .show {
                        width: 100px;
                        height: 100px;
                        background: #999999;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .detailed {
                        margin-left: 10px;
                        div {
                            margin-bottom: 10px;
                        }
                        .goods_name {
                            font-size: 14px;
                            font-weight: bold;
                        }
                        .goods_type {
                            height: 20px;
                            line-height: 20px;
                            span {
                                margin-right: 15px;
                            }
                        }
                        .order_num {

                        }
                        .price {
                            color: #f44336;
                        }
                    }
                }
                .couponList {
                    margin-top: 20px;
                    .title {
                        font-weight: bold;
                        font-size: 14px;
                        margin-bottom: 15px;
                    }
                }
                .integral_type {
                    margin-top: 12px;
                    display: flex;
                    border-bottom: 1px solid #f1f1f1;
                    .integral_text {
                        & span {
                            color: #f44336;
                        }
                    }
                    .check_type {
                        margin-left: 10px;
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
        .addressManagemen_inp {
            width: 500px;
            margin: 20px auto;
            .add_addres {
                font-size: 16px;
                font-weight: bold;
            }
            .add_inp {
                margin-top: 10px;
            }
            .add_addres_btn {
                text-align: center;
                .btn {
                    margin-top: 20px;
                    width: 160px;
                    height: 40px;
                    outline: none;
                    border: 0;
                    background: #f44336;
                    border-radius: 6px;
                    color: #ffff;
                }
            }
        }
        .address_list {
            margin-top: 100px;
            margin-bottom: 100px;
            padding: 20px 60px;
            .address_table {
                width: 100%;
                border-collapse: collapse;
                border-radius: 4px;
                tr, td {
                    height: 40px;
                }
                & thead {
                    background: #999999;
                    color: #fff;
                    font-size: 14px;
                    font-weight: bold;
                }
            }

        }
    }
</style>
