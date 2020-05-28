<template>
    <div class="register">
        <div class="title">
            注册
        </div>
        <div class="inp">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" @submit.native.prevent>
                <el-form-item prop="phone">
                    <el-input placeholder="11位电话号码" v-model="ruleForm.phone" :maxlength="11">
                        <template slot="prepend">+86</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" class="validate">
                    <el-col :span="16">
                        <el-input placeholder="短信验证码" v-model="ruleForm.code"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-button class="validate_btn" @click="getCode"><span v-if="startTime">获取验证码</span><span
                            v-if="!startTime">{{countDown}}s后重新发送</span></el-button>
                    </el-col>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="6~18位密码区分大小写" type="password" :maxlength="18" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="password_confirm">
                    <el-input placeholder="确认密码" type="password" :maxlength="18" v-model="ruleForm.password_confirm"></el-input>
                </el-form-item>
                <el-form-item prop="check_reg" class="check_reg">
                    <el-checkbox name="check_reg" v-model="ruleForm.check_reg">已阅读并同意</el-checkbox>
                    <span class="check_reg_a"><router-link :to="{name: 'protocol'}">《用户服务协议》</router-link></span>
                </el-form-item>

            </el-form>

            <div class="register_btn">
                <button class="account_login" @click="register('ruleForm')">注册</button>
            </div>
            <div class="dont_reg">
                <router-link :to="{name: 'login'}">已有账户登录</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '@/api/login'

    export default {
        name: "register",
        data() {
            //判断两次密码的一致性
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
            //验证验证码是否正确
            // var checkCode = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入验证码'));
            //     } else if (value !== this.rstCode) {
            //         callback(new Error('验证码输入错误!'));
            //     } else {
            //         callback();
            //     }
            // };
            return {
                countDown: '',
                startTime: true,
                timer: null,
                ruleForm: {
                    phone: '',
                    code: '',
                    password: '',
                    password_confirm: '',
                    check_reg: true,
                },
                rstCode: '',
                rules: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        // { validator: checkCode ,trigger:'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'},
                        {pattern:  /^[0-9a-zA-Z]*$/g, message: '密码必须是字母或数字'},
                        {min: 6, max: 18, message: '密码长度不够', trigger: 'blur'},
                    ],
                    password_confirm: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            getUrlParam(obj) {
                debugger
                let str = location.href; //取得整个地址栏
                let params = str.split("?")[1].split('&');
                for (let i = 0; i < params.length; i++) {
                    let key = params[i].split("=")[0];
                    let value = decodeURIComponent(params[i].split("=")[1]);
                    obj[key] = value;
                }
                return obj
            },
            //获取验证码
            getCode() {
                if (this.ruleForm.phone !== '') {
                    const time_count = 60;
                    api.getCode({
                        phone: this.ruleForm.phone,
                        type: 1,
                    }).then((res) => {
                        if (res.status === 1) {
                            //this.rstCode = res.data.code;
                            if (!this.timer) {
                                this.countDown = time_count;
                                this.startTime = false;
                                this.timer = setInterval(() => {
                                    if (this.countDown > 0 && this.countDown <= time_count) {
                                        this.countDown--;
                                    } else {
                                        this.startTime = true;
                                        clearInterval(this.timer);
                                        this.timer = null;
                                    }
                                }, 1000)
                            }
                            this.$message.success(res.msg);
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                } else {
                    this.$message.error("请输入手机号");
                }
            },
            //注册
            register(formName) {
                let obj={
                    phone:this.ruleForm.phone,
                    code:this.ruleForm.code,
                    password:this.ruleForm.password,
                }
                let str = location.href
                if(str.indexOf("?")>-1)
                    this.getUrlParam(obj)
                else
                    obj.distribution=""
                if(this.ruleForm.check_reg===true){
                    this.$refs[formName].validate(valid => {
                        if (valid) {
                            api.register({
                                phone: obj.phone,
                                code: obj.code,
                                password: obj.password,
                                distribution: obj.distribution
                            }).then((res) => {
                                if (res.status === 1) {
                                    this.$message.success(res.msg);
                                    api.login({
                                        phone: phone,
                                        password: password,
                                    }).then((res)=>{
                                        if(res.status===1){
                                            this.$router.push({name: 'choiceFav'})
                                            this.$helper.utils.storage.set('userInfo', res.data);
                                        }
                                    })
                                } else {
                                    this.$message.error(res.msg);
                                }
                            })
                        } else {
                            this.$message.error("请输入完整的表单");
                            return false;
                        }
                    });
                } else {
                    this.$message.error("请认证阅读用户协议");
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .register {
        width: 400px;
        height: 500px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        .title {
            font-size: 22px;
            color: #333333;
            letter-spacing: -0.53px;
            text-align: center;
        }
        .inp {
            margin-top: 30px;
            .validate {
                .validate_btn {
                    background: #f44336;
                    color: #ffffff;
                    margin-left: 10px;
                    width: 125px;
                }
            }
            .check_reg {
                .check_reg_a {
                    line-height: 22px;
                    a {
                        font-size: 16px;
                        color: #409EFF;
                    }
                }
                .check_sure {
                    color: #333333;
                }
            }
            .register_btn {
                margin-bottom: 24px;
                .account_login {
                    width: 100%;
                    height: 38px;
                    border-radius: 4px;
                    font-size: 18px;
                    color: #FFFFFF;
                    margin-top: 10px;
                    background: #F44336;
                    outline: none;
                    border: 0;
                }
            }

            .dont_reg {
                width: 100%;
                height: 38px;
                text-align: center;
                border: 1px solid #F44336;
                border-radius: 4px;
                line-height: 40px;
                & a {

                    font-size: 18px;
                    color: #F44336;
                    display: block;
                    text-decoration: none;
                }
            }
        }
    }
</style>
