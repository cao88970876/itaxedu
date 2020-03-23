<template>
    <div class="videoProblem_page">
        <div class="videoProblem_btn">
            <ul class="videoProblem_list">
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
        <div class="pageProblem_mains">
            <div>
                <p>1. 视频如何收费？</p>
                <p>2. 视频如何缴费？</p>
                <p>3. 如何购买视频？</p>
                <p>4. 如何赠送视频？</p>
                <p>5. 为什么更换手机后购买内容还在，而余额为0？</p>
            </div>
            <div class="paging">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="10">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "videoProblem"
    }
</script>

<style  lang="scss" scoped>
    .videoProblem_page{
        display: flex;
        /*按钮*/
        .videoProblem_btn{
            width: 120px;
            height: 100%;
            .videoProblem_list{
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
                        a.router-link-active {
                            .icon {
                                background: url("../../assets/image/ic_25.png");
                            }
                        }
                    }
                }

            }
        }
        /*内容*/
        .pageProblem_mains{
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
