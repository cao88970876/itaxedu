<template>
    <div class="projectDetails_page page-content">
        <div class="content_box clear">
            <div class="top_box clear">
                <div class="user_left left clear">
                    <div class="left user clear">
                        <div class="left img_box"  @click="change_user">
                            <img :src=$helper.utils.api+user.face />
                        </div>
                        <div class="left">
                            <p style="font-size: 17px;">{{user.nickname}}
                                <span v-if="user.type!=1">
                                    <span style="color: #999;margin:0 6px ">|</span>
                                    <span v-if="user.type==3">机构</span>
                                    <span v-if="user.type==2">专家</span>
                                </span>
                            </p>
                            <p style="color: #999999;">{{user.phone}}</p>
                            <p class="colorF4" v-if="user.type==1"><img src="../../../assets/image/ic_94_normal.png" height="14" width="14" style="color: #f44336;margin-right: 5px"/>{{user.integral}}积分</p>
                            <p style="color: #999999;" v-if="user.type!=1"><img src="../../../assets/image/ic_94_normal.png" height="14" width="14" style="color: #999999;margin-right: 5px"/>{{user.integral}}积分</p>
                        </div>
                    </div>
                    <div class="right changepassword" v-if="user.type==1">
                        <p @click="change_pass" class="pointer">修改密码</p>
                        <p class="generationproof pointer" @click="Generation">生成证明</p>
                    </div>
                    <div class="right changepassword" v-if="user.type!=1">
                        <p @click="change_pass" style="color: #f44336;">修改密码</p>
                    </div>
                </div>
                <div class="user_right left clear">
                    <div class="left">
                        <p class="pointer"  @click="sign"><img src="../../../assets/image/img/ic_2.png"  />
                            <span v-if="user.is_sign==0">签到</span>
                            <span v-if="user.is_sign==1">已签到</span>
                        </p>
                        <p @click="Gogame()" class="pointer"><img src="../../../assets/image/img/ic_3.png" />大转盘游戏</p>
                    </div>
                    <p class="right pointer" style="color: #303F9F"  v-if="auth=='0'||auth=='3'" @click="$router.push({name:'authentication'})">资料认证</p>
                    <p class="right pointer" style="color: #303F9F" v-if="auth=='1'">审核中</p>
                    <p class="right"  v-if="user.type!=1"><a href="http://zhongcaixun.zpftech.com/shop/root/login/login.html" style="color: #303F9F">店铺管理</a></p>
                </div>
            </div>
            <div class="clear" style="padding: 20px 0">
                <div class="circulartitle">平均每日学习{{average}}分钟</div>
                <div id="myChart1" class="line " ></div>
                <div id="myChart" class="circular"></div>
            </div>
            <div class="task_box clear">
                <div class="task_left">
                    <ul class="clear">
                        <li class="clear">
                            <span class="title">每日任务</span>
                        </li>
                        <li class="clear" v-for="item in taskDay" :key="item.id">
                            <span>{{handlerType(item.type,item.see_time)}}
                                <span style="color:#999">({{item.is_count}}/{{item.count}})</span>
                                <span style="color: #F54538">+{{item.integral}}</span></span>
                            <span class="btn_box" :class="['fr',item.status==1?'unfinish':'finish']">{{item.status==1?'已完成':'未完成'}}</span>
                        </li>
                        <li class="clear">
                            <span class="title">积分任务</span>
                        </li>
                        <li class="clear" v-for="item in taskIntegral" :key="item.id">
                            <span>{{handlerType(item.type)}}<span style="color: #F54538">
                                  <span style="color:#999">({{item.is_count}}/{{item.count}})</span>+{{item.integral}}</span></span>
                            <span class="btn_box" :class="['fr',item.status==1?'unfinish':'finish']">{{item.status==1?'已完成':'未完成'}}</span>
                        </li>
                    </ul>
                </div>
                <div class="task_list">
                    <ul>
                        <li class="clear">
                            <p class="title">积分记录</p>
                        </li>
                        <li class="clear" v-for="item in getIntegrallist" :key="item.id" >
                            <span>{{item.create_time  | timeFilter('YY-MM-DD HH:mm:ss') }}<span>&nbsp;{{item.note}}</span></span>
                            <label  class="right" :class="['logs-item-left',item.type==1?'in':'out']">{{item.type==1?'+':'-'}}{{item.integral}}积分</label>
                        </li>
                        <li>
                            <p style="text-align: center" v-if="!taskIntegral.length">暂无数据</p>
                        </li>
                        <li>
                            <pagination :pageInfo="pageInfo" @change-page="changePage" ></pagination>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import {myAccountApi} from '../../../api';
    import api from '@/api/user'
    import {Pagination} from '../../../components/public'
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    require('echarts/lib/chart/line');
    require('echarts/lib/component/legend');
    export default {
        name: "userInform",
        components: {
            Pagination
        },
        data(){
            return{
                user: {},
                userInfo: this.$helper.utils.storage.get('userInfo'),
                Alldata:[],
                color:"",
                taskDay: [],
                taskIntegral:[],
                lineChartKey: [],
                lineChartVal: [],
                average:"0",
                type:"",
                getIntegrallist:[],
                auth:"",
                pageInfo: {
                    total: 0,
                    pageSize:8,
                    currentPage: 1
                },
            }
        },
        created(){
            this.getaccountInfo()
            this.getTaskData(2);
            this.getTaskData(1);
            this.getIntegral();
        },
        methods:{
            changePage(page) {
                this.pageInfo.currentPage = page
                    this.getIntegral()
            },
            //签到
            sign() {
                myAccountApi.signs({
                    uid:this.userInfo.uid
                }).then(res => {
                    if(res.status==1){
                        location.reload();
                        this.$message.success(res.msg)
                    }
                    else this.$message.error(res.msg)
                })
            },
            //修改个人信息
            getaccountInfo() {
                //  获取用户信息
                myAccountApi.accountInfo({uid:this.userInfo.uid}).then(res => {
                    console.log('用户信息=>', res)
                    if (res.status == 1) {
                        this.user=res.data
                        this.type=res.data.type
                        this.auth = res.data.is_auth;
                    }
                })
            },

            change_user(){
                this.$router.push({name: 'changeUser'});
            },
            //修改密码
            change_pass(){
                this.$router.push({name: 'changePass'});
            },
            //生成证明
            Generation(){
                this.$router.push({name: 'prove'});
            },
            handlerType(_type,time) {
                switch (_type) {
                    case 1:
                        return "注册"
                    case 2:
                        return '完善资料'
                    case 3:
                        return  '观看课程视频'+time+'分钟'
                    case 4:
                        return '邀请好友注册'
                    case 5:
                        return '每天阅读专栏'
                    case 6:
                        return '每天观看电子书'
                    case 7:
                        return '分享内容'
                }

            },

            getTaskData(_cate) {
                api.task({
                    uid: this.user.uid,
                    cate: _cate
                }).then(res => {
                    console.log(res);
                    if (res.status == 1) {
                        if (_cate === 1) {
                            this.taskIntegral = res.data.data;
                            console.log("this.taskIntegral",this.taskIntegral)
                        } else {
                            this.taskDay = res.data.data;
                            console.log("this.taskDay",this.taskDay)
                        }
                    } else
                        this.$message.error(res.msg);
                })
            },
            //积分记录
            getIntegral(){
                api.integral({
                    uid: this.userInfo.uid,
                    page: this.pageInfo.currentPage,
                    pageSize: this.pageInfo.pageSize
                }).then(res => {
                    console.log(res);
                    if (res.status == 1) {
                        this.getIntegrallist = res.data.data;
                        this.pageInfo.total = res.data.total
                        console.log(".data",this.getIntegrallist)
                    }
                    // else
                        // this.$message.error(res.msg);
                })
            },
            //大转盘游戏
            Gogame(){
                this.$router.push({name: 'game'});
            },
            drawCircular() {
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
                            color:this.color
                        }
                    ]
                });
            },
            getEveryDayStudyAverageNumber(_data) {
                //计算每日学习平均值
                let i, tmpCount = 0;
                for (i in _data) {
                    tmpCount += _data[i].count;
                }
                return (tmpCount / 7).toFixed(2);
            },
            filterLineChartData(_data) {
                //  过滤数据
                _data.map(i => {
                    this.lineChartKey.push(i.time);
                    this.lineChartVal.push(i.count);
                });
                this.drawLine(
                    "myChart1",
                    this.lineChartKey,
                    this.lineChartVal
                );
            },
            drawLine(_id, _xData, _yData) {
                // 折线图配置
                const icon = require("../../../assets/image/ic_100.png");
                let myChart = echarts.init(document.getElementById(_id));
                let option = {
                    xAxis: {
                        type: "category",
                        data: _xData,
                        axisLabel: {interval: 0},
                        axisTick: {
                            length: 0
                        },
                        boundaryGap: false,
                        offset: 1
                    },
                    yAxis: {
                        type: "value",
                        minInterval: 60,
                        axisTick: {
                            length: 0
                        }
                    },
                    grid: {
                        x: 40,
                        y: 20,
                        x2: 40,
                        y2: 20,
                        borderWidth: 1
                    },
                    series: [
                        {
                            type: "line",
                            data: _yData,
                            symbol: `image://${icon}`,
                            symbolSize: 20
                        }
                    ]
                };
                myChart.setOption(option);
            },


            getLineChartData() {
                // 获取折线图数据
                api.getLineChartData(this.userInfo.uid).then(res => {
                    console.log("=>折线图数据：", res);
                    if (res.status == 1) {
                        this.count = res.data.count;
                        let _data = res.data.data;
                        this.filterLineChartData(_data);
                        this.average = this.getEveryDayStudyAverageNumber(_data);
                    }
                    // else
                        // this.$message.error(res.msg);
                });
            },

            getLearnChart(){
                api.learnExperiences(this.userInfo.uid).then(res => {
                    if (res.status == 1) {
                        for (let i = 0; i <res.data.length; i++) {
                            this.Alldata.push({
                                name: res.data[i].name,
                                value: res.data[i].rate.split('%')[0]
                            });
                            this.color=res.data.map(item => '#'+item.color)
                            this.drawCircular()
                        }
                    } else {
                        // this.$message.error(res.msg);
                    }
                })
            },
        },
        mounted() {
            if(this.userInfo.type!=3){
                this.drawCircular()
                this.getLearnChart()
            }
            this.$nextTick(() => {
                this.getLineChartData();
            });
        }
    }
