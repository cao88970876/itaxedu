<template>
    <div class="my-book-item pointer data-item" @click="$emit('click')">
        <div class="content clear pb-10">
            <div class="left thumb">
                <img :src="thumb">
                <div class="level-icon">
                    <img v-if="levelIcon" :src="levelIcon">
                </div>
            </div>
            <div class="left info ml-10">
                <div class="title ellipsis" v-text="bookItem.title"></div>
                <div class="desc mt-5" v-text="bookItem.description"></div>
                <div class="time" v-if="bookItem.type!==2">共<span v-text="bookItem.logs"></span>章</div>
            </div>
        </div>
        <div class="footer clear">
            <div class="time left">{{bookItem.create_time|timeFilter('YYYY-MM-HH HH:mm:ss')}}</div>
            <div class="right">
                <div class="mr-40">
                    <span class="money" v-text="bookItem.price" v-if="bookItem.price!=='0.00'"></span>
                    <span class="current-price free-money" v-else>免费</span>
                </div>
            </div>
            <span v-if="!bookItem['is_comment']" class="icon edit pointer" @click.stop="$emit('add-comments')"></span>
        </div>
    </div>
</template>

<script>
    import {utilsApi} from "../../api"

    /**
     * prop
     *      bookItem    [object]        课程对象
     * event
     *      add-comments                点击评论图标时触发
     */
    export default {
        name: "my-book-item",
        props: {
            bookItem: {
                type: Object,
            }
        },
        computed: {
            thumb() {
                if (this.bookItem.thumb) {
                    return utilsApi.api + this.bookItem.thumb
                }
            },
            levelIcon() {
                if (this.bookItem.level_icon)
                    return utilsApi.api + this.bookItem.level_icon
                return null
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .my-book-item {
        @include borderBox();
        @include size(241px, 120px);
        padding: 8px;

        .content {
            border-bottom: 1px solid #eee;
            .thumb {
                @include size(100px, 70px);
                @include imgCover();
                border-radius: 10px;
                background-color: #ccc;
                overflow: hidden;
                position: relative;

                .level-icon {
                    @include size(16px);
                    position: absolute;
                    top: 7px;
                    left: 7px;
                    img {
                        object-fit: contain;
                    }
                }
            }
            .info {
                width: 110px;
            }
            .title {
                font-weight: bold;
                width: 100%;
            }
            .desc {
                @include size(100%, 32px);
                color: #999;
                overflow: hidden;
            }
        }
        .footer {
            line-height: 30px;
            position: relative;
            .time {
                color: #999;
            }
            .money {
                display: block;
                color: $fontColorRed;
                text-align: right;
                font-size: 13px;
            }
            .icon {
                display: block;
                @include size(14px);
                position: absolute;
                right: 5px;
                top: 7px;
            }
        }
    }
</style>
