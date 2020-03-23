<template>
    <div class="about">
        <app-header></app-header>
        <div class="page-content">
            <div class="us">【关于我们】</div>
            <div class="introduce" v-html="mains.content">
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import api from '@/api/protocpl'
    import {AppHeader, AppFooter} from '../../components/public'

    export default {
        name: "aboutUs",
        components: {AppHeader, AppFooter},
        data() {
            return {
                mains: {}
            }
        },
        mounted() {
            api.getProtocpl({
                type: '3'
            }).then((res) => {
                if (res.status === 1) {
                    this.mains = res.data.data[0]
                    console.log(res.data.data)
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .about {
        .us {
            text-align: center;
            font-family: PingFangSC-Semibold;
            font-size: 40px;
            color: #F44336;
        }
        .ineroduce {
            font-family: PingFangSC-Medium;
            font-size: 17px;
            color: #333333;
            line-height: 36px;

        }
    }
</style>
