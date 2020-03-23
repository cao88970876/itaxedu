<template>
    <div class="projectDetails_page page-content">
        <!--导航-->
        <div class="details_nav">
            <navigation></navigation>
        </div>
        <div class="Details_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>企业招聘</el-breadcrumb-item>
                <el-breadcrumb-item>职位详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="course-info ">
            <div class="clear">
                <div class="video left"><img :src="imgPath+data.shop.logo"></div>
                <div class="info left ">
                    <div class="info-type">
                        <div>{{data.name}}</div>
                    </div>
                    <div><span>所属部门：{{data.department}}</span></div>
                    <div class="info-time"><span>{{data.work_experience}} | {{data.work_nature}} | {{data.education}}</span></div>
                </div>
            </div>
            <div class="address"><span>{{data.city}}-{{data.area}}-{{data.address}}</span><span>{{data.salary_min}}K-{{data.salary_max}}K</span></div>
        </div>
        <div class="bottom course-info">
            <p class="work_title"><span>职位发布者</span></p>
            <div class="clear info">
                <img :src="imgPath+data.shop.face" class="img"/>
                <div class="right_box">
                    <p>{{data.shop.name}}</p>
                    <p>{{data.shop.institution}} | {{data.shop.position}}</p>
                </div>
            </div>
        </div>
        <div class="bottom info">
            <p class="work_title"><span>职位描述</span></p>
            <div class="info-end">
                <span v-for="n in data.categories">{{n.name}}</span>
            </div>
            <div class="big_content">
                {{data.describes}}
            </div>
            <div class="btn_box">
               <a @click="Sendresume">发送简历</a>
               <a @click="Talk">和TA聊聊</a>
            </div>
        </div>
        <div>
            <alert message="你还未上传简历，请先去完善简历?"  cancelText="取消" confirmText="去完善" v-model="showAlert" @confirm="SureResume()"></alert>
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
        name: "recruitDetails",
        components:{Navigation,Alert,SelfModal},
        data(){
            return{
                loginTip: false,
                showAlert:false,
                data:{shop:{logo:""}},
                imgPath: utilsApi.api,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        created(){
          this.Getdetail()
        },
        methods:{
            //和他聊聊
            Talk(){
                if(this.data.shop.uid==this.userInfo.uid){
                    this.$message.error('您不能和你自己聊天')
                }
                else this.$router.push({name:'chat',query:{friendId:this.data.shop.uid}})
            },
            Getdetail(){
                recruitUserApi.recruitUserDetail_id({
                    id:this.$route.query.id
                }).then((res)=>{
                    if(res.status == 1){
                        this.data=res.data
                        console.log("招聘任务",res.data)
                    }else {

                    }
                })
            },

            Sendresume(){
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return false
                }else{
                    recruitUserApi.Sendresume_id({
                        id:this.$route.query.id
                    }).then((res)=>{
                        if(res.status == 1){
                            this.data=res.data
                            this.$message.success("简历发送成功");
                        }else {
                            if(res.msg=="还未填写简历"){
                                this.showAlert=true
                            }else {
                                this.$message.error(res.msg);
                            }
                        }
                    })
                }
            },
            //
            //完善简历
            SureResume(){
                this.$router.push({name:"userResume"})
            }
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
            color: #F44336;
            font-size: 20px;
        }
        .address span:first-child{
           color: #666;
        }

    .video {
    @include size(144px, 144px);
        background-color: #ccc;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
    }
}
    .info {
        @include size(auto, auto);
        margin-left: 20px;
        margin-top: 15px;
    & > div + div {
        margin-top: 15px;
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
            margin:30px 0 10px 0;
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
