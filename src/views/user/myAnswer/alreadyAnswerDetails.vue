<template>
    <div class="alreadyAnswerDetails_page">
        <div class="header">
            已回答详情
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
                    <img :src="imgPath+item" alt="">
                </div>
            </div>
            <!--是否被人回答过的内容-->
            <div class="answer_questions">
                <ul>
                    <li v-for="item in answer">
                        <div class="answer_user clear">
                            <div class="user_face left">
                                <img :src="imgPath+item.expert_user.face" alt="">
                            </div>
                            <div class="user_name left">
                                <div>
                                    <span v-text="item.expert_user.true_name"></span>·
                                    <span v-text="item.expert_user.experts_type"></span>
                                </div>
                                <div v-text="item.expert_user.expertise">
                                    成就
                                </div>
                            </div>
                        </div>
                        <div class="answer_content" v-text="item.contens" style="word-wrap: break-word">
                        </div>
                        <!--<div class="answer_Voice" v-show="answer.voice_url">-->
                        <!--30s <i><img src="../../../assets/image/ic_82.png" alt=""></i>-->
                        <!--</div>-->
                        <!--<audio v-if="item.voice_url!==''" :data="{voice_url:item.voice_url}"></audio>-->
                        <div class="answer_img">
                            <div v-for="j in item.img_data">
                                <img :src="imgPath+j" alt="">
                            </div>
                        </div>
                        <div class="answer_time clear">
                            <div class="left">{{item.add_time | timeFilter }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {myTaskApi} from '../../../api'
    import utils from '../../../assets/js/utils';
    import {audio} from '../../../components/public'

    export default {
        name: "already-answer-details",
        components: {
            audio,
        },
        data() {
            return {
                imgPath: utils.api,
                id: '',
                questions: {
                    answers: [],
                },
                answer: [],
                questions_show: [],
            }

        },
        mounted() {
            this.id = this.$route.query.id;
            myTaskApi.expertNoAnswer({
                id: this.id
            }).then((res) => {
                if (res.status === 1) {
                    this.questions = res.data
                    this.questions_show = res.data.img_data
                    console.log(res.data)
                    this.answer = res.data.answers
                }


            })
        },
        methods: {
            handleAudio(id) {
                console.log(this.$refs);
                for (let i = 0; i < this.$refs.length; i++) {
                    this.$refs[i]['audio' + id][0].pause();
                }
                console.log("开启");
                this.$refs["audio" + id][0].play();
                this.flag = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .alreadyAnswerDetails_page {
        .header {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
        }
        .questions_mais {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
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
