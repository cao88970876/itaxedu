<template>
    <div class="memberDetails_page">
        <div class="title">
            会员详情
        </div>
        <div class="user clear">
            <div class="user_face left">
                <img :src="imgPath+user.face" alt="">
            </div>
            <div class="user_name left">
                <div v-text="user.nickname">名字</div>
                <div v-text="user.phone">12315645641</div>
                <div>{{user.add_time | timeFilter }}</div>
            </div>
        </div>
        <div class="mains">
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
                <tr v-for="item in logs" >
                    <td v-text="item.group_by"></td>
                    <td v-text="item.goods_name"></td>
                    <td v-text="item.num"></td>
                    <td v-text="item.push_money" class="money"></td>
                </tr>
                </tbody>
            </table>
            <div class="table_page">
                <span class="el-icon-arrow-left"></span><span>1</span>/<span>1</span><span
                class="el-icon-arrow-right"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import {myTaskApi} from '../../../api'
    import utils from '../../../assets/js/utils';

    export default {
        name: "member-details",
        data() {
            return {
                imgPath: utils.api,
                id: '',
                logs:[],
                user:{},
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            this.getMemberDetail()
        },
        methods: {
            getMemberDetail() {
                myTaskApi.hisMemberDetail({
                    id: this.id
                }).then((res) => {
                    console.log("res", res.data)
                    if(res.status===1){
                        this.logs=res.data.logs
                        this.user=res.data.user
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .memberDetails_page {
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
    }

</style>
