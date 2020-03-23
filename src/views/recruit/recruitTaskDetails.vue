<template>
    <div class="projectDetails_page page-content">
        <!--导航-->
        <div class="details_nav">
            <navigation></navigation>
        </div>
        <div class="Details_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >企业招聘</el-breadcrumb-item>
                <el-breadcrumb-item>招聘详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="course-info">
            <div class="clear">
                <div class="video left"><img :src="imgPath+data.shop.logo"></div>
                <div class="info left ">
                    <div class="info-type">
                        <div>{{data.name}} <span>{{data.position_name}}</span></div>
                    </div>
                    <div><span>所属部门：{{data.department}}</span></div>
                    <div class="info-time"><span>{{data.work_experience}} | {{data.work_nature}} | {{data.education}}</span></div>
                    <div class="info-time"> <span>{{data.shop.financing}} | {{data.shop.scale}} | {{data.shop.business}}</span></div>
                </div>
            </div>
            <div class="address clear">
                <span>{{data.city}}-{{data.area}}-{{data.address}}</span>
                <span>赏金：￥<a style="color: #F44336;">{{data.money}}</a></span>
            </div>
        </div>
        <div class="bottom clear border" >
            <p class="work_title"><span>职位发布者</span></p>
            <div class="clear info">
                <img :src="imgPath+data.shop.face" class="img"/>
                <div class="right_box">
                    <p>{{data.shop.name}}</p>
                    <p>{{data.shop.institution}} | {{data.shop.position}}</p>
                </div>
            </div>
        </div>
        <div class="bottom clear border">
            <p class="work_title"><span>职位描述</span></p>
            <div class="info-end">
                <span v-for="n in data.categories">{{n.name}}</span>
            </div>
            <div class="big_content">
                {{data.describes}}
            </div>
        </div>
        <div class="btn_box">
            <a @click="acceptTask">接受任务</a>
            <a @click="Talk">和TA聊聊</a>
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
    import {recruitUserApi} from '../../api'
    import {Navigation,Alert,SelfModal} from '../../components/public'
    import {utilsApi} from '../../api'
    export default {
        name: "recruitTaskDetails",
        components:{Navigation,Alert,SelfModal},
        data(){
            return{
                loginTip:false,
                showAlert:false,
                data:{shop:{logo:""}},
                imgPath: utilsApi.api,
                userInfo:this.$helper.utils.storage.get('userInfo')||{},
            }
        },
        created(){
            this.Gettaskshow()
        },
        methods:{
            //和他聊聊
            Talk(){
                if(this.data.shop_uid==this.userInfo.uid){
                    this.$message.error('您不能和你自己聊天')
                }
                else this.$router.push({name:'chat',query:{friendId:this.data.shop_uid}})
            },
            Gettaskshow(){
                recruitUserApi.task_show_id({
                    id:this.$route.query.id
                }).then((res)=>{
                    if(res.status == 1){
                        this.data=res.data
                        console.log("招聘任务",res.data)
                    }else {

                    }
                })
            },
            //接受任务
            acceptTask(){
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }else{
                    recruitUserApi.acceptTask({
                        id:this.$route.query.id
                    }).then((res)=>{
                        if (res.status == 1 ||res.msg=="不能接受自己发布的任务"){
                            this.$message.success(res.msg);
                            this.$router.push({name:"recruitList"})}
                        else this.$message.error("你已经接受过这个任务了");
                    })
                }
            },
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .projectDetails_page {
        .info-end{
            span{
                padding: 10px 14px;
                background-color: #F3F3F3 ;
                color: #333333;
                font-size: 14px;
                border-radius: 4px;
                margin-right: 10px;
            }
        }
        .details_nav {
            margin-top: 20px;
        }
        .Details_breadcrumb {
            margin-top: 20px;
        }

        .course-info {
            margin-top: 20px;
            padding: 0 0 10px 0;
            border-bottom: 2px solid #eee;
            * {
                box-sizing: border-box;
            }
            .address{
                font-size: 16px;
                margin-top: 10px;
            }
            .address span:last-child{
                float: right;
                font-size: 20px;
            }
            .address span:first-child{
                color: #666;
                font-size: 16px;
            }

            .video {
                @include size(120px, 120px);
                background-color: #ccc;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 6px;
                    object-fit: cover;
                }
            }
            .info {
                @include size(auto, auto);
                margin-left: 20px;
                & > div + div {
                    margin-top: 10px;
                    font-size: 16px;
                }
                &-name {
                    font-size: 16px;
                    font-weight: bold;
                }
                &-type {
                    div {
                        display: inline-block;
                        font-weight: bold;
                        font-size: 18px;
                    }
                    span{
                        font-size: 14px;
                        margin-left: 8px;
                        color: #999999;
                        font-weight: normal;
                    }
                }
                &-type, &-time, &-end, &-teacher {
                    font-size: 16px;
                }
                &-teacher {
                    margin-bottom: 50px;
                }
                &-end {
                    span{
                        padding: 10px 14px;
                        background-color: #F3F3F3 ;
                        color: #333333;
                        font-size: 14px;
                        border-radius: 4px;
                    }
                }
                &-count {
                    color: #999;
                }
                &-type2 {
                    & > div {
                        background-color: #30babe;
                        color: #fff;
                        display: inline-block;
                        line-height: 1;
                        padding: 10px;
                        border-radius: 8px;
                    }
                }
            }
        }
        .work_title{
            margin: 23px 0;
        }
        .border{
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 20px;
        }
        .bottom .work_title span{
            padding-left: 10px;
            border-left: 3px solid #F44336;
            font-size: 16px;
        }
        .bottom .img{
            float: left;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
        }
        .bottom .right_box{
            float: left;
            font-size: 16px;
            margin-left: 20px;
        }
        .bottom .right_box p{
            margin: 5px 0;
        }
        .bottom .right_box p:last-child{
            font-size: 14px;
            color: #999999;
        }
        .big_content{
            font-size: 14px;
            color: #333333;
            margin:30px 0 0 0;
            line-height: 26px;
        }
        .btn_box{
            text-align: center;
            margin:40px 0;
            color: white;
            a:hover{
                cursor: pointer;
            }
        }
        .btn_box a{
            padding:10px 40px;
            background-color:$fontColorBlue ;
            border-radius: 8px;
        }
        .btn_box a:last-child{
            padding:10px 40px;
            background-color: $fontColorRed;
            margin-left:30px;
        }
    }
</style>
