<template>
    <div class="examAdminLogin-box">
        <div class="icon examAdminLogin-pic"></div>
        <div class="examAdminLogin-form">
            <h5>管理员登录</h5>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入您的用户名" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input placeholder="请输入6位数密码" v-model="ruleForm.pwd" :maxlength="6"></el-input>
                </el-form-item>
            </el-form>
            <button class="examAdminLogin-sub" @click="login('ruleForm')">登录</button>
        </div>
    </div>
</template>
<script>
import api from '@/api/examAdminApi'
export default {
    name: 'examAdminLogin',
    data() {
        return{
            ruleForm: {
                username: '',
                pwd: '',
            },
            //表单验证
            rules: {
                username: [
                    {required: true, message: '请输入您的用户名', trigger: 'blur'}
                ],
                pwd: [
                    {required: true, message: '请输入6位数密码', trigger: 'blur'},
                    {min: 6, max: 6, message: '请输入6位数密码', trigger: 'blur'},
                ],
            }
        }
    },
    methods:{

        
        login(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.login({
                        username: this.ruleForm.username,
                        password: this.ruleForm.pwd,
                    }).then(res => {
                        // if (res.status === 1) {
                        //     if(this.ruleForm.login_type){
                        //         localStorage.setItem("userInfo",JSON.stringify(res.data))
                        //     }
                        //     if(res.data.category_id===''&& res.data.identity_id===null){
                        //         this.$router.push({name:'choiceFav'})
                        //         this.$helper.utils.storage.set('userInfo', res.data);
                        //     } else {
                        //         this.$helper.utils.storage.set('userInfo', res.data);
                        //         this.$router.push({name: 'index'})
                        //     }
                        //     console.log("登录",res.data)
                        // } else if (res.status === 2) {
                        //     this.$message.error(res.msg);
                        // }
                    })
                    // this.$router.push({name: 'examAdminCheck'})

                } else {
                    this.$message.error('请输入正确的账号和密码');
                    return false;
                }
            });
        },
    }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";
    
    .examAdminLogin-box{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 997px;
        height: 560px;
        box-shadow: 0px 0px 10px #999;
        display: flex;
        .examAdminLogin-pic{
            @include size (435px, 560px);
            display: block;
            width: 435px;
            height: 560px;
            background: url(../../assets/image/examAdminLogin.png) no-repeat center;
            background-size: contain;
        }
        .examAdminLogin-form{
            flex: 1;
            height: 462px;
            margin-top: 49px;
            border-left: 1px solid #EBEBEB;
            padding-top: 55px;
            box-sizing: border-box;
            h5{
                margin: 0;
                font-size: 34px;
                color: #303F9F;
                text-align: center;
                margin-bottom: 50px;
            }
            .form{
                width: 341px;
                margin: 0 auto 45px;
            }
        }
        .examAdminLogin-sub{
            display: block;
            margin: 0 auto;
            width: 245px;
            height: 44px;
            background: #303F9F;
            text-align: center;
            outline: none;
            border: 0;
            border-radius: 4px;
            color: #ffff;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            cursor: pointer;
        }
    }
</style>


