<template>
    <div class="live-course">
        <!--导航-->
        <navigation class="mt-20"></navigation>
        <!--搜索-->
        <search-input class="mt-20" v-model="keywords" @search="search"></search-input>

        <div class="course-type clear mt-20 mb-20">
            <router-link class="left" @click.native="removePageIndex()" :to="{name: 'videoCourse'}">录播课</router-link>
            <router-link class="left" @click.native="removePageIndex()" :to="{name: 'liveCourse'}">直播课</router-link>
            <router-link class="left" @click.native="removePageIndex()" :to="{name: 'downlineCourse'}">线下课</router-link>
            <router-link class="left" @click.native="removePageIndex()" :to="{name: 'robotCourse'}">机器人专区</router-link>
            <router-link class="left" @click.native="removePageIndex()" :to="{name: 'zjLink'}">专家连线</router-link>
        </div>
        <!--轮播-->
        <banner type="3"></banner>

        <div class="classify clear mt-10">
            <dl class="clear left">
                <dt class="left">分类:</dt>
                <dd class="left" v-for="item in categories" :class="{active: item.id===categoryId}" v-text="item.name" @click="setCategory(item)"></dd>
            </dl>
            <dl class="clear right">
                <dt class="left">状态:</dt>
                <dd class="left" @click="setLiveStatus(2)" :class="{active: liveStatus===2}">直播中</dd>
                <dd class="left" @click="setLiveStatus(1)" :class="{active: liveStatus===1}">未开始</dd>
                <dd class="left" @click="setLiveStatus(3)" :class="{active: liveStatus===3}">已结束</dd>
            </dl>
        </div>

        <div class="order-by clear mt-20">
            <div class="left order-item"><a :class="{active:type===10}" @click="setOrder(10)">综合排序</a></div>
            <div class="left order-item"><a :class="{active:type===4}" @click="setOrder(4)">销量优先</a></div>
            <div class="left order-item"><a :class="{active:type===1}" @click="setOrder(1)">好评优先</a></div>
            <div class="left order-item">
                <a :class="{active:type===2||type===3}" @click="setOrder(type===2?3:2)">价格</a>
                <span class="icon price-order"></span>
            </div>
        </div>

        <div class="course-list clear">
            <course-item class="left" v-for="item in dataList" :key="item.id" :course-item="item"></course-item>
        </div>
        <pagination :pageInfo="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {Navigation, SearchInput, Banner, CourseItem, Pagination} from '../../components/public'
    import {categoryApi, contentApi} from '../../api'

    export default {
        name: "live-course",
        components: {Navigation, SearchInput, Banner, CourseItem, Pagination,},
        data() {
            return {
                keywords: '',
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                dataList: [],
                pageInfo: {
                    total: 0,
                    pageSize: 8,
                    currentPage: this.$helper.utils.storage.get('PageIndex') || 1
                },
                // 平台分类
                categories: [],
                categoryId: '',
                liveStatus: 2,
                type: 10,
            }
        },
        mounted() {
            categoryApi.categoryList().then(resp => {
                if (resp.status===1) {
                    this.categories = resp.data.data;
                    this.categories.unshift({id: '', name: '推荐'});
                } else {
                    this.$message({
                        message: resp['msg'],
                        type: 'error'
                    });
                }
            });
            this.getList();
        },
        methods: {
            getList() {
                contentApi.courseList({
                    uid: this.userInfo.uid,
                    category_id: this.categoryId,
                    cat: 1,
                    type: this.type,
                    live_status: this.liveStatus,
                    page: this.$helper.utils.storage.get('PageIndex') || this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.pageInfo.total = resp.data.total * 1;
                        this.dataList = resp.data.data;
                    } else {
                        this.dataList = [];
                        this.pageInfo.total = 0;
                        this.$message({
                            message: resp['msg'],
                            type: 'error'
                        });
                    }
                });
            },
            changePage(page) {
                this.$helper.utils.storage.set('PageIndex',page);
                this.pageInfo.currentPage = page;
                this.getList();
            },
            setCategory(obj) {
                if (obj.id === this.categoryId) return;
                this.categoryId = obj.id;
                this.getList();
            },
            setOrder(type) {
                if (this.type === type) return;
                this.type = type;
                this.getList();
            },
            setLiveStatus(liveStatus) {
                if (this.liveStatus === liveStatus) return;
                this.liveStatus = liveStatus
                this.getList()
            },
            search() {
                this.$router.push({name: 'courseSearch', params: {type: 1, searchStr: this.keywords}});
            },
            removePageIndex() {
                sessionStorage.removeItem('PageIndex');
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .live-course {

        & > div.classify {
            color: #bac3ff;
            font-size: 14px;
            margin-top: 10px;

            dl {
                background-color: #303f9f;
                border-radius: 10px;
                margin: 0;
                width: 590px;

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

        .order-by {
            background-color: #f1f1f1;

            .icon {
                @include size(8px, 14px);
                vertical-align: text-bottom;
                display: inline-block;
            }

            .order-item {
                line-height: 40px;
                margin: 0 20px;

                & > a {
                    color: #666;
                    cursor: pointer;

                    &.active {
                        color: #f44336;
                    }
                }
            }
        }
    }
</style>
