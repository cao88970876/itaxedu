<template>
    <div class="searchProjcet_page page-content">
        <div>
            <search-input v-model="keyword" @search="getSearchList"></search-input>
        </div>
        <div class="planning_mains">
            <ul class="clear">
                <li class="left clear" v-for="item in projects" :key="item.id" @click="$router.push({name: 'projectDetails',query:{id:item.id},params: {id: item.id}})">
                    <div class="project-img left"><img :src="imgPath+item.cover_img"></div>
                    <div class="project-info right">
                        <div class="name" v-text="item.name"></div>
                        <div class="address" v-text="item.address">项目地址：全国各地（待定）</div>
                        <div class="time">项目时间： {{item.start_time | timeFilter}}~{{item.end_time | timeFilter}}</div>
                        <div class="date">报名截止日期：{{item.end_time | timeFilter}}</div>
                        <div class="teacher">讲师:{{item.lecturer_data}}</div>
                        <div class="price clear">
                            <span class="old-price money" v-text="item.price"></span>
                            <span class="current-price money" v-text="item.discounts_price"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="icon search-null"  v-if="!projects.length"></div>
        <div class="planning_page" v-if="projects.length">
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
    import api from '@/api/projectApi'
    import utils from '../../assets/js/utils';
    import searchInput from '../../components/public/searchInput'
    export default {
        name: "search-projcet",
        components: {
            searchInput,
        },
        data(){
            return{
                imgPath: utils.api,
                keyword:'',
                projects:[],
                pagination: {
                    pageSize: 10,
                    total: 2,
                    currentPage: 1
                },
            }
        },
        mounted(){
            //接收搜索传过来的
            this.keyword = this.$route.params.keyword
            this.getProject()
        },
        methods:{
            getProject(){
                api.projectDetailsList({
                    keywords:this.keyword,
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize,
                }).then((res)=>{
                    //console.log("搜索",res.data)
                    this.projects = res.data.data;
                    this.pagination.total = res.data.total * 1 || 0
                    this.courseList = res.data.data
                })
            },
            changePage(page) {
                this.pagination.currentPage = page
                this.getProject()
            },
            getSearchList(){
                this.getProject()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";
    .searchProjcet_page{
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
                    overflow: hidden;
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
        .planning_page{
            margin-top: 20px;
            text-align: center;
        }
    }

</style>
