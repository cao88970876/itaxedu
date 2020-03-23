<template>
    <div class="mytaskList_page">
        <div class="title">招聘任务</div>
        <div class="mydeliveryList">
            <el-tabs id="activeName" v-model="activeName" @tab-click="handleClick(activeName)">
                <span class="add_new_job pointer" @click="GoNewJob" v-if="userinfo.type==3">发布任务</span>
                <el-tab-pane label="已发布" name="1" v-if="userinfo.type==3">
                    <div class="index-panel work">
                        <div class="index-panel-body">
                            <ul >
                                <li v-for="(item,index) in formList.delivery" :key="index" @click="GodeliveryListDetail(item.id,1)">
                                    <div class="left_box">
                                        <div class="clear">
                                            <div class="left work-title">{{item.position_name}}</div>
                                        </div>
                                        <div class="work-info">{{item.city}} | {{item.area}} | {{item.work_experience}} | {{item.education}}</div>
                                        <div class="work-type">
                                            <ul class="clear">
                                                <li class="left" v-for="n in item.categories ">{{n.name}}</li>
                                            </ul>
                                        </div>
                                        <div class="work-date">{{item.add_time|timeFilter('MM月DD日')}}</div>
                                    </div>
                                    <div class="clear work-company right">
                                        <div class="clear">
                                            <div class="left company-block ">
                                                <div class="company-name">{{item.name}} </div>
                                                <div class="clear">
                                                    <div class="company-info">{{item.financing}} | {{item.shop.scale}} | {{item.shop.business}}</div>
                                                </div>
                                            </div>
                                            <img class="left company-img" :src=$helper.utils.api+item.shop.logo>
                                        </div>
                                        <div class="money">{{item.money}}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已接受" name="2">
                    <div class="index-panel work">
                        <div class="index-panel-body">
                            <ul >
                                <li v-for="(item,index) in formList.deliverySee" :key="index" @click="GodeliveryListDetail(item.id,2)">
                                    <div class="left_box">
                                        <div class="clear">
                                            <div class="left work-title">{{item.position_name}}</div>
                                        </div>
                                        <div class="work-info">{{item.city}} | {{item.area}} | {{item.work_experience}} | {{item.education}}</div>
                                        <div class="work-type">
                                            <ul class="clear">
                                                <li class="left" v-for="n in item.categories ">{{n.name}}</li>
                                            </ul>
                                        </div>
                                        <div class="work-date">{{item.add_time|timeFilter('MM月DD日')}}</div>
                                    </div>
                                    <div class="clear work-company right">
                                        <div class="clear">
                                            <div class="left company-block ">
                                                <div class="company-name">{{item.name}} </div>
                                                <div class="clear">
                                                    <div class="company-info">{{item.financing}} | {{item.shop.scale}} | {{item.shop.business}}</div>
                                                </div>
                                            </div>
                                            <img class="left company-img" :src=$helper.utils.api+item.shop.logo>
                                        </div>
                                        <div class="money">{{item.money}}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已完成" name="3">
                    <div class="index-panel work">
                        <div class="index-panel-body">
                            <ul >
                                <li v-for="(item,index) in formList.deliveryInvitation" :key="index" @click="GodeliveryListDetail(item.id,3)">
                                    <div class="left_box">
                                        <div class="clear">
                                            <div class="left work-title">{{item.position_name}}</div>
                                        </div>
                                        <div class="work-info">{{item.city}} | {{item.area}} | {{item.work_experience}} | {{item.education}}</div>
                                        <div class="work-type">
                                            <ul class="clear">
                                                <li class="left" v-for="n in item.categories ">{{n.name}}</li>
                                            </ul>
                                        </div>
                                        <div class="work-date">{{item.add_time|timeFilter('MM月DD日')}}</div>
                                    </div>
                                    <div class="clear work-company right">
                                        <div class="clear">
                                            <div class="left company-block ">
                                                <div class="company-name">{{item.name}} </div>
                                                <div class="clear">
                                                    <div class="company-info">{{item.financing}} | {{item.shop.scale}} | {{item.shop.business}}</div>
                                                </div>
                                            </div>
                                            <img class="left company-img" :src=$helper.utils.api+item.shop.logo>
                                        </div>
                                        <div class="money">{{item.money}}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <pagination :pageInfo="pageInfo" @change-page="changePage" ></pagination>
    </div>
