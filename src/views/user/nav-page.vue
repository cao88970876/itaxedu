<template>
    <div class="nav-page">
        <div class="content_box clear">
            <usernavigation class="left"></usernavigation>
            <div class="right_box right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {usernavigation} from "../../components/public"

    export default {
        name: "nav-page",
        components: {usernavigation},
    }
</script>

<style lang="scss" scoped>
    .nav-page {
        .content_box {
            margin-top: 20px;
            .right_box {
                margin-top: 30px;
                width: 88%;
                border: 1px solid #eee;
                min-height: 574px;

            }
        }
    }
</style>
