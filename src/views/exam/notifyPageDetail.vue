<template>
    <div class="notifyPageDetail">
        <!--导航-->
        <navigation class="mt-20"></navigation>
        <follow-box :id="this.$route.query.addId" :show="true"></follow-box>
        <div class="main">
            <h3>{{ data.title }}</h3>
            <div class="time">{{ time(data.update_time) }}</div>
            <div class="text" v-html="data.introduce"></div>

        </div>
    </div>
</template>
<script>
import {Navigation,followBox} from '../../components/public'
import {utilsApi, storeApi} from '../../api'
export default {
    name: 'notifyPageDetail',
    components: {Navigation,followBox},
    data() {
        return {
            data: {}
        }
    },
    computed: {
        id() {
            return this.$route.query.id
        }
    },
    mounted() {
        this.getNotifyPageDetail();
    },
    methods: {
        getNotifyPageDetail() {
            storeApi.notifyPageDetail({
                id: this.id
            }).then(resp => {
                if (resp.status === 1) {
                    let data = resp.data;
                    this.data = data;
                    console.log(data)
                    // console.log(resp.data.data.*items)
                    // this.NotifyPageList = resp.data.data['*items']
                }
            })
        },
        time(time) {
            let date = new Date(time * 1000);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes();
            let s = date.getSeconds();
            return Y+M+D+h+m
        },
        delHtmlTag(str){
            return str.replace(/<[^>]+>/g,"");  //正则去掉所有的html标记
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";
    .main{
        width: 1200px;
        min-height: calc(100vh - 71px - 179.2px);
        padding: 50px 0;
        margin: 0 auto;
        box-sizing: border-box;
        h3{
            margin: 0;
            font-size: 28px;
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        .time{
            font-size: 14px;
            padding-bottom: 30px;
            font-size: 16px;
            color: #333;
            text-align: right;
            margin-bottom: 30px;
            border-bottom: 1px solid #eee;
        }
    }
</style>
<style>
    .notifyPageDetail .main .text p{
        margin: 0;
        font-size: 16px;
        color: #666;
        line-height: 28px;
        text-align: justify;
    }
</style>