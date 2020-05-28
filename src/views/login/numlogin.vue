<template>
    <div>
        <app-header></app-header>
        <div class="numlogin">
            <!--切换按钮-->
            <ul class="tab">
                <li>
                    <router-link :to="{name: 'login', query: { address_id: $route.query.address_id || ''}}">账号密码登录</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'numlogin', query: { address_id: $route.query.address_id || ''}}">手机号登录</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'idcardlogin', query: { address_id: $route.query.address_id || ''}}">身份证登录</router-link>
                </li>
            </ul>
            <div class="numlogin_inp">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" @submit.native.prevent>
                    <el-form-item prop="phoneNum">
                        <el-input placeholder="账号" v-model="ruleForm.phoneNum" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item prop="validate" class="validate">
                        <el-col :span="16">
                            <el-input placeholder="请输入验证码" v-model="ruleForm.validate"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button class="validate_btn" @click="getLoginCode"><span
                                v-if="startTime">获取验证码</span><span
                                v-if="!startTime">{{countDown}}s后重新发送</span></el-button>
                        </el-col>
                    </el-form-item>
                    <!--<el-form-item prop="check_login">-->
                    <!--<el-checkbox name="check_login" v-model="ruleForm.check_login">自动登录</el-checkbox>-->
                    <!--</el-form-item>-->
                    <el-form-item prop="register" class="phoneLogin_btn">
                        <button class="login_btn" @click="NumLogin('ruleForm')">登录</button>
                    </el-form-item>
                </el-form>
                <div class="register">
                    <router-link :to="{name: 'register'}">注册账号</router-link>
                </div>
                <div class="other_login">
                    <div class="left"></div>
                    <div class="text">其他方式登录</div>
                    <div class="rghit"></div>
                </div>
                <div class="tenxun_longin">
                    <div class="qq_login" @click="qqLogin"><a href=""><img src="../../assets/image/ic_16.png"></a></div>
                    <!--<div class="wx_login"><a href=""><img src="../../assets/image/ic_17.png"></a></div>-->
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>

</template>
<script>
    import api from '@/api/login'
    import {AppHeader, AppFooter} from '../../components/public'

    export default {
        name: "numlogin",
        components: {AppHeader, AppFooter},
        data() {
            return {
                countDown: '',
                startTime: true,
                timer: null,
                ruleForm: {
                    phoneNum: '',
                    validate: '',
                    check_login: ''
                },
                rules: {
                    phoneNum: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'}
                    ],
                    validate: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            //发送验证码
            getLoginCode() {
                if (this.ruleForm.phoneNum !== '') {
                    const time_count = 60;
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
                    api.getCode({
                        phone: this.ruleForm.phoneNum,
                        type: '3',
                    }).then((res) => {
                        if (res.data.status === 1) {
                        } else if (res.status === 2) {
                            this.$message.error(res.msg);
                        }
                    })
                } else {
                    this.$message.error("请输入手机号");
                }

            },
            NumLogin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const phone = this.ruleForm.phoneNum;
                        const code = this.ruleForm.validate;
                        console.log(phone, code)
                        //发送
                        api.login({
                            phone: phone,
                            code: code,
                            login_type: '4',
                        }).then(res => {
                            if (res.status === 1) {
                                this.$helper.utils.storage.set('userInfo', res.data);
                                if(this.$helper.utils.storage.get('loginLink')){
                                    let loginLink = this.$helper.utils.storage.get('loginLink');
                                    sessionStorage.removeItem('loginLink');
                                    this.$router.push({name: loginLink, query: { address_id: this.$route.query.address_id || ''}});
                                }else{
                                    this.$router.push({name: 'index'})
                                }
                            } else if (res.status === 2) {
                                this.$message.error(res.msg);
                            }
                        })
                    } else {
                        this.$message.error('请输入正确的手机号和验证码');
                        return false;
                    }
                });
            },
            //Qq登录
            qqLogin() {
                api.login({
                    type: '2'
                }).then((res) => {

                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .numlogin {
        width: 400px;
        height: 500px;
        margin: 100px auto;
        .tab {
            display: flex;
            list-style: none;
            line-height: 30px;
            color: #9999;
            font-size: 18px;
            li {
                padding: 16px 10px;
                margin-left: 10px;
                a {
                    font-size: 18px;
                    color: #999999;
                    letter-spacing: -0.53px;
                    display: inline-block;
                    text-align: center;
                    width: 106px;
                }
                .router-link-active {
                    color: #333333;
                    &:after {
                        content: '';
                        display: inline-block;
                        height: 3px;
                        width: 80px;
                        background-color: #F44336;
                    }
                }
            }
        }
        .numlogin_inp {
            .validate {
                .validate_btn {
                    background: #F44336;
                    color: #ffffff;
                    margin-left: 10px;
                    width: 125px;
                }
            }
            .phoneLogin_btn {
                .login_btn {
                    width: 100%;
                    height: 40px;
                    background: #F44336;
                    text-align: center;
                    outline: none;
                    border: 0;
                    border-radius: 4px;
                    color: #ffff;
                    font-family: PingFangSC-Medium;
                    font-size: 18px;
                }
            }
            .register {
                margin-top: 10px;
                width: 100%;
                height: 38px;
                text-align: center;
                border: 1px solid #F44336;
                border-radius: 4px;
                line-height: 40px;
                & a {
                    color: #F44336;
                    font-family: PingFangSC-Medium;
                    font-size: 18px;
                    color: #F44336;
                    display: block;
                    text-decoration: none;
                }
            }
        }
        .other_login {
            margin-top: 10px;
            display: flex;
            .text {
                width: 130px;
                text-align: center;
                position: relative;
                top: 10px;
                color: #999999;
                font-family: PingFangSC-Regular;
                font-size: 16px;
            }
            .left, .rghit {
                flex: 1;
                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            }

        }
        /*第三方登录*/
        .tenxun_longin {
            margin-top: 30px;
            width: 100%;
            display: flex;
            text-align: center;
            .qq_login {
               margin: 0 auto;
                img {
                    width: 60px;
                    height: 60px;
                }
            }
            .wx_login {
                margin-left: 40px;
                img {
                    width: 60px;
                    height: 60px;
                }

            }
        }
    }
</style>
