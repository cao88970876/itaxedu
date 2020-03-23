<template>
    <div class="course-item pointer data-item" @click="emitClick">
        <div class="course-img">
            <img :src="thumb">
            <div class="level-icon">
                <img v-if="levelIcon" :src="levelIcon">
            </div>
            <div class="type" v-text="courseItem.tag_name"></div>
        </div>
        <div class="course-inf">
            <div class="course-title ellipsis" :title="courseItem.title" v-text="courseItem.title"></div>
            <div class="course-teacher">
                <span v-text="courseItem.nickname"></span><span v-if="courseItem.experts_name" v-text="`[${courseItem.experts_name}]`"></span>
            </div>
            <div class="time ellipsis" v-if="courseItem.type===1">
                时间：<span v-text="timeLong" :title="timeLong"></span>
            </div>
            <div class="time ellipsis" v-if="courseItem.type===2">
                时长：<span v-text="videoTimeLong" :title="videoTimeLong"></span>
            </div>
            <div class="time ellipsis" v-if="courseItem.type===3">
                时间：<span v-text="lineTimeLong" :title="lineTimeLong"></span>
            </div>
            <div class="course-price clear">
                <div class="left" v-if="isRecord">
                    <template v-if="record.status===1">
                        <template v-if="record.catalogName">{{record.catalogName}}</template>
                        <template v-else>已学习{{record.minute}}分钟</template>
                    </template>
                </div>
                <template v-else>
                    <div class="left" v-if="courseItem.type===1"><span v-text="courseItem.make_count"></span>人已预约</div>
                    <div class="left" v-if="courseItem.type===2"><span v-text="courseItem.sales_volume"></span>人已购买
                    </div>
                    <div class="left" v-if="courseItem.type===3"><span v-text="courseItem.make_count"></span>人已报名</div>
                </template>
                <div class="right" v-if="!isRecord">
                    <template v-if="courseItem.price!=='0.00'">
                        <span class="old-price money" v-text="courseItem.original_price"></span>
                        <span class="current-price money" v-text="courseItem.price"></span>
                    </template>
                    <span class="current-price free-money" v-else>免费</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {utilsApi} from '../../api'

    export default {
        name: "course-item",
        props: {
            courseItem: {
                type: Object,
                required: true,
            },
            to: {
                type: Object,
                default: null
            },
            autoJump: {
                type: Boolean,
                default: true
            },
            isRecord: {
                type: Boolean,
                default: false
            },
            record: {
                type: Object,
            }
        },
        computed: {
            thumb() {
                return this.courseItem.thumb ? utilsApi.api + this.courseItem.thumb : null
            },
            levelIcon() {
                if (this.courseItem['level_icon'])
                    return utilsApi.api + this.courseItem['level_icon'];
                return null;
            },
            lineTimeLong() {
                let result = this.$filter.timeFilter(this.courseItem.line_start_time, 'M月DD日 HH:mm') + '-' + this.$filter.timeFilter(this.courseItem.line_end_time, 'HH:mm');
                if (this.courseItem.is_one === 2) {
                    result += `/${this.courseItem.table_count}节课`
                }
                return result
            },
            timeLong() {
                let result = this.$filter.timeFilter(this.courseItem['start_time']) + '-' + this.$filter.timeFilter(this.courseItem.end_time);
                if (this.courseItem.is_one === 2) {
                    result += `/${this.courseItem.table_count}节课`
                }
                return result
            },
            videoTimeLong() {
                let result = this.$filter.timeLongFilter(this.courseItem.duration);
                if (this.courseItem.is_one === 2) {
                    result += `/${this.courseItem.table_count}节课`
                }
                return result
            },
        },
        methods: {
            emitClick() {
                this.$emit('click')
                if (this.to) {
                    this.$router.push(this.to)
                } else if (this.autoJump) {
                    var names = ['liveCourseDetail', 'videoCourseDetail', 'downlineCourseDetail']
                    this.$router.push({
                        name: names[this.courseItem.type - 1],
                        params: {
                            courseId: this.courseItem.id,
                            tabId: 0,
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .course-item {
        @include size(285px, 305px);

        .course-img {
            background-color: #ccc;
            height: 190px;
            position: relative;
            overflow: hidden;
            @include imgCover();

            .level-icon {
                @include size(16px);
                position: absolute;
                top: 7px;
                left: 7px;
                img {
                    object-fit: contain;
                }
            }

            .type {
                position: absolute;
                background-color: $fontColorBlue;
                color: #fff;
                right: 10px;
                bottom: 10px;
                padding: 3px 13px;
                border-radius: 20px;
            }
        }
        .course-inf {
            padding: 10px 15px;

            .course-title {
                font-size: 14px;
                font-weight: bold;
            }
            .course-teacher, .course-time {
                margin-top: 6px;
            }
            .course-price {
                margin-top: 14px;
                .left {
                    color: #999;
                }
            }
        }
    }
</style>
