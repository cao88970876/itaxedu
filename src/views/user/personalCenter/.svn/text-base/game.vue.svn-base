<template>
    <div class="game_box">
        <div class="Details_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >个人信息</el-breadcrumb-item>
                <el-breadcrumb-item>游戏</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="clear">
            <div class="luckDraw ">
                <div class="container ">
                    <div class="turntable-wrapper">
                        <div class="luck-wrapper_box">
                            <div class="luck-wrapper">
                                <ul class="nineGrid">
                                    <li class="row clear">
                                        <div v-for="(n ,number) in prizeList1" :key="n.id" :class="index ===number ? 'active' : ''">
                                            <div class="wrapper">
                                                <img :src="$helper.utils.api+n.icon">
                                                <p>{{n.name}}</p>
                                            </div>
                                            <div class="mask"></div>
                                        </div>
                                    </li>
                                    <li class="row " style="width: 78px;float: left">
                                        <div v-for="(n ,number) in prizeList6" :key="n.id" :class="index === 11 ?'active':''">
                                            <div class="wrapper">
                                                <img :src="$helper.utils.api+n.icon" alt="">
                                                <p>{{n.name}}</p>
                                            </div>
                                            <div class="mask"></div>
                                        </div>
                                        <div v-for="(n ,number) in prizeList5" :key="n.id" :class="index === 10 ? 'active': ''">
                                            <div class="wrapper">
                                                <img :src="$helper.utils.api+n.icon" alt="">
                                                <p>{{n.name}}</p>
                                            </div>
                                            <div class="mask"></div>
                                        </div>
                                    </li>
                                    <li class="row "  @click="openToast">
                                        <div class="getLuck"></div>
                                    </li>
                                    <li class="row " >
                                        <div v-for="(n ,number) in prizeList2" :key="n.id" :class="index ===4 ? `active` : ``">
                                            <div class="wrapper">
                                                <img :src="$helper.utils.api+n.icon" alt="">
                                                <p>{{n.name}}</p>
                                            </div>
                                            <div class="mask"></div>
                                        </div>
                                        <div v-for="(n ,number) in prizeList3" :key="n.id" :class="index ===5 ? `active` : ``">
                                            <div class="wrapper">
                                                <img :src="$helper.utils.api+n.icon" alt="">
                                                <p>{{n.name}}</p>
                                            </div>
                                            <div class="mask"></div>
                                        </div>
                                    </li>
                                    <li class="row">
                                        <div v-for="(n ,number) in prizeList4" :key="n.id" :class="index ===9-number ? `active` : ``">
                                            <div class="wrapper">
                                                <img :src="$helper.utils.api+n.icon" alt="">
                                                <p>{{n.name}}</p>
                                            </div>
                                            <div class="mask"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <prize-alert :showToast="showToast" :toastType="toastType" @closeToast="closeToast"
                                 @startLottery="startLottery"   title="恭喜您,中奖了" :message=myPrize.name confirmText="确定" :img=myPrize.icon
                                 v-model="showAlert1">
                    </prize-alert>
                    <alert message="本次抽奖消耗10积分,您确认要继续吗？" confirmText="确认" v-model="showAlert2" @confirm="startLottery()"></alert>
                </div>
            </div>
            <div class="list_box">
                <ul>
                    <li style="font-size: 17px;color: #333333;font-weight: bold">获奖纪录</li>
                    <li v-for="item in dataList" :key="item.id">
                        <span>{{item.create_time | timeFilter('YY-MM-DD HH:mm:ss')}}</span>
                        <span>{{item.note}}</span>
                    </li>
                    <li> <pagination :pageInfo="pageInfo" @change-page="changePage" ></pagination></li>
                </ul>
            </div>
        </div>
        <div class="rule">
            <p class="rule-title" >活动规则</p>
            <pre>{{prize_config.note}}</pre>
        </div>
    </div>
</template>

