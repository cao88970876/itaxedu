<template>
    <div class="pay-status p-20" v-show="haveShowed">
        <div class="pay-success" v-show="payStatus">
            <div class="title">支付成功</div>
            <div class="status-icon">
                <div class="icon pay-success"></div>
                <div class="">恭喜您支付成功</div>
            </div>
            <div class="ctrl-btn">
                <!--<a @click="goBack">立即查看</a>-->
                <router-link :to="{name: 'accountInfo'}">立即查看</router-link>
            </div>
        </div>
        <div class="pay-failed" v-show="!payStatus">
            <div class="title">支付失败</div>
            <div class="status-icon">
                <div class="icon pay-failed"></div>
                <div class="">支付失败</div>
            </div>
            <div class="ctrl-btn">
                <router-link :to="{name: 'recharge'}">重新支付</router-link>
                <!--<a @click="goBack">重新支付</a>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {payApi} from "../../../api"

    export default {
        name: "pay-status",
        data() {
            return {
                payStatus: true,
                orderNum: this.$route.params.orderNum,
                haveShowed: false,
            }
        },
        created() {
            this.getOrderStatus()
        },
        methods: {
            getOrderStatus() {
                payApi.findOrderByNo({
                    order_num: this.orderNum,
                    type: 6,
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
            goBack() {
                this.$router.push({name: 'accountInfo'})
            },
        }
    }
</script>


<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

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
                    color: #333;
                }
            }
        }
    }
</style>
