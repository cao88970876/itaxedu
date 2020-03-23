<template>
    <div class="commentGoods_page">
        <div class="receipt_title">
            立即评价
        </div>
        <div class="comment_inp">
            <el-input type="textarea" maxlength="1000"
                      placeholder="请输入评价内容" resize="none" v-model="comment_text"
                      :autosize="{ minRows: 10, maxRows: 50}">
            </el-input>
        </div>
        <div class="comment_img clear">
            <Uploads ref="Expertcard"></Uploads>
        </div>
        <div style="height: 50px">

        </div>
        <div class="comment_btn">
            <button @click="subComment">确认</button>
        </div>
    </div>
</template>

<script>
    import api from '@/api/myOrderApi'
    import {Uploads} from '../../../components/public'

    export default {
        name: "comment-goods",
        components: {
            Uploads
        },
        data() {
            return {
                orderId: '',
                comment_text: '',
                id: ''
            }
        },
        mounted() {
            this.orderId = this.$route.query.orderId
            this.id = this.$route.query.id
            console.log("订单ID", this.orderId)
        },
        methods: {

            //提交评论
            subComment() {
                //console.log(this.$refs.Expertcard.images.toString())
                if (this.comment_text !== '') {
                    api.commentOrder({
                        contents: this.comment_text,
                        id: this.id,
                        img_data: this.$refs.Expertcard.images,
                    }).then((res) => {
                        if (res.status === 1) {
                            this.$router.push({name: 'myOrder'})
                        } else if (res.status === 0) {
                            this.$message.error(res.msg);
                        }
                    })
                } else {
                    this.$message.error('请填写评论内容');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .commentGoods_page {
        .receipt_title {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
            font-size: 14px;
            font-weight: bold;
        }
        .comment_inp {
            border-top: 1px solid #f1f1f1;
            padding: 20px;
        }
        .comment_img {
           padding: 15px 20px 15px 20px;
            height: 160px;
        }
        .comment_btn {
            margin: 100px 0 50px 0;
            text-align: center;
            button {
                width: 200px;
                height: 40px;
                line-height: 40px;
                color: #ffffff;
                outline: none;
                border: 0;
                border-radius: 4px;
                background: #f44336;
            }
        }
    }
</style>