</template>

<script>
    import {deliveryApi} from '../../../api'
    import {Pagination} from '@/components/public'
    export default {
        name: "taskList",
        components:{Pagination},
        data() {
            return {
                userinfo:this.$helper.utils.storage.get('userInfo'),
                activeName: '1',
                tab:"1",
                formList:{
                    delivery:"",
                    deliverySee:"",
                    deliveryInvitation:"",
                },
                pageInfo: {
                    total: 0,
                    pageSize: 8,
                    currentPage: 1
                },
            }
        },
        created(){
            this.task_list_first()
        },
        methods:{
            task_list() { //已发布
                let params = {
                    page: this.pageInfo.currentPage,
                    pageSize: this.pageInfo.pageSize
                };
                deliveryApi.task_publish(params).then((res) => {
                    this.formList.delivery=res.data.data
                    this.pageInfo.total=res.data.total
                })
            },
            task_accept_list() { //已接受
                let params = {
                    page: this.pageInfo.currentPage,
                    pageSize: this.pageInfo.pageSize
                };
                deliveryApi.task_accept(params).then((res) => {
                    this.formList.deliverySee=res.data.data
                    this.pageInfo.total=res.data.total
                    console.log(res.data)
                })
            },
            task_completed_list() { //已完成
                let params = {
                    page: this.pageInfo.currentPage,
                    pageSize: this.pageInfo.pageSize
                };
                deliveryApi.task_completed(params).then((res) => {
                    this.formList.deliveryInvitation=res.data.data
                    this.pageInfo.total=res.data.total
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                switch(this.tab*1)
                {
                    case 1:
                        this.task_list()
                        break;
                    case 2:
                        this.task_accept_list()
                        break;
                    case 3:
                        this.task_completed_list()
                        break;
                }
            },
            handleClick(tab){
                this.tab=tab
                switch(tab*1){
                    case 1:
                      this.task_list()
                        break;
                    case 2:
                        this.task_accept_list()
                        break;
                    case 3:
                        this.task_completed_list()
                        break;
                }
            },
            task_list_first(){
                if(this.userinfo.type==3){
                    this.activeName="1"
                    this.tab="1"
                    this.task_list()
                }
                else{
                    this.tab="2"
                    this.activeName="2"
                    this.task_accept_list()
                }
            },
            GodeliveryListDetail(id,status){
                this.$router.push({name: 'taskListDetail',query:{id:id,status:status}})
            },
            GoNewJob(){
                this.$router.push({name: 'add_task'})
            },
        }

    }
</script>

<style lang="scss">
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";
    .mytaskList_page {
        padding-bottom: 20px;
        position: relative;
        .add_new_job{
            position: absolute;
            right: 0;
            top: -42px;
            font-size: 14px;
        }
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
        .mydeliveryList{
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
        .work {
            .index-panel-body > ul {
                list-style: none;
                & > li {
                    box-sizing: border-box;
                    border-radius: 10px;
                    box-shadow: 0 0 10px #999;
                    margin-top: 20px;
                    overflow: hidden;
                    height: 100%;
                    .left_box{
                        width: 50%;
                        float: left;
                    }
                }

                & > li {
                    padding: 10px;
                }
                & > li:hover {
                    cursor: pointer;
                }
            }
            &-title {
                font-size: 14px;
                font-weight: bold;
            }
            &-date, &-info {
                color: #999;
            }
            &-info {
                margin-top: 5px;
            }
            &-type{
                margin-bottom: 10px;
            } ul {
                margin-top: 8px;
                list-style: none;
                li {
                    border-radius: 3px;
                    padding: 2px 8px;

                }
            }
            &-company {
                margin-top: 12px;
                .money{
                    text-align: right;
                    color: #f44336;
                    font-size: 15px;
                    margin-top: 10px;
                }
                .company-img {
                    width: 45px;
                    height: 45px;
                    margin-right: 5px;
                    border-radius: 5px;
                    margin-left: 20px;
                    object-fit: cover;
                }

                .company-block {
                    width: 210px;
                    text-align: right;
                }

                .company-name {
                    font-weight: bold;
                    margin: 6px 0;
                }
                .company-info {
                    color: #999;
                    text-align: right;
                }
            }

        }
    }
</style>
