<template>
    <div class="project-item pointer data-item" :class="size+'-size'" @click="emitClick">
        <div class="project-img left">
            <img :src="imgPath+projectItem.cover_img">
        </div>
        <div class="project-info right">
            <div class="name" v-text="projectItem.name"></div>
            <div class="address">项目地址：<span v-text="projectItem.address"></span></div>
            <div class="time">
                项目时间：<span v-text="$filter.timeFilter(projectItem.start_time,'YYYY年MM月DD日')"></span>~<span v-text="$filter.timeFilter(projectItem.end_time,'YYYY年MM月DD日')"></span>
            </div>
            <div class="date">报名截止日期：<span v-text="$filter.timeFilter(projectItem.apply_time,'YYYY年MM月DD日')"></span>
            </div>
            <div class="teacher">讲师：<span v-text="projectItem.lecturer"></span></div>
            <div class="price clear">
                <span class="old-price money" v-text="projectItem.price" v-if="projectItem.discounts_price!=='0.00'" ></span>
                <span class="current-price money" v-text="projectItem.discounts_price" v-if="projectItem.discounts_price!=='0.00'" ></span>
                <span class="free-money" v-else>免费</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {utilsApi} from '../../api'

    export default {
        name: "project-item",
        props: {
            projectItem: {
                type: Object,
            },
            size: {
                type: String,
            },
            autoJump: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                imgPath: utilsApi.api,
            }
        },
        methods: {
            emitClick() {
                this.$emit('click')
                if (this.to) {
                    this.$router.push(this.to)
                } else if (this.autoJump) {
                    this.$router.push({
                        name: 'projectDetails',
                        query: {
                            id: this.projectItem.id
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixin";

    .project-item {
        @include size(590px, 180px);
        padding: 10px;

        .project-img {
            width: 240px;
            height: 100%;
            background-color: #ccc;
            border-radius: 10px;
            overflow: hidden;
            @include imgCover();
        }
        .project-info {
            width: 315px;
            .name {
                font-size: 14px;
                font-weight: bold;
                margin-top: 3px;
            }
            .address {
                margin-top: 13px;
            }
            .time, .date, .teacher, .price {
                margin-top: 10px;
            }
        }

        &.small-size {
            .project-img {
                width: 210px;
            }
            .project-info {
                width: 260px;
            }
        }
    }
</style>
