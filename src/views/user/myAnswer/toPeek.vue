<template>
    <div class="toPeek_page">
        <div class="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/user/myAnswer/myAnswerHome' }">我的回答</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '' }">提问详情（已经付费）</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="questions_mais">
            <div class="answer_users clear">
                <div class="left">
                    <img :src="imgPath+questions.face" alt="">
                </div>
                <div class="left" v-text="questions.nickname">提问人的名字</div>
                <div class="right">{{questions.add_time | timeFilter }}</div>
            </div>
            <div class="questions_content" v-text="questions.contents" style="word-wrap: break-word">提问内容</div>
            <div class="questions_show">
                <div v-for="item in questions_show">
                    <img :src="imgPath+item" alt="" @click="enlarge(item)">
                </div>
            </div>
        </div>

        <div class="answer_questions">
            <ul>
                <li v-for="item in answer">
                    <div class="answer_user clear">
                        <div class="user_face left">
                            <img :src="imgPath+item.expert_user.face" alt="">
                        </div>
                        <div class="user_name left">
                            <div>
                                <span v-text="item.expert_user.true_name"></span>·<span
                                v-text="item.expert_user.experts_type"></span>
                            </div>
                            <div v-text="item.expert_user.expertise">
                            </div>
                        </div>
                    </div>
                    <div class="answer_content" v-text="item.contens" style="word-wrap: break-word">
                    </div>
                    <div class="answer_Voice" v-show="answer.voice_url">
                        30s <i><img src="../../../assets/image/ic_82.png" alt=""></i>
                    </div>
                    <div class="answer_img">
                        <div v-for="j in item.img_data">
                            <img :src="imgPath+j" alt="" @click="enlarge(j)">
                        </div>
                    </div>
                    <div class="answer_time">
                        <div>
                            {{item.add_time | timeFilter }}
                        </div>
                    </div>
                    <div class="answer_look">
                        <span v-text="item.look_num"></span>人已看过
                    </div>
                </li>
            </ul>
        </div>
        <div class="answer_mains" v-if="questionsZW.id!==''">
            <div class="title">追问问题</div>
            <div class="answer_problem">
                <ul>
                    <li>
                        <div class="answerList">
                            <div class="header_img">
                                <img :src="imgPath+questionsZW.face">
                            </div>
                            <div class="answer_name" v-text="questionsZW.nickname">
                            </div>
                            <div class="answer_time">
                                {{questionsZW.add_time | timeFilter}}
                            </div>
                        </div>
                        <div v-text="questionsZW.contents" style="word-wrap: break-word">
                        </div>
                        <div class="answer_showImg">
                            <!--零时样式-->
                            <div v-for="item in questionsZW_show">
                                <img :src="imgPath+item" @click="enlarge(item)">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="answer_problem">
            <ul>
                <li v-for="item in questionsZW_answers">
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
        <self-modal :modal-width="600" :show.sync="showModal">
            <div slot="modal-heading" style="height: 600px;">
                <img :src="imgPath+imgShow" alt="" style="width:100%;height: 100%;">
            </div>
        </self-modal>
    </div>
</template>

<script>
    import {myTaskApi} from '../../../api'
    import utils from '../../../assets/js/utils';
    import MAudio from '../../../components/public/audio'
    import {SelfModal} from '../../../components/public'

    export default {
        name: "to-peek",
        data() {
            return {
                id: '',
                questions: {},
                questions_show: [],
                imgPath: utils.api,
                answer: [],//第一次回答
                questionsZW: {},
                questionsZW_show: [],
                questionsZW_answers: [],
                imgShow: '',
                showModal: false,
            }
        },
        components: {
            MAudio,
            SelfModal
        },
        mounted() {
            this.id = this.$route.query.id;
            myTaskApi.goToPeekDetail({
                id: this.id
            }).then((res) => {
                console.log("偷看详细的数据", res.data)
                this.questions = res.data
                this.questions_show = res.data.img_data
                this.answer = res.data.answers
                this.questionsZW = res.data.zw
                this.questionsZW_show = res.data.zw.img_data
                this.questionsZW_answers = res.data.zw.answers
            })
        },
        methods: {
            handleAudio(id) {
                this.$refs["udio" + id].pause();
                console.log("开启");
                this.$refs["audio" + id].play();
            },
            enlarge(item) {
                this.showModal = true
                this.imgShow = item
            },
        }
    }
</script>

<style lang="scss" scoped>
    .toPeek_page {
        .header {
            padding: 20px;
        }
        .questions_mais {
            padding: 20px;
            border-top: 1px solid #f1f1f1;
            .title {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .answer_users {
                margin-bottom: 15px;
                div:nth-child(1) {
                    width: 60px;
                    height: 60px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
                div:nth-child(2) {
                    line-height: 60px;
                    margin-left: 10px;
                    color: #333333;
                    font-size: 14px;
                    font-weight: bold;
                }
                div:nth-child(3) {
                    line-height: 60px;
                }
            }
            .questions_show {
                margin: 15px 0;
                display: flex;
                div {
                    width: 100px;
                    height: 100px;
                    background: #999999;
                    img {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }

                }
                div + div {
                    margin-left: 10px;
                }
            }
        }
        .answer_questions {
            border-top: 1px solid #f1f1f1;
            margin-top: 20px;
            ul {
                li {
                    padding: 20px;
                    position: relative;
                    .answer_user {
                        margin-bottom: 10px;
                        .user_face {
                            width: 60px;
                            height: 60px;
                            img {
                                border-radius: 50%;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        .user_name {
                            margin-left: 10px;
                            div:nth-child(1) {
                                font-weight: bold;
                                font-size: 14px;
                                margin-bottom: 20px;
                            }
                            div:nth-child(2) {

                                font-size: 14px;
                                color: #999999;
                            }
                        }
                        .user_time {
                            color: #999999;
                            line-height: 60px;
                        }
                    }
                    .answer_Voice {
                        width: 200px;
                        height: 40px;
                        background: #303f9f;
                        text-align: right;
                        padding-right: 20px;
                        color: #ffffff;
                        line-height: 40px;
                        border-radius: 4px;
                        margin: 15px 0;
                    }
                    .answer_img {
                        margin-top: 10px;
                        display: flex;
                        div {
                            width: 100px;
                            height: 100px;
                            background: #999999;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        div + div {
                            margin-left: 10px;
                        }
                    }
                    .answer_time {
                        margin-top: 10px;
                        color: #999999;
                    }
                    .answer_look {
                        position: absolute;
                        right: 50px;
                        top: 70%;
                        font-size: 14px;
                    }
                }
            }
        }
        .answer_mains {
            .title {
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
                                    object-fit: cover;
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
                                margin-left: 780px;
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
                                    object-fit: cover;
                                }
                            }
                        }
                    }
                }
            }
        }
        .answer_problem {
            padding: 0 20px;
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


</style>
