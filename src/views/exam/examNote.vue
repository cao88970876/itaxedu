<template>
    <div class="exampage">
        <!--导航-->
        <navigation class="mt-20"></navigation>
        <follow-box :id="this.$route.query.address_id || address_id"></follow-box>
        <div class="follow-nav clear mt-20">
            <router-link class="left" :to="{path: 'examNote', query: { address_id: address_id}}">规则须知</router-link>
            <router-link class="left" :to="{path: 'examinfor', query: { address_id: address_id}}">完善信息</router-link>
            <router-link class="left" :to="{path: 'examStudy', query: { address_id: address_id}}">课程学习</router-link>
            <router-link class="left" :to="{path: 'examCertificate', query: { address_id: address_id}}">生成证书</router-link>
            <!-- <router-link class="left" :to="{path: 'examEntrance', query: { address_id: address_id}}">考试</router-link> -->
        </div>
        <div class="icon follow1"></div>
        <div class="exam-note">
            <div class="icon follow2 left"></div>
            <div class="follow-content left">
                <!-- <p>考试须知</p>
                <p>学员学满22.5小时后，即可得到90学分，学分同时提交至财务部门</p>
                <p>（学习之前请先完善信息，否则会影响生成证书，请点击下方按钮进行完善信息）</p> -->
                <p v-html="ruleMessage"></p>
                <router-link class="follow-content left" :to="{path: 'examinfor', query: { address_id: address_id}}"><span>完善信息</span><img src="../../assets/image/exam-follow-btn.png" alt=""></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import {Navigation,followBox} from '../../components/public'
import {examApi} from '../../api'
export default {
    name: "examNote",
    components: {Navigation,followBox},
    data() {
        return{
            address: {
                'sichuan.itaxedu.com': "3350",
                'gd.itaxedu.com': "3357",
                'sz.itaxedu.com': "4500"
            },
            ruleMessage:'',
            address_id: this.$route.query.address_id || '179'
        }
    },
    mounted(){
        if(this.getQueryString('id') != null){
            examApi.getUidData({
                uid: this.getQueryString('id')
            }).then(resp => {
                if (resp.status === 1) {
                    sessionStorage.setItem('userInfo',JSON.stringify(resp.data));
                    this.$router.push({name: 'empy'});
                } else {
                    this.$message({
                        message: resp['msg'],
                        type: 'error'
                    });
                }
            });
        }else{
            if(!sessionStorage.getItem('userInfo')){
                this.$helper.utils.storage.set('loginLink', 'examNote');
                this.$router.push({name: 'login', query: { address_id: this.$route.query.address_id || ''}})
            }
        }
        this.addressUrl();
        this.getRuleMessage();

    },
    methods: {
        addressUrl(){
            let address = this.address;
            for(let i in address){
                if(document.domain == i){
                    this.address_id = address[i];
                }
                return;
            }
        },
        getRuleMessage(){
            examApi.rule({
                address_id:this.$route.query.address_id
            }).then(resp=>{
                if(resp.status===2){
                    this.ruleMessage = '未配置规则'
                }else{
                    this.ruleMessage = resp.data
                }
            });
        },
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

    .exampage{



        .follow-nav {
            padding-left: 20px;
            height: 32px;
            border-bottom: 1px solid #E9E9E9;
            font-size: 18px;
            a {
                color: #333;
                display: block;
                height: 32px;
                box-sizing: border-box;
                border-bottom-right-radius: 2px;
                border-bottom-left-radius: 2px;
                &.router-link-active {
                    color: $fontColorRed;
                    border-bottom: 4px solid #E60012;
                }
                &:hover {
                    color: $fontColorRed;
                }
                & + a {
                    margin-left: 69px;
                }
            }

        }

        .follow1 {
            @include size (1200px, 69px);
            display: block;
            margin: 43px 0 65px;
        }
        .exam-note{
            overflow: hidden;
            .follow2 {
                @include size (401px, 201px);
            }
            .follow-content{
                p:nth-child(1){
                    color: #333;
                    font-size: 20px;
                    margin-bottom: 19px;
                }
                p:nth-child(2){
                    color: #333;
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                p:nth-child(3){
                    color: #1687EF;
                    font-size: 16px;
                    margin-bottom: 30px;
                }
                .follow-content{
                    display: block;
                    border: none;
                    width: 245px;
                    height: 44px;
                    background: #303F9F;
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                    line-height: 44px;
                    border-radius: 4px;
                    span{
                        margin-right: 11px;
                    }
                }
            }
        }

    }
</style>

