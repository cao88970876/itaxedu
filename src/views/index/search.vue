<template>
    <div class="search-page">
        <app-header></app-header>
        <div class="page-content">
            <search-input v-model="searchStr" @search="getList"></search-input>
            <ul class="search-page-nav clear">
                <li class="left" :class="{'active': type===1}" @click="setType(1,16)">课程</li>
                <li class="left" :class="{'active': type===2}" @click="setType(2,8)">专栏</li>
                <li class="left" :class="{'active': type===3}" @click="setType(3,16)">电子书</li>
                <li class="left" :class="{'active': type===4}" @click="setType(4,16)">商城</li>
                <li class="left" :class="{'active': type===5}" @click="setType(5,8)">问答</li>
                <li class="left" :class="{'active': type===6}" @click="setType(6,8)">项目</li>
            </ul>
            <div class="search-page-content data-list clear">
                <course-item class="left" v-for="item in dataList" :key="item.id" :course-item="item" v-if="type===1"></course-item>
                <special-item class="left" v-for="item in dataList" :key="item.id" :special-item="item" v-if="type===2"></special-item>
                <book-item class="left" v-for="item in dataList" :key="item.id" :book-item="item" v-if="type===3"></book-item>
                <goods-item class="left" v-for="item in dataList" :key="item.id" :goods-item="item" v-if="type===4"></goods-item>
                <answer-item class="left" v-for="item in dataList" :key="item.id" :answer-item="item" v-if="type===5" @click="$router.push({name: 'answerDetails', query: {id: item.id}})"></answer-item>
                <project-item class="left" v-for="item in dataList" :key="item.id" :project-item="item" v-if="type===6"></project-item>
            </div>
            <div class="icon search-null" v-show="!dataList"></div>
            <pagination :pageInfo="pageInfo" @change-page="changePage"></pagination>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {
        AppHeader, AppFooter, SearchInput, CourseItem, SpecialItem,
        BookItem, GoodsItem, ProjectItem, Pagination, AnswerItem,
    } from '../../components/public'
    import {indexApi} from '../../api'

    export default {
        name: "search",
        components: {
            AppHeader, AppFooter, SearchInput, CourseItem, SpecialItem,
            BookItem, GoodsItem, ProjectItem, Pagination, AnswerItem,
        },
        data() {
            return {
                type: 1,
                searchStr: '',
                pageInfo: {
                    total: 0,
                    pageSize: 16,
                    currentPage: 1,
                },
                dataList: [],
            }
        },
        mounted() {
            if (this['$route'].params && this['$route'].params.keywords) {
                this.searchStr = this['$route'].params.keywords;
            }
            this.getList();
        },
        methods: {
            getList() {
                this.dataList = [];
                indexApi.search({
                    keywords: this.searchStr,
                    type: this.type,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.pageInfo.total = resp.data.total * 1;
                        this.dataList = resp.data.data;
                    } else {
                        this.dataList = null;
                        this.pageInfo.total = 0
                        this['$message']({
                            message: resp['msg'],
                            type: 'error'
                        });
                    }
                });
            },
            changePage(page) {
                this.pageInfo.currentPage = page;
                this.getList();
            },
            setType(type, pageSize) {
                if (this.type === type) return;
                this.type = type;
                this.pageInfo.pageSize = pageSize;
                this.pageInfo.currentPage = 1;
                this.getList();
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .search-page {
        .page {
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }
        &-nav {
            list-style: none;
            margin-top: 10px;
            * {
                box-sizing: border-box;
            }

            & > li {
                width: 200px;
                text-align: center;
                line-height: 50px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;

                &.active {
                    color: $fontColorRed;
                    border-bottom: 3px solid $fontColorRed;
                }
            }
        }
        .search-null {
            display: block;
            width: 302px;
            height: 190px;
            margin: 200px auto;
        }
    }
</style>
