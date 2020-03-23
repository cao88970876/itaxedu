<template>
    <div class="fine_goods page-content">
        <!--导航-->
        <div>
            <navigation></navigation>
        </div>
        <!--搜索-->
        <div class="fine-goods_search">
            <search-input @search="search" v-model="searchStr"></search-input>
            <div class="goods_cats" @click="goCartsPage">
                购物车
            </div>
            <div class="goods_cats_num" v-text="goodsCartList.length" v-if="goodsCartList.length>0"></div>
        </div>
        <!--轮播-->
        <div>
            <banner type="1"></banner>
        </div>
        <div class="classify">
            <dl class="clear">
                <dt class="left">分类:</dt>
                <dd class="left" v-for="item in classifies" :class="{active: item.classify_id===currentClassifyId}"
                    v-text="item.name" @click="setCategory(item)"></dd>
            </dl>
        </div>
        <div class="fine-goods_sort">
            <!--<div class="left order-item"><a :class="{active:orderBy===1}" @click="orderByList(1)">综合排序</a></div>-->
            <div class="order-by clear">
                <div class="left order-item"><a :class="{active:!type}" @click="setOrder(null)">综合排序</a></div>
                <div class="left order-item"><a :class="{active:type===1}" @click="setOrder(1)">销量优先</a></div>
                <div class="left order-item"><a :class="{active:type===2}" @click="setOrder(2)">好评优先</a></div>
                <div class="left order-item">
                    <a :class="{active:type===3||type===4}" @click="setOrder(type===3?4:3)">价格</a>
                    <span class="icon price-order"></span>
                </div>
            </div>
        </div>
        <div class="fine-goods_clear">
            <ul class="clear">
                <li class="left" v-for="item in goods"
                    @click="$router.push({name: 'goodsDetailed',query:{id:item.id},params: {id: item.id}})">
                    <div class="goods-img"><img :src="imgPath+item.cover_img" alt=""></div>
                    <div class="goods-info">
                        <div class="name" v-text="item.name"></div>
                        <div class="current-price money" v-text="item.discounts_price"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="fine_goods_page">
            <el-pagination
                background
                layout="prev, pager, next, jumper, total"
                :total="pagination.total"
                :page-size="pagination.pageSize"
                :current-page.sync="pagination.currentPage"
                @current-change="changePage">
            </el-pagination>
        </div>
        <self-modal :show.sync="loginTip">
            <div class="pb-30">
                <div class="login-tip">欢迎来到中财讯</div>
                <div class="modal-btn">
                    <a class="pointer" @click="$router.push({name: 'login'})">去登录</a>
                    <a class="pointer ml-20" @click="loginTip=false">先看看</a>
                </div>
            </div>
        </self-modal>
    </div>
</template>

<script>
    import {Carousel, CarouselItem} from 'element-ui'
    import {Navigation, SearchInput, Banner, SelfModal} from '../../components/public'
    import api from '@/api/goodsApi'
    import utils from '../../assets/js/utils';

    export default {
        name: "fineGoods",
        components: {
            Carousel,
            CarouselItem,
            Navigation,
            SearchInput,
            Banner,
            SelfModal
        },
        data() {
            return {
                loginTip: false,
                imgPath: utils.api,
                classifies: [],
                classify_id: [],
                currentClassifyId: '',
                goods: [],
                //分页
                pagination: {
                    pageSize: 12,
                    total: 1,
                    currentPage: 1
                },
                //搜索
                searchStr: '',
                //分类
                type: null,
                orderPrice: true,
                goodsCartList: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        methods: {
            //搜索
            search() {
                this.$router.push({name: 'searchGoods', params: {keyword: this.searchStr}})
            },
            //传入id拿商品数据
            getgoods() {
                console.log(this.type)
                console.log("分类", this.currentClassifyId)
                api.getList({
                    classify_id: this.currentClassifyId,
                    orderby: this.type,
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize
                }).then(res => {
                    this.goods = res.data.data
                    console.log(res.data)
                    this.pagination.total = res.data.total * 1 || 0
                    console.log("分页", this.pagination.total)
                    this.courseList = res.data.data
                })
            },
            //分类
            setCategory(obj) {
                if (obj.classify_id === this.currentClassifyId) return
                this.currentClassifyId = obj.classify_id
                this.getgoods()
            },
            //分页
            changePage(page) {
                this.pagination.currentPage = page
                this.getgoods()
            },
            setOrder(type) {
                if (this.type === type) return;
                this.type = type;
                this.getgoods();
            },
            getGoodsCarts() {
                if(!this.userInfo.uid){
                    return false
                } else {
                    api.goodsCarts().then((res) => {
                        if (res.status === 1) {
                            console.log(res.data)
                            this.goodsCartList = res.data.data
                        }
                    })
                }
            },
            goCartsPage() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return false
                }
                this.$router.push({name: 'shoppingCarts'})
            }
        },

        //获取商品分类
        mounted() {
            api.goodsClassify().then((res) => {
                this.classifies = res.data.data
                this.classifies.unshift({classify_id: '', name: '推荐'})
                //console.log(res.data.data)
            });
            this.getgoods()
            this.getGoodsCarts()
        },
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .fine_goods {
        .fine-goods_search {
            margin: 20px 0;
            position: relative;
            .goods_cats {
                position: absolute;
                right: 21px;
                top: 1px;
                width: 100px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 14px;
                color: #ffffff;
                background: #f44336;

            }
            .goods_cats_num {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: 1px solid #999999;
                position: absolute;
                right: 9px;
                top: -11px;
                text-align: center;
                line-height: 15px;
            }
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
                            object-fit: cover;
                        }
                    }
                    &-info {
                        padding: 10px;
                        .name {
                            margin-bottom: 6px;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            display: -webkit-box;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
        .fine-goods_classification {
            margin-top: 10px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #ffffff;
            font-size: 12px;
            background: #303F9F;
            border-radius: 8px;
            display: flex;
            & div {
                margin-left: 20px;
                a {
                    color: #ffff;
                }
            }
        }
        .fine-goods_sort {
            /*margin-top: 10px;*/
            /*width: 100%;*/
            /*height: 40px;*/
            /*background: #F1F1F1;*/
            /*border-radius: 8px;*/
            /*display: flex;*/
            /*font-size: 12px;*/
            /*line-height: 40px;*/
            /*& div {*/
            /*margin-left: 20px;*/
            /*}*/
            /*.active {*/
            /*color: #F44336;*/
            /*}*/
            margin-top: 15px;
            & > .order-by {
                background-color: #f1f1f1;

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
        .fine_goods_page {
            margin-top: 20px;
            text-align: center;
        }
        & > div.classify {
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
        .login-tip {
            text-align: center;
            line-height: 55px;
        }
        .modal-btn {
            text-align: center;
            a {
                display: inline-block;
                padding: 5px 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
    }


</style>
