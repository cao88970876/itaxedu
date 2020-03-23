<template>
    <div class="pay-status">
        <div class="page-content" v-show="haveShowed">
            <div class="pay-success" v-show="payStatus">
                <div class="title">支付成功</div>
                <div class="status-icon">
                    <div class="icon pay-success"></div>
                    <div class="">恭喜您支付成功</div>
                </div>
                <div class="ctrl-btn">
                    <a @click="goBackSpecial">立即查看</a>
                </div>
            </div>
            <div class="pay-failed" v-show="!payStatus">
                <div class="title">支付失败</div>
                <div class="status-icon">
                    <div class="icon pay-failed"></div>
                    <div class="">支付失败</div>
                </div>
                <div class="ctrl-btn">
                    <a @click="goBackSpecial">重新支付</a>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {AppFooter} from "../../components/public";
    import {payApi} from "../../api"

    export default {
        name: "pay-status",
        components: {AppFooter},
        data() {
            return {
                payStatus: true,
                orderNum: null,
                id: this.$route.params.id,
                // 接口查询完成后显示
                haveShowed: false,
            }
        },
        created() {
            this.orderNum = this.$route.params.orderNum
            this.getOrderStatus()
        },
        methods: {
            getOrderStatus() {
                payApi.findOrderByNo({
                    order_num: this.orderNum,
                    type: 3,
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
            goBackSpecial() {
                this.$router.push({name: 'booksDetail', params: {id: this.id}})
            },
        }
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
