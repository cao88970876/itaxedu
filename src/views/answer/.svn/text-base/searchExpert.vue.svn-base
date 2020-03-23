<template>
    <div class="searchExpert_page page-content">
        <!--搜索-->
        <div>
            <!--@search="search"-->
            <search-input></search-input>
        </div>
        <!--导航-->
        <div class="searchExpert_nav">
            <navigation></navigation>
        </div>

        <div class="carousel">
            <banner type="6"></banner>
        </div>
        <div class="planning_sort">
            <div class="left order-item"><a :class="{active:type===1}" @click="typeSolt(1)">问答优先</a></div>
            <div class="left order-item"><a :class="{active:type===2}" @click="typeSolt(2)">热门优先</a></div>
            <div class="left order-item">
                <a :class="{active:type===3||type===4}" @click="typeSolt(type===3?4:3)">价格</a>
                <span class="icon price-order"></span>
            </div>

        </div>
        <div class="searchExpert_mains">
            <ul class="clear">
                <li class="left pointer" v-for="item in expert" :key="item.uid"
                    @click="$router.push({name: 'expertDetails',query:{id:item.uid}})">
                    <div class="header_img">
                        <img :src="imgPath+item.face">
                    </div>
                    <div>
                        <span v-text="item.true_name"></span><span>·</span><span v-text="item.experts_type"></span>
                    </div>
                    <div v-text="item.expertise" class="answer_expertise">

                    </div>
                    <div class="answer_cishu">
                        <div class="left">{{item.answer_num}}次回答</div>
                        <div class="right">
                            <span class="money" v-text="item.quiz_discount_price"></span>
                            <del></del>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="planning_page">
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
        name: "search-expert",
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
                expert: [],
                //分页
                pagination: {
                    pageSize: 10,
                    total: 1,
                    currentPage: 1
                },
                type: 1,
            }
        },
        methods: {
            // jump(item) {
            //     this.$router.push({name: 'expertDetails', query: {id: item.id}})
            // },
            changePage(page) {
                this.pagination.currentPage = page
                this.getExpertList()
            },
            getExpertList() {
                api.expertList({
                    orderby: this.type,
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize,
                }).then((res) => {
                    console.log(res.data)
                    this.pagination.total = res.data.total * 1 || 0,
                        this.courseList = res.data.data
                    this.expert = res.data.data
                })
            },
            typeSolt(type) {
                if (this.type === type) return;
                this.type = type;
                this. getExpertList()
            }
        },
        mounted() {
            this.getExpertList()
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .searchExpert_page {
        .searchExpert_nav {
            margin-top: 20px;
        }
        .carousel {
            margin-top: 20px;
        }
        .planning_sort {
            margin-top: 10px;
            width: 100%;
            height: 40px;
            background: #F1F1F1;
            border-radius: 8px;
            display: flex;
            font-size: 12px;
            line-height: 40px;
            & div {
                margin-left: 20px;
            }
            .active {
                color: #F44336;
            }
        }
        .searchExpert_mains {
            ul {
                @include panelUl(285px, 190px, '4n+1');
                li {
                    padding: 10px;
                    .header_img {
                        width: 70px;
                        height: 70px;

                        margin: 15px auto;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            object-fit: cover;
                        }
                    }
                    div {
                        text-align: center;
                        margin-bottom: 10px;
                        span {
                            margin-right: 10px;
                        }
                    }
                    .answer_expertise {
                        height: 16px;
                    }
                    .answer_cishu {
                        span {
                            color: #f44336;
                            font-weight: bold;
                            margin-right: 5px;
                        }
                        del {
                            color: #999999;
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
