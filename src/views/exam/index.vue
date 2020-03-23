<template>
    <div class="exam-module-page">
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
    
</style>
