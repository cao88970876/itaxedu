<template>
    <div class="books">
        <app-header></app-header>
        <router-view/>
    </div>
</template>

<script>
    import {AppHeader} from '../../components/public'

    export default {
        name: "index",
        components: {AppHeader},
    }
</script>

<style scoped>
    .books {
    }
</style>
