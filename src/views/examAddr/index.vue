<template>
    <div class="examAddressLink">
        <div class="LinkBox" v-for="(box, index1) in list" :key="index1">
            <router-link class="province" :to="{ path: 'exam', query: { address_id: box.id}}" v-if="box.id">{{box.province}}</router-link>
            <div v-else class="province">{{box.province}}</div>
            <div class="LinkItem" v-for="(item, index2) in box.sify" :key="index2">
                <div class="sify">
                    <router-link :to="{ path: 'exam', query: { address_id: box.id}}" v-if="box.id">{{item.name}}</router-link>
                    <router-link :to="{ path: 'exam', query: { address_id: item.id}}" v-else>{{item.name}}</router-link>
                </div>
                <div class="cityList" v-if="box.id">
                    <router-link v-for="(city, index3) in item.city" :key="index3" :to="{ path: 'exam', query: { address_id: typeof city == 'object' ? city.id : box.id}}">{{typeof city == 'object' ? city.name : city}}</router-link>
                </div>
                <div class="cityList" v-else>
                    <router-link v-for="(city, index3) in item.city" :key="index3" :to="{ path: 'exam', query: { address_id: typeof city == 'object' ? city.id : item.id}}">{{typeof city == 'object' ? city.name : city}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import addressLink from '../../../static/examAddressLink'
export default {
    name: "examAddressLink",
    data() {
        return{
            list: addressLink
        }
    },
    mounted(){
        
    },
    methods: {
        //获取地址传参数
        getQueryString(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .examAddressLink{
        padding-top: 70px;
        .LinkBox{
            width: 1200px;
            margin: 0 auto 55px;
            .province{
                display: block;
                width: 94px;
                height: 32px;
                line-height: 30px;
                text-align: center;
                font-size: 16px;
                font-weight: bold;
                border: 1px solid #E60012;
                border-radius: 4px;
                box-shadow: 0 0 10px #bbb;
                color: #fff;
                background: #E60012;
                box-sizing: border-box;
                margin-bottom: 14px;
            }
            .LinkItem{
                margin-bottom: 14px;
                display: flex;
                .sify{
                    width: 100px;
                    flex: 0 0 100px;
                    a{
                        display: block;
                        width: 90px;
                        height: 30px;
                        line-height: 28px;
                        text-align: center;
                        font-size: 14px;
                        border: 1px solid #E60012;
                        border-radius: 4px;
                        color: #E60012;
                        background: #fff;
                        box-sizing: border-box;
                    }
                }
                .cityList{
                    width: 100%;
                    display: flex;
                    flex-flow: row wrap;
                    align-content: flex-start;
                    a{
                        display: block;
                        width: 90px;
                        height: 30px;
                        margin-right:10px;
                        line-height: 28px;
                        text-align: center;
                        font-size: 14px;
                        border: 1px solid #333;
                        border-radius: 4px;
                        color: #333;
                        box-sizing: border-box;
                        margin-bottom: 10px;
                    }
                }
            }
            a{
                transition: all .3s;
                &:hover{
                    border: 1px solid #E60012 !important;
                    background: #E60012 !important;
                    color: #fff !important;
                }
            }
        }
    }
</style>

