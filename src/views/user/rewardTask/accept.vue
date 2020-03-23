<template>
    <div class="accept_page">
        <div class="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/user/rewardTask/myTaskHome' }">悬赏任务</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '' }">详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mains">
            <div class="name" v-text="task.name">名字</div>
            <div class="time">时间：{{task.end_time | timeFilter('Y年M月D日')}}</div>
            <div class="price">赏金：<span class="money" v-text="task.money">100</span></div>
            <div class="address">地址:<span v-text="task.address"></span></div>
            <div class="mains_content">
                <div class="title">任务介绍</div>
                <div class="text" v-text="task.notes">介绍内容</div>
            </div>
            <!--登录的uid和返回来的task里面你的uid比较 不想等就显示-->
            <div class="recipient" v-show="task.uid === uid">
                <div class="title">接收任务者</div>
                <div class="users">
                    <div>
                        <img :src="imgPath+users.face" alt="">
                    </div>
                    <div v-text="users.nickname"></div>
                </div>
            </div>
            <div class="cancel" v-show="task.uid === uid" @click="confirmUser">
                <!--发布任务的人-->确认完成
            </div>
            <div class="cancel" v-show="task.uid !== uid" @click="acceptUser">
                <!--接收任务的人-->确认完成
            </div>
        </div>

    </div>
</template>

<script>
    import utils from '../../../assets/js/utils';
    import {myTaskApi} from '../../../api'

    export default {
        name: "accept",
        data() {
            return {
                imgPath: utils.api,
                id: '',
                task: {},
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                //拿uid
                uid: this.$helper.utils.storage.get('userInfo').uid,
                users: {},
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            console.log(this.id)
            myTaskApi.getRelease({
                id: this.id
            }).then((res) => {
                console.log(res.data)
                this.task = res.data.task
                this.users = res.data.task.accept_user
            })
        },
        methods:{
            //发任务的人确认
            confirmUser(){
                console.log(this.id)
                myTaskApi.getconfirmUser({
                    id: this.id
                }).then((res)=>{
                   if(res.status ===0){
                       this.$message.error(res.msg);
                       //alert("任务尚未做完")
                   } else if (res.status ===1) {
                       this.$message.success('确认成功');
                       this.$router.push({name:'myTaskHome'})
                   }
                })
            },
            //接收任务的人确认
            acceptUser(){
                myTaskApi.getacceptUser({
                    id: this.id
                }).then((res)=>{
                    if(res.status ===0){
                        this.$message.error(res.msg);
                        this.$router.push({name:'myTaskHome'})
                    } else if (res.status ===1) {
                        //this.$router.push({name:'myTask'})
                        this.$message.success('确认成功');
                    }
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .accept_page {
        .header {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
        }
        .mains {
            padding: 20px;
            color: #999999;
            font-size: 14px;
            .name {
                font-weight: bold;
                color: #333333;
                margin-bottom: 15px;
            }
            .price {
                margin: 5px 0;
                span {
                    color: #f44336;
                }
            }
            .mains_content {
                margin-top: 20px;
                .title {
                    font-weight: bold;
                    color: #333333;
                }
                .text {
                    color: #333333;
                    margin-top: 15px;
                }
            }
            .cancel {
                margin: 50px 0;
                width: 200px;
                height: 40px;
                text-align: center;
                color: #ffffff;
                line-height: 40px;
                border-radius: 4px;
                background: #f44336;
            }
            .recipient {
                margin-top: 50px;
                .title {
                    font-weight: bold;
                    color: #333333;
                }
                .users {
                    margin-top: 15px;
                    display: flex;
                    div:nth-child(1) {
                        width: 60px;
                        height: 60px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    div:nth-child(2) {
                        margin-left: 10px;
                        line-height: 60px;
                    }

                }
            }
        }
    }
</style>
