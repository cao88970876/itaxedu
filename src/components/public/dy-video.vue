<!--录播-->
<template>
    <div class="dy-video">
        <video class="video-js vjs-big-play-centered"></video>
    </div>
</template>

<script>
    /**
     * props:
     *      width           视频宽度，默认720px
     *      height          视频高度，默认400px
     *      src             视频源
     *      poster          未播放时显示的海报
     *      limit-time      限制播放时间
     * event:
     *      current-time    获取视频实时时间
     *      intercept       限制时间到达后出发拦截事件
     *      time            视频播放到某个时刻弹出答题框
     */
    export default {
        name: "dy-video",
        props: {
            width: {
                type: Number,
                default: 720,
            },
            height: {
                type: Number,
                default: 400,
            },
            src: {
                type: String,
                required: true,
            },
            poster: {
                type: String,
            },
            limitTime: {
                type: Number,
            },
            time: {
                type: Number,
            }

        },
        data() {
            return {
                player: null
            }
        },
        mounted() {
            this.instancePlay()
            this.player.on('timeupdate', () => {
                const currentTime = this.player.currentTime()
                this.$emit('current-time', currentTime,this.player)
                if (this.limitTime && currentTime >= this.limitTime) {
                    this.$emit('intercept', this.player)
                }
                // if(this.time && currentTime >= this.time){
                //     this.$emit('answer', this.player)
                // }
            })
        },
        methods: {
            instancePlay() {
                let conf = {
                    controls: true,
                    autoplay: false,
                    width: this.width,
                    height: this.height,
                    playbackRates: [0.5, 1, 1.5, 2],
                }
                this.player = VideoJs(this.$el.querySelector('.video-js'), conf)
            },
            play() {
                this.player.play()
            },
            pause() {
                this.player.pause()
            },
        },
        watch: {
            src(v1, v2) {
                if (v1 !== v2) {
                    if (this.player) {
                        this.player.src(v1)
                        this.player.controls(true)
                    } else {
                        this.instancePlay()
                    }
                }
            },
            poster(v1, v2) {
                if (v1 !== v2) {
                    this.player.poster(v1)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dy-video {
    }
</style>
