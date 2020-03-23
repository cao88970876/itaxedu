<template>
    <div class="page-content">
        <div class="planning_search mt-20">
            <search-input v-model="form.keyWords" @search="getworksearchIndex"></search-input>
        </div>
        <div class="condition_box">
            <el-form ref="form" label-width="100px">
                <el-form-item label="所在城市">
                    <el-select placeholder="省" style="width:133px" v-model="provinces"
                               @change="changeProvinceList">
                        <el-option v-for="item in provinceList" :key="item.code" :label="item.name"
                                   :value="item.name"></el-option>
                    </el-select>
                    <el-select placeholder="市" style="width:133px;margin-left: 5px" v-model="city"
                               @change="changeCityList">
                        <el-option v-for="item in cityList" :label="item.name" :key="item.code"
                                   :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="薪资待遇">
                    <el-select placeholder="期望薪资" class="el-col-lg-3" v-model="moneyId" @change="Gosearch(moneyId)">
                        <el-option label="100" v-for="item in work_money"
                                   :label="item.salary_min+'K-'+item.salary_max+'K'"
                                   :key="item.id" :value="item.id" >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工作经验：">
                    <el-button v-for="item in work_exp" :key="item.id" :class="{'active':select_exp_id==item.id}"
                               @click="GoexpSearch(item)">{{item.name}}
                    </el-button>
                </el-form-item>
                <el-form-item label="学历要求：">
                    <el-button v-for="item in work_learn" :key="item.id" :class="{'active':select_learn_id==item.id}"
                               @click="GoSearchLearn(item)">{{item.name}}
                    </el-button>
                </el-form-item>
                <el-form-item label="工作性质：">
                    <el-button v-for="item in work_type" :key="item.id"
                               :class="{'active':select_work_nature_id==item.id}" @click="GoSearchWorkNature(item)">
                        {{item.name}}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--招聘岗位-->
        <HotItem :recruits="Task" :activeName=1></HotItem>
        <pagination :pageInfo="pageInfo" @change-page="changePage"  v-if="Task.length"></pagination>
    </div>
</template>

