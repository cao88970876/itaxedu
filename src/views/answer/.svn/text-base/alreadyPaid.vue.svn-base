<template>
    <div class="alreadyPaid_page page-content">
        <!--导航-->
        <div class="nav">
            <navigation></navigation>
        </div>
        <div class="answerDetails_breadcrumb">
            <div class="gouBack">
                <span @click="gou">财税问答</span><span><</span> <span>详情已(已付费)</span>
            </div>
            <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
                <!--<el-breadcrumb-item :to="{ }" @click="gou">财税问答</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item>详情(已付费）</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
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
                        <div v-text="problem.contents" style="word-wrap: break-word">
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
        <div class="answer_expert">
            <div class="answer_problem">
                <ul>
                    <li v-for="item in answer">
                        <div class="answerList">
                            <div class="header_img">
                                <img :src="imgPath+item.expert_user.face">
                            </div>
                            <div class="answer_name">
                                <p><span v-text="item.expert_user.true_name"></span>·<span
                                    v-text="item.expert_user.experts_type"></span></p>
                                <p class="expertise" v-text="item.expert_user.expertise"></p>
                            </div>
                        </div>
                        <div v-text="item.contens" style="word-wrap: break-word">
                        </div>
                        <div class="answer_voice" v-show="item.voice_url!==''">
                            <m-audio :data="{ voice_url:item.voice_url }"></m-audio>
                        </div>
                        <div class="answer_showImg">
                            <!--零时样式-->
                            <div v-for="item in answer_show">
                                <img :src="imgPath+item" @click="enlarge(item)">
                            </div>
                        </div>

                        <div class="lookAnswer">
                            <span class="left">{{item.add_time | timeFilter }} </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="answer_mains" v-if="problem.zw.id">
            <div class="title">追问问题</div>
            <div class="answer_problem">
                <ul>
                    <li>
                        <div class="answerList">
                            <div class="header_img">
                                <img :src="imgPath+zwproblem.face">
                            </div>
                            <div class="answer_name" v-text="zwproblem.nickname">
                            </div>
                            <div class="answer_time">
                                {{zwproblem.add_time | timeFilter}}
                            </div>
                        </div>
                        <div v-text="zwproblem.contents" style="word-wrap: break-word">
                        </div>
                        <div class="answer_showImg">
                            <!--零时样式-->
                            <div v-for="item in zwproblemShow">
                                <img :src="imgPath+item" @click="enlarge(item)">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="answer_expert">
            <div class="answer_problem">
                <ul>
                    <li v-for="item in zwAnswer">
                        <div class="answerList">
                            <div class="header_img">
                                <img :src="imgPath+item.expert_user.face">
                            </div>
                            <div class="answer_name">
                                <p><span v-text="item.expert_user.true_name"></span>·<span
                                    v-text="item.expert_user.experts_type"></span></p>
                                <p class="expertise" v-text="item.expert_user.expertise"></p>
                            </div>
                        </div>
                        <div v-text="item.contens" style="word-wrap: break-word">
                        </div>
                        <div class="answer_voice" v-show="item.voice_url!==''">
                            <m-audio :data="{ voice_url:item.voice_url }"></m-audio>
                        </div>
                        <div class="answer_showImg">
                            <!--零时样式-->
                            <div v-for="j in item.img_data">
                                <img :src="imgPath+j" @click="enlarge(j)">
                            </div>
                        </div>
                        <div class="lookAnswer">
                            <span class="left">{{item.add_time | timeFilter }} </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <self-modal :modal-width="600" :show.sync="showModal">
            <div slot="modal-heading" style="height: 600px;">
                <img :src="imgPath+imgShow" alt="" style="width:100%;height: 100%;">
            </div>
        </self-modal>
    </div>
</template>

<script>

    import MAudio from '../../components/public/audio'
    import api from '@/api/answerApi'
    import utils from '../../assets/js/utils'
    import {Navigation, SearchInput, SelfModal} from '../../components/public'
    export default {
        name: "already-paid",
        data() {
            return {
                imgPath: utils.api,
                problem: {
                    zw:{}
                },
                problem_show: [],
                answer: [],
                answer_show: [],
                zwproblem: {},
                zwproblemShow: [],
                zwAnswer: [],
                imgShow: '',
                showModal:false
            }
        },
        components: {
            Navigation,
            MAudio,
            SelfModal
        },
        methods: {
            gou() {
                this.$router.back(-1)
            },
            handleAudio(id) {
                this.$refs["udio" + id].pause();
                console.log("开启");
                this.$refs["audio" + id].play();
            },
            enlarge(item) {
                this.showModal = true
                this.imgShow = item
            },
        },
        mounted() {
            this.id = this.$route.query.id;
            api.problemDetails({
                id: this.id
            }).then((res) => {
                this.problem = res.data
                this.problem_show = res.data.img_data
                console.log("全部", res.data)
                // console.log("数据",res.data.answer)
                this.answer_id = res.data.answers[0].id
                console.log(this.answer_id)
                this.answer = res.data.answers
                this.answer_show = res.data.answers.img_data
                this.zwproblem = res.data.zw
                this.zwproblemShow = res.data.zw.img_data
                this.zwAnswer = res.data.zw.answers
            })
        },
    }
</script>

<style lang="scss" scoped>
    .alreadyPaid_page {
        .nav {
            padding-bottom: 20px;
            border-bottom: 2px solid #f1f1f1;
        }
        .answerDetails_breadcrumb {
            margin-top: 20px;
            .gouBack{
                span{
                    margin-right: 15px;
                    font-size: 14px;
                }
                span:nth-child(1){
                    font-weight: bold;
                }
            }
        }
        .answer_mains {
            .title{
                font-size: 14px;
                font-weight: bold;
                border-left: 2px solid #f44336;
                padding-left: 10px;
            }
            padding: 15px;
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
                                p:nth-child(2) {
                                    color: #999999;
                                }
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
                                margin-left: 10px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                    }
                }
            }
        }
        .answer_expert {
            padding: 15px;
            .answer_problem {
                ul {
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
                                font-weight: bold;
                                p:nth-child(2) {
                                    color: #999999;
                                }
                            }
                        }
                        .answer_showImg {
                            margin-top: 10px;
                            display: flex;
                            div {
                                width: 100px;
                                height: 100px;
                                margin-left: 10px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                        .answer_time {

                        }
                        .answer_voice {
                            margin: 15px 0;
                        }
                        .lookAnswer {
                            margin-top: 10px;
                            color: #999999;
                            font-size: 12px;
                        }
                    }
                }
            }

        }
    }
</style>
