<template>
    <div class="video-course">
        <!--导航-->
        <navigation class="mt-20"></navigation>
        <!--搜索-->
        <search-input class="mt-20" v-model="keywords" @search="search"></search-input>

        <div class="course-type clear mt-20">
            <router-link class="left" @click.native="removePageIndex()" :to="{name: 'videoCourse'}">录播课</router-link>
            <router-link class="left" @click.native="removePageIndex()" :to="{name: 'liveCourse'}">直播课</router-link>
            <router-link class="left" @click.native="removePageIndex()" :to="{name: 'downlineCourse'}">线下课</router-link>
            <router-link class="left" @click.native="removePageIndex()" :to="{name: 'robotCourse'}">机器人专区</router-link>
            <router-link class="left" @click.native="removePageIndex()" :to="{name: 'zjLink'}">专家连线</router-link>
        </div>
        <!--轮播-->
        <banner type="3"></banner>

        <div class="classify mt-10">
            <dl class="clear">
                <dt class="left">分类:</dt>
                <dd class="left" v-for="item in categories" :class="{active: item.id===categoryId}" v-text="item.name" @click="setCategory(item)"></dd>
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

        <div class="data-list clear">
            <course-item class="left" v-for="item in dataList" :key="item.id" :course-item="item"></course-item>
        </div>
        <pagination :pageInfo="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {Navigation, SearchInput, Banner, CourseItem, Pagination,} from '../../components/public'
    import {categoryApi, contentApi} from '../../api'

    export default {
        name: "video-course",
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
                type: 10,
            }
        },
        mounted() {
            // 分类
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
                let uid = this.userInfo.uid ? 4132 : '';
                contentApi.courseList({
                    uid: this.userInfo.uid,
                    user_id: uid,
                    category_id: this.categoryId,
                    cat: 2,
                    type: this.type,
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
            //分页
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
            search() {
                this.$router.push({name: 'courseSearch', params: {type: 2, searchStr: this.keywords}});
            },
            removePageIndex() {
                sessionStorage.removeItem('PageIndex');
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .video-course {

        & > div.classify {
            color: #bac3ff;
            font-size: 14px;

            dl {
                background-color: $fontColorBlue;
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
                        color: $fontColorRed;
                    }
                }
            }
        }
    }
</style>
