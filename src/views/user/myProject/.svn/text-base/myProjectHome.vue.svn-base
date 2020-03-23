<template>
    <div class="myProjectHome_page">
        <div class="title">
            我的项目
        </div>
        <div class="planning_mains">
            <ul class="clear">
                <li class="left clear" v-for="item in myProject" @click="$router.push({name: 'myProjectDetails',query:{id:item.id}})">
                    <div class="project-img left">
                        <img :src="imgPath+item.cover_img">
                    </div>
                    <div class="project-info right">
                        <div class="name" v-text="item.name"></div>
                        <div class="address">项目地址：<span v-text="item.address"></span></div>
                        <div class="time">项目时间：{{item.start_time | timeFilter('M月D日')}}~{{item.end_time |
                            timeFilter('M月D日')}}
                        </div>
                        <div class="date">报名截止日期：{{item.end_time | timeFilter('Y年M月D日')}}</div>
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
        <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {myTaskApi} from '../../../api' //接口是写在 任务悬赏里面的
    import utils from '../../../assets/js/utils';
    import {Pagination} from "../../../components/public";
    export default {
        name: "my-project-home",
        components: {Pagination},
        data() {
            return {
                imgPath: utils.api,
                myProject: [],
                pageInfo: {
                    pageSize: 10,
                    total: 1,
                    currentPage: 1
                },
            }
        },
        mounted() {
            this.getProjectList()
        },
        methods: {
            getProjectList(){
                myTaskApi.getMyProject({
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then((res) => {
                    if (res.status === 1) {
                        console.log(res.data)
                        this.myProject = res.data.data
                        this.pageInfo.total = res.data.total * 1 || 0
                    }
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                this.getProjectList()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .myProjectHome_page {
        .title {
            padding: 15px 20px;
            font-size: 18px;
            color: #666666;
            border-bottom: 1px solid #f1f1f1;
        }
        .planning_mains {
            padding: 0 20px;
            & > ul {
                @include panelUl(498px, 190px, '2n+1');
                & > li {
                    padding: 10px;
                }
                .project-img {
                    width: 240px;
                    height: 100%;
                    border-radius: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .project-info {
                    width: 227px;
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
                        margin-top: 3px;
                    }
                }
            }
        }
    }
</style>
