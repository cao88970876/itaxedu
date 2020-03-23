<template>
    <div class="searchFinanceTax_page page-content">
        <search-input class="mt-20" v-model="keywords" @search="getSearchList">
        </search-input>
        <div class="mains">
            <ul class="searchList">
                <li v-for="item in financeList" @click="$router.push({name:'financeTaxDetail',query:{id:item.id}})">
                    <div class="time">{{item.create_time | timeFilter}}</div>
                    <div v-text="item.title">
                    </div>
                </li>
            </ul>
        </div>
        <div class="icon search-null"  v-if="!financeList.length"></div>
        <div>
            <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
        </div>

    </div>
</template>

<script>
    import {SearchInput, Pagination} from '../../components/public'
    import {financeTaxAPi} from '../../api'
    import utils from '../../assets/js/utils';

    export default {
        name: "search-finance-tax",
        components: {SearchInput, Pagination},
        data() {
            return {
                keywords: '',
                financeList: [],
                pageInfo: {
                    pageSize: 10,
                    total: 1,
                    currentPage: 1
                },
            }
        },
        mounted() {
            this.keywords = this.$route.params.keywords;
            this.getSearch()
        },
        methods: {
            getSearchList() {
                this.getSearch()
            },
            getSearch() {
                financeTaxAPi.searchList({
                    keywords: this.keywords,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then((res) => {
                    console.log(res.data.data)
                    this.financeList = res.data.data
                    this.pageInfo.total = res.data.total * 1 || 0
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                this.getSearch()
            },
        }

    }
</script>

<style lang="scss" scoped>
    .searchFinanceTax_page {
        .mains {
            min-height: 400px;
            .searchList {
                li {
                    padding: 10px 0;
                    border-bottom: 1px solid #f1f1f1;
                    .time {
                        color: #999999;
                        margin-bottom: 15px;
                    }

                }
            }
        }
        .search-null{
            display: block;
            width: 302px;
            height: 190px;
            margin: 200px auto;
        }
    }
</style>
