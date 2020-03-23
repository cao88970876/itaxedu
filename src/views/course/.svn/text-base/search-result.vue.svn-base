<template>
    <div class="search-result page-content">
        <search-input v-model="searchStr" @search="getList"></search-input>
        <div class="icon search-null" v-show="dataList.length===0"></div>
        <div class="data-list clear">
            <course-item class="left" v-for="item in dataList" :key="item.id" :course-item="item"></course-item>
        </div>
        <pagination :pageInfo="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {SearchInput, CourseItem, Pagination} from '../../components/public'
    import {indexApi} from '../../api'

    export default {
        name: "search-result",
        components: {SearchInput, CourseItem, Pagination},
        data() {
            return {
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                searchStr: '',
                dataList: [],
                pageInfo: {
                    pageSize: 16,
                    total: 0,
                    currentPage: 1
                },
            }
        },
        mounted() {
            this.searchStr = this.$route.params.searchStr;
            this.getList();
        },
        methods: {
            getList() {
                indexApi.search({
                    uid: this.userInfo.uid,
                    type: 1,
                    keywords: this.searchStr,
                    course_type: this.$route.params.type * 1,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.dataList = resp.data.data;
                        this.pageInfo.total = resp.data.total * 1;
                    } else {
                        this.dataList = [];
                        this.pageInfo.total = 0;
                        this.$message({
                            message: resp['msg'],
                            type: 'error'
                        });
                    }
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page;
                this.getList();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .search-result {
        .search-null {
            display: block;
            width: 302px;
            height: 190px;
            margin: 200px auto;
        }
    }
</style>
