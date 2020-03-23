<template>
    <div class="answerSearch_page page-content">
        <div class="nav">
            <search-input @search="search" v-model="keyword"></search-input>
            <!--@search="search"-->
        </div>
        <div class="answerSearch_mains">
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
                    <div v-text="item.contents">

                    </div>
                    <div class="answerList_ren">
                        <span>{{item.true_name}}|{{item.expertise}}</span>
                        <!--<span v-text=""></span><span v-text="">阿里巴巴丨注册税务师、高级会计师、高级经济师、答会计税务师</span>-->
                    </div>
                </li>
            </ul>
        </div>
        <div class="icon search-null"  v-if="!answerUserlist.length"></div>
        <div class="planning_page" v-if="answerUserlist.length">
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
    import api from '@/api/answerApi'
    import searchInput from '../../components/public/searchInput'
    import utils from '../../assets/js/utils';

    export default {
        name: "answer-search",
        components: {
            searchInput,
        },
        data(){
            return{
                imgPath: utils.api,
                keyword:'',
                pagination: {
                    pageSize: 10,
                    total: 2,
                    currentPage: 1
                },
                answerUserlist: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },

        mounted(){
            this.keyword = this.$route.params.keyword
            this.getanswer()
        },
        methods:{
            search(){
                this.getanswer()
            },
            getAnswerDetails(item) {
                if (item.is_look === 1) {
                    this.$router.push({name: 'alreadyPaid', query: {id: item.id}})
                } else if (item.is_look === 0) {
                    this.$router.push({name: "answerDetails", query: {id: item.id}})
                }
            },
            changePage(page) {
                this.pagination.currentPage = page
                this.getanswer()
            },
            getanswer() {
                api.answerHomeList({
                    keywords:this.keyword,
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize,
                    uid: this.userInfo.uid,
                }).then((res) => {
                    console.log(res.data.data)
                    this.answerUserlist = res.data.data,
                        this.pagination.total = res.data.total * 1 || 0
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .answerSearch_page {
        .icon.search-null {
            background: url(../../assets/image/ic_33.png) no-repeat 50%;
            background-size: contain;
        }
        .search-null{
            display: block;
            width: 302px;
            height: 190px;
            margin: 200px auto;
        }
        .nav {
            margin-top: 20px;
        }
        .answerSearch_mains {
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
        .planning_page {
            margin-top: 20px;
            text-align: center;
        }
    }
</style>
