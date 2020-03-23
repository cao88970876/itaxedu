<template>
    <div class="protocol">
        <div class="protocol_title">中财讯</div>
        <div class="protocol_mains">
            <div class="mians_title">用户服务协议</div>
            <div class="mains" v-html="protocol.content"></div>
        </div>
    </div>
</template>
<script>
    import api from '@/api/protocpl'

    export default {
        name: "protocol",
        data() {
          return{
              protocol:{}
          }
        },
        created() {
            api.getProtocpl({
                type: '1'
            }).then((res) => {
                if (res.status === 1) {
                    this.protocol = res.data.data[0]
                    console.log(res.data)
                }
            })
        },
    }
</script>

<style lang="scss" scoped>
    .protocol {
        .protocol_title {
            margin-top: 20px;
            margin-left: 20px;
            font-size: 20px;
            color: #333333;
            letter-spacing: 0;
        }
        .protocol_mains {
            .mians_title {
                font-size: 40px;
                color: #333333;
                letter-spacing: 0;
                text-align: center;
                margin: 40px auto;
            }
            .mains {
                width: 1200px;
                font-size: 18px;
                color: #333333;
                letter-spacing: 0;
                line-height: 26px;
                margin: 0 auto;
            }
        }
    }
</style>
