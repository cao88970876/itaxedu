<template>
    <div class="unanswered_page page-content">
        <!--导航-->
        <div>
            <navigation></navigation>
        </div>
        <!--搜索-->
        <div class="answer_search">
            <search-input></search-input>
            <!--@search="search"-->
        </div>
        <div>
            <banner type="6"></banner>
        </div>
        <div class="answer_fast">
            <ul class="clear">
                <li class="left clear" @click="$router.push({name: 'putQuestions'})">
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
                <li class="left clear" @click="$router.push({name: 'searchExpert'})">
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

        <div class="answer_type">
            <div @click="unanswer(type=0)" :class="{active:type===0}">未解答</div>
            <div @click="getAnswerList(type=1)" :class="{active:type===1}">已解答</div>
        </div>
        <div class="answer_problem" v-if="type===0">
            <ul>
                <li v-for="item in expertList" :key="item.id"
                    @click="$router.push({name:'unansweredDetails',query:{id:item.id}})">
                    <div class="answerList">
                        <div class="header_img">
                            <img :src="imgPath+item.face">
                        </div>
                        <div class="answer_name" v-text="item.true_name">
                        </div>
                        <div class="answer_time">
                            {{item.add_time | timeFilter}}
                        </div>
                    </div>
                    <div v-text="item.contents" class="break-word">
                    </div>
                    <div class="answerList_price money" v-text="item.money">
                    </div>
                </li>
            </ul>
        </div>
        <div class="alreadyAnswer" v-if="type===1">
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
                    <div v-text="item.contents" class="break-word">
                    </div>
                    <div class="answerList_ren">
                        <span v-text="item.expertise">阿里巴巴丨注册税务师、高级会计师、高级经济师、答会计税务师</span>
                    </div>
                </li>
            </ul>
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
    </div>
</template>
<script>
    import {Navigation, SearchInput, Banner} from '../../components/public'
    import {Carousel, CarouselItem} from 'element-ui'
    import api from '@/api/answerApi'
    import utils from '../../assets/js/utils';

    export default {
        name: "unanswered",
        components: {
            Navigation,
            SearchInput,
            Carousel,
            CarouselItem,
            Banner,
        },
        data() {
            return {
                imgPath: utils.api,
                expertList: [],
                pagination: {
                    pageSize: 10,
                    total: 2,
                    currentPage: 1
                },
                type: 0,
                answerUserlist: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        mounted() {
            this.getList(0)
        },
        methods: {
            getList(code) {
                api.unanswerList({
                    status: code,
                }).then((res) => {
                    this.expertList = res.data.data
                    this.pagination.total = res.data.total * 1 || 0
                    // console.log(res.data.data)
                })
            },
            changePage(page) {
                this.pagination.currentPage = page;
                if (this.type === 0) {
                    this.getList();
                } else {
                    this.getAnswerList()
                }

            },
            //点击分类
            unanswer(obj) {
                //console.log('参数', obj)
                this.getList(obj)
            },
            getAnswerList() {
                api.answerHomeList({
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize,
                    uid: this.userInfo.uid,
                }).then((res) => {
                    console.log("已解答列表", res.data.data)
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
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .unanswered_page {
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
        .answer_type {
            margin-top: 20px;
            display: flex;
            color: #999999;
            padding-bottom: 10px;
            border-bottom: 2px solid #f1f1f1;
            div {
                margin-right: 10px;
                border-left: 2px solid #999999;
                padding-left: 5px;
                cursor: pointer;
            }
            .active {
                border-left: 2px solid #f44336;
                font-weight: bold;
                color: #333;
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
                    .answerList_price {
                        margin-top: 10px;
                        color: #f44336;

                    }

                }
            }
        }
        .alreadyAnswer {
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
        .fine_goods_page {
            margin-top: 100px;
            text-align: center;
        }
    }
</style>
