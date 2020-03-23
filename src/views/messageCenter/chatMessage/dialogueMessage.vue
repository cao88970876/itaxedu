<template>
    <div class="dialogueMessage_page">
        <ul class="content">
            <li v-for="(item,index) in lists" @click="goChat(item)">
                <div class="user clear">
                    <div class="left">
                        <img :src="imgPath+userList[index].face" alt="">
                    </div>
                    <div class="left">
                        <span v-text="userList[index].name"></span>
                        <!--<span v-if="item.data.user" v-text="item.data.user.name"></span>-->
                    </div>
                    <div class="right">{{item.sentTime | timeFilter('MM月-DD日')}}</div>
                </div>
                <div v-if="item.data.messageName==='TextMessage'" v-text="item.data.content">
                </div>
                <div v-if="item.data.messageName==='ImageMessage'">
                   [图片]
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import ChatItem from '../../../components/public/ChatItem';
    import rongyun from "../../../assets/js/rongyun";
    import axios from "axios";
    import {messageCenterApi} from '../../../api'
    import utils from '../../../assets/js/utils';

    export default {
        name: "dialogue-message",
        data() {
            return {
                userInfo: this.$helper.utils.storage.get('userInfo'),
                rongyun: rongyun,
                lists: [],
                uids: [],
                userList: [],
                imgPath: utils.api,
            }
        },
        mounted() {

            this.rongyunInit().then(() => {
                messageCenterApi.headerList({
                    uids: this.uids
                }).then((res) => {
                    if (res.status === 1) {
                        this.userList = res.data
                        // console.log(res.data)
                    }
                })
            });
            rongyun.onMessage((msg) => {
                this.rongyunInit().then(() => {
                    messageCenterApi.headerList({
                        uids: this.uids
                    }).then((res) => {
                        if (res.status === 1) {
                            this.userList = res.data
                            // console.log(res.data)
                        }
                    })
                });

            });
        },
        methods: {
            //连接融云
            rongyunInit() {
                return new Promise((resolve, reject) => {
                    rongyun.lianjie(this.userInfo.rongyun_token);
                    rongyun.init((tag) => {
                        RongIMClient.getInstance().getConversationList({
                            onSuccess: (list) => {
                                console.log('源', list);
                                this.lists = [];
                                this.uids = [];
                                if (list.length > 0) {
                                    console.log('成功=>', list[0].latestMessage);
                                    for (let i = 0; i < list.length; i++) {
                                        console.log(list[i])
                                        this.lists.push({
                                            data: list[i].latestMessage.content,
                                            friendId: list[i].targetId,
                                            sentTime: list[i].sentTime,
                                            messageId: list[i].latestMessageId
                                        })
                                    }  ;

                                    this.lists.forEach(val => {
                                        this.uids.push(val.friendId)
                                    })
                                }
                                resolve()
                            },
                            //错误
                            onError: function (error) {
                                console.log(error);
                            }
                        }, null);
                    });
                    //监听接收消息
                    // rongyun.onMessage((msg) => {
                    //     debugger
                    //     this.rongyunInit()
                    //     //消息类型type=>text:文本;audio:音频;image:图片
                    //     // console.log('收到消息=>', msg);
                    //     // console.log('=============', this.$route.query.id, this.userInfo.uid);
                    //     // console.log('触发消息监听。。。。。', msg);
                    // });
                })

            },
            goChat(item){
                console.log(item)
                this.$router.push({name:'chat',query:{friendId:item.friendId}})
            },
        }
    }
</script>

<style lang="scss" scoped>
    .dialogueMessage_page {
        .content {
            padding: 20px;
            li {
                border: 1px solid #f1f1f1;
                padding: 10px;
                border-radius: 6px;
                margin-bottom: 10px;
                .user {
                    margin-bottom: 10px;
                    div:nth-child(1) {
                        width: 60px;
                        height: 60px;
                        background: #999999;
                        border-radius: 50%;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            object-fit: cover;
                        }
                    }
                    div:nth-child(2) {
                        margin-left: 15px;
                        line-height: 60px;
                    }
                    div:nth-child(3) {
                        color: #999999;
                        line-height: 60px;
                    }
                }
            }
        }
    }
</style>
