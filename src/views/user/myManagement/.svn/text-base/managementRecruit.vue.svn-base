<template>
    <div class="managementRecruit">
        <div class="title">招聘管理</div>
        <div class="managementRecruitList">
            <el-tabs id="activeName"  v-model="activeName" @tab-click="handleClick(activeName)">
                <el-tab-pane label="已收到" name="1">
                    <div class="managementRecruitListmechanism">
                        <ul class="clear">
                            <li class="pointer" v-for="(item,index) in formList.recruitmentList" :key="index"   @click="GodeliveryListDetail(item.send_id,1)">
                                <div class="clear info">
                                    <img :src=$helper.utils.api+item.head_img class="img"/>
                                    <div class="right_box">
                                        <p>{{item.name}}</p>
                                        <p >{{item.city}} | {{item.year_num}} | {{item.education}} </p>
                                    </div>
                                </div>
                                <div class="content">{{item.describes}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="面试" name="2">
                    <div class="managementRecruitListmechanism">
                        <ul class="clear">
                            <li class="pointer" v-for="(item,index) in formList.recruitmentInterviewList" :key="index"  @click="GodeliveryListDetail(item.send_id,2)">
                                <div class="clear info">
                                    <img :src=$helper.utils.api+item.head_img class="img"/>
                                    <div class="right_box">
                                        <p>{{item.name}}</p>
                                        <p >{{item.city}} | {{item.year_num}} | {{item.education}} </p>
                                    </div>
                                </div>
                                <div class="content">{{item.describes}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已淘汰" name="3">
                    <div class="managementRecruitListmechanism">
                        <ul class="clear">
                            <li class="pointer" v-for="(item,index) in formList.recruitmentEliminateList" :key="index"  @click="GodeliveryListDetail(item.send_id,3)">
                                <div class="clear info">
                                    <img :src=$helper.utils.api+item.head_img class="img"/>
                                    <div class="right_box">
                                        <p>{{item.name}}</p>
                                        <p >{{item.city}} | {{item.year_num}} | {{item.education}} </p>
                                    </div>
                                </div>
                                <div class="content">{{item.describes}}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--<p v-if="!formList.recruitmentEliminateList.length" style="text-align: center;font-size: 15px">暂无数据</p>-->
                </el-tab-pane>
                <pagination :pageInfo="pageInfo" @change-page="changePage" ></pagination>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {myManagementApi} from '../../../api'
    import {Pagination} from '@/components/public'
    export default {
        name: "managementRecruit",
        components:{Pagination},
        data() {
            return {
                activeName: '1',
                formList:{
                    recruitmentList:{},
                    recruitmentInterviewList:{},
                    recruitmentEliminateList:{},

                },
                pageInfo: {
                    total: 0,
                    pageSize:8,
                    currentPage: 1

                },

            }
        },
        methods:{
            changePage(page) {
                this.pageInfo.currentPage = page
                this.recruitmentLists(this.activeName*1)
            },
            handleClick(tab){
                this.recruitmentLists(tab*1)
            },
            recruitmentLists(status) {
                let params = {
                    status: status,
                    page: this.pageInfo.currentPage,
                    pageSize: this.pageInfo.pageSize
                };
                console.log("params",params)
                myManagementApi.recruitmentList(params).then((res) => {
                    if(res.status==1){
                        switch(status) {
                            case 1:
                                this.formList.recruitmentList=res.data.data
                                this.pageInfo.total = res.data.total*1 || 0
                                console.log("已收到=》",res.data.data)
                                break;
                            case 2:
                                this.formList.recruitmentInterviewList=res.data.data
                                this.pageInfo.total = res.data.total*1 || 0
                                console.log("面试=》",res.data)
                                break;
                            case 3:
                                this.formList.recruitmentEliminateList=res.data.data
                                this.pageInfo.total = res.data.total*1 || 0
                                console.log("已淘汰=》",res.data)
                                break;
                        }
                    }
                })
            },
            GodeliveryListDetail(recruit_id,status){
                this.$router.push({name: 'managementRecruitDetail',query:{id:recruit_id,status:status}})
            }
        },
        created(){
            this.recruitmentLists(1)
        },
    }
</script>

<style lang="scss"  >
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";
    .managementRecruit {
        .title {
            padding: 15px 20px;
            font-size: 18px;
            color: #666666;
            border-bottom: 1px solid #f1f1f1;
        }
        .managementRecruitList{
            padding: 15px 20px;
            .el-tabs__item.is-active{
                color: red!important;;
            }
            .el-tabs__active-bar{
                background-color: red!important;;
            }
            .el-tabs__content{
                overflow: inherit!important;
            }
            .el-tabs__item:hover{
                color:#F44336
            }
        }
        .managementRecruitListmechanism {
            ul li{
                /*& +li:nth-child(2n){*/
                    /*float: right;*/
                /*}*/
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                border-radius: 10px;
                -webkit-box-shadow: 0 0 10px #999;
                box-shadow: 0 0 10px #999;
                margin-top: 20px;
                overflow: hidden;
                padding: 20px;
                width:100%;
                max-height: 140px;
                min-height: 140px;
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
                    height: 50px;
                    object-fit: cover;
                    border-radius: 50%;
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
        .pagination {
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }
    }
</style>
