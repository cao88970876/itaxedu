<template>
    <div class="login_page">
        <app-header></app-header>
        <div class="login">
            <!--切换按钮-->
            <ul class="tab">
                <li >
                    <router-link :to="{name: 'login', query: { address_id: $route.query.address_id || ''}}">账号密码登录</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'numlogin', query: { address_id: $route.query.address_id || ''}}">手机号登录</router-link>
                </li>
                <li class="tab_active">
                    <router-link :to="{name: 'idcardlogin', query: { address_id: $route.query.address_id || ''}}">身份证登录</router-link>
                </li>
            </ul>
            <!--登录框-->
            <div class="login_user">
                <!--账号登录-->
                <div class="account_num">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" @submit.native.prevent>
                        <el-form-item prop="card">
                            <el-input placeholder="请输入身份证" v-model="ruleForm.card" ></el-input>
                        </el-form-item>
                        <el-form-item prop="name">
                            <el-input placeholder="请输入姓名" type="text" v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item prop="login_type" class="check">
                            <el-checkbox class="check_login" v-model="ruleForm.login_type">自动登录</el-checkbox>
                            <span class="right"><router-link :to="{name: 'forgetpwd'}">忘记密码</router-link></span>
                        </el-form-item>
                    </el-form>
                    <div class="loginBox">
                        <button class="account_login" @click="login('ruleForm')">登录</button>
                    </div>
                    <div class="register">
                        <router-link :to="{name: 'register'}">注册账号</router-link>
                    </div>
                    <div class="other_login">
                        <div class="left"></div>
                        <div class="text">其他方式登录</div>
                        <div class="rghit"></div>
                    </div>
                    <div class="tenxun_longin">
                        <div class="qq_login" id="qqLoginBtn" @click="qqLogin"><img src="../../assets/image/ic_16.png"></div>
                    </div>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>

</template>
<script>
    import {AppHeader, AppFooter} from '../../components/public'
    import api from '@/api/login'

    export default {
        name: "login",
        components: {AppHeader, AppFooter},
        data() {
            return {
                // currentTab:'pwdlogin',
                userInfo: '68786AC7398DCE088053ACC3B8B5DB40',
                ruleForm: {
                    card: '',
                    name: '',
                    login_type: '',
                },
                //表单验证
                rules: {
                    card: [
                        {required: true, message: '请输入身份证', trigger: 'blur'},
                        {pattern: /^\d+[x|X]?$/, message: '请输入正确的身份证'}
                        // { pattern:/^[a-zA-Z]w{1,4}$/, message: '以字母开头，长度在2-5之间， 只能包含字符、数字和下划线'}
                    ],
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 2, max: 5, message: '请输入正确的姓名', trigger: 'blur'},
                    ],
                }
            }
        },
        created() {
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.login_card({
                            card: this.ruleForm.card,
                            name: this.ruleForm.name,
                           // login_type: true
                        }).then(res => {
                            if (res.status === 1) {
                                if(this.ruleForm.login_type){
                                    localStorage.setItem("userInfo",JSON.stringify(res.data))
                                }
                                if(res.data.category_id===''&& res.data.identity_id===null){
                                    this.$router.push({name:'choiceFav'})
                                    this.$helper.utils.storage.set('userInfo', res.data);
                                } else {
                                    this.$helper.utils.storage.set('userInfo', res.data);
                                    if(this.$helper.utils.storage.get('loginLink')){
                                        let loginLink = this.$helper.utils.storage.get('loginLink');
                                        sessionStorage.removeItem('loginLink');
                                        this.$router.push({name: loginLink, query: { address_id: this.$route.query.address_id || ''}});
                                    }else{
                                        this.$router.push({name: 'index'})
                                    }
                                }
                                console.log("登录",res.data)
                            } else if (res.status === 2) {
                                this.$message.error(res.msg);
                            }
                        })
                    } else {
                        this.$message.error('请输入正确的账号和密码');
                        return false;
                    }
                });
            },
            qqLogin() {
                // QC.Login({
                //     btnId:"qqLoginBtn"
                // });

                //console.log(QC.api)
                QC.Login.showPopup({
                    // btnId:"qqLoginBtn"    //插入按钮的节点id
                    appId:"101514802",
                    redirectURI:"http://zhongcaixun.zpftech.com/pc/#/login"
                })
                // QC.api("get_user_info", paras)
                //     .success(function(s){//成功回调
                //         alert("获取用户信息成功！当前用户昵称为："+s.data.nickname);
                //     })
                //     .error(function(f){//失败回调
                //         alert("获取用户信息失败！");
                //     })
                //     .complete(function(c){//完成请求回调
                //         alert("获取用户信息完成！");
                //     });

            }
        }
    }
</script>

<style lang="scss" scoped>
    .login_page {
        .login {
            width: 400px;
            height: 500px;
            margin: 100px auto;
            /*切换按钮*/
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
                        font-family: PingFangSC-Medium;
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
            /*账号登录*/
            .login_user {
                .account_num {
                    .check {
                        a {
                            font-size: 16px;
                            text-decoration: none;
                            color: #999999;
                        }
                    }
                    .account_login {
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
            }
            .loginBox {
                margin-bottom: 24px;
            }
            /*注册*/
            .register {
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
            /*其他登录*/
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
    }

</style>
