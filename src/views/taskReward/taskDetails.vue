<template>
    <div class="taskDetails_page page-content">
        <!--导航-->
        <div class="nav"><navigation></navigation></div>
        <div class="Details_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/task/taskReward' }">任务悬赏</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="task_mains">
            <div class="name" v-text="details.name"></div>
            <div class="time">时间：{{details.end_time | timeFilter('Y年M月D日')}}</div>
            <div class="price">赏金：<span v-text="details.money" class="money"></span></div>
        </div>
        <div class="address" v-text="details.address">

        </div>
        <div class="introduction">
            <div class="title">任务介绍</div>
            <div v-text="details.notes">
            </div>
        </div>
        <div class="btn">
            <button class="talk" @click="getTalk">和TA聊聊</button>
            <button @click="getTask">接收任务</button>
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

    import api from '@/api/taskRewardApi'
    import {Navigation, SelfModal} from '../../components/public'

    export default {
        name: "task-details",
        components: {
            Navigation,
            SelfModal,
        },
        data(){
            return{
                id:'',
                details:{},
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                loginTip: false,
            }
        },
        mounted(){
            this.id = this.$route.query.id
            api.taskDetails({
                id:this.id
            }).then((res)=>{
                this.details = res.data
            })
        },
        methods:{
            getTask(){
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                api.doTask({
                    id:this.id
                }).then((res)=>{
                    if(res.status===1){
                        this.$message.success(res.msg)
                        this.$router.push({name:'taskReward'})
                    }
                })
            },
            getTalk(){
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";
    .taskDetails_page{
        margin-bottom: 60px;
        .login-tip {
            text-align: center;
            line-height: 55px;
        }

        .modal-btn {
            text-align: center;
            a {
                display: inline-block;
                padding: 5px 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
        .nav{
            padding-bottom: 20px;
            border-bottom: 1px solid #f1f1f1;
        }
        .Details_breadcrumb{
            margin-top: 20px;
        }
        .task_mains{
            margin-top: 20px;
            color: #999999;
            .name{
                font-weight: bold;
                color: #333;
            }
            .time{
                margin: 5px 0;
            }
            .price{
                span{
                    color: #f44336;
                    font-weight: bold;
                }
            }
        }
        .address{
            margin-top: 10px;
            padding: 10px 0;
            border-top: 2px solid #f1f1f1;
            border-bottom: 2px solid #f1f1f1;
        }
        .introduction{
            margin-top: 10px;
            .title{
                margin-bottom: 10px;
            }
            border-bottom: 1px solid #f1f1f1;
        }
        .btn{
            margin-top: 30px;
            text-align: center;
            button{
                width: 150px;
                height: 40px;
                border: 0;
                background: #f44336;
                border-radius: 4px;
                color: #ffffff;
            }
            .talk{
                background: #303f9f;
                margin-right: 30px;
            }
        }
    }

</style>
