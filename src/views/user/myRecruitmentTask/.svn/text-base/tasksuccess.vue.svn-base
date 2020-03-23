<template>
    <div class="pay-status" >
        <div class="pay-success">
            <div class="title">发布成功</div>
            <div class="status-icon">
                <div class="icon pay-success"></div>
                <div class="">恭喜您发布成功</div>
            </div>
            <div class="ctrl-btn">
                <a @click="goSee">立即查看</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tasksuccess",

        methods:{
            goSee(){
                this.$router.push({name: 'jobmanagement'})
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
                padding: 20px;
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
