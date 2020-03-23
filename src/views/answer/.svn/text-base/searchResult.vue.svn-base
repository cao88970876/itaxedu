<template>
    <div class="searchResult_page page-content">
        <!--搜索-->
        <div class="search">
            <!--@search="search"-->
            <search-input></search-input>
        </div>
        <div class="answer_problem">
            <ul>
                <li v-for="item in answerUserlist">
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
    import api from '@/api/answerApi'
    import utils from '../../assets/js/utils';
    import searchInput from '../../components/public/searchInput'
    export default {
        name: "search-result",
        components: {
            searchInput,
        },
        data(){
            return{
                keyword:'',
                pagination: {
                    pageSize: 10,
                    total: 1,
                    currentPage: 1
                },
                imgPath: utils.api,
                answerUserlist: [],
            }
        },
        mounted(){
            this.keyword = this.$route.params.keyword
            this.getanswer()
        },
        methods:{
            changePage(page) {
                this.pagination.currentPage = page
                this.getanswer()
            },
            getanswer() {
                api.answerHomeList({
                    keywords:this.keywords,
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize,
                }).then((res) => {
                    console.log(res.data)
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
    .searchResult_page{
        .search{
            margin-top: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #f1f1f1;
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
