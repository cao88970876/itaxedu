<template>
    <div class="opinion_page">
        <app-header></app-header>
        <div class="mains">
            <div class="opinion_title">
                意见反馈
            </div>
            <div class="opinion_inp">
                <el-form :model="ruleForm" ref="ruleForm">
                    <el-form-item prop="opinion" class="opinion">
                        <el-input type="textarea" placeholder="请填写意见反馈" v-model="ruleForm.opinion" resize="none"></el-input>
                    </el-form-item>
                    <el-form-item class="opinion_btn">
                        <el-button type="primary" class="opinion_submit" @click="submit('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import api from '@/api/opinion'
    import {AppHeader, AppFooter} from '../../components/public'

    export default {
        name: "opinion",
        components: {AppHeader, AppFooter},
        data() {
            return {
                ruleForm: {
                    opinion: '',
                },
            }
        },
        methods: {
            submit() {
                const content = this.ruleForm.opinion;
                console.log(content)
                if (content !== "") {
                    api.submit({
                        content: content,
                    }).then(res => {
                        if (res.status === 1) {
                            this.$message.success(res.msg)
                            this.$router.push({name: 'index'})
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                } else {
                    this.$message.error("请输入内容在提交");
                    return false
                }
            }
        }
    }
</script>
<style lang="scss">
    .opinion_page {
        .mains {
            background: #F8F8F8;
            padding: 20px 0;
            .opinion_title {
                text-align: center;
                font-size: 30px;
                color: #666666;
            }
            .opinion_inp {
                margin: 40px auto;
                width: 800px;
                textarea {
                    width: 800px;
                    height: 300px;
                }

                .opinion_btn {
                    margin: 0 auto;
                    text-align: center;
                    .opinion_submit {
                        width: 140px;
                        background: #f44336;
                        border: 0;
                    }
                }
            }
        }
    }

</style>
