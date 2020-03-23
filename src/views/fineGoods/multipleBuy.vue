<template>
    <div class="multipleBuy_page page-content">
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/fineGoods/goodsList' }">精品商城</el-breadcrumb-item>
                <el-breadcrumb-item>商品订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="address">
            <div class="title clear">
                <span class="left">请选择收货地址</span><span class="right" @click="operation">地址管理</span>
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
                                :key="index"
                                @click="checkAddress(item)"
                                :class="{'active':address_id===item.id}"
                                :style="{left: `${(blockProp.width + blockProp.marginLeft) * index}px`}">
                                <label class="pointer">
                                    <div class="name" v-text="item.name"><!--qweqwe@click.prevent="clickItem(item)"-->
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
            <li v-for="(item,index) in buyList">
                <el-form :ref="'invoice'+index" :model="item.invoice" label-width="100px">
                    <div class="goods clear">
                        <div class="show left">
                            <img :src="imgPath+item.goods_data.cover_img" alt="">
                        </div>
                        <div class="detailed left">
                            <div class="goods_name" v-text="item.goods_data.name"></div>
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
                    <div class="couponList" v-if="item.goods_data.is_coupon">
                        <div class="title">
                            优惠卷
                        </div>
                        <div>
                            <goodsCoupon2 v-model="item.couponInfo" @couponCheck="isCouponCheck" :type="1" :price="item.money"></goodsCoupon2>
                        </div>
                    </div>
                    <div class="integral_type" v-show="item.goods_data.is_integral===1">
                        <div class="integral_text"><span v-text="item.goods_data.integral"></span>积分抵扣<span
                            v-text="item.goods_data.integral_money" class="money"></span></div>
                        <div class="check_type">
                            <el-switch v-model="item.isIntegral"
                                       active-color="#13ce66" inactive-color="#999999"
                                       @change="howIntegral(item)"
                            ></el-switch>
                        </div>
                    </div>
                    <!--发票-->
                    <div class="invoice">
                        <div class="btn-group">
                            <a :class="{active:item.havInvoice===0}" @click="is_havInvoice(item,index,0)">不要发票</a>
                            <a :class="{active:item.havInvoice===1}"
                               @click="is_havInvoice(item,index,1);$refs['invoice' + index][0].resetFields()">要发票</a>
                        </div>
                        <div v-show="item.havInvoice===1">
                            <div class="title">电子发票</div>
                            <div class="invoice-type">
                                <a :class="{active:item.invoice.type===1}"
                                   @click="checkType(item,index,1);$refs['invoice' + index][0].resetFields()">个人</a>
                                <a :class="{active:item.invoice.type===2}"
                                   @click="checkType(item,index,2);$refs['invoice' + index][0].resetFields()">单位</a>
                            </div>
                            <el-form-item label="抬头名称" prop="name" :rules="$rules.invoiceName" style="height: 50px">
                                <el-input v-model="item.invoice.name"></el-input>
                            </el-form-item>
                            <el-form-item label="税号" v-if="item.invoice.type===2" prop="ein"
                                          :rules="$rules.invoiceEin" style="height: 50px">
                                <el-input v-model="item.invoice.ein"></el-input>
                            </el-form-item>
                            <el-form-item label="发票明细" prop="detail" :rules="$rules.invoiceDetail">
                                <el-select v-model="item.invoice.detail"
                                           placeholder="请选择发票明细" style="width: 100%;height: 50px">
                                    <el-option :label="mx.name" v-for="mx in detailOption" :key="mx.id"
                                               :value="mx.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="邮箱地址" prop="email" :rules="$rules.email" style="height: 40px">
                                <el-input v-model="item.invoice.email"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </li>
        </ul>
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
        </div>
        <div class="commit">
            <a class="commit-btn" @click="payAllGoods()">立即支付(<span class="money">{{finalPrice}}</span>)</a>
        </div>
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
                        <!--<td>-->
                        <!--<label>-->
                        <!--&lt;!&ndash;<el-checkbox :checked="ck==1? checked:''" @click="checkedOne(index+1)"></el-checkbox>&ndash;&gt;-->
                        <!--<el-radio :label="item.id" v-model="checked">默认地址</el-radio>-->
                        <!--</label>-->
                        <!--</td>-->
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
    // import api from '../../api/goodsApi';
    // import utils from '../../assets/js/utils';
    import {payApi, myAccountApi, utilsApi as utils, goodsApi as api} from '../../api'
    import address from "../../assets/json/pca-code.json";
    import {SelfModal, goodsCoupon2, Alert,} from '../../components/public';
    import QRCodeJs from 'qrcodejs2';

    export default {
        name: "multiple-buy",
        components: {goodsCoupon2, SelfModal, Alert},
        data() {
            return {
                showAlert: false,
                finishAliPay: false,
                finishWeChatPay: false,
                order_data: [],
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
                //couponInfo: null,
                isIntegral: false, //是否用积分
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
                goodsId: [],//购物车传过来的ID
                address_id: '',
                buyList: [],//返回的订单列表
                allMoney: '',
                allOrder_num: '',
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                //地址管理
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
                        {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'}
                        // { pattern:/^[a-zA-Z]w{1,4}$/, message: '以字母开头，长度在2-5之间， 只能包含字符、数字和下划线'}
                    ],
                    address: [
                        {required: true, message: '请输入地址', trigger: 'blur'},
                    ],
                    province: [
                        {required: true, message: '请选择所在城市', trigger: 'blur'},
                    ],
                },
                integral: '',
                canBuy:'',
            }
        },
        computed: {
            finalPrice() {
                let result = 0
                this.buyList.forEach(v => {
                    let temp = v.goods_data.price
                    if (v.couponInfo) {
                        if (v.couponInfo.type === 1) {
                            temp = (v.goods_data.price * 100 - v.couponInfo.discounts * 100) / 100
                        } else if (v.couponInfo.type === 2) {
                            temp = (v.goods_data.price * 100) * (v.couponInfo.discounts * 100) / 10000
                        }
                    }
                    if (v.isIntegral) {
                        temp = (temp * 100 - v.goods_data.integral_money * 100) / 100
                    }
                    result += temp * 1
                })
                return result ? (result * 1).toFixed(2) : (0).toFixed(2)
            },
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
                            this.ruleForm.areas = this.countyList[0].name
                            break
                        }
                    }
                }
            }
        },
        mounted() {
            //获取联动address
            this.provinceList = address
            this.province = this.provinceList[0].code
            //获取地址请求
            this.goodsId = this.$route.query.carts
            console.log(this.$route.query.carts.toString())
            this.AddressList();
            this.$parent.showCourseNav = false
            this.pageInfo.pageCount = Math.ceil(this.addressList.length / this.pageInfo.pageSize)
            //获取id
            api.multipleBuyGoods({
                cart_id: this.goodsId.toString()
            }).then((res) => {
                if (res.status === 1) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].havInvoice = 0
                        res.data.data[i].isIntegral = false
                        res.data.data[i].couponInfo = null
                        res.data.data[i].couponRef = 'coupon' + i
                        res.data.data[i].isIntegral = false
                        res.data.data[i].invoice = {
                            name: '',//抬头名称
                            type: 1, //发票类型
                            ein: '', //税号
                            email: '',
                            detail: '', //发表详细
                        }
                    }
                    this.buyList = res.data.data
                    console.log("111111111111111111111111", this.buyList)
                    this.allMoney = res.data.money
                    this.allOrder_num = res.data.order_num
                    this.address_id = res.data.addr_data.id
                    console.log("生成订单号", res.data)
                }
            })
            //获取发票明细
            payApi.detailOption().then(res => {
                this.detailOption = res.data
            })
            //获取用户积分
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
            closePay(){
                this.$router.push({name:'myOrderHome'})
            },
            howIntegral(item) {
                if (item.goods_data.integral > this.integral) {
                    item.isIntegral = false
                    this.$message.error('积分不足')
                }
            },
            //判断优惠券ID是否一样
            isCouponCheck(emID){
                if (!emID) return
                this.buyList.forEach(v => {
                    if(v.couponInfo && v.couponInfo.id===emID.id){
                        this.canBuy=0
                        this.$message.error("此优惠券只能使用一次")
                        return false
                    } else {
                        this.canBuy=1
                    }
                })
            },
            //去充值
            SureRecharge() {
                this.$router.push({name: 'recharge'})
            },
            //个人或者单位
            checkType(item, index, status) {
                if (status === 1) {
                    item.invoice.type = 1
                    this.$set(this.buyList, index, item);
                } else {
                    item.invoice.type = 2
                    this.$set(this.buyList, index, item);
                }
            },
            //是否要发票
            is_havInvoice(item, index, status) {
                if (status === 0) {
                    item.havInvoice = 0
                    this.$set(this.buyList, index, item);
                } else {
                    item.havInvoice = 1
                    this.$set(this.buyList, index, item);
                }
            },
            //是否使用积分
            // checkintegral(item, index) {
            //     if (item.isIntegral == true) {
            //         item.isIntegral = false
            //         this.$set(this.buyList, index, item);
            //     }
            //     if (item.isIntegral == false) {
            //         item.isIntegral = true
            //         this.$set(this.buyList, index, item);
            //     }
            // },
            //明细

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

            //地址
            //地址按钮
            operation() {
                this.addressManagemen = true
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
                                //this.getAddresst()
                                this.AddressList()
                                this.ruleForm.name = '',
                                    this.ruleForm.phone = '',
                                    this.provinces = '',
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
                        //this.getAddresst()
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
                        //this.getAddresst()
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
                        //this.getAddresst()
                        this.AddressList()
                    }
                })
            },
            //地址按钮
            operation() {
                this.addressManagemen = true
            },
            //立即购买
            payAllGoods() {
                let flag = true
                let keys = Object.keys(this.$refs)
                keys.forEach((val, index) => {
                    if (!(keys[index].indexOf('invoice') + 1)) {
                        keys.splice(index, 1)
                    }
                })
                for (let index in keys) {
                    if (this.buyList[index].havInvoice) {
                        this.$refs['invoice' + index][0].validate(valid => {
                            flag = valid
                        })
                    } else {
                        flag = true
                        this.getBuyGoods()
                        break
                    }
                    if (!flag) {
                        break
                    }
                }
            },

            //这个方法是获取里面的东西
            getBuyGoods() {
                // let couponArr = []
                // let oneCoupon = []
                if(this.canBuy===0){
                    this.$message.error("优惠卷不能使用多次")
                    return false
                } else {
                    this.buyList.forEach((v, i) => {
                        // couponArr.push(v.couponInfo.id)
                        // for (let n = 0; n <= couponArr.length; n++) {
                        //     if (oneCoupon.indexOf(couponArr[n]) < 0) {
                        //         oneCoupon.push(couponArr[n])
                        //     }
                        // }
                        // console.log("优惠卷ID", v.couponInfo.id)
                        // if (oneCoupon.length > 0) {
                        //     this.$message.error("商品只能使用一次优惠券")
                        // } else {
                        //     alert(1111)
                        // }
                        this.order_data.push({
                            order_num: v.order_num,
                            goods_id: v.goods_data.goods_id,
                            coupon_id: v.couponInfo ? v.couponInfo.id : null,
                            is_integral: v.isIntegral ? 1 : 0,
                            is_invoice: v.havInvoice,
                            invoice_type: v.invoice_type,
                            invoice_name: v.invoice.name,
                            invoice_email: v.invoice.email,
                            invoice_info: v.invoice.detail,
                            invoice_number: v.invoice.ein,
                        })
                    })
                    console.log("数组传",this.order_data)
                    const params = {
                        order_data: JSON.stringify(this.order_data),
                        order_num: this.allOrder_num,
                        addr_id: this.address_id,
                        pay_type: this.payType,
                        type: 'pc',
                        cart_id:this.$route.query.carts.toString()
                    };
                    console.log(params)
                    if (this.payType === 1)
                        this.weChatPay(params)
                    else if (this.payType === 2)
                        this.aliPay(params)
                    else if (this.payType === 3)
                        this.balancePay(params)
                }
            },
            weChatPay(params) {
                this.finishWeChatPay = true
                params.pay_type = '2'
                api.multipleBuyGoodsAll(params).then(resp => {
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
                api.multipleBuyGoodsAll(params).then(resp => {
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
                if (this.userInfo.balance * 1 > this.allMoney * 1) {
                    api.multipleBuyGoodsAll(params).then(resp => {
                        if (resp.status === 1) {
                            this.$router.push({
                                name: 'multipleFindOrder',
                                params: {orderNum: this.allOrder_num}
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
                    name: 'multipleFindOrder',
                    params: {orderNum: this.allOrder_num}
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
                margin-bottom: 20px;
                .goods {
                    border-top: 2px solid #f1f1f1;
                    padding-top: 15px;
                    .show {
                        @include size(100px);
                        @include imgCover();
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
                .tip {
                    color: #999999;
                    margin-top: 10px;
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
        .modalAli-body {
            text-align: center;
            padding: 20px 0;
        }
    }
</style>
