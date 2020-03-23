<template>
    <div class="pay_page page-content">
        <div class="pay-status" v-show="payStatus">
            <div class="pay-success">
                <div class="title">支付成功</div>
                <div class="status-icon">
                    <div class="icon pay-success"></div>
                    <div class="">恭喜您支付成功</div>
                </div>
                <div class="ctrl-btn">
                    <a>立即查看</a>
                </div>
            </div>
            <div class="pay-failed" v-show="!payStatus">
                <div class="title">支付失败</div>
                <div class="status-icon">
                    <div class="icon pay-failed"></div>
                    <div class="">支付失败</div>
                </div>
                <div class="ctrl-btn">
                    <a>重新支付</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pay",
        data() {
            return {
                payStatus: true
            }
        },
        computed: {
            status() {
                return this.$route.params.status * 1
            }
        },
        mounted() {
            this.payStatus = this.status === 1
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
                    @include size(100px, 100px);
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
