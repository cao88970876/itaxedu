<template>
    <div class="accountNumber_page">
        <div class="accountNumber_btn">
            <ul class="accountNumber_list">
                <li class="recharge-q">
                    <router-link :to="{name:'helpUs'}">
                        <div class="list_p">
                            <div class="icon"></div>
                            <p class="list_title">充值问题</p>
                        </div>
                    </router-link>
                </li>
                <li class="account-q">
                    <router-link :to="{name:'accountNumber'}">
                        <div class="list_p">
                            <div class="icon"></div>
                            <p class="list_title">账号问题</p>
                        </div>
                    </router-link>
                </li>
                <li class="page-q">
                    <router-link :to="{name:'pageProblem'}">
                        <div class="list_p">
                            <div class="icon"></div>
                            <p class="list_title">页面问题</p>
                        </div>
                    </router-link>
                </li>
                <li class="video-q">
                    <router-link :to="{name:'videoProblem'}">
                        <div class="list_p">
                            <div class="icon"></div>
                            <p class="list_title">视频问题</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="accountNumber_mains">
            <div>
                <p>1. 如何注册并登录得到App？</p>
                <p>2. 如何更改密码？</p>
                <p>3. 忘记密码了怎么办？</p>
                <p>4. 更换了手机号，怎么办？</p>
                <p>5. 为什么更换手机后购买内容还在，而余额为0？</p>
            </div>
            <div>
                <div class="paging">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="10">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "account-number"
    }
</script>

<style lang="scss" scoped>
    .accountNumber_page{
        display: flex;
        /*左边按钮*/
        .accountNumber_btn{
            width: 120px;
            height: 100%;
            .accountNumber_list{
                li {
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    padding-top: 20px;
                    cursor: pointer;
                    a {
                        display: block;
                        font-size: 14px;
                        color: #999999;
                        position: relative;
                        .icon {
                            margin: auto;
                            width: 27px;
                            height: 27px;
                        }
                        .list_title {
                            margin: 0;
                        }
                    }
                    .router-link-active{
                        color: #f44336;
                        &:after {
                            content: '';
                            display: block;
                            width: 4px;
                            height: 60px;
                            background-color: #f44336;
                            position: absolute;
                            right: 0;
                            top:0;
                        }
                    }
                    &.recharge-q {
                        .icon {
                            background: url("../../assets/image/ic_18.png");
                        }
                    }
                    &.account-q {
                        .icon {
                            background: url("../../assets/image/ic_19.png");
                        }
                        a.router-link-active {
                            .icon {
                                background: url("../../assets/image/ic_23.png");
                            }
                        }
                    }
                    &.page-q {
                        .icon {
                            background: url("../../assets/image/ic_20.png");
                        }
                    }
                    &.video-q{
                        .icon {
                            background: url("../../assets/image/ic_21.png");
                        }
                    }
                }

            }
        }
        /*右边内容*/
        .accountNumber_mains {
            flex: 1;
            height: 500px;
            padding: 20px;
            border-left: 1px solid #999999;
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            color: #333333;
            letter-spacing: 0;
            line-height: 30px;
            position: relative;
            .paging{
                position: absolute;
                bottom: 10px;
                left: 40%;
            }
        }
    }
</style>
