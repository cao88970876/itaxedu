<template>
    <div class="pay-status page-content" v-show="haveShowed">
        <div class="pay-success" v-show="payStatus">
            <div class="title">支付成功</div>
            <div class="status-icon">
                <div class="icon pay-success"></div>
                <div class="">恭喜您支付成功</div>
            </div>
            <div class="ctrl-btn">
                <a @click="goBacksee">立即查看</a>
            </div>
        </div>
        <div class="pay-failed" v-show="!payStatus">
            <div class="title">支付失败</div>
            <div class="status-icon">
                <div class="icon pay-failed"></div>
                <div class="">支付失败</div>
            </div>
            <div class="ctrl-btn">
                <a @click="goBackCourse">重新支付</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {resumeApi} from '../../../api'
    export default {
        name: "pay-status",
        data() {
            return {
                payStatus: true,
                orderNum: null,
                // 接口查询完成后显示
                haveShowed: false,
                params:""
            }
        },
        created() {
            this.params = JSON.parse(decodeURIComponent(this.$route.params.params));
            this.getResumeStatus()
        },
        methods: {
            getResumeStatus() {
                resumeApi.task_order_show({
                    id:this.$route.params.orderNum,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.payStatus = resp.data.is_pay === 1
                    } else {
                        this.payStatus = false
                    }
                    this.haveShowed = true
                })
            },
            goBacksee(){
                this.$router.replace({name: 'taskList'})
            },
            goBackCourse() {
                this.$router.replace({name: 'TaskpaySee',query:{params:encodeURIComponent(JSON.stringify(this.params))} })
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
                margin-left: 20px;
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
