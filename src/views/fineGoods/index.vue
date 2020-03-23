<template>
    <div>
        <app-header></app-header>
        <router-view/>
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

<style scoped>

</style>
