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
            if (this.$route.name === 'risk')
                this.$router.push({name: 'riskAssessment'})
        },
        watch: {
            currentRoute(v1, v2) {
                if (v1 !== v2 && v1 === 'risk') {
                    this.$router.push({name: 'riskAssessment'})
                }
            }
        }
    }
</script>

<style scoped>

</style>
