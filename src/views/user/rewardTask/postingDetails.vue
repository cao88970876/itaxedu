<template>
    <div class="postingDetails_page">

        <div class="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/user/myOrder/myOrder' }">悬赏任务</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/user/myOrder/evaluateGoods' }">详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mains">
            <div class="name" v-text="task.name">名字</div>
            <div class="time">时间：<span >{{task.end_time | timeFilter('Y年M月D日')}}</span></div>
            <div class="price">赏金：<span class="money" v-text="task.money">100</span></div>
            <div class="address">地址：<span v-text="task.address"></span></div>
            <div class="mains_content">
                <div class="title">任务介绍</div>
                <div class="text" v-text="task.notes">介绍内容</div>
            </div>
            <div class="cancel" @click="cancelTask">
                取消任务
            </div>

        </div>
    </div>
</template>

<script>
    import {myTaskApi} from '../../../api'

    export default {
        name: "posting-details",
        data() {
            return {
                id: '',
                task: {},
                //取消
                is_cancel: '',
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            console.log(this.id)
            myTaskApi.getRelease({
                id: this.id
            }).then((res) => {
                console.log(res.data)
                this.task = res.data.task
                this.is_cancel = res.data.task.is_cancel
                console.log("取消", res.data.task.is_cancel)
            })
        },
        methods: {
            cancelTask() {
                if (this.is_cancel === 0) {
                    myTaskApi.cancel({
                        id: this.id
                    }).then((res) => {
                        if (res.status === 1) {
                            this.$router.push({name: 'taskReward'})
                        }
                        console.log(res.data)
                    })
                } else {
                    this.$message.error("正在退款，取消失败");
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    .postingDetails_page {
        .header {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
        }
        .mains {
            padding: 20px;
            color: #999999;
            font-size: 14px;
            .name {
                font-weight: bold;
                color: #333333;
                margin-bottom: 15px;
            }
            .price {
                margin: 5px 0;
                span {
                    color: #f44336;
                }
            }
            .mains_content {
                margin-top: 20px;
                .title {
                    font-weight: bold;
                    color: #333333;
                }
                .text {
                    color: #333333;
                    margin-top: 15px;
                }
            }
            .cancel {
                margin: 50px 0 100px 0;
                width: 200px;
                height: 40px;
                text-align: center;
                color: #ffffff;
                line-height: 40px;
                border-radius: 4px;
                background: #999999;
            }
        }
    }
</style>
