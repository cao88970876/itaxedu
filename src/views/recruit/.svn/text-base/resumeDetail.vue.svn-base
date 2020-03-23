<template>
    <div class="projectDetails_page page-content">
        <!--导航-->
        <div class="details_nav">
            <navigation></navigation>
        </div>
        <div class="Details_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >企业招聘</el-breadcrumb-item>
                <el-breadcrumb-item>求职者详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="resumecontent">
            <div class="touxing">
                <img :src="$helper.utils.api+DataUser.head_img" />
                <p>{{DataUser.name}}</p>
            </div>
            <div class="top">
                <div class="usreinfo " v-if="DataUser.is_pay==1">
                    <p class="work_title fw"><span class="fw">基本信息</span></p>
                    <p class="jobtitle"><span>姓      名</span><span class="fw"> {{DataUser.name}}</span></p>
                    <p class="jobtitle"><span>性      别：</span><span  class="fw">{{DataUser.sex}}</span></p>
                    <p class="jobtitle"><span>最高学历：</span><span  class="fw">{{DataUser.education}}</span></p>
                    <p class="jobtitle"><span>工作年限：</span><span  class="fw">{{DataUser.year_num}}</span></p>
                    <p class="jobtitle"><span>联系电话：</span><span  class="fw">{{DataUser.phone}}</span></p>
                    <p class="jobtitle"><span>联系邮箱：</span><span  class="fw">{{DataUser.email}}</span></p>
                </div>

                <div class="workexperience">
                    <p class="work_title fw"><span>工作经历</span></p>
                    <ul>
                        <li v-for="(item,index) in DataUser.resume_work" :key=index :class="{border:DataUser.resume_work.length<=1}">
                            <div class="garden"></div>
                            <p class="time_box fw">{{item.start_time|timeFilter('YYYY-MM')}} - {{item.end_time |timeFilter('YYYY-MM')}}</p>
                            <p class="company">{{item.company_name}} | {{item.position_name}}</p>
                            <p class="content_box">{{item.contents}}</p>
                        </li>
                    </ul>
                </div>

                <div class="educationalexperience">
                    <p class="work_title fw"><span>教育经历</span></p>
                    <ul>
                        <li  v-for="(item,index) in DataUser.resume_education" :key=index :class="{border:DataUser.resume_education.length<=1}">
                            <div class="garden"></div>
                            <p class="time_box fw">{{item.years}}年毕业</p>
                            <p class="company fw">{{item.school_name}}</p>
                            <p class="content_box">{{item.education}} | {{item.major_name}}</p>
                        </li>
                    </ul>
                </div>

                <div class="jobexperience">
                    <p class="work_title fw"><span>求职意向</span></p>
                    <p class="jobtitle"><span>期望职位：</span><span class="fw">{{DataUser.position_type}}</span></p>
                    <p class="jobtitle"><span>工作性质：</span><span class="fw">{{DataUser.work_nature}}</span></p>
                    <p class="jobtitle"><span>期望月薪：</span><span class="fw">{{DataUser.salary_min}}K - {{DataUser.salary_max}}K</span></p>
                    <p class="jobtitle"><span>期望城市：</span><span class="fw">{{DataUser.work_city}}</span></p>
                    <p class="jobtitle"><span>期望状态：</span><span class="fw">{{DataUser.work_type}}</span></p>
                </div>

                <div class="projectexperience">
                    <p class="work_title fw"><span>项目经验</span></p>
                    <ul>
                        <li  v-for="(item,index) in DataUser.resume_item" :key=index :class="{border:DataUser.resume_item.length<=1}">
                            <div class="garden"></div>
                            <p class="time_box fw">{{item.start_time |timeFilter('YYYY-MM')}}-{{item.end_time|timeFilter('YYYY-MM')}}</p>
                            <p class="company fw">项目名称：{{item.name}}</p>
                            <p class="company fw">项目职责：{{item.duty}}</p>
                            <p class="content_box">{{item.contents}} </p>
                        </li>
                    </ul>
                </div>

                <div class="self_evaluation">
                    <p class="work_title fw"><span>技能评价</span></p>
                    <p class="self_content">{{DataUser.evaluations}} </p>
                </div>

                <div class="self_evaluation">
                    <p class="work_title fw"><span>自我描述</span></p>
                    <p class="self_content">{{DataUser.describes}}</p>
                </div>
                <div class="self_evaluation">
                    <p class="work_title fw"><span>学习经历</span></p>
                    <div class="bg_box clear" v-if="show"  style="margin-top: 3%;padding: 10px">
                        <div id="myChart" :style="{width: '60%', height: '200px',marginTop:'.44rem'}" ></div>
                    </div>
                    <div class="bg_box clear" style="margin-top: 3%;padding: 10px;margin-bottom: 3%" v-for="(item,index) in AlldataList" :key="index">
                        <ul>
                            <li class="clear">
                                <span>{{item.name}}</span>
                                <p>课程({{item.cont.course.syudy_count}})</p>
                                <el-progress :percentage=item.cont.course.rate  :color="'#'+item.color"></el-progress>
                            </li>
                            <li>
                                <p>专栏({{item.cont.knowledge.syudy_count}})</p>
                                <el-progress :percentage=item.cont.knowledge.rate  :color="'#'+item.color"></el-progress>
                            </li>
                            <li>
                                <p>电子书({{item.cont.book.syudy_count}})</p>
                                <el-progress :percentage=item.cont.book.rate :color="'#'+item.color"></el-progress>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="see_btn">
                    <el-button type="primary" @click="recruitPaySee()" v-if="DataUser.is_pay==0">查看完整简历</el-button>
                    <el-button type="primary" @click="Talk()" v-if="DataUser.is_pay==1">和TA聊聊</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {recruitUserApi} from '../../api'
    import {Navigation,Alert} from '../../components/public'
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    require('echarts/lib/component/legend');
    export default {
        name: "recruitDetails",
        components:{Navigation,Alert},
        data(){
            return{
                DataUser:{},
                AlldataList:{},
                color:[],
                show:true,
                Alldata:[],
                resume_pay_money:"0",
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        created(){
            this.GetresumeUser()
        },
        methods:{
            //和他聊聊
            Talk(){
                if(this.DataUser.uid==this.userInfo.uid){
                    this.$message.error('您不能和你自己聊天')
                }
                else this.$router.push({name:'chat',query:{friendId:this.DataUser.uid}})
            },
            GetresumeUser(){
                recruitUserApi.resumeUser({
                    id:this.$route.query.id
                }).then((res)=>{
                    if(res.status == 1){
                        this.DataUser=res.data
                        this.resume_pay_money=this.DataUser.resume_pay_money
                        this.getLearnChart()
                        this.getlearnInventoryList()
                        console.log("",res.data)
                    }else {

                    }
                })
            },
            //图表
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right:"0px",
                        data:""
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['35%', '80%'],
                            avoidLabelOverlap: false,

                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: '{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                                    textStyle : {
                                        align : 'center',
                                        baseline : 'middle',
                                        fontFamily : '微软雅黑',
                                        fontSize : 15,
                                        color:'#000'
                                    }
                                },
                            },
                            data:this.Alldata,
                            color: this.color
                        }
                    ]
                });
            },
            getLearnChart(){
                recruitUserApi.learnExperiences({
                    uid:this.DataUser.uid
                }).then(res => {
                    if (res.status == 1) {
                        this.show=true
                        for (let i = 0; i <res.data.length; i++) {
                            this.Alldata.push({
                                name: res.data[i].name,
                                value: res.data[i].rate.split('%')[0]
                            });
                            this.color=res.data.map(item => '#'+item.color)
                            this.drawLine()
                        }
                    } else {
                        this.show=false
                        // this.$message.error(res.msg)
                    }
                });
            },
            getlearnInventoryList(){
                recruitUserApi.learnInventoryList({
                    uid:this.DataUser.uid
                }).then(res => {
                    if (res.status == 1) {
                        this.AlldataList = res.data;
                        for (var i=0;i<res.data.length;i++){
                            this.AlldataList[i].cont.book.rate=parseInt(this.AlldataList[i].cont.book.rate.split('%')[0])
                            this.AlldataList[i].cont.course.rate=parseInt(this.AlldataList[i].cont.course.rate.split('%')[0])
                            this.AlldataList[i].cont.knowledge.rate=parseInt(this.AlldataList[i].cont.knowledge.rate.split('%')[0])
                        }
                    } else {
                        // this.$message.error(res.msg)
                    }
                })
            },
            recruitPaySee(){
                this.$router.push({name:"recruitPaySee",query:{money:this.resume_pay_money,id:this.DataUser.id}})
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .projectDetails_page {
        .bg_box{
            background: white;
            -webkit-box-shadow: 2px 2px 5px #eee;
            box-shadow: 0 0 14px #eee;
            border-radius: 4px;
            width: 37%;
            .bg_box ul li{
                font-size: .14rem;
            }
        }
        .bg_box ul li span{
            font-size: .16rem;
            display: inline-block;
            padding: 10px 0;
        }
        .bg_box ul li p{
            margin-bottom: 9px;
        }
        .bg_box ul li .el-progress{
            margin-bottom: 10px;
        }
        padding: 20px 30px 20px 30px;
        .fw{
            font-weight: bold;
        }
        .details_nav {
            margin-top: 20px;
        }
        .Details_breadcrumb {
            margin-top: 20px;
        }
        .resumecontent{
            .touxing{
                box-shadow: 0 0 10px #999;
                text-align: center;
                font-size: 15px;
                margin-top: 20px;
                padding: 10px ;
                border-radius: 4px;
                margin-bottom: 30px;
                img{
                    width: 70px;
                    padding: 10px 0;
                    border-radius:50% ;
                    object-fit: cover;
                    height: 70px;
                }
                p{
                    margin: 0 0 10px 0;
                }

            }
            .top{
                .work_title{
                    margin-bottom:20px;
                    span{
                        padding-left: 10px;
                        border-left: 3px solid #303F9F ;
                        font-size: 16px;
                    }
                }

                .usreinfo{
                    border-bottom: 1px solid #EAEAEA;
                    .jobtitle{
                        font-size: 14px;
                        color: #666;
                        & span:last-child{
                            color: #151515 ;
                        }
                    }
                }

                .educationalexperience{
                    ul{
                        border-bottom: 1px solid #EAEAEA;
                        li.border{
                            border-left:none;
                        }
                        li{
                            & +li:last-child{
                                border-left:none;
                                .garden{
                                    left: -8px;
                                }
                            }
                            border-left:2px solid #F44336;
                            position: relative;
                            font-size: 15px;
                            .garden{
                                width: 16px;
                                height: 16px;
                                background-color: #F44336;
                                position: absolute;
                                top:0;
                                border-radius: 50%;
                                left: -9px;
                            }
                            p{
                                margin: 0;
                            }
                            .time_box{
                                padding-left: 20px;
                                margin-bottom: 5px;
                            }
                            .content_box{
                                margin: 0;
                                padding-left: 20px;
                                padding-bottom: 30px;
                                color: #666666;
                            }
                            .company{
                                padding-left: 20px;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }

                .workexperience{
                    ul{
                        border-bottom: 1px solid #EAEAEA;
                        li.border{
                            border-left:none;
                        }
                        li{
                            & +li:last-child{
                                border-left:none;
                                .garden{
                                    left: -8px;
                                }
                            }
                            border-left:2px solid #F44336;
                            position: relative;
                            font-size: 15px;
                            .garden{
                                width: 16px;
                                height: 16px;
                                background-color: #F44336;
                                position: absolute;
                                top:0;
                                border-radius: 50%;
                                left: -9px;
                            }
                            p{
                                margin: 0;
                            }
                            .time_box{
                                padding-left: 20px;
                                margin-bottom: 10px;
                                color: #333333;
                            }
                            .content_box{
                                margin: 0;
                                padding-left: 20px;
                                padding-bottom:30px;
                                color: #666666 ;
                            }
                            .company{
                                padding-left: 20px;
                                margin-bottom: 10px;
                                color: #333333;
                                font-weight: bold;
                            }
                        }
                    }
                }

                .jobexperience{
                    border-bottom: 1px solid #EAEAEA;
                    .jobtitle{
                        font-size: 14px;
                        color: #666;
                        & span:last-child{
                            color: #151515 ;
                        }
                    }
                }

                .projectexperience{
                    ul{
                        border-bottom: 1px solid #EAEAEA;
                        li.border{
                            border-left:none;
                        }
                        li{
                            & +li:last-child{
                                border-left:none;
                                .garden{
                                    left: -8px;
                                }
                            }
                            border-left:2px solid #F44336;
                            position: relative;
                            font-size: 15px;
                            .garden{
                                width: 16px;
                                height: 16px;
                                background-color: #F44336;
                                position: absolute;
                                top:0;
                                border-radius: 50%;
                                left: -9px;
                            }
                            p{
                                margin: 0;
                            }
                            .time_box{
                                padding-left: 20px;
                                margin-bottom: 10px;
                            }
                            .content_box{
                                margin: 0;
                                padding-left: 20px;
                                padding-bottom:30px;
                                color: #666666 ;
                            }
                            .company{
                                padding-left: 20px;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }

                .self_evaluation{
                    border-bottom: 1px solid #EAEAEA;
                    .self_content{
                        font-size: 15px;
                        color: #666666;
                    }
                }
                .see_btn{
                    text-align: center;
                    margin-top: 20px;
                    .el-button{
                        background-color: #303F9F!important;
                        border: none;
                        border-radius: 5px;
                        margin-right: 10px;
                    }
                }

            }
        }

    }
</style>
<!--<style lang="scss" scoped>-->
    <!--@import "../../assets/scss/constant";-->
    <!--@import "../../assets/scss/mixin";-->

    <!--.projectDetails_page {-->

        <!--.details_nav {-->
            <!--margin-top: 20px;-->
        <!--}-->
        <!--.Details_breadcrumb {-->
            <!--margin-top: 20px;-->
        <!--}-->
        <!--.resumecontent{-->
            <!--.touxing{-->
                <!--box-shadow: 0 0 10px #999;-->
                <!--text-align: center;-->
                <!--font-size: 15px;-->
                <!--margin-top: 20px;-->
                <!--padding: 10px ;-->
                <!--border-radius: 4px;-->
                <!--margin-bottom: 30px;-->
                <!--img{-->
                    <!--width: 70px;-->
                    <!--padding: 10px 0;-->
                    <!--}-->

            <!--}-->
            <!--.top{-->
                <!--.work_title{-->
                    <!--margin-bottom:20px;-->
                    <!--span{-->
                        <!--padding-left: 10px;-->
                        <!--border-left: 3px solid #303F9F ;-->
                        <!--font-size: 16px;-->
                    <!--}-->
                <!--}-->

                <!--.usreinfo{-->
                    <!--border-bottom: 1px solid #EAEAEA;-->
                    <!--.jobtitle{-->
                        <!--font-size: 14px;-->
                        <!--color: #666;-->
                        <!--& span:last-child{-->
                            <!--color: #151515 ;-->
                        <!--}-->
                    <!--}-->
                <!--}-->

                <!--.educationalexperience{-->
                    <!--ul{-->
                        <!--border-bottom: 1px solid #EAEAEA;-->
                        <!--li{-->
                            <!--& +li:last-child{-->
                                <!--border-left:none;-->
                                <!--.garden{-->
                                    <!--left: -8px;-->
                                <!--}-->
                            <!--}-->
                            <!--border-left:2px solid #F44336;-->
                            <!--position: relative;-->
                            <!--font-size: 15px;-->
                            <!--.garden{-->
                                <!--width: 16px;-->
                                <!--height: 16px;-->
                                <!--background-color: #F44336;-->
                                <!--position: absolute;-->
                                <!--top:0;-->
                                <!--border-radius: 50%;-->
                                <!--left: -9px;-->
                            <!--}-->
                            <!--p{-->
                                <!--margin: 0;-->
                            <!--}-->
                            <!--.time_box{-->
                                <!--padding-left: 20px;-->
                                <!--margin-bottom: 5px;-->
                            <!--}-->
                            <!--.content_box{-->
                                <!--margin: 0;-->
                                <!--padding-left: 20px;-->
                                <!--padding-bottom: 30px;-->
                                <!--color: #666666;-->
                            <!--}-->
                            <!--.company{-->
                                <!--padding-left: 20px;-->
                                <!--margin-bottom: 5px;-->
                            <!--}-->
                        <!--}-->
                    <!--}-->
                <!--}-->

                <!--.workexperience{-->
                    <!--ul{-->
                        <!--border-bottom: 1px solid #EAEAEA;-->
                        <!--li{-->
                            <!--& +li:last-child{-->
                                <!--border-left:none;-->
                                <!--.garden{-->
                                    <!--left: -8px;-->
                                <!--}-->
                            <!--}-->
                            <!--border-left:2px solid #F44336;-->
                            <!--position: relative;-->
                            <!--font-size: 15px;-->
                            <!--.garden{-->
                                <!--width: 16px;-->
                                <!--height: 16px;-->
                                <!--background-color: #F44336;-->
                                <!--position: absolute;-->
                                <!--top:0;-->
                                <!--border-radius: 50%;-->
                                <!--left: -9px;-->
                            <!--}-->
                            <!--p{-->
                                <!--margin: 0;-->
                            <!--}-->
                            <!--.time_box{-->
                                <!--padding-left: 20px;-->
                                <!--margin-bottom: 10px;-->
                                <!--color: #333333;-->
                            <!--}-->
                            <!--.content_box{-->
                                <!--margin: 0;-->
                                <!--padding-left: 20px;-->
                                <!--padding-bottom:30px;-->
                                <!--color: #666666 ;-->
                            <!--}-->
                            <!--.company{-->
                                <!--padding-left: 20px;-->
                                <!--margin-bottom: 10px;-->
                                <!--color: #333333;-->
                            <!--}-->
                        <!--}-->
                    <!--}-->
                <!--}-->

                <!--.jobexperience{-->
                    <!--border-bottom: 1px solid #EAEAEA;-->
                   <!--.jobtitle{-->
                       <!--font-size: 14px;-->
                       <!--color: #666;-->
                       <!--& span:last-child{-->
                           <!--color: #151515 ;-->
                       <!--}-->
                   <!--}-->
                <!--}-->

                <!--.projectexperience{-->
                    <!--ul{-->
                        <!--border-bottom: 1px solid #EAEAEA;-->
                        <!--li{-->
                            <!--& +li:last-child{-->
                                <!--border-left:none;-->
                                <!--.garden{-->
                                    <!--left: -8px;-->
                                <!--}-->
                            <!--}-->
                            <!--border-left:2px solid #F44336;-->
                            <!--position: relative;-->
                            <!--font-size: 15px;-->
                            <!--.garden{-->
                                <!--width: 16px;-->
                                <!--height: 16px;-->
                                <!--background-color: #F44336;-->
                                <!--position: absolute;-->
                                <!--top:0;-->
                                <!--border-radius: 50%;-->
                                <!--left: -9px;-->
                            <!--}-->
                            <!--p{-->
                                <!--margin: 0;-->
                            <!--}-->
                            <!--.time_box{-->
                                <!--padding-left: 20px;-->
                                <!--margin-bottom: 10px;-->
                            <!--}-->
                            <!--.content_box{-->
                                <!--margin: 0;-->
                                <!--padding-left: 20px;-->
                                <!--padding-bottom:30px;-->
                                <!--color: #666666 ;-->
                            <!--}-->
                            <!--.company{-->
                                <!--padding-left: 20px;-->
                                <!--margin-bottom: 5px;-->
                            <!--}-->
                        <!--}-->
                    <!--}-->
                <!--}-->

                <!--.self_evaluation{-->
                    <!--border-bottom: 1px solid #EAEAEA;-->
                    <!--.self_content{-->
                        <!--font-size: 15px;-->
                        <!--color: #666666;-->
                    <!--}-->
                <!--}-->
                <!--.see_btn{-->
                    <!--text-align: center;-->
                    <!--.el-button&#45;&#45;primary{-->
                        <!--background-color: #303F9F!important;-->
                        <!--margin: 30px;-->
                        <!--border-color: #303F9F;-->
                        <!--padding: 12px 50px;-->
                    <!--}-->
                <!--}-->

            <!--}-->
        <!--}-->

    <!--}-->
<!--</style>-->
