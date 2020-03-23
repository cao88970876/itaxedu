<template>
    <div class="expertInquiries_page">
        <div class="header">
            追问详情
        </div>
        <div class="questions_mais">
            <div class="title">历史问题</div>
            <div class="answer_users clear">
                <div class="left">
                    <img :src="imgPath+questions.face" alt="">
                </div>
                <div class="left" v-text="questions.nickname">提问人的名字</div>
                <div class="right">{{questions.add_time | timeFilter }}</div>
            </div>
            <div class="questions_content" v-text="questions.contents" style="word-wrap: break-word">提问内容</div>
            <div class="questions_show" >
                <div v-for="item in questions_show">
                    <div><img :src="imgPath+item" alt="" @click="enlarge(item)"></div>
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
                                <span v-text="item.expert_user.true_name"></span> ·
                                <span v-text="item.expert_user.experts_type"></span>
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
                </li>
            </ul>
        </div>
        <div class="questions_mais ">
            <div class="title">追问问题</div>
            <div class="answer_users clear">
                <div class="left">
                    <img :src="imgPath+zwquestions.face" alt="">
                </div>
                <div class="left" v-text="zwquestions.nickname">提问人的名字</div>
                <div class="right">{{zwquestions.add_time | timeFilter }}</div>
            </div>
            <div class="questions_content" v-text="zwquestions.contents" style="word-wrap: break-word">提问内容</div>
            <div class="questions_show">
                <div v-for="item in zwquestions_show">
                    <img :src="imgPath+item" alt="" @click="enlarge(item)">
                </div>
            </div>
        </div>
        <!--回没回答-->
        <div class="dontAnswer" v-show="zwquestions.status ===0" @click="$router.push({name:'expertsAnswerPuestions',query:{id:id}})">
            立即回答
        </div>
        <div class="answer_questions" v-show="zwquestions.status ===1">
            <ul>
                <li v-for="item in zwanswers">
                    <div class="answer_user clear">
                        <div class="user_face left">
                            <img :src="imgPath+item.expert_user.face" alt="">
                        </div>
                        <div class="user_name left">
                            <div>
                               <span v-text="item.expert_user.true_name"></span> ·
                                <span v-text="item.expert_user.experts_type"></span>
                            </div>
                            <div v-text="item.expert_user.expertise">
                            </div>
                        </div>
                    </div>
                    <div class="answer_content" v-text="item.contens" style="word-wrap: break-word">
                    </div>

                    <div class="answer_Voice" v-show="answer.voice_url">
                        <m-audio :data="{ voice_url:item.voice_url }"></m-audio>
                    </div>

                    <div class="answer_img">
                        <div v-for="j in item.img_data">
                            <!--v-for="j in item.img_data"-->
                            <img :src="imgPath+j" alt="" @click="enlarge(j)">
                        </div>
                    </div>
                    <div class="answer_time">
                        <div>
                            {{item.add_time | timeFilter }}
                        </div>
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
        components: {
            MAudio,
            SelfModal
        },
        name: "expert-inquiries",
        data(){
            return{
                imgShow: '',
                showModal:false,
                id:'',
                questions: {},
                questions_show: [],
                imgPath: utils.api,
                answer: [],//第一次回答
                zwquestions: {},
                zwquestions_show: [],
                zwanswers:[],//追问回答
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            myTaskApi.expertInquiriesDetail({
                id:this.id
            }).then((res)=>{
                if(res.status===1){
                    console.log(res.data)
                    this.questions = res.data
                    this.questions_show = res.data.img_data
                    this.answer = res.data.answers
                    this.zwquestions = res.data.zw
                    this.zwanswers = res.data.zw.answers
                    this.zwquestions_show = res.data.zw.img_data
                }
            })
        },
        methods:{
            enlarge(item) {
                this.showModal = true
                this.imgShow = item
            },
        }
    }
</script>

<style lang="scss" scoped>
    .expertInquiries_page {
        .header {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
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
                        color: #999999;
                    }
                }
            }
        }
        .dontAnswer{
            margin: 20px 20px;
            background: #f44336;
            color: #ffffff;
            width: 120px;
            height: 40px;
            border-radius: 4px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
        }
    }
</style>
