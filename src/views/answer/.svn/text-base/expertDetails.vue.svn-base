<template>
    <div class="expertDetails_page page-content">
        <div class="nav">
            <navigation></navigation>
        </div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/answer/answerList' }">财税问答</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/answer/searchExpert'}"> 找专家</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/answer/expertDetails'}">专家详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="expert">
            <div class="header_img"><img :src="imgPath+expert.face"></div>
            <div class="name" v-text="expert.true_name"></div>
            <div class="zhuanye" v-text="expert.experts_type"></div>
        </div>
        <div class="good">
            <div>
                擅长领域
            </div>
            <div v-text="expert.expertise">注册税务师、高级会计师、高级经济师、答会计税务</div>
        </div>
        <div class="beGood">
            <div>
                答疑方向
            </div>
            <div v-text="expert.answer">
            </div>
        </div>
        <div class="pay">
            支付：<span v-text="expert.quiz_discount_price" class="money"></span>
        </div>
        <div class="answerNum">
            已有{{expert.quiz_num}}人提问
        </div>
        <div class="answerBtn">
            <button @click="goAnswerPage">立即提问</button>
        </div>
        <self-modal :show.sync="loginTip">
            <div class="pb-30">
                <div class="login-tip">欢迎来到中财讯</div>
                <div class="modal-btn">
                    <a class="pointer" @click="$router.push({name: 'login'})">去登录</a>
                    <a class="pointer ml-20" @click="loginTip=false">先看看</a>
                </div>
            </div>
        </self-modal>
    </div>
</template>

<script>

    import api from '@/api/answerApi'
    import utils from '../../assets/js/utils';
    import {Navigation,SelfModal} from '../../components/public'
    export default {
        name: "expert-details",
        components: {
            Navigation,
            SelfModal
        },
        data(){
            return{
                imgPath: utils.api,
                uid:'',
                expert:{},
                loginTip: false,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        mounted(){
            this.uid = this.$route.query.id;
            api.expertDetails({
                expert_uid:this.uid
            }).then((res)=>{
                this.expert = res.data
                console.log(res.data)
            })
        },
        methods:{
            goAnswerPage(){
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                this.$router.push({name: 'searchExpertQuzi',query:{id:this.uid,price:this.expert.quiz_discount_price}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .expertDetails_page {
        .nav {
            padding-bottom: 20px;
            border-bottom: 2px solid #f1f1f1;
            margin-bottom: 20px;
        }
        .expert {
            margin: 20px 0;
            width: 100%;
            padding: 20px 0;
            box-sizing: border-box;
            border-radius: 10px;
            box-shadow: 0 0 10px #999;
            .header_img {
                margin: 0 auto;
                width: 100px;
                height: 100px;

                img{
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .name {
                margin: 5px 0;
                text-align: center;
                font-weight: bold;
                font-size: 18px;
            }
            .zhuanye {
                text-align: center;
                color: #999999;
                font-size: 16px;
            }
        }
        .good {
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 10px;
            div:nth-child(1) {
                font-weight: bold;
                font-size: 14px;
            }
            div:nth-child(2) {
                color: #999999;
                margin-top: 10px;
            }
        }
        .beGood {
            margin-top: 10px;
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 10px;
            div:nth-child(1) {
                font-weight: bold;
                font-size: 14px;
            }
            div:nth-child(2) {
                margin-top: 10px;
                font-size: 14px;
            }
        }
        .pay {
            margin-top: 10px;
            font-size: 16px;
            font-weight: bold;
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 10px;
            span {
                color: #f44336;
            }
        }
        .answerNum {
            margin-top: 10px;
            color: #999999;
        }
        .answerBtn {
            text-align: center;
            margin-top: 20px;
            button {
                width: 150px;
                height: 40px;
                border: 1px solid #f44336;
                outline: none;
                background: #f44336;
                color: #fff;
                border-radius: 4px;
                font-weight: bold;
            }
        }
    }
</style>
