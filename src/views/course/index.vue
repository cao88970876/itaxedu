<template>
    <div class="course-module-page">
        <app-header></app-header>
        <div class="page-content">
            <router-view/>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {AppHeader, AppFooter} from '../../components/public'

    export default {
        name: "index",
        components: {AppHeader, AppFooter},
    }
</script>

<style lang="scss">
    @import "../../assets/scss/constant";

    .course-module-page {

        .course-type {
            background-color: #f1f1f1;
            padding: 8px;
            * {
                box-sizing: border-box;
            }
            & > a {
                display: block;
                margin: 0 20px;
                line-height: 24px;
                color: #999;
                font-size: 14px;
                cursor: pointer;

                &.router-link-active {
                    color: #333;
                    border-bottom: $fontColorRed 3px solid;
                }
            }
        }

    }

</style>
