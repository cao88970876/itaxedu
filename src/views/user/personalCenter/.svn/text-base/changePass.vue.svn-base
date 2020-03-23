<template>
    <div class="forgetpwd">
        <div class="title">
            修改密码
        </div>
        <div class="forgetpwd_inp">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                <el-form-item prop="phoneNum">
                    <el-input placeholder="11位电话号码" v-model="ruleForm.phoneNum"><template slot="prepend">+86</template></el-input>
                </el-form-item>
                <el-form-item prop="validate" class="validate">
                    <el-col :span="16">
                        <el-input placeholder="请输入验证码" v-model="ruleForm.validate"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-button class="validate_btn" @click="getCode">获取验证码</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="password_confirm">
                    <el-input placeholder="再次输入密码" type="password" v-model="ruleForm.password_confirm"></el-input>
                </el-form-item>
                <el-form-item class="btn_box">
                    <el-button type="primary" @click="forgetPassword('ruleForm')">保存</el-button>
                    <el-button @click="clearChange()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import api from '@/api/login'
    export default {
        name: "changePass",
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('password_confirm');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                ruleForm:{
                    phoneNum:'',
                    validate:'',
                    password:'',
                    password_confirm:'',
                },
                rules:{
                    phoneNum:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }
                    ],
                    validate:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度不够', trigger: 'blur' },
                    ],
                    password_confirm:[
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            //获取验证码
            getCode(){
                const phone =this.ruleForm.phoneNum;
                api.getCode({
                    phone:phone,
                    type:'2',
                }).then((res)=>{
                    if( res.status === 1){
                        console.log(res.data.code)
                    }
                })
            },
            forgetPassword(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        const phone = this.ruleForm.phoneNum;
                        const code = this.ruleForm.validate;
                        const password = this.ruleForm.password;
                        api.forgetPassword({
                            phone:phone,
                            code:code,
                            password:password,
                            type:"2",
                        }).then((res)=>{
                            if(res.status === 1){
                                this.$message.success(res.msg);
                            }else {
                                this.$message.error(res.msg);
                            }
                        })
                    } else {
                        this.$message.error("请输入正确的信息");
                        return false;
                    }
                });

            },

            clearChange(){
                this.$router.push({name: 'userInform'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .forgetpwd{
        width: 40%;
        padding: 20px;
        .title{
            font-family: PingFangSC-Medium;
            font-size: 15px;
            color: #333333;
            letter-spacing: -0.53px;
        }
        .forgetpwd_inp{
            margin-top: 30px;
            .validate{
                .validate_btn{
                    background: #f44336;
                    color: #ffffff;
                    margin-left:10px ;
                    width: 125px;
                }
            }
            .find_btn{
                .find_sure_btn{
                    width: 100%;
                    height: 38px;
                    border-radius: 4px;
                    font-family: PingFangSC-Medium;
                    font-size: 18px;
                    color: #FFFFFF;
                    margin-top: 10px;
                    background: #F44336;
                    outline: none;
                    border: 0;
                }
            }
        }
        .btn_box{
            button{
                padding: 10px 60px;
                &:first-child{
                    background-color: #F44336;
                    border-color: #F44336;
                    margin-right: 30px;
                }
                &:last-child{
                    background-color: #303F9F;
                    border-color: #303F9F;
                    color: white;
                }
            }
        }
    }
</style>
