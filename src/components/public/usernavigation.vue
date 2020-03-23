<template>
    <div style="margin-top: 30px">
        <nav class="usernavigation">
            <ul class="clear">
                <li  >
                    <router-link :to="{name: 'userInform'}">个人信息</router-link>
                </li>
                <li >
                    <router-link :to="{name: 'myAccount'}">我的账户</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'myStudy'}">我的学习</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'myFocus'}">我的关注</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'myCourse'}">我的课程</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'myOrder'}">我的订单</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'myTask'}">悬赏任务</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'myAnswer'}"><span v-if="userInfo.type!==2">我的问答</span><span v-if="userInfo.type==2">我的回答</span></router-link>
                </li>
                <li v-if="userInfo.type==2">
                    <router-link :to="{name: 'experPut'}">我的提问</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'myProject'}">我的项目</router-link>
                </li>
                <li v-if="userInfo.type==3">
                    <router-link :to="{name: 'managementRecruit'}">招聘管理</router-link>
                </li>
                <li v-if="userInfo.type==3">
                    <router-link :to="{name: 'jobmanagement'}">职位管理</router-link>
                </li>
                <li v-if="userInfo.type!=3">
                    <router-link :to="{name: 'deliveryList'}">我的投递</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'taskList'}">招聘任务</router-link>
                </li>
                <li v-if="userInfo.type!=3">
                    <router-link :to="{name: 'userResume'}">我的简历</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'myCollection'}">我的收藏</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'makeMoney'}">邀请赚佣金</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import {myAccountApi} from '../../api';
    export default {
        name: "usernavigation",
        data(){
          return{
              userInfo: this.$helper.utils.storage.get('userInfo'),
          }
        },
        created(){
            this.getaccountInfo()
        },
        methods:{
            //修改个人信息
            getaccountInfo() {
                //  获取用户信息
                myAccountApi.accountInfo({uid:this.userInfo.uid}).then(res => {
                    console.log('用户信息=>', res)
                    if (res.status == 1) {
                        this.user=res.data
                    }
                })
            },
        }
    }

</script>

<style scoped lang="scss">
    @import "../../assets/scss/constant";
    .usernavigation{
        ul{
            background-color: #FAFAFA;
            text-align: center;
            li{
                &:first-child{
                    margin-top: 0
                }
                a{
                    color: #333333;
                    display: block;
                    padding:10px 15px;
                    background-color: #FAFAFA;
                    border-bottom: 1px solid #eee;
                    &.router-link-active,&:hover {
                        background-color: $fontColorRed;
                        border-bottom: 1px solid $fontColorRed;
                        color: white;
                    }
                }
            }
            width:120px;
        }

        font-size: 14px;
    }

</style>
