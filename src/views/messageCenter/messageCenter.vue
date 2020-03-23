<template>
    <div class="messageCenter_page">
        <div class="messageCenter_left">
            <ul class="messageCenter_list">
                <li class="messageCenter_notice">
                    <div class="icon"></div>
                    <p>通知消息</p>
                </li>
                <li class="messageCenter_logistics">
                    <div class="icon"></div>
                    <p>物流消息</p>
                </li>
                <li class="messageCenter_dialogue">
                    <div class="icon"></div>
                    <p>对话消息</p>
                </li>

            </ul>
        </div>
        <div class="messageCenter_right">

        </div>

    </div>
</template>

<script>
    export default {
        name: "message -center"
    }
</script>

<style lang="scss" scoped>
    .messageCenter_page{
        display: flex;
        .messageCenter_left{
            width: 120px;
            height: 100%;
            background: antiquewhite;
            .messageCenter_list{
                li{
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    padding-top: 20px;
                    cursor: pointer;
                    .icon{
                        width: 27px;
                        height: 27px;
                        margin: 0 auto;
                        background: url("../../assets/image/ic_29.png");
                    }
                    p{
                        margin: 0;
                    }
                }
                .messageCenter_notice{

                }
            }
        }
        .messageCenter_right{
            flex:1;
            background: #999999;
        }
    }
</style>