</script>

<style scoped lang="scss">
    .logs-item-left {
        flex: 2;
        text-align: right;
        font-size: 16px;
        line-height:37px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .in {
        color: #f54538;
    }
    .out {
        color: #303f9f;
    }
    .colorF4{
        color: #f44336;
    }
    .circulartitle{
        text-align: center;
        font-size: 15px;
        color: #333;
        margin-top: 15px;
        font-weight: bold;
    }
    .content_box{
        width: 88%;
        .top_box{
            border-bottom: 1px solid #eee;
            padding:0 0 20px 0;
        }
        .line{
            float: left;
            width: 70%;
            height: 300px;
        }
        .line.width {
            width: 100%;
        }
        .circular{
            float: left;
            width: 28%;
            height: 250px;
            margin-top:30px;
        }
        .user_left{
            padding: 0 30px 0 20px;
            border-right: 1px solid #eee;
            width: 33%;
            .img_box{
                img{
                    width:80px;
                    height: 80px;
                    object-fit: cover;
                    margin-right: 10px;
                    border-radius: 50%;
                }
            }
            .changepassword{
                p{
                    color: #303F9F;
                    text-align: right;
                }
                .generationproof{
                    padding:6px 12px;
                    border: 1px solid #f44336;
                    color: #f44336;
                    border-radius:5px;
                    margin-top: 17px;
                }
            }
        }
        .user_right{
            img{
                width: 22px;
                margin-right: 5px;
                position: relative;
                top:3px
            }
            padding-left: 30px;
            .left{
                p{
                    padding:6px 12px;
                    border: 1px solid #eee;
                    border-radius:5px;
                    text-align: center;
                }
            }
            width: 56%;
        }
        p{
            margin: 5px 0;
            font-size: 14px;
        }
        .task_box{
            border-top: 1px solid #eee;
            padding: 20px 10px;
            .task_left{
                float: left;
                width: 48%;
                ul{
                    border: 1px solid #eee;
                    li{
                        padding:6px 10px;
                        font-size: 14px;
                        border-bottom: 1px solid #eee;
                        &:last-child{
                            border-bottom: none;
                        }
                        & span:first-child{
                            line-height: 33px;
                            span{
                                /*color:#f44336 ;*/
                            }
                        }
                        .btn_box{
                            padding:6px 12px;
                            border: 1px solid #f44336;
                            color: #f44336;
                            border-radius:5px;
                            float: right;
                        }
                        .unfinish {
                            border: 1px solid red;
                            background: none;
                            color: #F54538;
                        }
                        .finish {
                            border: 1px solid #999999;
                            background: #999999;
                            color: #fff;
                        }
                    }
                }
            }
            .task_list{
                float: right;
                width: 48%;
                ul{
                    border: 1px solid #eee;
                    li{
                        padding:6px 10px;
                        font-size: 14px;
                        border-bottom: 1px solid #eee;
                        line-height: 33px;
                        &:last-child{
                            border-bottom: none;
                        }
                        & span:first-child{
                            line-height: 33px;
                            color: #999999;
                            margin-right: 10px;
                            span{
                                color: #333333;
                            }
                        }
                        & span:last-child{
                            color:#f44336 ;
                        }
                    }
                }
            }
        }
        .learn_box{
            border-top: 1px solid #eee;
            padding: 10px 20px;
            ul{
                margin-top: 10px;
                li{
                    float: left;
                    width: 90px;
                    text-align: center;
                    margin-right: 10px;
                    img{
                        width: 80px;
                        height:80px;
                        object-fit: cover;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
</style>
