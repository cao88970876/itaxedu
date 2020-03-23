<template>
    <div class="taskList_page ">
        <!--导航-->
        <div class="Details_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>任务详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="course-info ">
            <div class="clear">
                <div class="video left"><img :src="$helper.utils.api+data.shop.logo"></div>
                <div class="info left ">
                    <div class="info-type">
                        <div>{{data.name}} <span>{{data.position_name}}</span></div>
                    </div>
                    <div><span>所属部门：{{data.department}}</span></div>
                    <div class="info-time"><span>{{data.work_experience}} | {{data.education}} | {{data.work_nature}}</span></div>
                    <div class="info-time"> <span>{{data.financing}} | {{data.shop.scale}} | {{data.shop.business}}</span></div>
                </div>
            </div>
            <div class="address"><span><img src="../../../assets/image/ic_113.png"/>{{data.province}}-{{data.city}}-{{data.area}}</span></div>
        </div>
        <div class="bottom course-info clear">
            <p class="work_title"><span>职位发布者</span></p>
            <div class="clear">
                <img :src="$helper.utils.api+data.shop.face" class="img"/>
                <div class="right_box">
                    <p>{{data.shop.name}}</p>
                    <p>{{data.shop.institution}} | {{data.shop.position}}</p>
                </div>
            </div>
        </div>
        <div class="bottom course-info clear">
            <p class="work_title"><span>职位描述</span></p>
            <div class="info-end clear">
                <span  v-for="item in data.categories">{{item.name}}</span>
            </div>
            <div class="big_content">
                {{data.describes}}
            </div>
        </div>
        <p style="font-size: 15px" class="course-info clear">赏金:<span style="color: #f44336">￥{{data.money}}</span></p>
        <div class="bottom clear course-info" v-if="data.shop_uid==userinfo.uid&&index!=1">
            <p class="work_title_color"><span>接受任务者</span></p>
            <div class="clear ">
                <img :src="$helper.utils.api+data.get_user.face" class="img"/>
                <div class="right_box">
                    <p style="margin-top: 20px">{{data.get_user.name}}</p>
                </div>
            </div>
        </div>
        <div class="btn_box" >
            <a v-if="index==2" @click="Talk(data.shop.uid)">和TA聊聊</a>
            <a v-if="index==2" class="red_box"  @click="Suretask" >确认完成</a>
            <a v-if="index==1" class="cleartask" @click="Cleartask">取消任务</a>
        </div>
    </div>
</template>

<script>
    import {deliveryApi} from '../../../api'
    import {Navigation,Alert} from '../../../components/public'
    import {utilsApi} from '../../../api'
    export default {
        name: "taskListDetail",
        components:{Navigation,Alert},
        data(){
            return{
                showAlert:false,
                userinfo:this.$helper.utils.storage.get('userInfo')||{},
                data:{shop:{logo:""}},
                index:"",
            }
        },
        created(){
            this.index=this.$route.query.status
            this.userSend()
        },
        methods:{
            //和他聊聊
            Talk(uid){
                if(uid==this.userinfo.uid){
                    this.$message.error('您不能和你自己聊天')
                }
                else this.$router.push({name:'chat',query:{friendId:uid}})
            },
            userSend() {
                let params = {
                    id:this.$route.query.id
                };
                deliveryApi.userSendDetail1(params).then((res) => {
                    this.data=res.data
                    console.log(this.data)
                })
            },
            Cleartask(){
                let params = {id:this.$route.query.id};
                deliveryApi.cancelTask(params).then((res) => {
                    if(res.status==1){
                        this.$router.push({name: 'taskList'})
                        this.$message.success(res.msg)
                    }
                })
            },
            Suretask(){
                let params = {id:this.$route.query.id};
                if(this.data.shop_uid==this.userinfo.uid){
                    deliveryApi.confirmTask(params).then((res) => {
                        if(res.status==1){
                            this.$router.push({name: 'taskList'})
                            this.$message.success(res.msg)
                        }else {
                            this.$message.error(res.msg)
                        }
                    })
                }else {
                    deliveryApi.performTask(params).then((res) => {
                        if(res.status==1){
                            this.$router.push({name: 'taskList'})
                            this.$message.success(res.msg)
                        }else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            },
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .taskList_page {
        padding: 20px;
        .details_nav {
            margin-top: 20px;
        }
        .Details_breadcrumb {
            margin-top: 20px;
        }

        .course-info {
            margin-top: 20px;
            padding: 0 0 10px 0;
            border-bottom: 1px solid #eee;
            * {
                box-sizing: border-box;
            }
            .address{
                font-size: 16px;
                margin-top: 10px;
                img{
                    width:15px;
                    margin-right: 10px;
                    position: relative;
                    top: 5px;
                }
            }
            .video {
                @include size(120px, 120px);
                background-color: #ccc;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 5px;
                }
            }
            .info {
                @include size(auto,auto);
                margin-left: 20px;
                & > div + div {
                    margin-top:10px;
                }
                &-name {
                    font-size: 16px;
                    font-weight: bold;
                }
                &-type {
                    div {
                        display: inline-block;
                        font-weight: bold;
                        font-size: 20px;
                    }
                    span{
                        font-size: 14px;
                        margin-left: 8px;
                        color: #999999;
                        font-weight: normal;
                    }
                }
                &-type, &-time, &-end, &-teacher {
                    font-size: 15px;
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
                        float: left;
                        margin-right: 10px;
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
        .work_title,work_title_color{
            margin: 23px 0;
        }
        .bottom .work_title span{
            padding-left: 10px;
            border-left: 3px solid #F44336;
            font-size: 16px;
        }
        .bottom .work_title_color span{
            padding-left: 10px;
            border-left:3px solid #303f9f;
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
        .btn_box a.cleartask{
            background-color:#999999 ;
            border-radius: 8px;
        }
        .btn_box a.red_box{
             padding:10px 40px;
             background-color:$fontColorRed ;
             border-radius: 8px;
            margin-left: 30px;
         }
    }
</style>
