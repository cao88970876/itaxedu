<template>
    <div class="books-index">
        <div class="page-content">
            <navigation class="mt-20"></navigation>
            <search-input class="mt-20" v-model="keywords" @search="$router.push({name:'booksSearch',params: {keywords}})"></search-input>
            <banner type="4"></banner>
            <div class="classify">
                <dl class="clear">
                    <dt class="left">分类:</dt>
                    <dd class="left"
                        v-for="item in categories"
                        :class="{active: item.id===categoryId}"
                        v-text="item.name"
                        @click="setCategory(item)"></dd>
                </dl>
            </div>
            <div class="order-by clear mt-20">
                <div class="left order-item"><a :class="{active:orderBy===10}" @click="orderByList(10)">综合排序</a></div>
                <div class="left order-item"><a :class="{active:orderBy===4}" @click="orderByList(4)">销量优先</a></div>
                <div class="left order-item"><a :class="{active:orderBy===1}" @click="orderByList(1)">好评优先</a></div>
                <div class="left order-item">
                    <a :class="{active:orderBy===3}" @click="orderByList(2,1)" v-show="orderPrice">价格<span class="icon price-order"></span></a>
                </div>
                <div class="left order-item">
                    <a :class="{active:orderBy===2}" @click="orderByList(3,1)" v-show="!orderPrice">价格<span class="icon price-order"></span></a>
                </div>
            </div>
            <div class="book-list clear">
                <book-item class="left" v-for="item in dataList" :key="item.id" :book-item="item"></book-item>
            </div>
            <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {Navigation, SearchInput, Banner, BookItem, Pagination, AppFooter} from '../../components/public'
    import {contentApi, categoryApi} from '../../api'

    export default {
        name: "books-index",
        components: {Navigation, SearchInput, Banner, BookItem, Pagination, AppFooter},
        data() {
            return {
                categories: [],
                categoryId: -1,
                pageInfo: {
                    total: 0,
                    pageSize: 8,
                    currentPage: 1,
                },
                orderBy: 10,
                orderPrice: true,
                dataList: [],
                keywords: '',
            }
        },
        mounted() {
            this.userInfo = this.$helper.utils.storage.get('user')
            categoryApi.categoryList().then(resp => {
                this.categories = resp.data.data
                this.categories.unshift({id: '', name: '推荐'})
                this.categoryId = this.categories[0].id
                this.getList()
            })
        },
        methods: {
            getList() {
                let params = {
                    category_id: this.categoryId,
                    type: this.orderBy,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }
                if (this.$helper.utils.storage.get('userInfo')) {
                    params.uid = this.$helper.utils.storage.get('userInfo').uid
                }
                contentApi.getBookList(params).then(resp => {
                    this.dataList = resp.data.data
                    this.pageInfo.total = resp.data.total || 0
                })
            },
            setCategory(obj) {
                if (obj.id === this.categoryId) return
                this.categoryId = obj.id
                this.orderBy = 1
                this.getList()
            },
            changePage(num) {
                this.pageInfo.currentPage = num
                this.getList()
            },
            orderByList(type, flag) {
                if (this.orderBy === type) return
                this.orderBy = type
                if (flag) {
                    this.orderPrice = !this.orderPrice
                } else {
                    this.orderPrice = true
                }
                this.getList()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixin";

    .books-index {
        .book-list {
            .book-item {
                @include dataItem('4n+1')
            }
        }

        .classify {
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
