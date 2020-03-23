<template>
    <div class="follow-nav clear mt-20">
        <router-link class="left" :to="{name: 'examNote'}">考试须知</router-link>
        <router-link class="left" :to="{name: 'examinfor'}">完善信息</router-link>
        <router-link class="left" :to="{name: 'downlineCourse'}">课程学习</router-link>
        <!-- <router-link class="left" :to="{name: 'downlineCourse'}">考试</router-link> -->
        <router-link class="left" :to="{name: 'downlineCourse'}">生成证书</router-link>
    </div>
</template>

<script>
    export default {
        name: "follow-nav",
        data() {
            
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";

    .follow-nav {
        padding-left: 20px;
        height: 32px;
        border-bottom: 1px solid #E9E9E9;
        font-size: 18px;
        a {
            color: #333;
            display: block;
            height: 32px;
            box-sizing: border-box;
            border-bottom-right-radius: 2px;
            border-bottom-left-radius: 2px;
            &.router-link-active {
                color: $fontColorRed;
                border-bottom: 4px solid #E60012;
            }
            &:hover {
                color: $fontColorRed;
            }
            & + a {
                margin-left: 69px;
            }
        }
        
    }
</style>
