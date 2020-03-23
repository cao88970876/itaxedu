<template>
    <div class="coupon clear">
        <div>
            <a class="icon to-left block left pre-btn" :class="{disabled:!this.pageInfo.pageNum}" @click="preClick"></a>
            <div class="coupon-content left">
                <ul class="coupon-list" :style="{transform: `translate(-${(outWidth+blockProp.marginLeft) * pageInfo.pageNum}px)`}">
                    <li v-for="(item,index) in couponList"
                        :key="index"
                        :style="{left: `${(blockProp.width + blockProp.marginLeft) * index}px`}"
                        :class="{enable:!isAble(item)}">
                        <label @click.prevent="clickItem(item)" class="pointer">
                            <input type="radio" :value="item" v-model="checkVal"/>
                            <i class="icon" :class="{'check-right': checkVal===item}"></i>
                            <div class="enable-type" v-if="item.model_type===0">全平台可用</div>
                            <div class="enable-type" v-if="item.model_type===1">
                                商品可用<span v-if="!isAble(item)">（不可用）</span>
                            </div>
                            <div class="enable-type" v-if="item.model_type===2">
                                课程学习可用<span v-if="!isAble(item)">（不可用）</span>
                            </div>
                            <div class="enable-type" v-if="item.model_type===3">
                                专栏学习可用<span v-if="!isAble(item)">（不可用）</span>
                            </div>
                            <div class="enable-type" v-if="item.model_type===4">
                                电子书学习可用<span v-if="!isAble(item)">（不可用）</span>
                            </div>
                            <div class="enable-type" v-if="item.model_type===5">
                                项目可用<span v-if="!isAble(item)">（不可用）</span>
                            </div>
                            <div class="clear">
                                <div class="rebate ellipsis left" v-if="item.type===1" v-text="item.discounts + '元'"></div>
                                <div class="rebate ellipsis left" v-if="item.type===2" v-text="item.discounts * 10 + '折'"></div>
                                <div class="condition right">
                                    <div v-if="item.type===1">
                                        满<span v-text="item.condition"></span>元减<span v-text="item.discounts"></span>元
                                    </div>
                                    <div>有效期至：<span v-text="$filter.timeFilter(item.etime, 'YYYY-MM-DD')"></span></div>
                                </div>
                            </div>
                        </label>
                    </li>
                </ul>
            </div>
            <a class="icon to-right block right next-btn" :class="{disabled: this.pageInfo.pageNum + 1 >= this.pageInfo.pageCount}" @click="nextClick"></a>
        </div>
    </div>
</template>

<script>
    import {couponApi} from '../../api'

    export default {
        name: "coupon",
        props: ['content-id', 'type', 'value', 'price'],
        data() {
            return {
                blockProp: {
                    width: 250,
                    marginLeft: 20,
                },
                outWidth: 1060,
                pageInfo: {
                    pageNum: 0,
                    pageCount: 1,
                    pageSize: 4
                },
                couponList: [],
                checkVal: null,
            }
        },
        mounted() {
            let user = sessionStorage.getItem('userInfo')
            if (user) {
                user = JSON.parse(user)
                this.getCouponList({
                    uid: user.uid,
                    content_id: this.contentId,
                    type: this.type
                })
            }
        },
        methods: {
            preClick() {
                if (this.pageInfo.pageNum) {
                    --this.pageInfo.pageNum
                }
            },
            nextClick() {
                if (this.pageInfo.pageNum + 1 < this.pageInfo.pageCount) {
                    ++this.pageInfo.pageNum
                }
            },
            getCouponList(obj) {
                couponApi.getList(obj).then(resp => {
                    this.couponList = resp.data instanceof Array ? resp.data : []
                    this.pageInfo.pageCount = Math.ceil(this.couponList.length / this.pageInfo.pageSize)
                })
            },
            // 选择优惠券
            clickItem(item) {
                if (!this.isAble(item)) {
                    return
                }
                this.checkVal = this.checkVal === item ? null : item
                this.$emit('input', this.checkVal)
            },
            isAble(item) {
                //1是
                return ((this.type === 1 && item.model_type === 2) ||
                    (this.type === 2 && item.model_type === 3) ||
                    (this.type === 3 && item.model_type === 4) ||
                    item.model_type === 0) && (item.condition <= (this.price * 1 || 0))

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .coupon {
        $height: 110px;

        * {
            box-sizing: border-box;
        }
        .block {
            display: block;
        }
        .pre-btn, .next-btn {
            @include size(50px, $height);
            text-align: center;
            vertical-align: middle;
            background-color: #f1f1f1;
            background-size: 40%;
            cursor: pointer;
            &.disabled {
                cursor: not-allowed;
                opacity: .5;
            }
        }

        &-content {
            width: 1060px;
            height: $height;
            margin: 0 20px;
            overflow: hidden;
            position: relative;

            ul {
                list-style: none;
                transition: all .5s;
                padding-top: 10px;
                li {
                    @include size(250px, 90px);
                    background: $fontColorRed;
                    border-radius: 10px;
                    position: absolute;
                    top: 10px;

                    &.enable {
                        background: #e1e1e1;
                        .pointer {
                            cursor: not-allowed;
                        }
                    }

                    label {
                        display: block;
                        width: 100%;
                        height: 100%;
                        position: relative;
                        color: #fff;
                        padding: 10px;

                        input[type=radio] {
                            display: none;
                        }

                        .icon {
                            position: absolute;
                            @include size(20px, 20px);
                            background-color: #fff;
                            background-size: auto;
                            border-radius: 50px;
                            overflow: hidden;
                            right: 5px;
                            top: 5px;
                        }

                        .enable-type {
                            font-size: 14px;
                        }

                        .rebate {
                            font-size: 24px;
                            font-weight: bold;
                            position: absolute;
                            bottom: 10px;
                            left: 10px;
                            width: 105px;
                        }
                        .condition {
                            text-align: right;
                            position: absolute;
                            bottom: 10px;
                            right: 10px;
                        }
                    }
                }
            }
        }

    }
</style>
