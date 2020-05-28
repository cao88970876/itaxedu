<template>
    <div class="addressManagemen_page page-content">
        <div class="addressManagemen_title">
            地址管理
        </div>
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
                    <el-form-item label="所在城市">
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
                    <td></td>
                    <td>收货人</td>
                    <td>联系电话</td>
                    <td>所在城市</td>
                    <td>收货地址</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in addressList" :key="item.id">
                    <td>
                        <label>
                            <!--<el-checkbox :checked="ck==1? checked:''" @click="checkedOne(index+1)"></el-checkbox>-->
                            <el-radio :label="item.id" v-model="checked">默认地址</el-radio>
                        </label>
                    </td>
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
    </div>
</template>

<script>
    import api from '@/api/goodsApi';
    import utils from '../../assets/js/utils';
    //地址
    import address from "../../assets/json/pca-code.json";

    export default {
        name: "address-managemen",
        data() {
            return {
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
                        {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'}
                        // { pattern:/^[a-zA-Z]w{1,4}$/, message: '以字母开头，长度在2-5之间， 只能包含字符、数字和下划线'}
                    ],
                    address: [
                        {required: true, message: '请输入地址', trigger: 'blur'},
                    ]
                },
                //地址列表
                addressList: [],
                //地址id
                id: '',
            }
        },
        mounted() {
            //获取地址
            this.getAddresst()
            //获取联动address
            this.provinceList = address
            this.province = this.provinceList[0].code
        },
        //3级联动
        watch: {
            provinces(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.provinceList) {
                        if (item.name === v1) {
                            this.cityList = item.children
                            this.ruleForm.city = this.cityList[0].name
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
        methods: {
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
                debugger
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
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .addressManagemen_page {
        .addressManagemen_title {
            font-size: 14px;
            font-weight: bold;
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
