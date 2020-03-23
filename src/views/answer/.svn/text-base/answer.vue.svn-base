<template>
    <div class="answer_page page-content">
        <!--导航-->
        <div>
            <navigation></navigation>
        </div>
        <!--搜索-->
        <div class="answer_search">
            <search-input @search="search" v-model="searchStr"></search-input>
            <!---->
        </div>
        <div>
            <banner type="6"></banner>
        </div>
        <div class="answer_fast">
            <ul class="clear">
                <li class="left clear" @click="goFast">
                    <div class="img">
                        <img src="../../assets/image/ic_80.png" alt="">
                    </div>
                    <div class="text">
                        <div class="text_title">
                            快速问答
                        </div>
                        <div class="text_answer">
                            每天10000个问题
                        </div>
                    </div>
                </li>
                <li class="left clear" @click="goSearch">
                    <div class="img">
                        <img src="../../assets/image/ic_81.png" alt="">
                    </div>
                    <div class="text">
                        <div class="text_title">
                            找专家
                        </div>
                        <div class="text_answer">
                            找资深专家、对证咨询
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="answer_mains">
            <div class="mains_title">
                <p>已解答</p>
            </div>
            <div class="answer_problem">
                <ul>
                    <li v-for="item in answerUserlist" @click="getAnswerDetails(item)">
                        <div class="answerList">
                            <div class="header_img">
                                <img :src="imgPath+item.face">
                            </div>
                            <div class="answer_name" v-text="item.nickname">

                            </div>
                            <div class="answer_time">
                                {{item.add_time | timeFilter}}
                            </div>
                        </div>
                        <div v-text="item.contents" style="word-wrap: break-word">
                        </div>
                        <div class="answerList_ren">
                            <span>{{item.true_name}}|{{item.expertise}}</span>
                            <!--<span v-text=""></span><span v-text="">阿里巴巴丨注册税务师、高级会计师、高级经济师、答会计税务师</span>-->
                        </div>
                    </li>
                </ul>

            </div>
        </div>
        <div class="fine_goods_page">
            <el-pagination
                background
                layout="prev, pager, next, jumper, total"
                :total="pagination.total"
                :page-size="pagination.pageSize"
                :current-page.sync="pagination.currentPage"
                @current-change="changePage">
            </el-pagination>
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
    </div>
</template>

<script>
    import {Carousel, CarouselItem} from 'element-ui'
    import {Navigation, SearchInput, Banner,SelfModal} from '../../components/public'
    import api from '@/api/answerApi'
    import utils from '../../assets/js/utils';

    export default {
        name: "Question",
        components: {
            Navigation,
            SearchInput,
            Carousel,
            CarouselItem,
            Banner,
            SelfModal
        },
        data() {
            return {
                imgPath: utils.api,
                answerUserlist: [],
                pagination: {
                    pageSize: 10,
                    total: 2,
                    currentPage: 1
                },
                searchStr: '',
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                loginTip: false,
            }
        },
        methods: {
            search() {
                this.$router.push({name: 'answerSearch', params: {keyword: this.searchStr}})
            },
            changePage(page) {
                this.pagination.currentPage = page
                this.getanswer()
            },
            getanswer() {
                api.answerHomeList({
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize,
                    uid: this.userInfo.uid,
                }).then((res) => {
                    console.log(res.data.data)
                    this.answerUserlist = res.data.data,
                        this.pagination.total = res.data.total * 1 || 0
                })
            },
            //跳转详情 还是支付
            getAnswerDetails(item) {
                if (item.is_look === 1) {
                    this.$router.push({name: 'alreadyPaid', query: {id: item.id}})
                } else if (item.is_look === 0) {
                    this.$router.push({name: "answerDetails", query: {id: item.id}})
                }
            },
            goFast() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                this.$router.push({name: 'putQuestions'})
            },
            goSearch() {
                this.$router.push({name: 'searchExpert'})
            },

        },
        mounted() {
            this.getanswer()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .answer_page {
        .answer_search {
            margin: 20px 0;
        }
        .answer_fast {
            & > ul {
                @include panelUl(590px, 140px, '2n+1');
                & > li {
                    padding: 10px;
                    display: flex;
                }
                .img {
                    width: 120px;
                    text-align: center;
                    padding-top: 10px;
                }
                .text {
                    padding: 15px 10px;
                    .text_title {
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 50px;
                    }
                    .text_answer {
                        color: #999999;
                    }

                }

            }
        }
        .answer_mains {
            padding: 15px;
            .mains_title {
                border-bottom: 1px solid #f1f1f1;
                p {
                    padding-left: 15px;
                    border-left: 2px solid #f44336;
                }
            }
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
                                width: 100px;
                                padding-left: 10px;
                                height: 60px;
                                line-height: 60px;
                                font-weight: bold;
                            }
                            .answer_time {
                                color: #999999;
                                margin-left: 900px;
                            }
                        }
                        .answerList_ren {
                            margin-top: 10px;
                            span {
                                background: #303F9F;
                                padding: 4px 5px;
                                color: #fff;
                                border-radius: 4px;
                            }

                        }

                    }
                }
            }
        }
        .fine_goods_page {
            margin-top: 100px;
            text-align: center;
        }
        .login-tip {
            text-align: center;
            line-height: 55px;
        }
        .modal-btn {
            text-align: center;
            a {
                display: inline-block;
                padding: 5px 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
    }
</style>
