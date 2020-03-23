<template>
    <section>
        <audio ref="audio" :src='audioPath+data.voice_url'></audio>
        <div class="vioce-btn" style="margin-top:6px" @click="handleAudio">
            <span>{{duration}}</span>
            <img src="../../assets/image/ic_82.png" alt="img"/>
        </div>
    </section>
</template>

<script>
    import utils from '../../assets/js/utils'
    export default {
        name: "m-audio",
        data() {
            return {
                audioPath: utils.api,
                duration: "点击播放"
            };
        },
        props: {
            data: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.audio.addEventListener(
                    "timeupdate",
                    () => {
                        this.duration =
                            (this.$refs.audio.duration - this.$refs.audio.currentTime).toFixed(2) + "s";
                    },
                    false
                );
            });
        },
        computed: {},
        methods: {
            handleAudio() {
                this.$refs.audio.play();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .vioce-btn {
        width: 100px;
        height: 40px;
        background: #303f9f;
        border-radius: 10px;
        line-height: 40px;
        text-align: right;
        span {
            display: inline-block;
            vertical-align: middle;
            color: #fff;
            padding-right: 4px;
        }
        img {
            display: inline-block;
            width: 14px;
            height: 18px;
            vertical-align: middle;
            margin-right: 12px;
        }
    }
</style>
