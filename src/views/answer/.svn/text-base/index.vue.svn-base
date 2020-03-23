<template>
    <div>
        <app-header></app-header>
        <router-view/>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {AppHeader,AppFooter} from '../../components/public'
    export default {
        name: "index",
        components: {AppHeader,AppFooter},
        computed: {
            currentRoute() {
                return this.$route.name
            }
        },
        mounted() {
            if (this.$route.name === 'answer')
                this.$router.push({name: 'answerList'})
        },
        watch: {
            currentRoute(v1, v2) {
                if (v1 !== v2 && v1 === 'answer') {
                    this.$router.push({name: 'answerList'})
                }
            }
        }
    }
</script>

<style scoped>

</style>
