<template>
    <div class="special-search">
        <search-input class="mt-20" v-model="keywords" @search="search"></search-input>
        <div class="icon search-null" v-show="dataList.length===0"></div>
        <div class="data-list clear">
            <special-item class="left" v-for="item in dataList" :key="item.id" :special-item="item"></special-item>
        </div>
        <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {SearchInput, SpecialItem, Pagination} from '../../components/public'
    import {indexApi} from '../../api'

    export default {
        name: "special-search",
        components: {SearchInput, SpecialItem, Pagination},
        data() {
            return {
                keywords: '',
                pageInfo: {
                    total: 0,
                    pageSize: 8,
                    currentPage: 1,
                },
                dataList: []
            }
        },
        mounted() {
            this.keywords = this.$route.params.keywords || ''
            this.getList()
        },
        methods: {
            getList() {
                let params = {
                    keywords: this.keywords,
                    type: 2,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }
                if (this.$helper.utils.storage.get('userInfo')) {
                    params.uid = this.$helper.utils.storage.get('userInfo').uid
                }
                indexApi.search(params).then(resp => {
                    this.dataList = resp.data.data
                    this.pageInfo.total = resp.data.total || 0
                })
            },
            changePage(num) {
                this.pageInfo.currentPage = num
                this.getList()
            },
            search() {
                this.pageInfo.currentPage = 1
                this.getList()
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixin";

    .special-search {
        .search-null {
            display: block;
            width: 302px;
            height: 190px;
            margin: 200px auto;
        }
    }
</style>