<script>
    import $api from '@/api/user'
    import {prizeAlert,Alert,Pagination} from '../../../components/public'
    export default {
        name: 'gameList',
        components: {prizeAlert,Alert,Pagination},
        data () {
            return {
                title: '积分转盘',
                index: 0,    // 当前转动到哪个位置，起点位置
                count: 13,    // 总共有多少个位置
                timer: 0,    // 每次转动定时器
                speed: 200,   // 初始转动速度
                times: 0,    // 转动次数
                cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
                prize: 0,   // 中奖位置
                click: true,
                showToast: true,
                toastType: 'luck',
                prizeMap:{},
                prizeList1:{}, //奖品列表
                prizeList2:{}, //奖品列表
                prizeList3:{}, //奖品列表
                prizeList4:{}, //奖品列表
                prizeList5:{}, //奖品列表
                prizeList6:{}, //奖品列表
                prize_config:{}, //奖品初始化设置
                showAlert1: false,
                user: this.$helper.utils.storage.get('userInfo'),
                myPrize:{},
                integral:"",//每次抽奖的积分消耗
                prizeList:{},
                list:{},
                userintegral:"",
                showAlert2:false,
                dataList:"",
                pageInfo: {
                    total: 0,
                    pageSize:8,
                    currentPage: 1
                },
            }
        },
        methods: {
            // 获取奖品
            async getPrize() {
                let res = await $api.gamePrize()
                if (res.status == 1) {
                    this.list=[...res.data];
                    console.log("list:",this.list);
                    this.prizeList=res.data
                    this.prizeList1 = this.prizeList.splice(0,4)
                    this.prizeList2 = this.prizeList.splice(0,1)
                    this.prizeList3 = this.prizeList.splice(0,1)
                    this.prizeList4 =this.prizeList.splice(0,4).reverse()
                    this.prizeList5 = this.prizeList.splice(0,1)
                    this.prizeList6 = this.prizeList.splice(0,1);

                } else
                    this.$message.error(res.msg);
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                this.getIntegral()
            },
            //游戏设置
            prize_Set(){
                $api.prizeSet().then(res => {
                    if (res.status == 1) {
                        this.prize_config=res.data
                        this.integral=res.data.integral
                    } else
                        this.$message.error(data.msg);
                })
            },
            openToast(){
                this.showAlert2=true
            },
            // 开始抽奖
            startLottery () {
                if(this.user.integral>=this.integral){
                    this.Prizeings() //抽奖
                    this.closeToast()
                    this.speed = 200
                    this.startRoll()
                }else {
                    this.$message.error("您的积分不足");
                }
            },

            // 开始转动
            startRoll () {
                this.times += 1  // 转动次数
                this.oneRoll()  // 转动过程调用的每一次转动方法，这里是第一次调用初始化
                // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
                if (this.times > this.cycle + 10 && this.prize === this.index) {
                    clearTimeout(this.timer)   // 清除转动定时器，停止转动
                    this.prize = -1
                    this.times = 0
                    this.click = true
                    this.showToast = true
                    this.showAlert1 = true
                    this.getIntegral();
                    this.toastType = 'comeOn'
                } else {
                    if (this.times < this.cycle) {
                        this.speed -= 10   // 加快转动速度
                    } else if (this.times === this.cycle) {    // 随机获得一个中奖位置
                        let indexArray = this.prizeMap[this.myPrize.type];
                        const index = indexArray[Math.floor(Math.random()*indexArray.length)];
                        this.prize = index
                    } else if (this.times > this.cycle + 10 &&
                        ((this.prize === 0 && this.index === 11) || this.prize === this.index + 1)) {
                        this.speed += 110
                    } else {
                        this.speed += 20
                    }
                    if (this.speed < 40) {
                        this.speed = 40
                    }
                    this.timer = setTimeout(this.startRoll, this.speed)
                }
            },

            //中奖
            Prizeings(){
                $api.prizeing(this.user.uid).then(res => {
                    if (res.status == 1) {
                        this.myPrize=res.data
                        console.log("中奖",res.data)
                    }else
                        this.$message.error(res.msg);

                })
            },
            //获取每一个奖品的位置数组
            GetPrizeIndex(){
                for (let i=0;i<12;i++) {
                    if(this.prizeMap[this.list[i]['type']]){
                        this.prizeMap[[this.list[i]['type']]].push(i);
                    }else{
                        this.prizeMap[[this.list[i]['type']]] = [i];
                    }
                }
            },
            // 每一次转动
            oneRoll () {
                let index = this.index  // 当前转动到哪个位置
                const count = this.count  // 总共有多少个位置
                index += 1
                if (index > count - 1) {
                    index = 0
                }
                this.index = index
            },

            // 关闭弹出框
            closeToast () {
                this.showToast = false
            },
            async initMethod(){
                await this.getPrize();
                this.prize_Set();
                this.GetPrizeIndex();
            },
            getIntegral() {
                $api.prizeList({
                    uid:this.user.uid ,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then(res => {
                    console.log(res)
                    if (res.status == 1) {
                        this.dataList = res.data.data
                        this.pageInfo.total = res.data.total
                    }
                })
            }
        },
        created () {
            this.initMethod();
            this.getIntegral();
        },
    }
</script>

<style scoped lang="scss">
    pre{
        line-height: 30px;
        font-size: 13px;
    }
    .game_box{
        padding: 10px;
        .list_box{
            float: left;
            width: 39%;
            margin-left: 10px;
            ul{
                border: 1px solid #eee;
                li{
                    padding: 10px;
                    border-bottom: 1px solid #eee;
                    & span:first-child{
                        font-size: 15px;
                    }
                    & span:last-child{
                       float: right;
                        color: #333333 ;
                        font-size: 15px;
                    }
                }
            }
        }
        .luckDraw {
            padding: 10px 0;
            width: 60%;
            height: 50%;
            float: left;

            .turntable-wrapper {
                padding: 0 .14rem;
                position: relative;
                background: url("../../../assets/image/img/bg_1@3x_1.png");
                background-size:cover;
                overflow: hidden;
                height: 460px;
                .luck-wrapper {
                    background: url("../../../assets/image/img/bg_2@3x.png");
                    position: relative;
                    background-size: 100% 100%;
                    height: 370px;
                    width: 370px;
                    margin: 50px auto;
                    .integral {
                        width: 100%;
                        color: #6d2d00;
                        font-size: .16rem;
                        font-weight: normal;
                        text-align: center;
                        position: absolute;
                        top: .58rem;

                        span {
                            font-weight: 600;
                            color: #ff2f4d;
                        }
                    }

                    .nineGrid {
                        position: absolute;
                        top: 31px;
                        left: 9%;
                        width: 322px;
                        height: 322px;
                        li {
                            > div {
                                margin-right: .05rem;
                                height: 100%;
                                text-align: center;
                                position: relative;
                                float: left;
                                margin-bottom: .1rem;

                                .wrapper {
                                    /*width: 100%;*/
                                    background: url("../../../assets/image/img/bg_4_normal@3x.png");
                                    background-size: 100% 100%;
                                    width: 73px;
                                    height: 73px;
                                    margin-right: 4px;
                                    margin-top: 3px;
                                }
                                p {
                                    color: #333333;
                                    position: relative;
                                    z-index: 2;
                                    margin: 2px 0;
                                }
                                img {
                                    width: 35px;
                                    height: 35px;
                                    vertical-align: middle;
                                    position: relative;
                                    z-index: 2;
                                    margin-top: 10px;
                                }

                                .mask {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 73px;
                                    height: 73px;
                                    background: url("../../../assets/image/img/bg_4_pressed@3x.png");
                                    background-size: 100% 100%;
                                    display: none;
                                }
                            }

                            > div.active {
                                .mask {
                                    display: block;
                                }
                            }
                            > div:first-child {
                            }
                            > div.getLuck {
                                background: url("../../../assets/image/img/bg_3_normal@3x.png");
                                font-size: 0;
                                background-size: 100% 100%;
                                width: 150px;
                                height: 150px;
                                margin-right: 5px;
                                margin-top: 2px;

                                p {
                                    font-weight: 600;
                                    color: #fff;
                                    line-height: 1.1;
                                }
                            }
                        }

                        li:last-child {
                            margin-bottom: .5rem;
                        }
                    }
                }
                .share {
                    margin: 1.4rem auto 0 auto;
                    text-align: center;
                    width: 2.3rem;
                    height: 0.6rem;
                    background-size: cover;
                    color: #6d2d00;
                    font-weight: 600;
                    font-size: .17rem;
                    line-height: 0.6rem;

                    .icon-go {
                        display: inline-block;
                        vertical-align: middle;
                    }
                }

                .rule {
                    margin-top: .2rem;
                    color: #fff;
                    font-size: .14rem;
                    background-color: #FD8098;
                    padding: 10px;
                    border-radius: 10px;
                    .rule-title {
                        position: relative;
                        font-size: 16px;

                    }
                }
            }
        }
    }
</style>
