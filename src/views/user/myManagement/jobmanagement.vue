<template>
    <div class="jobmanagement">
        <div class="title">职位管理</div>
        <div class="jobmanagementList">
            <el-tabs id="activeName"  v-model="activeName" @tab-click="handleClick(activeName)">
                <span class="add_new_job pointer" @click="GoNewJob(1)">发布新职位</span>
                <el-tab-pane label="在线职位" name="1">
                    <div class="jobmanagementListmechanism">
                        <ul class="clear">
                            <li v-for="(item,index) in formList.recruitmentList" :key="index"  @click="GodeliveryListDetail(item.id,2)" class="pointer">
                                <div class="clear info">
                                    <div class="right_box">
                                        <p class="clear">
                                            <span class="name_box">{{item.name}}</span>
                                            <span class="right money_box">{{item.salary_min}}k-{{item.salary_max}}k</span>
                                        </p>
                                        <p class="clear"><span class="learn_box">{{item.city}} | {{item.area}} | {{item.work_experience}} | {{item.work_nature}}</span><span class="time_box">{{item.add_time | timeFilter('MM月DD日')}}</span></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已下线" name="2">
                    <div class="jobmanagementListmechanism">
                        <ul class="clear">
                            <li v-for="(item,index) in formList.recruitmentInterviewList" :key="index"  @click="GodeliveryListDetail(item.id,3)" class="pointer">
                                <div class="clear info">
                                    <div class="right_box">
                                        <p class="clear">
                                            <span class="name_box">{{item.name}}</span>
                                            <span class="right money_box">{{item.salary_min}}k-{{item.salary_max}}k</span>
                                        </p>
                                        <p class="clear"><span class="learn_box">{{item.city}} | {{item.area}} | {{item.work_experience}} | {{item.work_nature}}</span><span class="time_box">{{item.add_time | timeFilter('MM月DD日')}}</span></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <pagination :pageInfo="pageInfo" @change-page="changePage" ></pagination>
    </div>
</template>

<script>
    import {myManagementApi} from '../../../api'
    import {Pagination} from '@/components/public'
    export default {
        name: "jobmanagement",
        components:{Pagination},
        data() {
            return {
                activeName: '1',
                formList:{
                    recruitmentList:{},
                    recruitmentInterviewList:{},
                },
                pageInfo: {
                    total: 0,
                    pageSize:8,
                    currentPage: 1
                },
            }
        },
        methods:{
            handleClick(tab){
                this.enterprise_recruitLists(tab*1)
            },
            enterprise_recruitLists(status) {
                let params = {
                    status: status,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize
                };
                myManagementApi.enterprise_recruit(params).then((res) => {
                    if(res.status==1){
                        switch(status) {
                            case 1:
                                this.formList.recruitmentList=res.data.data
                                this.pageInfo.total = res.data.total*1 || 0
                                break;
                            case 2:
                                this.formList.recruitmentInterviewList=res.data.data
                                this.pageInfo.total = res.data.total*1 || 0
                                break;
                        }
                    }
                })
            },
            GoNewJob(status){
                this.$router.push({name: 'addJob',query:{status:status}})
            },
            changePage(num) {
                this.pageInfo.currentPage = num
                this.enterprise_recruitLists()
            },

            GodeliveryListDetail(id,status){
                this.$router.push({name: 'modifyjob',query:{id:id,status:status}})
            }
        },
        created(){
            this.enterprise_recruitLists(1)
            this.enterprise_recruitLists(2)
        },
    }
</script>

<style lang="scss"  >
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";
    .jobmanagement {
        padding-bottom: 20px;
        .el-tabs__nav-scroll{
            margin-top: 10px;
            width: 100%;
            height: 40px;
            background: none!important;
            border-radius: 8px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-size: 12px;
            line-height: 40px;
            padding-left: 0!important;
        }
        .title {
            padding: 15px 20px;
            font-size: 18px;
            color: #666666;
            border-bottom: 1px solid #f1f1f1;
        }
        .jobmanagementList{
            padding: 15px 20px;
            position: relative;
            .add_new_job{
                position: absolute;
                right: 0;
                top: -42px;
                font-size: 14px;
            }
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
        .jobmanagementListmechanism {
            ul li{
                & +li:hover{
                    cursor: pointer;
                }
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
                float: left;
                max-height: 150px;
                .content{
                    margin-top: 10px;
                    line-height: 20px;
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
                    p:first-child{
                        margin: 5px 0;
                        .name_box{
                            margin: 0;
                            font-size: 16px;
                            color: #333333;
                            float: left;
                            display: inline-block;
                            font-weight: bold;
                        }
                        .money_box{
                            float: right;
                            color: #FF0000 ;
                            font-size: 16px;
                            display: inline-block;
                        }
                    }
                    p:last-child{
                        margin: 5px 0;
                        .learn_box{
                            font-size: 13px;
                            color: #999999;
                            margin: 0;
                            float: left;
                         }
                        .time_box{
                            font-size: 13px;
                            color: #999999;
                            margin: 0;
                            float: right;
                        }
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
