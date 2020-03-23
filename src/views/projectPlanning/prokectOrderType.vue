<template>
    <div class="pay-status">
        <div class="pay-success" v-show="payStatus">
            <div class="title">支付成功</div>
            <div class="status-icon">
                <div class="icon pay-success"></div>
                <div class="">恭喜您支付成功</div>
            </div>
            <div class="ctrl-btn" @click="goSeeOrder">
                <a>立即查看</a>
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
        data() {
            return {
                payStatus: true,
                id: '',
                status: '',
            }
        },

        created() {
            this.id = this.$route.query.OrderId
            this.goodsId = this.$route.query.id
            console.log(this.id)
            console.log(this.goodsId)
            //this.status = this.$route.query.status
            this.getOrderStatus()
        },
        methods: {
            getOrderStatus() {
                payApi.projectFindId({
                    id: this.id
                }).then(resp => {
                    console.log(resp)
                    if (resp.status === 1 && resp.data.is_pay === 1) {
                        // data.status 1.已支付  2.未支付
                        this.payStatus = true
                    } else {
                        this.payStatus = false
                    }
                    this.haveShowed = true
                })
            },
            goSeeOrder() {
                this.$router.push({name: 'myProject'})
            },
            goBack() {
                this.$router.push({name: 'onlineOrder', query: {id: this.goodsId}})
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
