<template>
    <div class="my-course-item pointer data-item" @click="$emit('click')">
        <div class="content clear pb-10">
            <div class="left thumb">
                <img :src="thumb">
                <div class="level-icon">
                    <img v-if="levelIcon" :src="levelIcon">
                </div>
                <div class="tag-name" v-text="courseItem.tag_name"></div>
            </div>
            <div class="left info ml-10">
                <div class="title ellipsis" v-text="courseItem.title" :title="courseItem.title"></div>
                <div class="author mt-10 mb-5 ellipsis">
                    <span v-text="courseItem.nickname"></span><span v-if="courseItem.experts_name" v-text="`[${courseItem.experts_name}]`"></span>
                </div>
                <div class="time ellipsis" v-if="courseItem.type===2">
                    时长：<span v-text="$filter.timeLongFilter(courseItem.duration)" :title="$filter.timeLongFilter(courseItem.duration)"></span>
                </div>
                <div class="time ellipsis" v-if="courseItem.type===1">
                    时间：<span v-text="timeLong" :title="timeLong"></span>
                </div>
                <div class="time ellipsis" v-if="courseItem.type===3">
                    时间：<span v-text="lineTimeLong" :title="lineTimeLong"></span>
                </div>
            </div>
        </div>
        <div class="footer clear">
            <div class="time left" v-text="$filter.timeFilter(courseItem['create_time'],'YYYY-MM-HH HH:mm:ss')"></div>
            <div class="right">
                <div class="mr-40">
                    <span class="money" v-text="courseItem.price" v-if="courseItem.price!=='0.00'"></span>
                    <span class="current-price free-money" v-else>免费</span>
                </div>
            </div>
            <span v-if="!courseItem['is_comment']" class="icon edit pointer" @click.stop="$emit('add-comments')"></span>
        </div>
    </div>
</template>

<script>
    import {utilsApi} from "../../api"

    /**
     * prop
     *      courseItem  [object]        课程对象
     * event
     *      add-comments                点击评论图标时触发
     */
    export default {
        name: "my-course-item",
        props: {
            courseItem: {
                type: Object,
                required: true,
            }
        },
        computed: {
            thumb() {
                if (this.courseItem.thumb)
                    return utilsApi.api + this.courseItem.thumb;
                return null;
            },
            levelIcon() {
                if (this.courseItem['level_icon'])
                    return utilsApi.api + this.courseItem['level_icon'];
                return null;
            },
            lineTimeLong() {
                return this.$filter.timeFilter(this.courseItem.line_start_time) + '-' + this.$filter.timeFilter(this.courseItem.line_end_time);
            },
            timeLong() {
                return this.$filter.timeFilter(this.courseItem['start_time']) + '-' + this.$filter.timeFilter(this.courseItem.end_time);
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .my-course-item {
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

                .tag-name {
                    padding: 2px 8px;
                    border-radius: 10px;
                    position: absolute;
                    color: #fff;
                    background-color: $fontColorBlue;
                    right: 7px;
                    bottom: 7px;
                    transform: scale(.8, .8);
                    transform-origin: 100% 100%;
                }
            }
            .info {
                width: 110px;
            }
            .title {
                font-weight: bold;
                width: 100%;
            }
            .author {
                width: 100%;
            }
            .time {
                width: 100%;
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
