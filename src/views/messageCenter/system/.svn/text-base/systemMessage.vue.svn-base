<template>
    <div class="messageCenter_page">
        <ul class="content">
            <li v-for="item in msgData">
                <div class="msgHeader clear">
                    <div class="left">系统消息</div>
                    <div class="left time">{{item.create_time | timeFilter }}</div>
                    <div class="right delMsg" @click="delMsg(item)"><img src="../../../assets/image/ic_cancle.png" alt="">
                    </div>
                </div>
                <div v-text="item.content">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {messageCenterApi} from '../../../api'
    import utils from '../../../assets/js/utils';
    import {Pagination} from "../../../components/public";

    export default {
        name: "message-center",
        components: {Pagination},
        data() {
            return {
                msgData: [],
            }
        },
        mounted() {
            this.getMsgList()
        },
        methods: {
            getMsgList() {
                messageCenterApi.SystemNotification().then((res) => {
                    if (res.status === 1) {
                        this.msgData = res.data
                    }
                })
            },
            delMsg(item) {
                messageCenterApi.delSystemMsg({
                    id: item.id
                }).then((res) => {
                    if (res.status === 1) {
                        this.$message.success(res.msg);
                        this.getMsgList()
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .messageCenter_page {
        padding: 20px;
        .content {
            li {
                border: 1px solid #f1f1f1;
                border-radius: 6px;
                padding: 10px;
                margin-bottom: 15px;
                .msgHeader {
                    color: #999999;
                    margin-bottom: 5px;
                    div:nth-child(1) {
                        font-weight: bold;
                        color: #333333;
                    }
                    .time {
                        margin-left: 20px;
                    }
                    .delMsg {
                        img {
                            width: 16px;
                            height: 16px;
                        }
                    }
                }
            }
        }
    }
</style>
