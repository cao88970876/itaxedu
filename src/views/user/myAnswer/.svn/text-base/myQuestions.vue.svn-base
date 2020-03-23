<template>
    <div class="myQuestions_page">
        <div class="header">
            提问详情
        </div>
        <div class="questions_mais">
            <div class="answer_users clear">
                <div class="left">
                    <img :src="imgPath+questions.face" alt="">
                </div>
                <div class="left" v-text="questions.nickname">提问人的名字</div>
                <div class="right">{{questions.add_time | timeFilter }}</div>
            </div>
            <div class="questions_content" style="word-wrap: break-word">{{questions.contents}}</div>
            <div class="questions_show">
                <div v-for="item in questions_show">
                    <div><img :src="imgPath+item" alt="" @click="enlarge(item)"></div>
                </div>
            </div>
            <!--如果没人回答的时候可以点击取消-->
            <div class="dont" v-show="questions.answers.length===0" @click="cancelQuz">
                取消提问
            </div>
            <!--是否被人回答过的内容-->
            <div class="answer_questions" v-show="questions.answers.length>0">
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
                                    成就
                                </div>
                            </div>
                        </div>
                        <div class="answer_content" v-text="item.contens" style="word-wrap: break-word">
                        </div>
                        <div v-show="answer.voice_url">
                            <!--<m-audio :data="{ voice_url:item.voice_url }"></m-audio>-->
                            <m-audio :data="{ voice_url:answer.voice_url }"></m-audio>
                        </div>
                        <div class="answer_img">
                            <div v-for="j in item.img_data">
                                <img :src="imgPath+j" alt="" @click="enlarge(j)">
                            </div>
                        </div>
                        <div class="answer_time clear">
                            <div class="left">{{item.add_time | timeFilter }}</div>
                            <div class="answer_type right" v-show="questions.status ===0" @click="adopt(item)">采纳</div>
                            <div class="answer_type right pointer" v-show="questions.status ===1 && questions.is_asked===0"
                                 @click="goInquiries(item)">追问
                            </div>
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
    import {myTaskApi} from '../../../api'
    import utils from '../../../assets/js/utils';
    import {SelfModal} from '../../../components/public'
    import MAudio from '../../../components/public/audio'

    export default {
        name: "my-questions",
        components: {
            MAudio,
            SelfModal
        },
        data() {
            return {
                imgShow: '',
                showModal: false,
                imgPath: utils.api,
                id: '',
                questions: {
                    answers: [],
                },
                questions_show: [],
                answer: [],
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            myTaskApi.goAnswerDetails({
                id: this.id
            }).then((res) => {
                this.questions = res.data
                console.log(res.data.status)
                this.questions_show = res.data.img_data
                this.answer = res.data.answers
                // this.answerMoney =  res.data.answers[0]
                console.log("我的问题详情", res.data)
            })
        },
        methods: {
            enlarge(item) {
                this.showModal = true
                this.imgShow = item
            },
            handleAudio(id) {
                this.$refs["udio" + id].pause();
                console.log("开启");
                this.$refs["audio" + id].play();
            },
            //取消
            cancelQuz() {
                myTaskApi.doCancelQuz({
                    id: this.id
                }).then((res) => {
                    if (res.status === 1) {
                        // this.$router.push({name: 'myAnswerHome'})
                        this.$router.push({name: 'myAnswerHome'})
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            //采纳
            adopt(item) {
                console.log("answerID", item.id)
                console.log("ID", this.questions.id)
                myTaskApi.doAdoptQuz({
                    answer_id: item.id,
                    id: this.questions.id
                }).then((res) => {
                    if (res.status === 1) {
                        this.$router.push({name: 'myAnswerHome'})
                    } else {
                        alert(res.msg)
                    }
                })
            },
            //采纳完了追问
            goInquiries(item) {
                console.log(item)
                this.$router.push({
                    name: 'immediately',
                    query: {
                        uid: item.expert_user.uid,
                        quzi_id: item.quiz_id,
                        price: item.expert_user.inquiries_discount_price
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myQuestions_page {
        .header {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
        }
        .questions_mais {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
            .answer_users {
                margin-bottom: 15px;
                display: flex;
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
                margin-top: 15px;
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

            .dont {
                margin: 50px 0 100px 20px;
                width: 200px;
                height: 40px;
                background: #f44336;
                color: #f1f1f1;
                border-radius: 4px;
                text-align: center;
                line-height: 40px;
            }
        }
        .answer_questions {
            border-top: 1px solid #f1f1f1;
            margin-top: 20px;
            ul {
                li {
                    padding-top: 20px;
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
                        display: flex;
                        margin-top: 15px;
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
                        div:nth-child(1) {
                            color: #999999;
                        }
                        .answer_type {
                            color: #999999;
                            padding: 3px 5px;
                            border: 1px solid #999999;
                            border-radius: 6px;
                        }

                    }
                }
            }

        }
    }

</style>
