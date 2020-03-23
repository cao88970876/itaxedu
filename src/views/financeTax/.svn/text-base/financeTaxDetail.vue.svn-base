<template>
    <div class="financeTaxDetail_page page-content">
        <navigation class="mt-20"></navigation>
        <div class="title" v-text="detail.title">

        </div>
        <div class="content" v-html="detail.content">

        </div>
    </div>
</template>

<script>
    import {financeTaxAPi} from '../../api'
    import {Navigation} from '../../components/public'
    export default {
        name: "finance-tax-detail",
        components: {Navigation},
        data() {
            return {
                detail:{

                }
            }
        },
        mounted() {
            this.id = this.$route.query.id
            financeTaxAPi.financeTaxDetail({
                id: this.id
            }).then((res) => {
                if (res.status === 1) {
                    console.log(res.data)
                    this.detail = res.data
                }
            })
        },
    }
</script>

<style lang="scss" scoped>
    .financeTaxDetail_page {

        .title {
            text-align: center;
            color: #333333;
            font-weight: bold;
            font-size: 16px;
            margin: 60px 0;
        }
    }
</style>
