<template>
    <div class="special-index">
        <navigation class="mt-20"></navigation>
        <search-input class="mt-20" v-model="keywords" @search="$router.push({name:'specialSearch',params: {keywords}})"></search-input>
        <banner type="2"></banner>

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
            <div class="left order-item"><a :class="{active:orderBy===5}" @click="orderByList(5)">销量优先</a></div>
            <div class="left order-item"><a :class="{active:orderBy===4}" @click="orderByList(4)">好评优先</a></div>
            <div class="left order-item">
                <a :class="{active:orderBy===3}" @click="orderByList(2,1)" v-show="orderPrice">价格<span class="icon price-order"></span></a>
            </div>
            <div class="left order-item">
                <a :class="{active:orderBy===2}" @click="orderByList(3,1)" v-show="!orderPrice">价格<span class="icon price-order"></span></a>
            </div>
        </div>

        <div class="special-list clear">
            <special-item class="left" v-for="item in dataList" :key="item.id" :special-item="item"></special-item>
        </div>
        <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {Navigation, SearchInput, Banner, SpecialItem, Pagination} from '../../components/public'
    import {contentApi, categoryApi} from '../../api'

    export default {
        name: "special-index",
        components: {Navigation, SearchInput, Banner, SpecialItem, Pagination},
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
                contentApi.getSpecialList(params).then(resp => {
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
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .special-index {
        .special-list {
            .special-item {
                @include dataItem('2n+1')
            }
        }

        & > div.classify {
            color: #bac3ff;
            font-size: 14px;
            margin-top: 10px;

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

        & > .order-by {
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
                    user-select: none;

                    &.active {
                        color: #f44336;
                    }
                }
            }
        }
    }
</style>
