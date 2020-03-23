<template>
    <div class="myTask_page">
        <div class="title">
            悬赏任务
        </div>
        <div class="myTask_type">
            <div @click="published(type=1)" :class="{'active':type===1}">已发布</div>
            <div @click="already(type=2)" :class="{'active':type===2}">已接受</div>
            <div @click="completed(type=3)" :class="{'active':type===3}">已完成</div>
        </div>
        <div class="mains">
            <ul>
                <li v-for="item in task" @click="goDetaile(item)">
                    <div class="name" v-text="item.name"></div>
                    <div class="content" v-text="item.notes">
                    </div>
                    <div class="content_footer clear">
                        <div class="left">{{item.end_time | timeFilter('Y年M月D日')}}</div>
                        <div class="examine left" v-show="item.is_check===0">审核中...</div>
                        <div class="right money" v-text="item.money"></div>
                    </div>
                </li>
            </ul>
        </div>
        <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {myTaskApi} from '../../../api'
    import {Pagination} from "../../../components/public";

    export default {
        name: "task",
        components: {Pagination},
        data() {
            return {
                type: 1,
                task: [],
                //分页
                pageInfo: {
                    pageSize: 10,
                    total: 1,
                    currentPage: 1
                },
            }
        },
        mounted() {
            this.published()
        },
        methods: {
            published() {
                myTaskApi.getPublished({
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then((res) => {
                    console.log("发布列表", res.data)
                    if (res.status === 1) {
                        this.task = res.data.data
                        this.pageInfo.total = res.data.total * 1 || 0
                    }
                })
            },
            //已接收
            already() {
                myTaskApi.getAlready({
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then((res) => {
                    console.log("接收列表", res.data)
                    if (res.status === 1) {
                        this.task = res.data.data
                        this.pageInfo.total = res.data.total * 1 || 0
                    }
                })
            },
            //已完成
            completed() {
                myTaskApi.getcompleted({
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then((res) => {
                    console.log("完成列表", res.data)
                    if (res.status === 1) {
                        this.task = res.data.data
                        this.pageInfo.total = res.data.total * 1 || 0
                    }
                })
            },
            goDetaile(item) {
                if (this.type === 1 && item.is_check === 1) {
                    this.$router.push({name: 'postingDetails', query: {id: item.id}})
                } else if (this.type === 2) {
                    this.$router.push({name: 'accept', query: {id: item.id}})
                } else if (this.type === 3) {
                    this.$router.push({name: 'completeDetails', query: {id: item.id}})
                }
            },
            //分页
            changePage(page) {
                this.pageInfo.currentPage = page
                if (this.type === 1) {
                    this.published()
                } else if (this.type === 2) {
                    this.already()
                } else if (this.type === 3) {
                    this.completed()
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .myTask_page {
        .title {
            padding: 15px 20px;
            font-size: 18px;
            color: #666666;
            border-bottom: 1px solid #f1f1f1;
        }
        .myTask_type {
            padding: 10px 20px;
            display: flex;
            font-size: 14px;
            div {
                padding: 5px 10px;
                margin-right: 30px;
                cursor: pointer;
            }
            .active {
                border-bottom: 2px solid #f44336;
                color: #f44336;
            }
        }
        .mains {
            padding: 20px;
            ul {
                li {
                    padding: 15px;
                    border: 1px solid #f1f1f1;
                    border-radius: 4px;
                    .name {
                        font-weight: bold;
                        font-size: 14px;
                    }
                    .content {
                        margin: 5px 0;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        display: -webkit-box;
                        overflow: hidden;
                    }
                    .content_footer {
                        div:nth-child(2) {
                            color: #f44336;
                            margin-left: 15px;
                        }
                        div:nth-child(3) {
                            color: #f44336;
                        }

                    }
                }
            }
        }
        .myTaskList_page {
            text-align: right;
            margin-top: 50px;
        }
    }
</style>
