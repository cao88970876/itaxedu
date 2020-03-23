<template>
    <div class="financeTaxHome_page page-content">
        <navigation class="mt-20"></navigation>
        <search-input class="mt-20" v-model="keywords"  @search="$router.push({name:'searchFinanceTax',params: {keywords}})" >
            <!--)" -->
        </search-input>
        <banner type="7"></banner>
        <div class="mains">
            <ul class="clear">
                <li class="left" v-for="item in financeTaxList" @click="goClassify(item)"
                >
                    <div class="financeTax_show">
                        <img :src="imgPath+item.icon" alt="">
                    </div>
                    <div class="financeTax_name" v-text="item.name">
                        wewqe
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import {Navigation, SearchInput, Banner} from '../../components/public'
    import {financeTaxAPi} from '../../api'
    import utils from '../../assets/js/utils';

    export default {
        components: {Navigation, SearchInput, Banner},
        name: "finance-tax-home",
        data() {
            return {
                imgPath: utils.api,
                financeTaxList: [],
                keywords: ''
            }
        },
        mounted() {
            financeTaxAPi.financeTaxHome({}).then((res) => {
                if (res.status === 1) {
                    this.financeTaxList = res.data
                    console.log(res.data)
                }
            })
        },
        methods:{
            goClassify(item){
                console.log(item)
                this.$router.push({name:'financeTaxClassify',query:{params:encodeURIComponent(JSON.stringify(item))}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .financeTaxHome_page {
        .mains {
            margin-top: 20px;
            ul {
                @include panelUl(285px, 220px, '4n+1');
                .financeTax_show {
                    height: 180px;
                    background: #999999;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .financeTax_name {
                    margin-top: 10px;
                    text-align: center;
                    font-size: 14px;
                }
            }
        }
    }
</style>
