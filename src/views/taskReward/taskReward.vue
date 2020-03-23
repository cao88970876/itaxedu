<template>
    <div class="taskReward_page page-content">
        <!--导航-->
        <div>
            <navigation></navigation>
        </div>
        <!--搜索-->
        <div class="task_search">
            <!--<search-input @search="search"></search-input>-->
            <!--@search="search"-->
        </div>
        <div>
            <banner type="9"></banner>
        </div>
        <div class="classify">
            <dl class="clear">
                <dt class="left">分类:</dt>
                <dd class="left"
                    v-for="item in classifies"
                    :class="{active: item.id===taskClassify_Id}"
                    v-text="item.name"
                    @click="setCategory(item)"
                ></dd>
                <dt class="right release pointer" @click="$router.push({name:'release'})">发布任务</dt>
            </dl>

        </div>
        <div class="taskReward_mains">
            <ul>
                <li v-for="item in taskList" :key="item.id"
                    @click="$router.push({name: 'taskDetails',query:{id:item.id}})">
                    <div class="name" v-text="item.name"></div>
                    <div class="text" v-text="item.notes">
                    </div>
                    <div class="time clear">
                        <div class="left"><i class="time_icon"><img src="../../assets/image/ic_64.png" alt=""></i>
                            {{item.end_time | timeFilter('Y年M月D日')}}
                        </div>
                        <div class="price right money" v-text="item.money"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="planning_page">
            <el-pagination
                background
                layout="prev, pager, next, jumper, total"
                :total="pagination.total"
                :page-size="pagination.pageSize"
                :current-page.sync="pagination.currentPage"
                @current-change="changePage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import navigation from '../../components/public/navigation'
    import searchInput from '../../components/public/searchInput'
    import api from '@/api/taskRewardApi'
    import {Navigation, SearchInput, Banner} from '../../components/public'


    export default {
        name: "task-reward",
        components: {
            Navigation,
            SearchInput,
            Banner,
        },
        data() {
            return {
                classifies: [],
                classify_id: [],
                taskClassify_Id: '',
                //分页
                pagination: {
                    pageSize: 10,
                    total: 2,
                    currentPage: 1
                },
                taskList: []
            }
        },
        mounted() {
            //分类
            api.taskclassifyList().then((res) => {
                this.classifies = res.data
                console.log("分类", res.data)
                this.classifies.unshift({classify_id: '', name: '推荐'})
            });
            this.getTaskList()
        },
        methods: {
            getTaskList() {
                api.taskRewardList({
                    classify_id: this.taskClassify_Id
                }).then((res) => {
                    console.log("任务", res.data.data)
                    this.taskList = res.data.data
                    this.pagination.total = res.data.total * 1 || 0
                    this.courseList = res.data.data
                })
            },
            //分类
            setCategory(obj) {
                if (obj.id === this.taskClassify_Id) return
                this.taskClassify_Id = obj.id
                this.getTaskList()
            },
            //分页
            changePage(page) {
                this.pagination.currentPage = page
                this.getTaskList()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .taskReward_page {
        .task_search {
            margin: 20px 0;
        }
        .planning_classification {
            margin: 10px 0 15px 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #ffffff;
            font-size: 12px;
            background: #303F9F;
            border-radius: 8px;
            display: flex;
            & div {
                margin-left: 20px;
                a {
                    color: #ffff;
                }
            }
        }
        & > div.classify {
            color: #bac3ff;
            font-size: 14px;
            margin-top: 10px;
            dl {
                background-color: #303f9f;
                border-radius: 10px;
                margin: 0;
                padding-right: 10px;
                dt, dd {
                    margin: 0 0 0 16px;
                    padding: 0;
                    line-height: 40px;
                }
                dd {
                    cursor: pointer;
                    &.active {
                        color: #fff;
                    }
                }
            }
        }
        .taskReward_mains {
            border-top: 1px solid #f1f1f1;
            padding-top: 20px;
            ul {
                list-style: none;
                li {
                    padding-bottom: 15px;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #f1f1f1;
                    .name {
                        font-weight: bold;
                        font-size: 14px;
                    }
                    .text {
                        margin: 10px 0;

                    }
                    .time {
                        color: #999999;
                        .time_icon {
                            img {
                                width: 15px;
                                height: 15px;
                            }
                        }
                        span {
                            margin-left: 5px;
                        }
                        .price {
                            font-weight: bold;
                            color: #f44336;
                        }
                    }
                }
            }

        }
        .planning_page {
            margin-top: 40px;
            text-align: center;
        }
    }

</style>
