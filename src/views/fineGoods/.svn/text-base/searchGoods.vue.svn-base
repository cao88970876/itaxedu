<template>
    <div class="searchGoods page-content">
        <div class="goodsDetailed_search">
            <search-input v-model="keyword" @search="search"></search-input>
        </div>
        <div class="fine-goods_clear">
            <ul class="clear">
                <li class="left" v-for="item in goodsList" :key="item.id"
                    @click="$router.push({name: 'goodsDetailed',query:{id:item.id}})">
                    <div class="goods-img"><img :src="imgPath+item.cover_img" alt=""></div>
                    <div class="goods-info">
                        <div class="name" v-text="item.name"></div>
                        <div class="current-price  money" v-text="item.price"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="icon search-null"  v-if="!goodsList.length"></div>
        <div class="search_goods_page" v-if="goodsList.length">
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
    import api from '@/api/goodsApi'
    import utils from '../../assets/js/utils';
    import searchInput from '../../components/public/searchInput'

    export default {
        name: "search_goods",
        components: {
            searchInput,
        },
        data() {
            return {
                keyword: '',
                goodsList: [],
                imgPath: utils.api,
                //分页
                pagination: {
                    pageSize: 10,
                    total: 2,
                    currentPage: 1
                },
            }
        },
        mounted() {
            this.keyword = this.$route.params.keyword
            this.getList()
        },
        methods: {
            getList() {
                api.getList({
                    name: this.keyword,
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize,
                }).then((res) => {
                    this.goodsList = res.data.data
                    this.pagination.total = res.data.total * 1 || 0
                    this.courseList = res.data.data
                    console.log("wqe qweased", this.pagination.total)
                })
            },
            //分页
            changePage(page) {
                this.pagination.currentPage = page
                this.getList()
            },
            search() {
                this.getList()
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .searchGoods {
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
        .fine-goods_clear {
            & > ul {
                @include panelUl(285px, 360px, '4n+1');
                .goods {
                    &-img {
                        height: 285px;
                        background-color: #ccc;
                        img {
                            @include size(100%, 100%);
                        }
                    }
                    &-info {
                        padding: 10px;
                        .name {
                            margin-bottom: 6px;
                        }
                    }
                }
            }

        }
        .search_goods_page {
            text-align: center;
            margin: 30px;
        }
    }


</style>
