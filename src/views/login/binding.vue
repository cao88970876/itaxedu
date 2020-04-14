<template>
  <div class="binding">
    <div class="title">
      绑定手机号
    </div>
    <div class="binding_inp">
      <!--<form>-->
        <!--<div class="binding_unm"><el-input placeholder="请输入手机号" clearable><template slot="prepend">+86</template></el-input></div>-->
        <!--<div class="binding_validate"><el-input placeholder="短信验证" class="validate_text"></el-input><el-button class="validate_btn">获取验证码</el-button></div>-->
        <!--<div class="binding_pwd"><el-input placeholder="6-16位密码，区分大小写" type="password" clearable></el-input></div>-->
        <!--<div class="binding_confirm_pwd"><el-input placeholder="确认密码" type="password" clearable></el-input></div>-->
        <!--<p class="binding_check"><el-checkbox class="check_del">已阅读并同意</el-checkbox><a href="" class="user_agree">《用户服务协议》</a></p>-->
        <!--<p><button class="binding_sure">确认</button></p>-->
      <!--</form>-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
            <el-form-item prop="phoneNum">
                <el-input placeholder="11位电话号码" v-model="ruleForm.phoneNum"><template slot="prepend">+86</template></el-input>
            </el-form-item>
            <el-form-item prop="validate" class="binding_validate">
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
            <el-form-item prop="check_binding" class="check_binding">
                <el-checkbox name="check_reg" v-model="ruleForm.check_binding">已阅读并同意</el-checkbox><span class="check_binding_a"><router-link :to="{name: 'protocol'}">《用户服务协议》</router-link></span>
            </el-form-item>
            <el-form-item prop="binding_btn" class="binding_btn">
                <button class="binding_sure_btn" @click="binding('ruleForm')">确认</button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
    import api from '@/api/login'
    export default {
        name: "binding",
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
                    check_binding:''
                },
                rules:{
                    phoneNum:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { pattern: /^1[345789]\d{9}$/, message: '请输入正确的手机号' }
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
                const phone = this.ruleForm. phoneNum;
                api.getCode({
                    phone:phone,
                    type:'1',
                })
            },
            //提交
            binding(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                    } else {
                        console.log('请好好输入');
                        return false;
                    }
                });

            },
        }

    }
</script>

<style lang="scss" scoped>
.binding{
  width: 400px;
  height: 500px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  .title{
    font-family: PingFangSC-Medium;
    font-size: 22px;
    color: #333333;
    letter-spacing: -0.53px;
    text-align: center;
  }
  .binding_inp{
    margin-top: 30px;
    .binding_validate{
      margin-top: 10px;
      .validate_btn{
        background: #f44336;
        color: #ffffff;
        width: 125px;
        margin-left: 10px;
      }
    }
    .check_binding{
      .check_binding_a{
          & a{
              font-size: 16px;
              color: #409EFF;
              line-height: 22px;
          }
      }
    }
      .binding_btn{
          .binding_sure_btn{
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
