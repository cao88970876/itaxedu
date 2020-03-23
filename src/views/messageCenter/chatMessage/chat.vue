<template>
    <div class="chat_page">
        <div class="user clear">
            <div class="left">
                <img :src="imgPath+userFace" alt="">
            </div>
            <div class="left" v-text="userName"></div>
        </div>
        <div class="message_box" ref="chat">
            <ChatItem v-for="(item,index) in msgData" v-if="msgData.length>0" :data="item" :key="index"></ChatItem>
        </div>
        <div class="chat_send">
            <div class="checkImg">
                <i class="icon" @click="fileClick"><img src="../../../assets/image/chat_file.png"></i>
            </div>
            <div class="input-wrapper">
                <!--<input type="textarea"  v-model="sendMsg">-->
                <el-input
                    class="textarea"
                    type="textarea"
                    v-model="sendMsg"
                    :autosize="{ minRows: 6, maxRows: 50}" resize="none">
                </el-input>
            </div>
            <div class="send" >
                <div class="right" @click="handleSendMsg">发送</div>
            </div>
            <input type="file" ref="upload" accept="image/*" id='upload' style="display: none;" @change="uploadImage()">
        </div>
    </div>
</template>

<script>
    import ChatItem from '../../../components/public/ChatItem';
    import rongyun from "../../../assets/js/rongyun";
    import axios from "axios";
    import {messageCenterApi} from '../../../api';
    import utils from '../../../assets/js/utils';
    export default {
        name: "chat",
        components: {ChatItem},
        data() {
            return {
                userInfo: this.$helper.utils.storage.get('userInfo')||{},
                sendMsg: '',
                msgData: [],//接收消息的数组
                friendId:'',
                imgPath: utils.api,
                //userList:[],
                userFace:'',
                userName:'',
            }
        },
        mounted() {
            this.friendId=this.$route.query.friendId
            messageCenterApi.headerList({
                uids: this.friendId
            }).then((res) => {
                if (res.status === 1) {
                    //this.userList = res.data
                    this.userFace=res.data[0].face
                    this.userName=res.data[0].name
                }
            })

            console.log('当前用户uid', this.userInfo.uid);
            //融云初始化
            // console.log(RongIMLib);
            rongyun.init((tag) => {
                if (tag) {
                    this.$message.success("连接成功,现在可以开始发送消息了");
                }
            });
            //监听接收消息
            rongyun.onMessage((msg) => {
                //msg接收的消息发送的
                if (msg.success && msg.message.senderUserId!=this.$helper.utils.storage.get('userInfo').uid) {
                    if (msg.type === 'text') {
                        return this.msgData.push({
                            isMe: false,
                            type: msg.type,
                            user: msg.message.content.user,
                            content: msg.message.content.content
                        })
                    } else if (msg.type === 'image') {
                        return this.msgData.push({
                            isMe: false,
                            type: msg.type,
                            user: {
                                id: this.friendId,
                                name: this.userName,
                                portrait:utils.api + this.userFace
                            },
                            content: msg.message.content.imageUri
                        })
                    }
                    console.log('本地消息列表：', this.msgData)
                }
                //this.scrollBottom()
            });
            //连接融云
            rongyun.lianjie(this.userInfo.rongyun_token);
        },
        methods: {
            scrollBottom() {
                //滚动条固定底部
                this.$nextTick(() => {
                    console.log(this.$refs)
                    this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
                })
            },
            handleSendMsg() {
                //发送文本消息
                if (this.$helper.utils.trim(this.sendMsg).length <= 0) {
                    return this.$message.error('发送的消息不能为空')
                }
                rongyun.sendMessage(this.sendMsg, {
                    id: this.friendId,
                    name: this.userName,
                    portrait: utils.api + this.userFace
                }, (msg) => {
                    if (msg.success) {
                        // console.log('=>发送成功:', msg);
                        //发送消息成功
                        this.msgData.push({
                            isMe: true,
                            type: msg.type,
                            user: {
                                id: this.friendId,
                                name: this.userName,
                                portrait: utils.api + this.userInfo.face
                            },
                            content: msg.message.content.content
                        });
                        this.scrollBottom();
                        this.sendMsg = ""
                    } else {
                        //  发送消息时报
                        return this.$message.error('通信失败')
                    }
                })
            },
            //唯一的问题是发图片
            uploadImage(e) {
                console.log(e);
                var base64Result = ''
                let input = this.$refs.upload;
                // 创建一个空的FormData对象;
                let data = new FormData();
                data.append("file", input.files[0]);
                var render = new FileReader();
                render.readAsDataURL(input.files[0]);
                render.onload = (e) => {
                    base64Result = this.result
                    console.log('base64格式图片：', base64Result);
                    axios.post('/api/common/upload/upload', data).then(res => {
                        console.log(res.data)
                        if (res.data.status === 1) {
                            let tmpPath = res.data.data.path;
                            rongyun.sendImageMessage(this.friendId, base64Result, utils.api + tmpPath, (msg) => {
                                this.msgData.push({
                                    isMe: true,
                                    type: msg.type,
                                    user: {
                                        id: this.userInfo.uid,
                                        name: this.userName,
                                        portrait: utils.api + this.userInfo.face
                                    },
                                    content: msg.message.content.imageUri
                                });
                               this.scrollBottom();
                            })
                        } else
                            return this.$message(res.data.msg);
                    })
                }

            },
            fileClick() {
                this.$refs.upload.click();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .chat_page {
        width: 800px;
        border-right: 1px solid #f1f1f1;
        .user {
            padding: 5px 10px;
            border-bottom: 1px solid #f1f1f1;
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
                font-weight: bold;
            }
        }
        .message_box {
            width: 100%;
            height: 280px;
            overflow-y: scroll;
        }
        .chat_send {
            border-top: 1px solid #f1f1f1;
            .checkImg {
                padding: 5px 10px;
                .icon {
                    width: 30px;
                    height: 30px;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
            .input-wrapper {
                .textarea {
                    width: 100%;
                    height: 125px;
                    outline: none;
                }
            }
            .send {
                margin-bottom: 40px;
                padding: 10px;
                div {
                    width: 100px;
                    height: 40px;
                    background: #f44336;
                    color: #ffffff;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 4px;
                }
            }
        }
    }
</style>
