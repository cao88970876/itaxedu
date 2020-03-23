<template>
    <div class="examAdminCheck-box">
        <div class="icon examAdminCheck-pic"></div>
        <div class="examAdminCheck-form">
            <h5>验证证书</h5>
            <el-form :label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" class="form">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入您的真实姓名" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idcode">
                    <el-input placeholder="请输入您的身份号" v-model="ruleForm.idcode" :maxlength="18"></el-input>
                </el-form-item>
            </el-form>
            <button class="examAdminCheck-sub" @click="check('ruleForm')">提交</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'examAdminCheck',
    data() {
        return{
            ruleForm: {
                name: '',
                idcode: '',
            },
            //表单验证
            rules: {
                name: [
                    {required: true, message: '请输入您的用户名', trigger: 'blur'}
                ],
                idcode: [
                    {required: true, message: '请输入您的身份号', trigger: 'blur'},
                    {pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号', trigger: 'blur'}
                ],
            }
        }
    },
    methods:{
        check(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // api.login({
                    //     phone: this.ruleForm.phone,
                    //     password: this.ruleForm.password,
                    //     // login_type: true
                    // }).then(res => {
                    //     if (res.status === 1) {
                    //         if(this.ruleForm.login_type){
                    //             localStorage.setItem("userInfo",JSON.stringify(res.data))
                    //         }
                    //         if(res.data.category_id===''&& res.data.identity_id===null){
                    //             this.$router.push({name:'choiceFav'})
                    //             this.$helper.utils.storage.set('userInfo', res.data);
                    //         } else {
                    //             this.$helper.utils.storage.set('userInfo', res.data);
                    //             this.$router.push({name: 'index'})
                    //         }
                    //         console.log("登录",res.data)
                    //     } else if (res.status === 2) {
                    //         this.$message.error(res.msg);
                    //     }
                    // })
                    this.$router.push({name: 'examAdminCheckList'})

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
    
    .examAdminCheck-box{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 997px;
        height: 560px;
        box-shadow: 0px 0px 10px #999;
        display: flex;
        .examAdminCheck-pic{
            @include size (435px, 560px);
            display: block;
            width: 435px;
            height: 560px;
            background: url(../../assets/image/examAdminCheck.png) no-repeat center;
            background-size: contain;
        }
        .examAdminCheck-form{
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
        .examAdminCheck-sub{
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


