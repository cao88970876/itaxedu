<!--直播-->
<template>
    <div class="dy-live">
        <img v-if="poster && showPoster" :src="poster" alt="">
        <div class="player"></div>
    </div>
</template>

<script>
    import {contentApi} from "../../api"

    export default {
        name: "dy-live",
        props: {
            roomId: {//房间号
                type: String,
                required: true,
            },
            limitTime: {//拦截时间
                type: Number,
            },
            poster: {//海报
                type: String,
            },
        },
        data() {
            return {
                weiHouApi: window.VHALL_SDK,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                timer: null,
                showPoster: true,
            }
        },
        mounted() {
            if (this.roomId) {
                this.getSign()
            }
        },
        destroyed() {
            this.weiHouApi.destroy()
            this.clearTimer()
        },
        methods: {
            getSign() {
                contentApi.liveSign({
                    username: this.userInfo.nickname || '暂无昵称',
                    roomid: this.roomId,
                }).then(resp => {
                    if (resp.status === 1) {
                        resp.data.videoContent = '.player'
                        this.playInit(resp.data)
                    }
                })
            },
            playInit(obj) {
                this.weiHouApi.init({
                    account: obj.account,
                    username: obj.username,
                    roomid: obj.roomid,
                    app_key: obj.app_key,
                    signedat: obj.signedat,
                    sign: obj.sign,
                    email: obj.email || "",
                    facedom: obj.facedom || "",
                    textdom: obj.textdom || "",
                    videoContent: obj.videoContent,
                    docContent: obj.docContent || "",
                    x5_video_type: '',
                    x5_video_fullscreen: '',
                    protocol: obj.protocol || "",
                })
                let count = 0
                this.timer = setInterval(() => {
                    this.$emit('current-time', count)
                    count++
                    if (this.limitTime && count >= this.limitTime) {
                        this.$emit('intercept', this.weiHouApi)
                        this.clearTimer()
                    }
                }, 1000)
                this.weiHouApi.on('playerReady', () => {
                    this.showPoster = false
                })
            },
            clearTimer() {
                if (this.timer) {
                    clearInterval(this.timer)
                }
            }
        },
        watch: {
            roomId(v1, v2) {
                if (v1 !== v2) {
                    this.clearTimer()
                    this.getSign()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixin";

    .dy-live {
        @include size(100%);
        position: relative;
        @include imgCover();
        img {
            position: absolute;
            top: 0;
            left: 0;
        }
        .player {
            @include size(100%);
            position: relative;
        }
    }
</style>
