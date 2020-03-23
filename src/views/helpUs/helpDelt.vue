<template>
    <div class="helpDelt_page">
        <app-header></app-header>
        <div class="mains page-content">
            <div class="goPage">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ name: 'helpUs' }">帮助中心</el-breadcrumb-item>
                    <el-breadcrumb-item>详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="title" v-text="params.title">
            </div>
            <div v-html="params.content">
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {AppHeader, AppFooter} from '../../components/public'

    export default {
        name: "help-delt",
        components: {AppHeader, AppFooter},
        data() {
            return {
                params: {}
            }
        },
        mounted() {
            this.params = JSON.parse(decodeURIComponent(this.$route.query.params));
            console.log(this.params)
        },
    }
</script>

<style lang="scss" scoped>
    .helpDelt_page {
        .mains {
            padding-bottom: 60px;
            .goPage {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 50px;
            }
            .title {
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 40px;
            }
        }
    }
</style>
