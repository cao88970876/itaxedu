<template>
    <div class="forgetpwd">
        <div class="title">
            忘记密码
        </div>
        <div class="forgetpwd_inp">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" @submit.native.prevent>
                <el-form-item prop="phoneNum">
                    <el-input placeholder="11位电话号码" v-model="ruleForm.phoneNum" :maxlength="11">
                        <template slot="prepend">+86</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="validate" class="validate">
                    <el-col :span="16">
                        <el-input placeholder="请输入验证码" v-model="ruleForm.validate"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-button class="validate_btn" @click="getCode">
                            <span v-if="startTime">获取验证码</span>
                            <span v-if="!startTime">{{countDown}}s后重新发送</span>
                        </el-button>
                    </el-col>
                </el-form-item>
                <el-form-item prop="password">
                <el-input placeholder="输入新的6 - 16位密码，区分大小写" type="password" :maxlength="18" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="password_confirm">
                    <el-input placeholder="再次输入密码" type="password" :maxlength="18"
                              v-model="ruleForm.password_confirm"></el-input>
                </el-form-item>
                <el-form-item prop="findPwd" class="find_btn">
                    <button class="find_sure_btn" @click="forgetPassword('ruleForm')">确认</button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import api from '@/api/login'

    export default {
        name: "forgetpwd",
        data() {
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
            return {
                countDown: '',
                startTime: true,
                timer: null,
                ruleForm: {
                    phoneNum: '',
                    validate: '',
                    password: '',
                    password_confirm: '',
                },
                rules: {
                    phoneNum: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'}
                    ],
                    validate: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'},
                        {min: 6, max: 18, message: '密码长度不够', trigger: 'blur'},
                        {pattern:  /^[0-9a-zA-Z]*$/g, message: '密码必须是字母或数字'},
                    ],
                    password_confirm: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            //获取验证码
            getCode() {
                if (this.ruleForm.phoneNum !== '') {
                    const time_count = 60;
                    api.getCode({
                        phone: this.ruleForm.phoneNum,
                        type: '2',
                    }).then((res) => {
                        if (res.status === 1) {
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
            forgetPassword(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        const phone = this.ruleForm.phoneNum;
                        const code = this.ruleForm.validate;
                        const password = this.ruleForm.password;
                        api.forgetPassword({
                            phone: phone,
                            code: code,
                            password: password,
                            type: "2",
                        }).then((res) => {
                            if (res.status === 1) {
                                this.$message.success(res.msg);
                                this.$router.push({name: 'login'})
                            } else {
                                this.$message.error(res.msg);
                            }
                        })
                    } else {
                        this.$message.error("请认真填写表单");
                        return false;
                    }
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    .forgetpwd {
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
        .forgetpwd_inp {
            margin-top: 30px;
            .validate {
                .validate_btn {
                    background: #f44336;
                    color: #ffffff;
                    margin-left: 10px;
                    width: 125px;
                }
            }
            .find_btn {
                .find_sure_btn {
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
    }
</style>