<script>

    import address from "@/assets/json/pca-code.json";
    import {Navigation, SearchInput, Banner, HotItem,Pagination} from '../../components/public'
    import {recruitUserApi} from '../../api'
    import {utilsApi} from '../../api'

    export default {
        name: "searchResult",
        components: {
            Navigation, SearchInput, Banner, HotItem, utilsApi,Pagination
        },
        data() {
            return {
                //三级联动-->
                provinces: '',
                city: '',
                areas: '',
                provinceList: [],
                cityList: [],
                id: '',
                user: this.$helper.utils.storage.get('userInfo'),
                Task: {},
                imgPath: utilsApi.api,
                select_exp_id: "0",//工作年限
                select_learn_id: "0",//学习经历
                select_work_nature_id: "0",//工作性质
                moneyId: "",
                form: {
                    salary_min: "",
                    salary_max: "",
                    education: "",
                    year_num: "",
                    keyWords: "",
                    work_nature: "",
                    province_id: "",
                    city_id: ""
                },
                pageInfo: {
                    total: 0,
                    pageSize:9,
                    currentPage: 1
                },
                work_money: [
                    {
                        id: 1,
                        salary_min: 0,
                        salary_max: 3
                    }, {
                        id: 2,
                        salary_min: 3,
                        salary_max: 5
                    }, {
                        id: 3,
                        salary_min: 5,
                        salary_max: 10
                    }, {
                        id: 4,
                        salary_min: 10,
                        salary_max: 15
                    }, {
                        id: 5,
                        salary_min: 15,
                        salary_max: 20
                    }, {
                        id: 6,
                        salary_min: 20,
                        salary_max: 25
                    }, {
                        id: 7,
                        salary_min: 50,
                        salary_max: 100
                    }, {
                        id: 8,
                        salary_min: 100,
                        salary_max: 2000
                    }
                ],
                work_exp: [],
                work_learn: [],
                work_type: [],
            }
        },
        created() {
            this.getrecruit_dictionary(1)
            this.getrecruit_dictionary(2)
            this.getrecruit_dictionary(3)
            if (this.$route.query.keyWord)
                this.form.keyWords = this.$route.query.keyWord
            else
                this.form.keyWords = ""
             this.getworksearchIndex()
        },
        methods: {
            changePage(page) {
                this.pageInfo.currentPage = page;
                this.getworksearchIndex()
            },
            //搜索条件
            getrecruit_dictionary(type) {
                recruitUserApi.recruit_dictionary({
                    type: type,
                }).then((res) => {
                    if (res.status == 1) {
                        if (type == 1)
                            this.work_exp = res.data
                        console.log("工作经验", this.work_exp)
                        if (type == 2)
                            this.work_learn = res.data
                        if (type == 3)
                            this.work_type = res.data
                        console.log("学习经验", this.work_learn)
                    } else {

                    }
                })
            },
            //搜索任务
            getworksearchIndex() {
                recruitUserApi.worksearch_index({
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                    name: this.form.keyWords,
                    province_id: this.form.province_id,
                    city_id: this.form.city_id,
                    salary_min: this.form.salary_min,
                    salary_max: this.form.salary_max,
                    work_experience: this.form.year_num,
                    education: this.form.education,
                    work_nature: this.form.work_nature,
                }).then((res) => {
                    if (res.status == 1) {
                        this.Task = res.data.data
                        this.pageInfo.total = res.data.total;
                    }
                })
            },

            GoresumDetail(id) {
                this.$router.push({name: 'resumeDetail', query: {id: id}})
            },

            Gosearch(item) {
                for(let n=0;n<this.work_money.length;n++){
                    if(item==this.work_money[n].id){
                        this.form.salary_min = this.work_money[n].salary_min
                        this.form.salary_max = this.work_money[n].salary_max
                    }
                }
                this.getworksearchIndex()
            },
            GoexpSearch(item) {
                this.select_exp_id = item.id,
                this.form.year_num = item.id
                this.getworksearchIndex()
            },
            GoSearchLearn(item) {
                this.select_learn_id = item.id,
                this.form.education = item.id
                this.getworksearchIndex()
            },
            GoSearchWorkNature(item) {
                this.select_work_nature_id = item.id,
                this.form.work_nature = item.id
                this.getworksearchIndex()
            },
            changeProvinceList(val) {
                this.province_id = val,
                this.getworksearchIndex()
            },
            changeCityList(code) {
                this.city_id = code,
                    this.getworksearchIndex()
            }
        },
        mounted() {
            //接收id
            this.id = this.$route.query.id;
            //获取联动address-->
            this.provinceList = address
            this.province = this.provinceList[0].code
            console.log("this.province", this.province)
        },
        watch: {
            provinces(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.provinceList) {
                        if (item.name === v1) {
                            this.cityList = item.children
                            this.city = this.cityList[0].name
                            this.form.province_id=item.code
                            break
                        }
                    }
                }
            },
            city(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.cityList) {
                        if (item.name === v1) {
                            this.form.city_id= item.code
                            this.getworksearchIndex()
                            break
                        }
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .mechanism {

        ul li {
            & + li:nth-child(2n) {
                float: right;
            }
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-radius: 10px;
            -webkit-box-shadow: 0 0 10px #999;
            box-shadow: 0 0 10px #999;
            margin-top: 20px;
            overflow: hidden;
            padding: 20px;
            width: 49%;
            float: left;
            max-height: 150px;
            min-height: 150px;
            .content {
                margin-top: 10px;
                line-height: 20px;
            }
            .info .img {
                width: 40px;
                float: left;
                margin-right: 10px;
                height: 40px;
                object-fit: cover;
            }
            .right_box {
                float: left;
                p:first-child {
                    margin: 0;
                    font-size: 15px;
                    color: #333333;
                }
                p:last-child {
                    font-size: 13px;
                    color: #999999;
                    margin: 0;
                }
            }
        }
    }

    .planning_page {
        margin-top: 40px;
        text-align: center;
    }

    .condition_box {
        margin-top: 20px;
        background-color: #F1F1F1;
        padding: 10px;
        .el-select {
            /*width: 120px;*/
        }
        .el-form-item {
            margin-bottom: 12px !important;
        }

        .el-form-item__content .el-button {
            padding: 9px 12px !important;
            border-radius: 8px !important;
        }
        .active {
            background-color: #303F9F !important;
            border-color: #303F9F !important;
            color: white;
        }
        /*.el-button--primary{*/
        /*background-color:#303F9F!important;*/
        /*border-color: #303F9F!important;*/
        /*}*/
    }

</style>
