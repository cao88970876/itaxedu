<template>
    <div class="unansweredDetails_page page-content">
        <!--导航-->
        <div class="nav">
            <navigation></navigation>
        </div>
        <div class="answerDetails_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/answer/answerList' }">财税问答</el-breadcrumb-item>
                <el-breadcrumb-item>问答详情</el-breadcrumb-item>
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
                        <div v-text="problem.contents" class="break-word"></div>
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
        <div class="pay">
            支付：<span v-text="problem.money" class="money"></span>
        </div>
        <div class="answerBtn">
            <button @click="goanswer">立即回答</button>
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
    import {Navigation, SelfModal} from '../../components/public'
    export default {
        name: "unanswered-details",
        components: {
            Navigation,
            SelfModal
        },
        data() {
            return {
                problem: {},
                problem_show: [],
                imgPath: utils.api,
                answer: {},
                quiz_id: '',
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
                console.log("为回答",res.data)
                this.problem_show = res.data.img_data
                // console.log("wqewqe",res.data.answer)
                // this.quiz_id = res.data.quiz.id
                // this.answer = res.data.answer
            })
        },
        methods: {
            goanswer() {
                this.$router.push({name: 'immediatelyAnswer', query: {id: this.problem.id}})
            },
            enlarge(item) {
                this.showModal = true
                this.imgShow = item
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .unansweredDetails_page {
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
                                    object-fit: cover;
                                }
                            }
                        }

                    }
                }
            }
        }
        .pay {
            font-weight: bold;
            font-size: 16px;
            padding-bottom: 10px;
            span {
                color: #f44336;
            }
            border-bottom: 2px solid #f1f1f1;
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
