<template>
    <div class="answer-item pointer data-item" @click="$emit('click')">
        <div class="user-img clear">
            <div class="left clear">
                <div class="left img">
                    <img :src="face">
                </div>
                <div class="left name ml-10" v-text="answerItem.nickname"></div>
            </div>
            <div class="right date" v-text="$filter.timeFilter(answerItem['add_time'])"></div>
        </div>
        <div class="content mt-5" v-text="answerItem.contents"></div>
        <div class="from"  v-if="answerItem.expertise">{{answerItem.true_name}} | {{answerItem.expertise}}</div>
    </div>
</template>

<script>
    import {utilsApi} from "../../api";

    export default {
        name: "answer-item",
        props: {
            answerItem: {
                type: Object
            }
        },
        computed: {
            face() {
                if (this.answerItem.face) {
                    return utilsApi.api + this.answerItem.face
                }
                return null
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixin";

    .answer-item {
        @include size(590px, 175px);
        padding: 20px 15px;
        position: relative;

        .img {
            @include size(50px);
            @include imgCover();
            background-color: #ccc;
            border-radius: 25px;
            overflow: hidden;
        }
        .name {
            line-height: 50px;
            font-size: 14px;
            font-weight: bold;
        }
        .date {
            color: #999;
        }
        .content {
            line-height: 18px;
            max-height: 52px;
            overflow: hidden;
        }
        .from {
            background-color: #303f9f;
            color: #fff;
            border-radius: 5px;
            padding: 3px 5px;
            display: inline-block;
            margin-top: 8px;
            position: absolute;
            bottom: 20px;
            left: 15px;
        }
    }
</style>
