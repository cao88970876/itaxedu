<template>
    <div class="add-comments personal-center-modules">
        <div class="module-name">课程评价</div>
        <div class="content p-15">
            <el-form ref="form" :model="form">
                <el-form-item :rules="[{required: true,message: '该项不能为空'}]" prop="comment">
                    <el-input type="textarea" :rows="5" placeholder="请输入详细内容" v-model="form.comment" resize="none"></el-input>
                </el-form-item>
            </el-form>
            <div class="commit mt-60">
                <a class="btn btn-red pointer" @click="commitComment">提交</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {myStudyApi} from "../../../api";

    export default {
        name: "add-comments",
        data() {
            return {
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                form: {
                    comment: '',
                }
            }
        },
        methods: {
            commitComment() {
                this.$refs['form'].validate(flag => {
                    if (flag) {
                        myStudyApi.addComments({
                            uid: this.userInfo.uid,
                            content: this.form.comment,
                            type: this.$route.params.type,
                            content_id: this.$route.params.contentId,
                        }).then(resp => {
                            let _this = this
                            if (resp.status === 1) {
                                this.$message({
                                    message: '评价成功，即将返回我的课程',
                                    type: 'success',
                                    onClose() {
                                        _this.$router.push({name: 'myContentList'})
                                    },
                                })
                            } else {
                                this.$message({
                                    message: resp.msg,
                                    type: 'error'
                                })
                            }
                        })
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";

    .add-comments {
        .module-name {
            border-bottom: 0;
        }
        .commit {
            text-align: center;
        }
        .btn {
            display: inline-block;
            color: #fff;
            padding: 10px 150px;
            font-size: 14px;
            border-radius: 5px;

            &.btn-red {
                background-color: $fontColorRed;
                box-shadow: 0 5px 5px #f5bab5;
            }
        }
    }
</style>
