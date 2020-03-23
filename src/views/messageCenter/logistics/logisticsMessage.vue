<template>
    <div class="logisticsMessage_page">
        <ul class="content">
            <li v-for="item in msgData">
                <div class="msgHeader clear">
                    <div class="left"><span v-show="item.state===1">已发货</span><span v-show="item.state===3">已签收</span><span v-show="item.state===5">派送中</span></div>
                    <div class="left time">{{item.time | timeFilter }}</div>
                    <div class="right delMsg" @click="delMsg(item)"><img src="../../../assets/image/ic_cancle.png" alt="">
                    </div>
                </div>
                <div class="text" v-text="item.content">
                </div>
                <div >
                    快点单号：<span v-text="item.logistics_num"></span>
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
        name: "logistics-message",
        components: {Pagination},
        data(){
            return{
                msgData:[]
            }
        },
        mounted() {
            console.log(11111)
            this.getNewsList()
        },
        methods: {
            getNewsList() {
                messageCenterApi.logisticsNews().then((res) => {
                    if (res.status === 1) {
                        this.msgData = res.data
                        console.log(res.data)
                    }
                })
            },
            delMsg(item) {
                messageCenterApi.delLogisticsNews({
                    id: item.id
                }).then((res) => {
                    if (res.status === 1) {
                        this.$message.success(res.msg);
                        this.getNewsList()
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.logisticsMessage_page{
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
            .text{
                margin: 5px 0;
            }
        }
    }
}
</style>
