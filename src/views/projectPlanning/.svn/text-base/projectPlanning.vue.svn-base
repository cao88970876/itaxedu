<template>
    <div class="projectPlanning_page page-content">
        <!--导航-->
        <div>
            <navigation></navigation>
        </div>
        <!--搜索-->
        <div class="planning_search">
            <search-input @search="search" v-model="keyword"></search-input>
        </div>
        <!--轮播-->
        <div>
            <banner type="5"></banner>
        </div>
        <div class="planning_classification">
            <div class="classify">
                <dl class="clear">
                    <dt class="left">分类:</dt>
                    <dd class="left"
                        v-for="item in classifies"
                        :class="{active: item.classify_id===classify}"
                        v-text="item.name"
                        @click="setCategory(item)"
                    ></dd>
                </dl>
            </div>
        </div>
        <div class="planning_sort">
            <div class="left order-item"><a :class="{active:type===1}" @click="setOrder(1)">最新</a></div>
            <div class="left order-item"><a :class="{active:type===2}" @click="setOrder(2)">销量优先</a></div>
            <div class="left order-item">
                <a :class="{active:type===3||type===4}" @click="setOrder(type===3?4:3)">价格</a>
                <span class="icon price-order"></span>
            </div>
        </div>
        <div class="planning_mains">
            <ul class="clear">
                <li class="left clear" v-for="item in projects" :key="item.id"
                    @click="$router.push({name: 'projectDetails',query:{id:item.id}})">
                    <div class="project-img left"><img :src="imgPath+item.cover_img"></div>
                    <div class="project-info right">
                        <div class="name" v-text="item.name"></div>
                        <div class="address" v-text="item.address">项目地址：全国各地（待定）</div>
                        <div class="time">项目时间： {{item.start_time | timeFilter('Y年M月D日')}}~{{item.end_time |
                            timeFilter('Y年M月D日')}}
                        </div>
                        <div class="date">报名截止日期：{{item.apply_time | timeFilter('Y年M月D日')}}</div>
                        <div class="teacher">讲师：{{item.lecturer}}</div>
                        <div class="price clear">
                            <div v-if="item.discounts_price!=='0.00'">
                                <span class="old-price money" v-text="item.price"></span>
                                <span class="current-price money" v-text="item.discounts_price"></span>
                            </div>
                            <div class="current-price" v-else>免费</div>
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
    import {Carousel, CarouselItem} from 'element-ui'
    import {Navigation, SearchInput, Banner,} from '../../components/public'
    import api from '@/api/projectApi'
    import utils from '../../assets/js/utils';

    export default {
        name: "project-planning",
        components: {
            Carousel,
            CarouselItem,
            Navigation,
            SearchInput,
            Banner,
        },
        data() {
            return {
                imgPath: utils.api,
                //分类
                classifies: [],
                //
                classify_id: '',
                classify: '',
                type: 1,
                //项目详情
                projects: [],
                pagination: {
                    pageSize: 10,
                    total: 2,
                    currentPage: 1
                },
                keyword:'',
            }
        },
        methods: {
            search() {
                this.$router.push({name: 'searchProjcet',params: {keyword: this.keyword}})
            },
            //点击分类
            setCategory(obj) {
                if (obj.classify_id === this.classify) return
                this.classify = obj.classify_id
                this.getProject()
            },
            //项目详情
            getProject() {
                //console.log("ID",this.classify_id)
                api.projectDetailsList({
                    classify_id: this.classify,
                    orderby: this.type,
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize
                }).then((res) => {
                    console.log("商品详情", res.data)
                    this.projects = res.data.data
                    this.pagination.total = res.data.total * 1 || 0
                    this.courseList = res.data.data
                    //console.log(this.pagination.total)
                })
            },
            setOrder(type) {
                if (this.type === type) return;
                this.type = type;
                this.getProject()
            },
            changePage(page) {
                this.pagination.currentPage = page
                this.getProject()
            },
        },
        mounted() {
            //拿分类
            api.projectClassification().then((res) => {
                //拿到分类ID
                this.classifies = res.data.classify
                console.log("分类", res.data)
                this.classifies.unshift({classify_id: '', name: '推荐'})
            });
            this.getProject()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .projectPlanning_page {
        .planning_search {
            margin: 20px 0;
        }
        .planning_classification {
            margin-top: 10px;
            & > div.classify {
                color: #bac3ff;
                font-size: 14px;
                margin-top: 10px;

                dl {
                    background-color: #303f9f;
                    border-radius: 10px;
                    margin: 0;
                    dt, dd {
                        margin: 0 0 0 16px;
                        padding: 0;
                        line-height: 40px;
                    }
                    dd {
                        cursor: pointer;

                        &.active {
                            color: #fff;
                        }
                    }
                }
            }
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
        .planning_mains {
            & > ul {
                @include panelUl(590px, 180px, '2n+1');
                & > li {
                    padding: 10px;
                }
                .project-img {
                    width: 240px;
                    height: 100%;
                    background-color: #ccc;
                    border-radius: 10px;
                    object-fit: cover;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .project-info {
                    width: 315px;
                    .name {
                        font-size: 14px;
                        font-weight: bold;
                        margin-top: 3px;
                    }
                    .address {
                        margin-top: 13px;
                    }
                    .time, .date, .teacher {
                        margin-top: 10px;
                    }
                    .price {
                        margin-top: 13px;
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
