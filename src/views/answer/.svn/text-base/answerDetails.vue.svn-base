<template>
    <div class="answerDetails_page page-content">
        <!--导航-->
        <div class="nav">
            <navigation></navigation>
        </div>
        <div class="answerDetails_breadcrumb">
            <div class="gouBack">
                <span @click="gou">财税问答</span><span><</span> <span>详情已(已付费)</span>
            </div>
            <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
                <!--<el-breadcrumb-item :to="{ path: '/answer/answerList' }">财税问答</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item>详情(未付费）</el-breadcrumb-item>-->
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
                        <div v-text="problem.contents" class="break-word">

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
        <div class="answer_expert clear" v-for="item in answer">
            <div class="user left">
                <div class="header_img">
                    <img :src="imgPath+item.expert_user.face">
                </div>
                <div class="user_text">
                    <p v-text="item.expert_user.true_name"></p>
                    <p v-text="item.expert_user.expertise"></p>
                    <p class="time"><span> {{item.add_time | timeFilter}}</span><span>|</span><span v-text="item.look_num"></span>人看过</p>
                </div>
            </div>
            <div class="pay_show right">
                <button class="btn" @click="btn(answer.id)"><span v-text="money"></span>元查看</button>
            </div>
        </div>
        <self-modal :show.sync="loginTip">
            <div class="pb-30">
                <div class="login-tip">欢迎来到中财讯</div>
                <div class="modal-btn">
                    <a class="pointer" @click="$router.push({name: 'login'})">去登录</a>
                    <a class="pointer ml-20" @click="loginTip=false">先看看</a>
                </div>
            </div>
        </self-modal>
        <self-modal :modal-width="600" :show.sync="showModal">
            <div slot="modal-heading" style="height: 600px;">
                <img :src="imgPath+imgShow" alt="" style="width:100%;height: 100%;">
            </div>
        </self-modal>
        <!--<div class="pay_answer" v-if="problem.is_pay!==1">-->
            <!--<div class="answer_problem">-->
                <!--<ul>-->
                    <!--<li>-->
                        <!--<div class="answerList">-->
                            <!--<div class="header_img">-->
                                <!--<img :src="imgPath+answer.face">-->
                            <!--</div>-->
                            <!--<div class="answer_name">-->
                                <!--<p v-text="answer.true_name"></p>-->
                                <!--<p v-text="answer.expertise"></p>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div v-text="answer.contens">-->
                        <!--</div>-->
                        <!--<div class="answer_voice" v-show="answer.voice_url!==''">-->
                            <!--<m-audio :data="{ voice_url:answer.voice_url }"></m-audio>-->
                        <!--</div>-->
                        <!--<div class="answer_showImg">-->
                            <!--&lt;!&ndash;零时样式&ndash;&gt;-->
                            <!--<div v-for="item in answer_show">-->
                                <!--<img :src="imgPath+item">-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="lookAnswer">-->
                            <!--<span v-text="answer.look_num"></span>人看过-->
                        <!--</div>-->
                    <!--</li>-->
                <!--</ul>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import navigation from '../../components/public/navigation'
    import api from '@/api/answerApi'
    import utils from '../../assets/js/utils'
    import QRCodeJs from 'qrcodejs2'
    import MAudio from '../../components/public/audio'
    import {SelfModal} from '../../components/public'

    export default {
        name: "answer-details",
        components: {
            navigation,
            MAudio,
            SelfModal
        },
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                id:'',
                problem:{},
                problem_show:[],
                imgPath: utils.api,
                answer:[],
                answer_id:'',
                money:'',
                answer_show: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                loginTip: false,
                imgShow: '',
                showModal:false
            };
        },
        methods: {
            enlarge(item) {
                this.showModal = true
                this.imgShow = item
            },
            //给钱看答案是pay see
            btn(){
                console.log("答案id",this.answer_id)
                console.log("问题",this.id)
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                this.$router.push({ name:'paySee',query:{id:this.answer_id,quzi:this.id}})
            },
            gou() {
                this.$router.back(-1)
            },
        },
        mounted(){
            this.id = this.$route.query.id;
            //获取 查看金额
            api.PaySee({
                type: 2,
            }).then((res) => {
                this.money = res.data.money
            })
            api.problemDetails({
                id:this.id
            }).then((res)=>{
                this.problem = res.data
                this.problem_show = res.data.img_data
                console.log("全部",res.data)
                this.answer = res.data.answers
                this.answer_id = res.data.answers[0].id
                 //this.answer_show = res.data.answers.img_data
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .answerDetails_page {
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
                                img{
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
        .answer_expert {
            border-bottom: 2px solid #f1f1f1;
            margin-bottom: 100px;
            .user {
                display: flex;
                .header_img {
                    width: 60px;
                    height: 60px;

                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .user_text {
                    margin-left: 10px;
                    .time {
                        font-size: 12px;
                        color: #999999;
                        span {
                            margin-left: 10px;
                        }
                    }
                }

            }
            .pay_show {
                padding-top: 20px;
                .btn {
                    width: 120px;
                    height: 40px;
                    border: 1px solid #f44336;
                    outline: none;
                    background: #fff;
                    color: #f44336;
                    border-radius: 20px;
                    font-weight: bold;
                }
            }
        }
        .pay_answer {
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
