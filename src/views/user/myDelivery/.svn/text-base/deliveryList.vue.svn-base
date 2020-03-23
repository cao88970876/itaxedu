<template>
    <div class="mydeliveryList_page">
        <div class="title">我的投递</div>
        <div class="mydeliveryList">
            <el-tabs id="activeName" v-model="activeName" @tab-click="handleClick(activeName)" >
                <el-tab-pane label="已投递" name="0" >
                    <div class="index-panel work">
                        <div class="index-panel-body">
                            <ul >
                                <li v-for="(item,index) in formList.delivery" :key="index" @click="GodeliveryListDetail(item.recruit_id)">
                                    <div class="left_box">
                                        <div class="clear">
                                            <div class="left work-title">{{item.recruit.name}}</div>
                                        </div>
                                        <div class="work-info">{{item.recruit.city}} | {{item.recruit.area}} | {{item.recruit.work_experience}} | {{item.recruit.education}}</div>
                                        <div class="work-type">
                                            <ul class="clear">
                                                <li class="left" v-for="n in item.recruit.categories ">{{n.name}}</li>
                                            </ul>
                                        </div>
                                        <div class="work-date">{{item.created_at|timeFilter('MM月DD日')}}</div>
                                    </div>
                                    <div class="clear work-company right">
                                        <div class="clear">
                                            <div class="left company-block ">
                                                <div class="company-name">{{item.recruit.shop.institution}} </div>
                                                <div class="clear">
                                                    <div class="company-info">{{item.recruit.shop.financing}} | {{item.recruit.shop.scale}} | {{item.recruit.shop.business}}</div>
                                                </div>
                                            </div>
                                            <img class="left company-img" :src=$helper.utils.api+item.recruit.shop.logo>
                                        </div>
                                        <div class="money">{{item.recruit.salary_min}}K - {{item.recruit.salary_max}}K</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="被查看" name="1">
                    <div class="index-panel work">
                        <div class="index-panel-body">
                            <ul >
                                <li v-for="(item,index) in formList.deliverySee" :key="index" @click="GodeliveryListDetail(item.recruit_id)">
                                    <div class="left_box">
                                        <div class="clear">
                                            <div class="left work-title">{{item.recruit.name}}</div>
                                        </div>
                                        <div class="work-info">{{item.recruit.city}} | {{item.recruit.area}} | {{item.recruit.work_experience}} | {{item.recruit.education}}</div>
                                        <div class="work-type">
                                            <ul class="clear">
                                                <li class="left" v-for="n in item.recruit.categories ">{{n.name}}</li>
                                            </ul>
                                        </div>
                                        <div class="work-date">{{item.created_at|timeFilter('MM月DD日')}}</div>
                                    </div>
                                    <div class="clear work-company right">
                                        <div class="clear">
                                            <div class="left company-block ">
                                                <div class="company-name">{{item.recruit.shop.institution}} </div>
                                                <div class="clear">
                                                    <div class="company-info">{{item.recruit.shop.financing}} | {{item.recruit.shop.scale}} | {{item.recruit.shop.business}}</div>
                                                </div>
                                            </div>
                                            <img class="left company-img" :src=$helper.utils.api+item.recruit.shop.logo>
                                        </div>
                                        <div class="money">{{item.recruit.salary_min}}K - {{item.recruit.salary_max}}K</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="面试" name="2">
                    <div class="index-panel work">
                        <div class="index-panel-body">
                            <ul >
                                <li v-for="(item,index) in formList.deliveryInvitation" :key="index" @click="GodeliveryListDetail(item.recruit_id)">
                                    <div class="left_box">
                                        <div class="clear">
                                            <div class="left work-title">{{item.recruit.name}}</div>
                                        </div>
                                        <div class="work-info">{{item.recruit.city}} | {{item.recruit.area}} | {{item.recruit.work_experience}} | {{item.recruit.education}}</div>
                                        <div class="work-type">
                                            <ul class="clear">
                                                <li class="left" v-for="n in item.recruit.categories ">{{n.name}}</li>
                                            </ul>
                                        </div>
                                        <div class="work-date">{{item.created_at|timeFilter('MM月DD日')}}</div>
                                    </div>
                                    <div class="clear work-company right">
                                        <div class="clear">
                                            <div class="left company-block ">
                                                <div class="company-name">{{item.recruit.shop.institution}} </div>
                                                <div class="clear">
                                                    <div class="company-info">{{item.recruit.shop.financing}} | {{item.recruit.shop.scale}} | {{item.recruit.shop.business}}</div>
                                                </div>
                                            </div>
                                            <img class="left company-img" :src=$helper.utils.api+item.recruit.shop.logo>
                                        </div>
                                        <div class="money">{{item.recruit.salary_min}}K - {{item.recruit.salary_max}}K</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="不合适" name="3" >
                    <div class="index-panel work">
                        <div class="index-panel-body">
                            <ul >
                                <li v-for="(item,index) in formList.deliveryInappropriate" :key="index" @click="GodeliveryListDetail(item.recruit_id)">
                                    <div class="left_box">
                                        <div class="clear">
                                            <div class="left work-title">{{item.recruit.name}}</div>
                                        </div>
                                        <div class="work-info">{{item.recruit.city}} | {{item.recruit.area}} | {{item.recruit.work_experience}} | {{item.recruit.education}}</div>
                                        <div class="work-type">
                                            <ul class="clear">
                                                <li class="left" v-for="n in item.recruit.categories ">{{n.name}}</li>
                                            </ul>
                                        </div>
                                        <div class="work-date">{{item.created_at|timeFilter('MM月DD日')}}</div>
                                    </div>
                                    <div class="clear work-company right">
                                        <div class="clear">
                                            <div class="left company-block ">
                                                <div class="company-name">{{item.recruit.shop.institution}} </div>
                                                <div class="clear">
                                                    <div class="company-info">{{item.recruit.shop.financing}} | {{item.recruit.shop.scale}} | {{item.recruit.shop.business}}</div>
                                                </div>
                                            </div>
                                            <img class="left company-img" :src=$helper.utils.api+item.recruit.shop.logo>
                                        </div>
                                        <div class="money">{{item.recruit.salary_min}}K - {{item.recruit.salary_max}}K</div>
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
        name: "deliveryList",
        components:{Pagination},
        data() {
            return {
                type: 1,
                task: [],
                activeName: 0,
                formList:{
                    delivery:"",
                    deliverySee:"",
                    deliveryInvitation:"",
                    deliveryInappropriate:"",

                },
                pageInfo: {
                    total: 0,
                    pageSize: 8,
                    currentPage: 1
                },
            }
        },
        created(){
          this.userSend(0) //已投递

        },
        methods:{
            userSend(status) {
                let params = {
                    status: status,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize
                };
                deliveryApi.userSend(params).then((res) => {
                    if(res.status==1){
                        switch(status*1)
                        {
                            case 0:
                                this.formList.delivery=res.data.data
                                this.pageInfo.total=res.data.total
                                console.log("0",res.data)
                                break;
                            case 1:
                                this.formList.deliverySee=res.data.data
                                this.pageInfo.total=res.data.total
                                console.log("1",res.data)
                                break;
                            case 2:
                                this.formList.deliveryInvitation=res.data.data
                                this.pageInfo.total=res.data.total
                                console.log("2",res.data)
                                break;
                            case 3:
                                this.formList.deliveryInappropriate=res.data.data
                                this.pageInfo.total=res.data.total
                                console.log("3",res.data)
                                break;
                        }
                    }
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                this.userSend(0)
            },
            handleClick(tab){
                this.userSend(tab) //被查看
            },
            GodeliveryListDetail(recruit_id){
                this.$router.push({name: 'deliveryListDetail',query:{id:recruit_id}})
            }
        }

    }
</script>

<style lang="scss" >
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";
    .mydeliveryList_page {
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
                }

                .company-block {
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
