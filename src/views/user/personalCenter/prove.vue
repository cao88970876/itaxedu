<template>
    <div class="prove">
        <div class="myresume_title">生成证明</div>
        <el-form  :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="120px">
            <el-form-item label="真实姓名:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入您的真实姓名"> </el-input>
            </el-form-item>
            <el-form-item label="身份证号:" prop="idCard">
                <el-input v-model="ruleForm.idCard" placeholder="请输入您的身份证号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="btn_box">生成证明</el-button>
            </el-form-item>
        </el-form>
        <div>
            <prize-alert title="证明生成成功"  confirmText="打开图片" :img=img  v-model="showAlert" @confirm="downs()"></prize-alert>
        </div>
    </div>
</template>

<script>
    import $api from '@/api/user'
    import {prizeAlert} from '../../../components/public'
    export default {
        name: "prove",
        components:{prizeAlert},
        data() {
            return {
                userInfo: this.$helper.utils.storage.get('userInfo'),
                ruleForm: {
                    name: '',
                    idCard:""
                },
                img:"",
                showAlert:false,
                rules: {
                    name: [
                        { required: true, message: '请输入您的真实姓名', trigger: 'blur' },
                    ],
                    idCard: [
                        { required: true, message: '请输入您的身份证号', trigger: 'change' }
                    ],
                }
            }
        },
        methods: {
            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        $api.generateStudyProve({
                            uid: this.userInfo.uid,
                            name: this.ruleForm.name,
                            idcard: this.ruleForm.idCard
                        }).then(res => {
                            console.log(res);
                            if (res.status == 1) {
                                this.showAlert = true
                                this.img = "/" + res.data.url
                            }
                            else
                                return this.$message.error(res.msg);
                        })
                    }
                });
            },
            downs() {
                var eleForm = document.createElement('a');
                eleForm.setAttribute("href", this.$helper.utils.api+this.img);
                eleForm.setAttribute("download", "");  			    
                var evObj = document.createEvent('MouseEvents');			    
                evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
                eleForm.dispatchEvent(evObj);
            },
        }
    }
</script>

<style scoped>
    .myresume_title{
        font-size: 14px;
        margin-bottom: 20px;
    }
    .prove{
        width: 50%;
        padding: 20px;
    }
    .btn_box{
        background-color: #f44336;
        border: none;
        padding: 15px 50px;
        margin-top: 30px;
    }
</style>
