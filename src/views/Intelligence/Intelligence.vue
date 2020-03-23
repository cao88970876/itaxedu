<template>
    <div class="intelligence_page">
        <!--导航-->
        <div class="page-content">
            <navigation></navigation>
        </div>
        <div class="intelligence_mains">
            <div class="talk page-content">
                <div class="robot_header">
                    <div><img src="../../assets/image/ic_87.png" alt=""></div>
                    <div>智能助手</div>
                </div>
                <div class="chat_box" ref="chat">
                    <intelligenceMsg v-for="(item,index) in messageData" :data="item" :key="index"></intelligenceMsg>
                </div>
                <div class="input-wrapper">
                    <el-input
                        class="textarea"
                        type="textarea"
                        v-model="question"
                        :autosize="{ minRows: 6, maxRows: 50}" resize="none">
                    </el-input>
                </div>
                <div class="send" >
                    <div class="right" @click="sendMsg">发送</div>
                </div>
                <!--<input type="file" ref="upload" accept="image/*" id='upload' style="display: none;" @change="uploadImage()">-->
            </div>

        </div>
    </div>
</template>

<script>
    import {Navigation,intelligenceMsg} from '../../components/public'
    import axios from "axios";
    import utils from '../../assets/js/utils';
    const xiaozi = axios.create({
        baseURL: 'http://zcxrobot.xiaoziai.com',
        timeout: 8000,
        headers: {}
    });
    export default {
        name: "intelligence",
        components: {
            Navigation,
            intelligenceMsg,
        },
        data(){
            return{
                myToken: '',
                question: '',
                 user_id: '123',
                messageData: []
            }
        },
        created() {
            // console.log(md5('11111'));
            // xunfei.post('http://api.xfyun.cn/v1/service/v1/tts', {
            //   headers: {
            //     'X-ApiKey': apiKey, //api id
            //     'X-CurTime': curTime, //当前时间戳秒
            //     'X-param': param, //参数
            //     'X-checkSum': md5(apiKey + curTime + param)
            //   }
            // }).then(res => {
            //   console.log('', res)
            // })
             this.user_id = Date.parse(new Date()) / 1000;
            this.hot();
           // this.getToken();
        },
        methods: {
            sendMsg() {
                if (utils.trim(this.question).length <= 0) {
                    return this.$message.error('发送的消息不能为空');
                }

                this.postQuestion();
            },
            scrollBottom() {
                this.$nextTick(() => {
                    this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
                })
            },
             hot() {
                xiaozi.post('/api/hot', {
                }).then(res => {
               
                  // let msg = '';
                  // for (var i = 0; i < res.data.data.length; i++) {
                  //     msg +=  "<p style='padding:6px' >" + res.data.data[i]['q'] + "</p>";
                  // }
                  

                  this.messageData.push({
                        isMe: false,
                        type: '2',
                        msg: res.data.data
                      });
                 
                })
              },
            getToken() {
                xiaozi.post('/v1/access', {
                    rid: 16,
                    appid: '1f5b8515d3aad91',
                    secret: 'f6e1b8b0ee9fd741ba582c0738bc1e01'
                }).then(res => {
                    console.log("huoqu",res.data);
                    let tmp = res.data;
                    if (tmp.code === 200) {
                        this.myToken = tmp.data.token;
                    }
                })
            },
            postQuestion() {
                xiaozi.post('/robot', {
                   
                       rid: 62,
                        user_id: this.user_id,
                        question: this.question
                  
                }).then(res => {
                    console.log("返回来的",res.data);
                    let tmp = res.data;
                    if (tmp.code === 200) {
                        this.messageData.push({
                            isMe: true,
                            type: '',
                            msg: this.question
                        });
                        this.messageData.push({
                            isMe: false,
                            type: '',
                            msg: tmp.data
                        });
                        this.question = '';
                        this.scrollBottom();
                    }
                }).catch(err => {
                    this.$message.error('通信失败')
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";
    .intelligence_page{
        .intelligence_mains{
            background: #f1f1f1;
            .talk{
                padding-bottom: 60px;
                background: #ffffff;
                .robot_header{
                    display: flex;
                    padding: 10px 20px;
                    border-top: 2px solid #f1f1f1;
                    border-bottom: 2px solid #f1f1f1;
                    div:nth-child(1){
                        width: 60px;
                        height: 60px;
                        background: #999999;
                        border-radius: 50%;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    div:nth-child(2){
                        margin-left: 10px;
                        font-size: 16px;
                        font-weight: bold;
                        line-height: 60px;
                    }
                }
                .chat_box{
                    height: 300px;
                    overflow-y: scroll;
                    padding: 15px 10px;
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
                        margin-top: 10px;
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
    }

</style>
