<template>
    <div class="signUp_page page-content">
        <div class="nav">
            <navigation></navigation>
        </div>
        <div class="signUp">
            <!--导航-->

            <div class="signUp_title">
                在线报名
            </div>
            <div class="signUp_inp">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
                    <el-form-item label="名字" prop="name" style="width: 400px">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="phone" style="width: 400px">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" style="width: 400px">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="公司" prop="company" style="width: 400px">
                        <el-input v-model="ruleForm.company"></el-input>
                    </el-form-item>
                    <el-form-item label="职务" prop="position" style="width: 400px">
                        <el-input v-model="ruleForm.position"></el-input>
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
                </el-form>
                <div class="signUp_btn">
                    <el-button class="btn" @click="signUp('ruleForm')">提交</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    //地址
    import address from "@/assets/json/pca-code.json";
    import navigation from '../../components/public/navigation'
    import api from '@/api/projectApi'

    export default {
        name: "sign-up",
        components: {
            navigation,
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    phone: '',
                    email: '',
                    company: '',
                    position: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    phone: [
                        {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'},
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        // { pattern:/^[a-zA-Z]w{1,4}$/, message: '以字母开头，长度在2-5之间， 只能包含字符、数字和下划线'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '请输入正确的邮箱'}
                    ],
                    company: [
                        {required: true, message: '请输入公司', trigger: 'blur'}
                    ],
                    position: [
                        {required: true, message: '请输入职位', trigger: 'blur'},
                    ]
                },
                //三级联动
                provinces: '',
                city: '',
                areas: '',
                provinceList: [],
                cityList: [],
                countyList: [],
                id: '',
                price:'',
            }
        },
        mounted() {
            //接收id
            this.id = this.$route.query.id;
            this.price = this.$route.query.price;
            console.log( this.price )
            //获取联动address
            this.provinceList = address
            this.province = this.provinceList[0].code
        },
        watch: {
            provinces(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.provinceList) {
                        if (item.name === v1) {
                            this.cityList = item.children
                            this.city = this.cityList[0].name
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
                            break
                        }
                    }
                }
            }
        },
        methods: {
            signUp(formName) {
                if(this.price!=='0.00'){
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if(this.provinces!==''){
                                api.signUp({
                                    name: this.ruleForm.name,
                                    phone: this.ruleForm.phone,
                                    email: this.ruleForm.email,
                                    company_name: this.ruleForm.company,
                                    company_duties: this.ruleForm.position,
                                    provinces: this.provinces,
                                    citys: this.city,
                                    areas: this.areas,
                                    item_id: this.id
                                }).then((res) => {
                                    if(res.status===1){
                                        this.$router.push({name:'onlineOrder',query:{id:this.id}})
                                    }
                                })
                            } else {
                                this.$message.error('请选择所在城市')
                            }
                        } else {
                            this.$message.error("请输入完整信息在提交")
                            return false;
                        }
                    });
                } else {
                    this.$message.success("购买成功")
                    this.$router.push({name:'projectDetails',query:{id:this.id}})
                }



            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .signUp_page {
        .nav {
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 20px;
        }
        .signUp {
            width: 500px;
            height: 500px;
            margin: 20px auto;
            .signUp_title {
                font-size: 16px;
                font-weight: bold;
                margin: 20px 0;
            }
            .signUp_inp {

            }
            .signUp_btn {
                text-align: center;
                .btn {
                    width: 150px;
                    height: 40px;
                    color: #fff;
                    background: #f44336;
                }
            }
        }
    }
</style>
