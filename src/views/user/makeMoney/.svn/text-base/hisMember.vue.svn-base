<template>
    <div class="hisMemberP_page">
        <div class="title">
            会员详情
        </div>
        <div class="user clear">
            <div class="user_face left">
                <img :src="imgPath+users.face" alt="">
            </div>
            <div class="user_name left">
                <div v-text="users.nickname">名字</div>
                <div v-text="users.phone"></div>
                <div>{{users.add_time | timeFilter }}</div>
            </div>
        </div>
        <div class="mains">
            <!--左边-->
            <div class="account">
                <table class="user_table">
                    <thead class="tab_head">
                    <tr>
                        <th>时间</th>
                        <th>卖出商品</th>
                        <th>数量</th>
                        <th>提成</th>
                    </tr>
                    </thead>
                    <tbody class="tab_body">
                    <tr v-for="item in logs">
                        <td v-text="item.group_by"></td>
                        <td v-text="item.goods_name"></td>
                        <td v-text="item.num"></td>
                        <td v-text="item.push_money"></td>
                    </tr>
                    </tbody>
                </table>
                <div class="table_page">
                    <span class="el-icon-arrow-left"></span><span>1</span>/<span>1</span><span
                    class="el-icon-arrow-right"></span>
                </div>
            </div>
            <!--右边-->
            <div class="member">
                <div class="title clear">
                    <div class="left">他的会员</div>
                    <div class="right"><span class="el-icon-arrow-left"></span><span>1</span>/<span>12</span><span
                        class="el-icon-arrow-right"></span></div>
                </div>
                <div class="memberList">
                    <div>
                        <ul>
                            <li class="clear" v-for="item in hisMemberList" @click="$router.push({name:'memberDetails',query:{id:item.uid}})">
                                <div class="header_face left">
                                    <img :src="imgPath+item.face" alt="">
                                </div>
                                <div class="user_name left">
                                    <div class="name" v-text="item.nickname">
                                    </div>
                                    <div class="phone" v-text="item.phone">
                                    </div>
                                </div>
                                <div class="price right">
                                    <span class="money" v-text="item.push_money"></span><span class="el-icon-arrow-right"></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {myTaskApi} from '../../../api'
    import utils from '../../../assets/js/utils';

    export default {
        name: "his-member",
        data() {
            return {
                imgPath: utils.api,
                users: {},
                logs: [],
                id: '',
                hisMemberList:[]
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            myTaskApi.MemberDetail({
                id: this.id
            }).then((res) => {
                console.log("会员详情", res.data)
                this.users = res.data.user
                this.logs = res.data.logs
            });
            this.getHisMember()
        },
        methods: {
            //他的会员
            getHisMember() {
                myTaskApi.hisMember({
                    id: this.id
                }).then((res)=>{
                    console.log("他的会员",res.data)
                    if(res.status===1){
                        this.hisMemberList=res.data
                    }
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .hisMemberP_page {
        .title {
            padding: 15px 20px;
            font-size: 18px;
            color: #666666;
            border-bottom: 1px solid #f1f1f1;
        }
        .user {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
            .user_face {
                width: 60px;
                height: 60px;
                img {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
            }
            .user_name {
                margin-left: 15px;
                color: #999999;
                div:nth-child(1) {
                    color: #333333;
                    font-weight: bold;
                    font-size: 14px;
                }
                div:nth-child(2) {
                    color: #999999;
                    margin: 6px 0;
                }
            }
        }
        .mains {
            padding: 20px;
            display: flex;
            .account {
                width: 503px;
                height: 300px;
                margin-right: 20px;
                .user_table {
                    width: 100%;
                    .tab_head {
                        tr {
                            height: 35px;
                            color: #ffffff;
                            font-weight: bold;
                            th:nth-child(1) {
                                background: #008DFF;
                                width: 20%;
                            }
                            th:nth-child(2) {
                                background: #FF6807;
                                width: 35%;
                            }
                            th:nth-child(3) {
                                background: #CDDC39;
                                width: 20%;
                            }
                            th:nth-child(4) {
                                background: #FFA000;
                                width: 20%;
                            }
                        }
                    }
                    .tab_body {
                        tr {
                            height: 25px;
                            color: #333333;
                            td {
                                text-align: center;
                            }
                        }
                        tr:nth-child(odd) {
                            background: #F0F0F0;
                        }
                        tr:nth-child(even) {
                            background: #E0E0E0;
                        }
                        tr:hover {
                            background: #ffffff;
                        }
                    }

                }
                .table_page {
                    font-size: 14px;
                    background: #999999;
                    text-align: center;
                    color: #ffffff;
                    height: 35px;
                    line-height: 35px;
                }
            }
            .member {
                width: 503px;

                .title {
                    color: #ffffff;
                    padding: 5px 10px;
                    height: 25px;
                    background: #f44336;
                    font-size: 14px;
                    line-height: 25px;
                    border-radius: 4px;

                }
                .memberList {
                    ul {
                        li {
                            padding: 10px;
                            border-bottom: 1px solid #f1f1f1;
                            .header_face {
                                width: 50px;
                                height: 50px;
                                margin-right: 10px;
                                background: #999999;
                                img {
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                }
                            }
                            .user_name {
                                .name {
                                    color: #333333;
                                    font-weight: bold;
                                    margin-bottom: 20px;
                                }
                                .phone {
                                    color: #999999;
                                }
                            }
                            .price {
                                line-height: 50px;
                                span:nth-child(1) {
                                    color: #f44336;
                                    font-size: 14px;
                                    font-weight: bold;
                                }
                                span:nth-child(2) {
                                    color: #999999;
                                    font-size: 20px;
                                    font-weight: bold;
                                }

                            }
                        }
                        li:hover {
                            background: #f1f1f1;
                        }
                    }
                }
            }

        }
    }
</style>
