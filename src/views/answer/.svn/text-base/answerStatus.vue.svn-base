<template>
    <div class="pay_page page-content">
        <div class="pay-status">
            <div class="pay-success" v-show="payStatus">
                <div class="title">支付成功</div>
                <div class="status-icon">
                    <div class="icon pay-success"></div>
                    <div>恭喜您支付成功</div>
                </div>
                <div class="ctrl-btn" @click="goSeeOrder">
                    <a>立即查看</a>
                </div>
            </div>
            <div class="pay-failed" v-show="!payStatus">
                <div class="title">支付失败</div>
                <div class="status-icon">
                    <div class="icon pay-failed"></div>
                    <div>支付失败</div>
                </div>
                <div class="ctrl-btn" @click="goBack">
                    <a>重新支付</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {payApi, contentApi} from "../../api"
    export default {
        name: "pay",
        data() {
            return {
                payStatus: false,
                quiz_id: '',
                OrderId:'',
                answer_id:'',
            }
        },
        created() {
            this.OrderId = this.$route.query.OrderId
            this.getOrderStatus()
        },
        methods: {
            getOrderStatus() {
                payApi.seeAnswerFindId({
                    id: this.OrderId
                }).then(resp => {
                    console.log(resp)
                    if (resp.status === 1 && resp.data.is_pay === 1) {
                        // data.status 1.已支付  2.未支付
                        this.payStatus = true
                        this.quiz_id=resp.data.quiz_id
                        console.log("问题ID",this.quiz_id)
                    } else {
                        this.answer_id=resp.data.answer_id
                        this.payStatus = false
                    }
                    this.haveShowed = true
                })
            },
            goSeeOrder() {
                console.log(this.quiz_id)
                this.$router.push({name: 'alreadyPaid',query:{id:this.quiz_id}})
            },
            goBack() {
                console.log(this.answer_id)
                 this.$router.push({name: 'paySee', query: {id: this.answer_id}})
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
