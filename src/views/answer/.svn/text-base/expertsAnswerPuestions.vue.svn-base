<template>
    <div class="expertsAnswerPuestions_page page-content">
        <!--导航-->
        <div class="nav">
            <navigation></navigation>
        </div>
        <div class="answerDetails_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/answer/answerList' }">财税问答</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/answer/unansweredDetails' }">问答详情</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/answer/immediatelyAnswer' }">立即回答</el-breadcrumb-item>
            </el-breadcrumb>
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
                        <div v-text="problem.contents">
                        </div>
                        <div class="answer_showImg">
                            <!--零时样式-->
                            <div v-for="item in problem_show">
                                <img :src="imgPath+item" @click="enlarge(item)">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="questions_inp">
            <el-input type="textarea" class="textarea" @input="descInput" maxlength="999" v-model="answerText"
                      :autosize="{ minRows: 10, maxRows: 50}"
                      placeholder="请输入回答内容" resize="none">
            </el-input>
            <div class="fontNum">{{textlength}}/1000</div>
        </div>
        <div class="questions_img">
            <div class="title">上传图片</div>
            <div class="upload clear">
                <Uploads ref="Expertcard"></Uploads>
            </div>
        </div>
        <!--弹出框-->
        <div class="popup" v-show="popup_show">
            <div class="popup_mains">
                <div class="popup_title">
                    目录 <span @click="hidden()"><img src="../../assets/image/ic_73.png" alt=""></span>
                </div>
                <div class="text">
                    <div v-html="answerNeed.content">
                    </div>
                </div>
                <div class="agree">
                    <button @click="agree()">阅读并同意</button>
                </div>
            </div>
        </div>
        <div class="answerBtn">
            <button @click="putinAnswer">提交</button>
        </div>
        <self-modal :modal-width="600" :show.sync="showModal">
            <div slot="modal-heading" style="height: 600px;">
                <img :src="imgPath+imgShow" alt="" style="width:100%;height: 100%;">
            </div>
        </self-modal>
    </div>
</template>

<script>
    import navigation from '../../components/public/navigation'
    import api from '@/api/answerApi'
    import {myTaskApi} from '../../api'
    import utils from '../../assets/js/utils'
    import {Uploads} from '../../components/public'
    import {SelfModal} from '../../components/public'
    export default {
        name: "experts-answer-questions",
        components: {
            navigation,
            Uploads,
            SelfModal
        },
        data() {
            return {
                imgShow: '',
                showModal:false,
                dialogImageUrl: '',
                dialogVisible: false,
                checked: false,
                //弹出层
                popup_show: false,
                id: '',
                problem: {
                    img_data: []
                },
                problem_show: [],
                imgPath: utils.api,
                answerNeed: {},
                textlength: 0,
                answerText: '',
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            myTaskApi.expertInquiriesDetail({
                id: this.id
            }).then((res) => {
                if (res.status === 1) {
                    debugger
                    this.problem = res.data.zw
                    this.problem_show = res.data.zw.img_data
                    console.log(res.data)
                }
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
            descInput() {
                this.textlength = this.answerText.length;
            },
            show() {
                this.popup_show = true
            },
            hidden() {
                this.popup_show = false
            },
            agree() {
                this.popup_show = false
                this.checked = true
            },
            putinAnswer() {
                console.log(this.problem.id)
                if (this.answerText !== '') {
                    myTaskApi.immediatelyInquiries({
                        contens: this.answerText,
                        img_data: this.$refs.Expertcard.images,
                        id: this.problem.id,
                    }).then((res) => {
                        if (res.status === 1) {
                            this.$router.push({name: 'unanswered'})
                        }
                    })
                } else {
                    this.$message.error("请输入回答内容");
                }
            },

        },

    }
</script>

<style lang="scss" scoped>
    .expertsAnswerPuestions_page {
        .nav {
            padding-bottom: 20px;
            border-bottom: 2px solid #f1f1f1;
            margin-bottom: 20px;
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
