<template>
    <div class="pay-status" v-show="haveShowed">
        <div class="pay-success" v-show="payStatus">
            <div class="title">支付成功</div>
            <div class="status-icon">
                <div class="icon pay-success"></div>
                <div class="">恭喜您支付成功</div>
            </div>
            <div class="ctrl-btn" @click="goSeeOrder">
                <a>再逛逛</a>
            </div>
        </div>
        <div class="pay-failed" v-show="!payStatus">
            <div class="title">支付失败</div>
            <div class="status-icon">
                <div class="icon pay-failed"></div>
                <div class="">支付失败</div>
            </div>
            <div class="ctrl-btn" @click="goBack">
                <a>重新支付</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {payApi, contentApi} from "../../api"
    export default {
        name: "pay-success",
        data() {
            return {
                payStatus: true,
                orderNum:'',
                // 接口查询完成后显示
                haveShowed: false,
                goodsId:''
            }
        },

        created() {
            this.orderNum = this.$route.params.orderNum
            this.goodsId = this.$route.params.goodsId
            this.num = this.$route.params.num
            this.getOrderStatus()
        },
        methods:{
            getOrderStatus() {
                debugger
                payApi.findOrderByNo({
                    order_num: this.orderNum,
                    type: 5,
                }).then(resp => {
                    if (resp.status === 1) {
                        // data.status 1.已支付  2.未支付
                        this.payStatus = resp.data.status === 1
                    } else {
                        this.payStatus = false
                    }
                    this.haveShowed = true
                })
            },
            goSeeOrder(){
                this.$router.push({name:'fineGoods'})
            },
            goBack(){
                this.$router.push({name:'myOrderHome'})
            }
        },



    }
</script>

<style lang="scss" scoped>

    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .pay-status {
        .pay-success,
        .pay-failed {
            .title {
                font-size: 14px;
            }
            .status-icon {
                text-align: center;
                font-size: 14px;
                margin: 80px 0 80px;

                .icon {
                    @include size(150px, 150px);
                    border-radius: 200px;
                    margin-bottom: 20px;
                }
            }
            .ctrl-btn {
                text-align: center;
                margin-bottom: 100px;
                a {
                    border: 1px solid #999;
                    font-size: 16px;
                    padding: 6px 40px;
                    border-radius: 100px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
