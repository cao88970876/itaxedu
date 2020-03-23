<template>
    <div class="chat-wrapper" :class="{ 'me': data.isMe }">
        <div class="chat clear">
            <div class="avatar" :class="{ 'me': data.isMe }"><img :src="data.user.portrait"></div>
            <div class="message" :class="{ 'me': data.isMe }">
                <p v-if="data.type==='text'">{{data.content}}</p>
                <img class="img" :src="data.content" v-if="data.type==='image'"/>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'ChatItem',
        props: {
            data: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        created() {
            console.log(this.data)
        }
    }
</script>

<style lang="scss" scoped>
    .chat-wrapper {
        padding: 10px 12px;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        &.me{
            padding-left: 480px;
        }
        .chat {
            .avatar {
                float: left;
                order: 2;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                &.me {
                    float: right;
                }
            }
            .message {
                float: left;
                width: 200px;
                order: 3;
                margin-left: 1px;
                padding: 10px 10px;
                font-size: 15px;
                line-height: 21px;
                border-radius: 6px;
                background: #fff;
                border: 1px solid #E0E0E0;
                &.me {
                    float: left;
                    border: none;
                    background: #303F9F;
                    color: #fff;
                    margin-left: 0;
                    margin-right: 10px;
                    order: 1;
                }
            }
        }

    }

    .img {
        width: 100%;
        height: auto;
    }
</style>
