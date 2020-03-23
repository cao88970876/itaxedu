<template>
    <div class="my-study personal-center-modules">
        <div class="module-name">我的学习</div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "my-study",
    }
</script>
<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .my-study {
        @include borderBox();
    }
</style>
