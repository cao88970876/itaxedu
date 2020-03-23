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
                        <div class="left" v-text="item.add_time"></div>
                        <div class="examine left" v-show="item.is_check===0">审核中...</div>
                        <div class="right money" v-text="item.money"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {myTaskApi} from '../../../api'

    export default {
        name: "task",
        data() {
            return {
                type: 1,
                task: [],
            }
        },
        mounted() {
            this.published()
        },
        methods: {
            published() {
                myTaskApi.getPublished().then((res) => {
                    console.log("发布列表", res.data.data.data)
                    //this.task = res.data.data.data

                })
            },
            //已接收
            already() {
                myTaskApi.getAlready().then((res) => {
                    this.task = res.data.data.data
                })
            },
            //已完成
            completed() {
                myTaskApi.getcompleted().then((res) => {
                    console.log("完成列表",res.data);
                    this.task = res.data.data.data
                })
            },
            goDetaile(item) {
                if (this.type === 1 && item.is_check===1 ) {
                    this.$router.push({name: 'postingDetails',query:{id:item.id}})
                } else if (this.type === 2) {
                    this.$router.push({name: 'accept',query:{id:item.id}})
                }   else if(this.type === 3){
                    this.$router.push({name: 'completeDetails',query:{id:item.id}})
                }
            }
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
    }
</style>
