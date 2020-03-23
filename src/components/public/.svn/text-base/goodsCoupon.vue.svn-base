<template>
    <div class="coupon clear">
        <div>
            <a class="icon to-left block left pre-btn" :class="{disabled:!this.pageInfo.pageNum}" @click="preClick"></a>
            <div class="coupon-content left">
                <!--<div class="coupon-content left">-->
                <ul class="coupon-list"
                    :style="{transform: `translate(-${(outWidth+blockProp.marginLeft) * pageInfo.pageNum}px)`}">
                    <li v-for="(item,index) in couponList"
                        :key="index"
                        :style="{left: `${(blockProp.width + blockProp.marginLeft) * index}px`}">
                        <label @click.prevent="clickItem(item)" class="pointer">
                            <input type="radio" :value="item" v-model="checkVal"/>
                            <i class="icon" :class="{'check-right': checkVal===item}"></i>
                            <div class="enable-type"><span v-if="item.model_type===0">全平台</span><span
                                v-if="item.model_type===2">课程学习</span><span v-if="item.model_type===1">商城</span><span
                                v-if="item.model_type===3">专栏</span><span v-if="item.model_type===4">电子书</span><span
                                v-if="item.model_type===5">项目</span>可用
                            </div>
                            <div class="clear">
                                <div class="rebate left"><span v-show="item.type===2">{{item.discounts*10}}折</span>
                                    <span v-if="item.type===1">{{item.discounts}}元</span></div>
                                <div class="condition right">
                                    <div v-if="item.type===1">满<span v-text="item.condition"></span>元减<span
                                        v-text="item.discounts"></span>元
                                    </div>
                                    <div>有效期至：{{item.etime | timeFilter('Y年M月D日')}}</div>
                                </div>
                            </div>
                        </label>
                    </li>
                </ul>
            </div>
            <a class="icon to-right block right next-btn"
               :class="{disabled: this.pageInfo.pageNum + 1 >= this.pageInfo.pageCount}" @click="nextClick"></a>
        </div>
    </div>
</template>

<script>
    import api from '../../api/goodsApi';

    /**
     * 优惠券组件
     * 特别提示：user信息和优惠券列表由组件内部获取
     * @v-model
     * @property content-id [string] 要用的内容id 课程，专栏，电子书
     * @property type [string] 1课程 2专栏 3电子书
     */
    export default {
        name: "coupon",
        props: ['content-id', 'type', 'value'],
        data() {
            return {
                // 单个优惠券宽度，修改时需连同样式一起修改
                blockProp: {
                    width: 250,
                    marginLeft: 20,
                },
                outWidth: 1060,
                // 分页（滚动）配置，修改时需连同样式一起修改
                pageInfo: {
                    pageNum: 0,
                    pageCount: 1,
                    pageSize: 4
                },
                couponList: [],
                checkVal: null
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
            // 上一页
            preClick() {
                if (this.pageInfo.pageNum) {
                    --this.pageInfo.pageNum
                }
            },
            // 下一页
            nextClick() {
                if (this.pageInfo.pageNum + 1 < this.pageInfo.pageCount) {
                    ++this.pageInfo.pageNum
                }
            },
            // 获取优惠券列表（组件内部调接口）
            getCouponList(obj) {
                api.goodsCoupon(obj).then(resp => {
                    this.couponList = resp.data instanceof Array ? resp.data : []
                    console.log("优惠卷", this.couponList)
                    /*Mock数据*/
                    // this.couponList = [
                    //     {id: 1},
                    //     {id: 2},
                    //     {id: 3},
                    //     {id: 4},
                    //     {id: 5},
                    // ]
                    // 计算总页数
                    this.pageInfo.pageCount = Math.ceil(this.couponList.length / this.pageInfo.pageSize)
                })
            },
            // 选择优惠券
            clickItem(item) {
                this.checkVal = this.checkVal === item ? null : item
                this.$emit('input', this.checkVal)
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
                            margin-top: 10px;
                        }
                        .condition {
                            text-align: right;
                            margin-top: 18px;
                        }
                    }
                }
            }
        }

    }
</style>
