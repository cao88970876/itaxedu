<template>
    <div class="deliveryListDetail_page">
        <!--导航-->
        <div class="Details_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>职位详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="course-info clear">
            <div class="clear">
                <div class="video left"><img :src="$helper.utils.api+data.shop.logo"></div>
                <div class="info left ">
                    <div class="info-type">
                        <div>{{data.name}}</div>
                    </div>
                    <div class="info-time">所属部门：{{data.department}}</div>
                    <div class="info-time"><span>{{data.work_experience}} |  {{data.education}} | {{data.work_nature}}</span></div>
                </div>
            </div>
            <div class="address"><span><img src="../../../assets/image/ic_113.png"/>{{data.city}}-{{data.area}}-{{data.address}}</span><span>{{data.salary_min}}K-{{data.salary_max}}K</span></div>
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
            <div class="info-end">
                <span>{{data.shop.business}}</span>
            </div>
            <div class="big_content">
                {{data.describes}}
            </div>
        </div>
        <div class="btn_box">
            <a>和TA聊聊</a>
        </div>
    </div>
</template>

<script>
    import {deliveryApi} from '../../../api'
    import {Navigation,Alert} from '../../../components/public'
    import {utilsApi} from '../../../api'
    export default {
        name: "deliveryListDetail",
        components:{Navigation,Alert},
        data(){
            return{
                showAlert:false,
                data:{shop:{logo:""}},
            }
        },
        created(){
            this.userSend()
        },
        methods:{
            userSend() {
                let params = {
                    id:this.$route.query.id
                };
                deliveryApi.userSendDetail(params).then((res) => {
                    if(res.status==1){
                        this.data=res.data;
                        console.log("页面详情",this.data)
                    }
                })
            },
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .deliveryListDetail_page {
        padding: 20px;
        .details_nav {
            margin-top: 20px;
        }
        .Details_breadcrumb {
            margin-top: 10px;
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
                    width: 15px;
                    margin-right: 10px;
                    position: relative;
                    top: 5px;
                }
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
                margin-top: 15px;
                & > div + div {
                    margin-top: 14px;
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
    }
</style>
