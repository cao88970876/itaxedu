<template>
    <div class="page-content recruitList">
        <!--导航-->
        <div>
            <navigation></navigation>
        </div>
        <!--搜索-->
        <div class="planning_search mt-20">
            <search-input v-model="keyWord" @search="Gosearch(keyWord,user.type)"></search-input>
        </div>
        <!--轮播-->
            <!--<Banner type="8"> </Banner>-->
        <div class="public-banner mt-20">
            <carousel trigger="click" height="450px">
                <carousel-item v-for="item in bannerList" :key="item.id">
                    <img class="banner-img pointer" :src="$helper.utils.api +item.img_url"  @click="GoDetails(item.pid)">
                </carousel-item>
            </carousel>
        </div>

        <el-tabs id="activeName" v-model="activeName" @tab-click="handleClick(activeName)">
            <el-tab-pane label="招聘岗位" name="1" v-if="user.type!=3">
                <HotItem :recruits="recruits" :status=user.type  :activeName=activeName></HotItem>
                <pagination :pageInfo="pageInfo" @change-page="changePage"></pagination>
            </el-tab-pane>
            <el-tab-pane label="招聘人才" name="3" v-if="user.type==3">
                <div class="mechanism">
                    <ul class="clear">
                        <li v-for="(item,index) in resume" :key="index" @click="GoresumDetail(item.id)" class="clear pointer">
                            <div class="clear info">
                                <img :src="imgPath+item.head_img" class="img"/>
                                <div class="right_box">
                                    <p>{{item.name}}&nbsp;</p>
                                    <p >{{item.city}} | {{item.year_num}} | {{item.resume_education[0].education}}</p>
                                </div>
                            </div>
                            <div class="content">{{item.describes}}</div>
                        </li>
                    </ul>
                </div>
                <div class="user_box clear">
                    <ul>
                        <li v-for="(item,index) in userList" :key="index" class="pointer">
                            <img :src="imgPath+item.face" />
                            <p class="pointer" @click="GoTalk(item.uid)">和TA聊天</p>
                        </li>
                    </ul>
                </div>
                <pagination :pageInfo="userPageInfo" @change-page="UserchangePage"></pagination>
            </el-tab-pane>
            <el-tab-pane label="招聘任务" name="2">
                <HotItem :recruits="Task" :status=user.type  :activeName=activeName></HotItem>
                <pagination :pageInfo="taskPageInfo" @change-page="TaskchangePage"></pagination>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import {Carousel, CarouselItem} from 'element-ui'
    import {Navigation, SearchInput, Banner,HotItem,Pagination} from '../../components/public'
    import {recruitUserApi,utilsApi} from '../../api'
    export default {
        name: "recruitList",
        components: {
            Carousel,
            CarouselItem, Navigation, SearchInput, Banner,HotItem,recruitUserApi,Pagination
        },
        data(){
          return{
              activeName: '1',
              user:this.$helper.utils.storage.get('userInfo')||{},
              recruits:"",//招聘岗位
              Task:{},
              data:{},
              tab:"1",
              userList:{},
              imgPath: utilsApi.api,
              bannerList:{},
              resume:{},
              keyWord:"",
              pageInfo: {
                  total: 0,
                  pageSize:9,
                  currentPage: 1
              },
              userPageInfo: {
                  total: 0,
                  pageSize:8,
                  currentPage: 1
              },
              taskPageInfo: {
                  total: 0,
                  pageSize:9,
                  currentPage: 1
              },
          }
        },
        methods: {
            // 搜索按钮点击事件，添加历史搜索记录
            GoTalk(uid){
                if(uid==this.user.uid){
                    this.$message.error('您不能和你自己聊天')
                }
                else this.$router.push({name:'chat',query:{friendId:uid}})
            },
            searchClick() {
                this.$router.push({name: 'recruitSearch'})
            },
            GoDetails(id){
                this.$router.push({name: 'recruitDetails', query: {id:id}});
            },
            //招聘岗位
            getuserRecruit(){
                recruitUserApi.userRecruit({
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize
                }).then((res)=>{
                    if(res.status == 1){
                        this.recruits=res.data.recruits.data
                        this.bannerList=res.data.banners
                        this.pageInfo.total = res.data.recruits.total
                        console.log("岗位",res.data)
                    }else {

                    }
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                this.getuserRecruit()
            },
            UserchangePage(page){
                this.userPageInfo.currentPage = page
                this.geEnterpriseInstitution()
            },
            TaskchangePage(page){
                this.taskPageInfo.currentPage = page
                this.getuserTask()
            },
            //招聘任务
            getuserTask(){
                recruitUserApi.userTask({
                    page: this.taskPageInfo.currentPage,
                    pageSize: this.taskPageInfo.pageSize
                }).then((res)=>{
                    if(res.status == 1){
                        this.Task=res.data.data
                        this.taskPageInfo.total = res.data.total
                        console.log("招聘任务",res.data)
                    }else {

                    }
                })
            },

            //招聘人才
            geEnterpriseInstitution(){
                recruitUserApi.EnterpriseInstitution({
                    page: this.userPageInfo.currentPage,
                    pageSize: this.userPageInfo.pageSize
                }).then((res)=>{
                    if(res.status == 1){
                        this.userList=res.data.user.data
                        this.resume=res.data.resume.data
                        this.bannerList=res.data.banner
                        if(res.data.user.total>=res.data.resume.total)
                            this.userPageInfo.total = res.data.user.total
                        else
                            this.userPageInfo.total = res.data.resume.total
                        console.log("招聘人才",res.data)
                    }else {
                        this.$message.error(res.msg)
                    }
                })
            },
            //
            Gosearch(keyWord,type){
                if(type==1||type==2)//用户与专家
                    this.$router.push({name: 'recruitSearch',query:{keyWord:keyWord}})
                else
                    this.$router.push({name: 'recruitSearchResult',query:{keyWord:keyWord}})
            },
            handleClick(tab) {
                this.tab=tab
                switch(tab*1)
                {
                    case 1:
                        break;
                        this.getuserRecruit()//招聘岗位
                    case 2:
                        this.getuserTask() //招聘任务
                        break;
                    case 3:
                        this.geEnterpriseInstitution()//招聘人才
                        break;
                }
            },
            GoresumDetail(id){
                this.$router.push({name: 'resumeDetail',query:{id:id} })
            }
        },
        created(){
            if(this.user.type==3){
                this.activeName="3"
                this.tab=3
                this.geEnterpriseInstitution()
            }else {
                this.activeName="1"
                this.tab=1
                this.getuserRecruit()
            }
        }
    }
</script>

<style lang="scss">
    /*@import "../../assets/scss/constant";*/
    /*@import "../../assets/scss/mixin";*/
    .recruitList{
        .public-banner {
            border-radius: 10px;
            overflow: hidden;

            .banner-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .fine-goods_sort {
            margin-top: 10px;
            width: 100%;
            height: 40px;
            background: #F1F1F1;
            border-radius: 8px;
            display: flex;
            font-size: 12px;
            line-height: 40px;
            & div {
                margin-left: 20px;
            }
            .active {
                color: #F44336;
            }
        }
        .planning_page{
            margin-top: 40px;
            text-align: center;
        }
        #activeName{
            .user_box{
                ul{
                    li{
                        float: left;
                        width: 103px;
                        text-align: center;
                        border: 1px solid #eee;
                        padding: 10px;
                        margin-right:28px;
                        border-radius: 5px;
                        & +li:last-child{
                            margin-right: 0;
                        }
                        img{
                            width: 70px;
                            height: 70px;
                            object-fit: cover;
                            border-radius: 50%;
                        }
                        p{
                            padding:7px;
                            background-color: red;
                            margin: 5px 0;
                            color: white;
                            border-radius: 5px;
                        }
                    }
                }
            }
            .mechanism {
                margin-bottom: 20px;
                ul li{
                    & +li:nth-child(2n){
                        float: right;
                    }
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    border-radius: 10px;
                    -webkit-box-shadow: 0 0 10px #999;
                    box-shadow: 0 0 10px #999;
                    overflow: hidden;
                    padding: 20px;
                    width: 49%;
                    float: left;
                    max-height: 140px;
                    min-height: 140px;
                    margin-top: 20px;
                    .content{
                        margin-top: 10px;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    .info .img{
                        width: 50px;
                        float: left;
                        margin-right: 10px;
                        border-radius: 50%;
                        height: 50px;
                        object-fit: cover;
                    }
                    .right_box{
                        float: left;
                        p:first-child{
                            margin: 0;
                            font-size: 15px;
                            color: #333333;
                        }
                        p:last-child{
                            font-size: 13px;
                            color: #999999;
                            margin: 0;
                        }
                    }
                }
            }
            .el-tabs__nav-wrap{
                &:after{
                    background:none;
                    height: 0;
                }
            }
            .el-tabs__nav-scroll{
                margin-top: 10px;
                width: 100%;
                height: 40px;
                background: #F1F1F1;
                border-radius: 8px;
                display: flex;
                font-size: 12px;
                line-height: 40px;
                padding-left: 20px;
                .el-tabs__item.is-active{
                    color:#F44336 ;
                }
                .el-tabs__active-bar{
                    background:none;
                }
                .el-tabs__item{
                    /*padding: 0 20px 0 0;*/
                }
                .el-tabs__item:hover{
                    color:#F44336
                }
            }
            .el-tabs__content{
                overflow: initial!important;
            }
        }
    }


</style>
