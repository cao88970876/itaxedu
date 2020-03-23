<template>
    <div class="page-content">
        <div class="planning_search mt-20">
            <search-input v-model="form.keyWords" @search="getSearchIndex"></search-input>
        </div>
        <div class="condition_box">
            <el-form ref="form"  label-width="100px">
                <el-form-item label="期望薪资：">
                    <el-button v-for="item in work_money" :key="item.id" :class="{'active':select_money_id==item.id}" @click="Gosearch(item)">
                        {{item.salary_min}}<span  v-if="item.salary_max">K-{{item.salary_max}}K</span></el-button>
                </el-form-item>
                <el-form-item label="工作经验：">
                    <el-button v-for="item in work_exp" :key="item.id" :class="{'active':select_exp_id==item.id}"  @click="GoexpSearch(item)">{{item.name}}</el-button>
                </el-form-item>
                <el-form-item label="学历要求：">
                    <el-button v-for="item in work_learn" :key="item.id" :class="{'active':select_learn_id==item.id}" @click="GoSearchLearn(item)">{{item.name}}</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--机构登录时，招聘人才-->
        <div class="mechanism " >
            <ul class="clear">
                <li v-for="(item) in Task" :key="item.id" @click="GoresumDetail(item.id)" class="pointer">
                    <div class="clear info">
                        <img :src="imgPath+item.head_img" class="img"/>
                        <div class="right_box">
                            <p>{{item.name}}&nbsp;</p>
                            <p>{{item.city}} | {{item.year_num}} | {{item.education}}</p>
                        </div>
                    </div>
                    <div class="content">{{item.describes}}
                    </div>
                </li>
            </ul>
            <div class="icon search-null"  v-if="!Task.length"></div>
        </div>
            <pagination :pageInfo="pageInfo" @change-page="changePage" v-if="Task.length"></pagination>
    </div>
</template>

<script>

    import address from "@/assets/json/pca-code.json";
    import {Navigation, SearchInput, Banner,HotItem} from '../../components/public'
    import {recruitUserApi} from '../../api'
    import {utilsApi} from '../../api'
    import {Pagination} from "../../components/public";
    export default {
        name: "searchResult",
        components: {
            Navigation, SearchInput, Banner,HotItem,utilsApi,Pagination
        },
        data(){
            return{
                user:this.$helper.utils.storage.get('userInfo'),
                Task:{},
                imgPath: utilsApi.api,
                select_money_id:"",//工资
                select_exp_id:"0",//工作年限
                select_learn_id:"0",//学习经历
                pageInfo: {
                    total: 0,
                    pageSize:8,
                    currentPage: 1
                },
                form:{
                    salary_min:"",
                    salary_max:"",
                    education:"",
                    year_num:"",
                    keyWords:"",
                },
                work_money:[
                    {
                        id:1,
                        salary_min:0,
                        salary_max:3
                    },{
                        id:2,
                        salary_min:3,
                        salary_max:5
                    },{
                        id:3,
                        salary_min:5,
                        salary_max:10
                    },{
                        id:4,
                        salary_min:10,
                        salary_max:15
                    },{
                        id:5,
                        salary_min:15,
                        salary_max:20
                    },{
                    id:6,
                    salary_min:20,
                    salary_max:25
                },{
                    id:7,
                    salary_min:50,
                    salary_max:100
                },{
                    id:8,
                    salary_min:100,
                    salary_max:20000,
                }
                ],
                work_exp:[],
                work_learn:[],
            }
        },
        created(){
            this.getrecruit_dictionary(1)
            this.getrecruit_dictionary(2)
            if(this.$route.query.keyWord)
                this.form.keyWords=this.$route.query.keyWord
            else
                this.form.keyWords=""
            this.getSearchIndex()
        },
        methods:{
            changePage(page) {
                this.pageInfo.currentPage = page;
                this.getSearchIndex()
            },
            //搜索任务
            getrecruit_dictionary(type){
                recruitUserApi.recruit_dictionary({
                    type:type,
                }).then((res)=>{
                    if(res.status == 1){
                        if(type==1)
                        this.work_exp=res.data
                        console.log("工作经验",this.work_exp)
                        if(type==2)
                            this.work_learn=res.data
                        console.log("学习经验",this.work_learn)
                    }else {

                    }
                })
            },
            //搜索任务
            getSearchIndex(){
                recruitUserApi.usersearch_index({
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                    position_type:this.form.keyWords,
                    salary_min:this.form.salary_min,
                    salary_max:this.form.salary_max,
                    year_num:this.form.year_num,
                    education:this.form.education,
                }).then((res)=>{
                    if (res.status == 1) {
                        this.Task = res.data.data
                        this.pageInfo.total=res.data.total
                    }
                })
            },


            GoresumDetail(id){
                this.$router.push({name: 'resumeDetail',query:{id:id} })
            },

            Gosearch(item){
                this.form.salary_min=item.salary_min
                this.form.salary_max=item.salary_max
                this.select_money_id=item.id
                this.getSearchIndex()
            },
            GoexpSearch(item){
                this.select_exp_id=item.id,
                this.form.year_num=item.id
                this.getSearchIndex()
            },
            GoSearchLearn(item){
                this.select_learn_id=item.id,
                this.form.education=item.id
                this.getSearchIndex()
            }
        },
    }
</script>

<style lang="scss" scoped>
    .mechanism {
        .icon.search-null {
            background: url(../../assets/image/ic_33.png) no-repeat 50%;
            background-size: contain;
        }
        .search-null{
            display: block;
            width: 302px;
            height: 190px;
            margin: 200px auto;
        }
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
                height:50px;
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
    .planning_page{
        margin-top: 40px;
        text-align: center;
    }
    .condition_box{
        margin-top: 20px;
        background-color: #F1F1F1;
        padding: 10px ;
        .el-select{
            /*width: 120px;*/
        }
        .el-form-item{
            margin-bottom: 12px!important;
        }

        .el-form-item__content .el-button{
            padding: 9px 12px!important;
            border-radius: 8px!important;
        }
        .active{
            background-color:#303F9F!important;
            border-color: #303F9F!important;
            color: white;
        }

    }

</style>
