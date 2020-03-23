<template>
    <div class="immediatelyAnswer_page page-content">
        <!--导航-->
        <div class="nav">
            <navigation></navigation>
        </div>
        <div class="answerDetails_breadcrumb">
            <div class="gouBack">
                <span @click="gou">财税问答</span><span><</span><span @click="gou">问答详情</span><span><</span><span>立即回答</span>
            </div>
        </div>
        <div class="answer_mains">
            <div class="answer_problem">
                <ul>
                    <li>
                        <div class="answerList">
                            <div class="header_img">
                                <img :src="imgPath+problem.face">
                            </div>
                            <div class="answer_name" v-text="problem.nickname">
                            </div>
                            <div class="answer_time">
                                {{problem.add_time | timeFilter}}
                            </div>
                        </div>
                        <div v-text="problem.contents" class="break-word">
                        </div>
                        <div class="answer_showImg">
                            <!--零时样式-->
                            <div v-for="item in problem_show" :key="item">
                                <img :src="imgPath+item" @click="enlarge(item)">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="questions_inp">
            <el-input type="textarea" class="textarea" @input="descInput" maxlength="1000" v-model="answerText"
                      :autosize="{ minRows: 10, maxRows: 50}"
                      placeholder="请输入回答内容" resize="none">
            </el-input>
            <div class="fontNum">{{textlength}}/1000</div>
        </div>
        <div class="questions_img">
            <div class="upload">
                <Uploads ref="Expertcard"></Uploads>
            </div>
        </div>
        <div class="answerBtn">
            <button @click="answerSubm">提交</button>
        </div>
        <self-modal :modal-width="600" :show.sync="showModal">
            <div slot="modal-heading" style="height: 600px;">
                <img :src="imgPath+imgShow" alt="" style="width:100%;height: 100%;">
            </div>
        </self-modal>
    </div>
</template>

<script>
    import api from '@/api/answerApi'
    import utils from '../../assets/js/utils'
    import {Uploads} from '../../components/public'
    import {Navigation, SelfModal} from '../../components/public'
    export default {
        name: "immediately-answer",
        components: {
            Navigation,
            Uploads,
            SelfModal
        },
        data() {
            return {
                id: '',
                problem: {},
                problem_show: [],
                imgPath: utils.api,
                answerNeed: {},
                textlength: 0,
                answerText: '',
                imgShow: '',
                showModal:false
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            api.problemDetails({
                id: this.id
            }).then((res) => {
                this.problem = res.data
                console.log(res.data)
                this.problem_show = res.data.img_data
                // console.log("wqewqe",res.data.answer)
                // this.quiz_id = res.data.quiz.id
                // this.answer = res.data.answer
            })
            api.answerNeed().then((res) => {
                this.answerNeed = res.data
            })
        },
        methods: {
            enlarge(item) {
                this.showModal = true
                this.imgShow = item
            },
            gou() {
                this.$router.back(-1)
            },
            descInput() {
                this.textlength = this.answerText.length;
            },
            answerSubm() {
                if (this.answerText !== '') {
                    api.expertProblem({
                        img_data: JSON.stringify(this.$refs.Expertcard.images),
                        quiz_id: this.problem.id,
                        contents: this.answerText,
                    }).then((res) => {
                        if(res.status===1){
                            this.$router.push({name:'unanswered'})
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }  else {
                    this.$message.error("请输入完整的表单");
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .immediatelyAnswer_page {
        .nav {
            padding-bottom: 20px;
            border-bottom: 2px solid #f1f1f1;
            margin-bottom: 20px;
        }
        .answerDetails_breadcrumb{
            .gouBack{
                span{
                    margin-right: 15px;
                    font-size: 14px;
                }
                span:nth-child(1){
                    font-weight: bold;
                }
                span:nth-child(3){
                    font-weight: bold;
                }
            }
        }
        .answer_mains {
            padding: 15px 0;
            .answer_problem {
                ul {
                    margin-top: 10px;
                    list-style: none;
                    li {
                        margin-top: 10px;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #f1f1f1;
                        .answerList {
                            display: flex;
                            margin-bottom: 10px;
                            .header_img {
                                width: 60px;
                                height: 60px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                }
                            }
                            .answer_name {
                                padding-left: 10px;
                                height: 60px;
                                line-height: 60px;
                                font-weight: bold;
                            }
                            .answer_time {
                                color: #999999;
                                margin-left: 950px;
                            }
                        }
                        .answer_showImg {
                            margin-top: 10px;
                            display: flex;
                            div {
                                width: 100px;
                                height: 100px;
                                background: #999999;
                                margin-right: 10px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }

                    }
                }
            }
        }
        .questions_inp {
            margin-top: 15px;
            textarea {
                width: 100%;
                height: 300px;
                background: #f1f1f1;
            }
            .fontNum {
                color: #999999;
                margin-top: 5px;
                text-align: right;
            }
        }
        .questions_img {
            border-bottom: 1px solid #f1f1f1;
            padding-bottom: 10px;
            .upload {
                margin-top: 10px;
                height: 160px;
            }
        }
        .argeemen {
            cursor: pointer;
            .check {
                margin-right: 10px;
            }
            span {
                color: #409EFF;
            }
        }
        .release {
            margin-top: 20px;
            text-align: center;
            .btn {
                border: 0;
                border-radius: 4px;
                width: 150px;
                height: 40px;
                outline: none;
                background: #f44336;
                color: #fff;
                font-size: 16px;
            }
        }
        .popup {
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            opacity: 1;
            background: rgba(0, 0, 0, 0.5);
            .popup_mains {
                width: 1200px;
                margin: 30px auto;
                background: #fff;
                z-index: 200;
                border-radius: 6px;
                padding: 20px 0;
                position: relative;
                .popup_title {
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #f1f1f1;
                    margin-bottom: 15px;
                    span {
                        width: 30px;
                        height: 30px;
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        img {
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
                .text {
                    padding: 0 40px;
                    margin-bottom: 15px;
                }
                .show {
                    width: 100%;
                    height: 400px;
                    background: #999999;
                }
                .agree {
                    text-align: center;
                    button {
                        border: 0;
                        border-radius: 4px;
                        width: 150px;
                        height: 40px;
                        outline: none;
                        background: #f44336;
                        color: #fff;
                        font-size: 16px;
                    }
                }
            }
        }
        .answerBtn {
            margin: 30px 0 100px 0;
            text-align: center;
            button {
                width: 150px;
                height: 40px;
                border: 1px solid #f44336;
                outline: none;
                background: #f44336;
                color: #fff;
                border-radius: 4px;
                font-weight: bold;
            }
        }
    }

</style>
