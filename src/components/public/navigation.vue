<template>
    <nav class="navigation">
        <!--TODO 路由替换-->
        <ul class="clear">
            <li class="left">
                <router-link :to="{name: 'index'}">首页</router-link>
            </li>
            <li class="left">
                <router-link :to="{name: 'course'}">课程学习</router-link>
            </li>
            <li class="left">
                <router-link :to="{name: 'special'}">知识专栏</router-link>
            </li>
            <li class="left">
                <router-link :to="{name: 'books'}">电子书籍</router-link>
            </li>
            <li class="left">
                <router-link :to="{name: 'fineGoods'}">精品商城</router-link>
            </li>
            <li class="left">
                <router-link :to="{name: 'project'}">项目策划</router-link>
            </li>
            <li class="left" v-if="userInfo.type===2">
                <router-link :to="{name: 'unanswered'}">财税问答</router-link>
            </li>
            <li class="left" v-else>
                <router-link :to="{name: 'answer'}">财税问答</router-link>
            </li>
            <!-- <li class="left">
                <router-link :to="{name: 'task'}">任务悬赏</router-link>
            </li> -->
            <li class="left">
                <a style="color:red;font-weight:blod;" href="http://39.104.189.183/free_course.html" target="_blank">免费课程</a>
            </li>
            <li class="left">
                <router-link :to="{name: 'recruit'}">企业招聘</router-link>
            </li>
            <li class="left">
                <router-link :to="{name: 'financeTax'}">财税库</router-link>
            </li>
            <li class="left">
                <router-link :to="{name: 'risk'}">风险评估</router-link>
            </li>
            <li class="left">
                <router-link :to="{name: 'examAddr'}">继续教育</router-link>
            </li>
            <li class="left">
                <router-link :to="{name: 'anwserAi'}">智能答疑</router-link>
            </li>
            <li class="left">
                <router-link :to="{name: 'userIndex'}">个人中心</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "navigation",
        data() {
            return {
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";

    .navigation {
        ul {
            list-style: none;
            font-size: 14px;
            font-weight: bold;

            li {
                a {
                    color: #333;

                    &.router-link-active, &:hover {
                        color: $fontColorRed;
                    }
                }
                & + li {
                    margin-left: 35px;
                }
            }
        }
    }
</style>
