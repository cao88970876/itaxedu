<template>
    <div class="pay_page page-content">
        <div class="pay-status">
            <div class="pay-success" v-show="payStatus">
                <div class="title">支付成功</div>
                <div class="status-icon">
                    <div class="icon pay-success"></div>
                    <div>恭喜您支付成功</div>
                </div>
                <div class="ctrl-btn" @click="$router.push({name:'answer'})">
                    <a>立即查看</a>
                </div>
            </div>
            <div class="pay-failed" v-show="!payStatus">
                <div class="title">支付失败</div>
                <div class="status-icon">
                    <div class="icon pay-failed"></div>
                    <div>支付失败</div>
                </div>
                <div class="ctrl-btn" @click="backPay">
                    <a>重新支付</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api/answerApi'


    export default {
        name: "pay",
        data() {
            return {
                payStatus: true,
                params: {},
                orderId: '',
            }
        },

        created() {
            //this.payStatus = this.$route.params.status
            this.params = this.$route.query.params
            this.orderId = this.$route.query.id
            // console.log(this.orderId)
            console.log("接收", this.params)
            this.getenquiryOrder()
        },
        methods: {
            getenquiryOrder() {
                api.enquiryOrder({
                    id: this.orderId
                }).then((res) => {
                    if (res.status === 1 && res.data.is_pay === 1) {
                        this.payStatus = true
                    } else {
                        this.payStatus = false
                    }
                    console.log(res.data)
                })
            },
            backPay() {
                this.$router.push({
                    name: 'fastPaySee',
                    query: {params: this.params}
                })
            }
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
