<template>
    <div class="index-panel">
        <div class="index-panel-heading clear">
            <div class="left" v-text="heading"></div>
            <div class="right" v-if="more">
                <router-link :to="more">更多&gt;</router-link>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    /**
     * 首页各个模块面板
     */
    export default {
        name: "index-panel",
        props: {
            heading: {
                type: String,
                required: true,
            },
            more: {
                type: Object,
                required: false,
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";

    .index-panel {
        &-heading {
            border-bottom: 2px solid $fontColorRed;
            div:nth-child(1) {
                background-color: $fontColorRed;
                color: #fff;
                border-radius: 8px 8px 0 0;
                font-size: 14px;
                font-weight: bold;
                padding: 5px 20px;
            }
            div:nth-child(2) {
                line-height: 28px;
                a {
                    color: #999;
                    font-weight: bold;
                }
            }
        }
    }
</style>
