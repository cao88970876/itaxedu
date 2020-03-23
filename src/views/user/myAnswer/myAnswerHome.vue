<template>
    <div class="myAnswerHome_page">
        <div v-if="userInfo.type===1 || userInfo.type===3">
            <div class="title">
                我的问答
            </div>
            <div class="answer_type">
                <div @click="putAnswer(type=1)" :class="{'active':type===1}">提问</div>
                <div @click="inquiries(type=2)" :class="{'active':type===2}">追问</div>
                <div @click="toPeek(type=3)" :class="{'active':type===3}">偷看</div>
            </div>
            <div class="mains">
                <ul>
                    <li v-for="item in answerList" @click="goDetaile(item)">
                        <div class="user clear">
                            <div class="face left">
                                <img :src="imgPath+item.face" alt="">
                            </div>
                            <div class="name left">
                                <span v-text="item.nickname">v-show="type===1||type===2"</span>
                                <!--<span v-text="item.true_name" v-show="type===2"></span>-->
                            </div>
                            <div class="time right">{{item.add_time | timeFilter }}</div>
                        </div>
                        <div class="content" v-text="item.contents" >
                        </div>
                        <div class="achievement" v-show="type===2||type===3" v-for="chengjiu in item.answers">
                            <span v-show="type===2 || type===3">{{chengjiu.expert_user.true_name}}</span> |
                            <span>{{chengjiu.expert_user.expertise}}</span>
                        </div>
                        <div class="clear">
                            <div class="price money left" v-show="type===1 && item.status!==1 " v-text="item.money"></div>
                            <div class="experName left" v-show="type===1 && item.status===1" v-for="chengjiu in item.answers">{{chengjiu.expert_user.true_name}}<span>|</span>{{chengjiu.expert_user.expertise}}</div>
                            <div class="right price" v-show="item.is_check!==1">审核中</div>
                        </div>
                    </li>
                </ul>
            </div>
            <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
        </div>
        <div v-if="userInfo.type===2">
            <div class="title">
                我的回答
            </div>
            <div class="answer_type">
                <div @click="unAnswer(eType=1)" :class="{'active':eType===1}">未回答</div>
                <div @click="already(eType=2)" :class="{'active':eType===2}">已回答</div>
                <div @click="expertOthers(eType=3)" :class="{'active':eType===3}">追问</div>
            </div>
            <div class="mains">
                <ul>
                    <li v-for="item in userAnswer" @click="goNoAnswer(item)">
                        <div class="user clear">
                            <div class="face left">
                                <img :src="imgPath+item.face" alt="">
                            </div>
                            <div class="name left" v-text="item.nickname" v-show="eType===1||eType===3"></div>
                            <div class="name left" v-show="eType===2"><span
                                v-text="item.true_name"></span><span
                                v-text="item.nickname" v-show="item.true_name===''"></span></div>
                            <div class="time right">{{item.add_time | timeFilter }}</div>
                        </div>
                        <div class="content" v-text="item.contents">
                            内容weqwewqewqewqewqe
                        </div>
                        <div class="achievement" v-show="eType===2||eType===3" v-for="chengjiu in item.answers">
                            <span>{{chengjiu.expert_user.true_name}}</span> |
                            <span>{{chengjiu.expert_user.expertise}}</span>
                        </div>
                        <div class="clear" v-show="eType===1">
                            <div class="price money left" v-text="item.money"></div>
                        </div>
                        <div v-show="eType===2||eType===3">
                            <div class="price" v-show="item.is_check!==1">审核中</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import utils from '../../../assets/js/utils';
    import {myTaskApi} from '../../../api' //接口是写在 任务悬赏里面的
    import {Pagination} from "../../../components/public";

    export default {
        name: "my-answer-home",
        components: {Pagination},
        data() {
            return {
                imgPath: utils.api,
                type: 1,
                answerList: [],
                pageInfo: {
                    pageSize: 10,
                    total: 1,
                    currentPage: 1
                },
                //专家
                eType: 1,
                userAnswer: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},//1是用户 2是专家 3机构
            }
        },
        mounted() {
            this.putAnswer();
            this.unAnswer();
            console.log(this.userInfo)
        },
        methods: {
            //我的提问 如果没人回答可以取消
            putAnswer() {
                myTaskApi.myAnswerHome({
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then((res) => {
                    console.log('提问内容', res.data)
                    this.answerList = res.data.data
                    this.pageInfo.total = res.data.total * 1 || 0
                })
            },
            //追问
            inquiries() {
                myTaskApi.inquiriesList({
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then((res) => {
                    if (res.status === 1) {
                        console.log('追问内容', res.data)
                        this.answerList = res.data.data
                        this.pageInfo.total = res.data.total * 1 || 0
                    }
                })
            },
            //偷看
            toPeek() {
                myTaskApi.toPeekList({
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then((res) => {
                    if (res.status === 1) {
                        console.log('偷看内容', res.data)
                        this.answerList = res.data.data
                        this.pageInfo.total = res.data.total * 1 || 0
                    }
                })
            },
            goDetaile(item) {
                if (this.type === 1 && item.is_check === 1) {
                    this.$router.push({name: 'myQuestions', query: {id: item.id}})
                } else if (this.type === 2) {
                    this.$router.push({name: 'inquiriesDetails', query: {id: item.id}})
                } else if (this.type === 3) {
                    this.$router.push({name: 'toPeek', query: {id: item.id}})
                }
            },
            //分页
            changePage(page) {
                this.pageInfo.currentPage = page
                if (this.type === 1) {
                    this.putAnswer()
                } else if (this.type === 2) {
                    this.inquiries()
                } else if (this.type === 3) {
                    this.toPeek()
                }
            },

            //专家页面*************************************
            //未回答
            unAnswer() {
                myTaskApi.expertAnswer().then((res) => {
                    if (res.status === 1) {
                        this.userAnswer = res.data
                    }
                })
            },
            //已回答
            already() {
                myTaskApi.alreadyAnswer().then((res) => {
                    if (res.status === 1) {
                        console.log("已经回答的列表", res.data)
                        this.userAnswer = res.data
                    }
                })
            },
            //专家追问
            expertOthers() {
                myTaskApi.expertInquiries({
                    // page: this.pageInfo.currentPage,
                    // page_size: this.pageInfo.pageSize,
                }).then((res) => {
                    if (res.status === 1) {
                        console.log('追问内容', res.data)
                        this.userAnswer = res.data
                        this.pageInfo.total = res.data.total * 1 || 0
                    }
                })
            },
            goNoAnswer(item) {
                if (this.eType === 1) {
                    this.$router.push({name: 'noAnswerDetails', query: {id: item.id}})
                } else if (this.eType === 2 && item.is_check === 1) {
                    this.$router.push({name: 'alreadyAnswerDetails', query: {id: item.id}})
                } else if (this.eType === 3 && item.is_check === 1) {
                    this.$router.push({name: 'expertInquiries', query: {id: item.id}})
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .myAnswerHome_page {
        .title {
            padding: 15px 20px;
            font-size: 18px;
            color: #666666;
            border-bottom: 1px solid #f1f1f1;
        }
        .answer_type {
            padding: 10px 20px;
            display: flex;
            font-size: 14px;
            div {
                padding: 5px 10px;
                margin-right: 30px;
                cursor: pointer;
            }
            .active {
                border-bottom: 2px solid #f44336;
                color: #f44336;
            }
        }
        .mains {
            padding: 20px;
            ul {
                li {
                    padding: 15px;
                    border: 1px solid #f1f1f1;
                    border-radius: 4px;
                    .user {
                        .face {
                            width: 60px;
                            height: 60px;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                                object-fit: cover;
                            }
                        }
                        .name {
                            margin-left: 10px;
                            line-height: 60px;
                            color: #333333;
                            font-weight: bold;
                            font-size: 14px;
                        }
                        .title {
                            color: #999999;
                        }
                    }
                    .content {
                        word-wrap: break-word;
                        margin: 10px 0;
                    }
                    .achievement {
                        color: #999999;
                        margin-bottom: 6px;
                    }
                    .price {
                        color: #f44336;
                    }
                    .experName{
                        color: #999999;
                        span{
                            margin: 0 10px;
                        }
                    }
                }
            }
        }
    }
</style>
