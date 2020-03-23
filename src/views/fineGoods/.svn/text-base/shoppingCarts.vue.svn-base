<template>
    <div class="shoppingCarts_page page-content">
        <div class="shoppingCart_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ name: 'fineGoods' }">精品商城</el-breadcrumb-item>
                <el-breadcrumb-item>购物车</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="have_goods" v-if="goodsList.length>0">
            <ul class="carts_list">
                <li v-for="item in goodsList" :key="item.id">
                    <div class="check">
                        <label>
                            <input type="checkbox" :value="item" v-model="isPublic"/>
                            <i class="icon radio-no-checked" :class="{'radio-checked':isChecked(item)}"></i>
                        </label>
                    </div>
                    <div class="goods_show">
                        <img :src="imgPath+item.cover_img" alt="">
                    </div>
                    <div class="goods_text">
                        <div class="title" v-text="item.name"></div>
                        <div class="goods_type">
                            <span v-text="item.spec_name_one"></span><span
                            v-text="item.spec_name">50g</span><span>|</span><span>数量：{{item.num}}</span></div>
                        <div class="goods_num"></div>
                        <div class="goods_price money" v-text="item.discounts_price*item.num*100/100">￥122</div>
                    </div>
                </li>
            </ul>
            <div class="carts_price clear">
                <div class="all_buy left">
                    <label>
                        <input type="checkbox" :value="true" @click="allCheck" v-model="allBuy"/>
                        <i class="icon radio-no-checked" :class="{'radio-checked':allBuy}"></i>
                        <span>全选</span>
                    </label>
                </div>
                <div class="all_check left" @click="delGoods">
                    <span>删除</span>
                </div>
                <div class="goods_counct left">
                    已选商品<span>{{isPublic.length}}</span>件
                </div>
                <div class="all_price left">合计：<span>￥{{totalPrice}}元</span></div>
                <div class="goods_buy right" @click="goOrder">
                    结算
                </div>
            </div>
        </div>
        <div class="no_goods" v-if="goodsList.length<=0">
            <img src="../../assets/image/ic_79.png" alt="">
            <p>购物车竟然是空的</p>
            <div class="goPage" @click="$router.push({name:'fineGoods'})">
                去逛逛
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api/goodsApi';
    import utils from '../../assets/js/utils';

    export default {
        name: "shopping-carts",
        data() {
            return {
                imgPath: utils.api,
                isPublic: [],
                goodsList: [],
                allBuy: false,
                goodsId: [],
            }
        },
        watch: {
            isPublic(v1, v2) {
                if (v1 !== v2) {
                    this.allBuy = v1.length === this.goodsList.length
                }
            }
        },
        methods: {
            isChecked(item) {
                let flag = false
                for (let i of this.isPublic) {
                    if (item === i) {
                        flag = true
                        break
                    }
                }
                return flag
            },
            // allTotal(item){
            //     console.log(item)
            // },
            allCheck() {
                if (this.allBuy) {
                    this.isPublic = []
                } else {
                    this.isPublic = this.goodsList
                }
                this.allBuy = !this.allBuy;
            },
            goOrder() {
                this.isPublic.forEach(value => {
                    this.goodsId.push(value.id)
                })
                if (this.goodsId.length <= 0) {
                    this.$message.error('请选择需要购买的商品')
                } else {
                    this.$router.push({name: 'multipleBuy', query: {carts: this.goodsId}})
                }
            },
            delGoods() {
                this.isPublic.forEach(value => {
                    this.goodsId.push(value.id)
                })
                api.delGoodsList({
                    id: this.goodsId.toString()
                }).then((res) => {
                    if (res.status === 1) {
                        this.getCartsList()
                    }
                })
            },
            getCartsList() {
                api.goodsCarts().then((res) => {
                    if (res.status === 1) {
                        console.log(res.data)
                        this.goodsList = res.data.data
                    }
                })
            }
        },
        computed: {
            // //计算总价
            totalPrice() {
                var total = 0;
                //遍历数组,如果选中就数量*价格
                this.isPublic.forEach(item => {
                    total = (total * 100 + item.discounts_price * 100 * item.num) / 100
                });
                return total
            },
        },
        mounted() {
            this.getCartsList()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .shoppingCarts_page {
        .have_goods {
            width: 100%;
            .carts_list {
                margin-top: 10px;
                li {
                    display: flex;
                    padding: 10px;
                    border-bottom: 2px solid #f1f1f1;
                    .check {
                        margin-top: 20px;
                        & > label {
                            margin-right: 30px;
                            cursor: pointer;
                            line-height: 20px;
                            font-size: 14px;

                            & > input[type=checkbox] {
                                display: none;
                            }
                            .icon {
                                @include size(20px, 20px);
                                vertical-align: bottom;
                                margin-right: 10px;
                                position: relative;
                                top: -1px;
                            }
                        }

                    }
                    .goods_show {
                        width: 100px;
                        height: 100px;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                    .goods_text {
                        flex: 1;
                        margin-left: 10px;
                        font-size: 14px;
                        .title {
                            font-size: 16px;
                            font-weight: bold;
                        }
                        .goods_type {
                            height: 20px;
                            margin-top: 5px;
                            span {
                                margin-left: 6px;
                            }
                        }
                        .goods_num {
                            margin: 10px 0;
                        }
                        .goods_price {
                            color: #f44336;
                            font-size: 16px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .carts_price {
            margin-top: 20px;
            width: 100%;
            height: 50px;
            background: #f1f1f1;
            margin-bottom: 100px;
            .all_buy {
                width: 85px;
                height: 50px;
                line-height: 50px;
                font-weight: bold;
                font-size: 16px;
                padding-left: 15px;
                & > label {
                    width: 100%;
                    height: 100%;
                    margin-right: 15px;
                    cursor: pointer;
                    font-size: 14px;
                    & > input[type=checkbox] {
                        display: none;
                    }
                    .icon {
                        @include size(20px, 20px);
                        vertical-align: bottom;
                        margin-right: 10px;
                        position: relative;
                        top: -13px;
                    }
                }
            }
            .all_check {
                width: 52px;
                font-weight: bold;
                font-size: 16px;
                line-height: 50px;
                span {
                    font-weight: bold;
                    color: #f44336;
                }
            }
            .goods_counct {
                line-height: 50px;
                font-size: 16px;
                margin-left: 654px;
                span {
                    color: #f44336;
                }
            }
            .all_price {
                width: 142px;
                line-height: 50px;
                font-size: 16px;
                margin-left: 30px;
                span {
                    color: #f44336;
                }
            }
            .goods_buy {
                width: 120px;
                height: 100%;
                background: #f44336;
                line-height: 50px;
                text-align: center;
                margin-left: 10px;
                color: #fff;
                font-size: 16px;
            }
        }
        .no_goods {
            padding-top: 150px;
            padding-bottom: 50px;
            text-align: center;
            color: #999999;
            font-size: 30px;
            img {
                width: 270px;
                height: 200px;
                object-fit: cover;
            }
            .goPage {
                margin: 0 auto;
                width: 100px;
                height: 40px;
                font-size: 14px;
                border-radius: 20px;
                text-align: center;
                line-height: 40px;
                border: 1px solid #f44336;
            }
        }
    }

</style>
