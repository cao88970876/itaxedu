<template>
    <div class="video-course">
        <!--导航-->
        <navigation class="mt-20"></navigation>
        <!--搜索-->
        <search-input class="mt-20" v-model="keywords" @search="search"></search-input>

        <div class="course-type clear mt-20">
            <router-link class="left" :to="{name: 'videoCourse'}">录播课</router-link>
            <router-link class="left" :to="{name: 'liveCourse'}">直播课</router-link>
            <router-link class="left" :to="{name: 'downlineCourse'}">线下课</router-link>
            <router-link class="left" :to="{name: 'robotCourse'}">机器人专区</router-link>
             <router-link class="left" :to="{name: 'zjLink'}">专家连线</router-link>
        </div>
        <!--轮播-->
        <banner type="3"></banner>

        <div style="padding:20px 0;text-align:center">
              <img onclick='alert("请使用机器人或者APP进行专家通话")' style='height:210px' src='../../assets/image/zjlx.png' />  
              <h2 style="font-size:18px;">请使用机器人或者APP进行专家通话</h2>
        </div>

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
                    currentPage: 1
                },
                // 平台分类
                categories: [],
                categoryId: '',
                type: 10,
            }
        },
        mounted() {
            // 分类
           
        },
        methods: {
          
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
