<template>
    <div class="projectDetails_page page-content">

        <!--搜索-->
        <div>
            <!--@search="search"-->
            <search-input></search-input>
        </div>
        <!--导航-->
        <div class="details_nav">
            <navigation></navigation>
        </div>
        <div class="Details_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ name: 'projectPlanning' }">项目策划</el-breadcrumb-item>
                <el-breadcrumb-item>项目详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="course-info clear">
            <div class="video left"><img :src="imgPath+projectDetails.cover_img"></div>
            <div class="info left">
                <div class="info-name" v-text="projectDetails.name"></div>
                <div class="info-type">
                    <div>项目地址：</div>
                    <div v-text="projectDetails.address"></div>
                </div>
                <div class="info-time">项目时间：{{projectDetails.start_time |
                    timeFilter('Y年M月D日')}}~{{projectDetails.end_time |
                    timeFilter('M月D日')}}
                </div>
                <div class="info-end">报名截止时间:{{projectDetails.apply_time | timeFilter('Y年M月D日') }}</div>
                <div class="info-teacher">讲师：{{projectDetails.lecturer}}</div>

                <div class="info-price">
                    <div v-if="projectDetails.discounts_price!=='0.00'">
                        <span class="current-price money" v-text="projectDetails.discounts_price"></span>
                        <del class="old-price money" v-text="projectDetails.price"></del>
                    </div>
                    <div class="current-price" v-else>免费</div>
                </div>
                <div class="info-ctrl">
                    <ul class="clear">
                        <li class="left" @click="setCollect"><a><span class="icon star"
                                                                      :class="{'star-active':projectDetails.is_collect===1||projectDetails.is_collect===true}"></span>收藏</a>
                        </li>
                        <li class="left" @click="Talk"><a><span class="icon waiter"></span>客服</a></li>
                        <li class="left"
                            @click="$router.push({name:'storeCourse',params:{id:projectDetails.shop_uid}})"><a><span
                            class="icon shoppe"></span>店铺</a></li>
                    </ul>
                </div>
                <div class="info-share">
                    <dl class="clear">
                        <dt class="left">分享</dt>
                        <!--<dd class="left"><a><span class="icon we-friend"></span></a></dd>-->
                        <!--<dd class="left"><a><span class="icon we-circle"></span></a></dd>-->
                        <dd class="left" @click="sharePage('weBlog')"><a><span class="icon weblog"></span></a></dd>
                        <dd class="left" @click="sharePage('qq')"><a><span class="icon qq"></span></a></dd>
                    </dl>
                </div>
                <div class="clear buy">
                    <a @click="signUp" class="left">在线报名</a>
                    <a @click="signUpBuy" class="left">立即购买</a>
                </div>
            </div>
        </div>
        <div class="course-tab">
            <tab :active="0">
                <tab-item heading="项目介绍">
                    <div class="course-introduction">
                        <div class="temp" v-html="projectDetails.intros">
                        </div>
                    </div>
                </tab-item>
                <tab-item heading="服务讲师">
                    <div class="teacher-introduction" v-for="item in teacherLIst">
                        <div class="clear">
                            <div class="teacher-img left"><img :src="imgPath+item.head_img"></div>
                            <div class="teacher-info left">
                                <div class="name" v-text="item.nickname"></div>
                                <div class="post" v-text="item.experts_type"></div>
                            </div>
                        </div>
                        <div class="comment" v-html="item.introduce">
                        </div>
                    </div>
                </tab-item>
                <tab-item heading="项目须知">
                    <div v-html="projectDetails.notice" class="project_Notes">
                    </div>
                </tab-item>
            </tab>
        </div>
        <self-modal :show.sync="loginTip">
            <div class="pb-30">
                <div class="login-tip">欢迎来到中财讯</div>
                <div class="modal-btn">
                    <a class="pointer" @click="$router.push({name: 'login'})">去登录</a>
                    <a class="pointer ml-20" @click="loginTip=false">先看看</a>
                </div>
            </div>
        </self-modal>
    </div>
</template>

<script>

    import api from '@/api/projectApi'
    import utils from '../../assets/js/utils';
    import {commonApi} from '../../api'
    import {Navigation, SearchInput, SelfModal, TabItem, Tab} from '../../components/public'

    export default {
        name: "project-details",
        components: {
            Navigation,
            SearchInput,
            Tab,
            TabItem,
            SelfModal
        },
        data() {
            return {
                loginTip: false,
                imgPath: utils.api,
                id: '',
                projectDetails: {},
                teacherLIst: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            console.log(this.id)
            api.projectDetails({
                id: this.id,
                uid: this.userInfo.uid,
            }).then((res) => {
                console.log(res.data)
                this.projectDetails = res.data
                this.teacherLIst = res.data.lecturer_data
            })
        },
        methods: {
            Talk(){
                this.$router.push({name:'chat',query:{friendId:this.projectDetails.shop_uid}})
            },
            signUp() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                this.$router.push({name: 'signUp', query: {id: this.id}})
            },
            signUpBuy() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                this.$router.push({name: 'signUpBuy', query: {id: this.id, price: this.projectDetails.discounts_price}})
            },
            sharePage(type) {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                let _this = this
                commonApi.shareContent({
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        let params = {
                            url: encodeURIComponent(location.href),
                            title: encodeURIComponent(_this.projectDetails.name),
                            content: encodeURIComponent('iTax智能财税共享服务平台'),
                            pic: utils.api + _this.projectDetails.cover_img,
                        }
                        let shareUrl = {
                            qq: `http://connect.qq.com/widget/shareqq/index.html?url=${params.url}&title=${params.title}&desc=${params.content}&pics=${params.pic}`,
                            weBlog: `http://service.weibo.com/share/share.php?url=${params.url}&title=${params.title}&content=${params.content}&pic=${params.pic}&appkey=${utils.api.appkey}`,
                        }
                        window.open(shareUrl[type], '_blank')
                    } else {
                        this.$message({
                            message: resp.msg,
                            type: 'error'
                        })
                    }
                })
            },
            setCollect() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                commonApi.projectCollect({
                    uid: this.userInfo.uid,
                    item_id: this.projectDetails.id,
                }).then((res) => {
                    this.projectDetails.is_collect = !this.projectDetails.is_collect;
                })
            },

        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .projectDetails_page {
        .login-tip {
            text-align: center;
            line-height: 55px;
        }

        .modal-btn {
            text-align: center;
            a {
                display: inline-block;
                padding: 5px 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
        .details_nav {
            margin-top: 20px;
        }
        .Details_breadcrumb {
            margin-top: 20px;
        }

        .course-info {
            margin-top: 20px;
            padding: 0 0 20px 0;
            border-bottom: 5px solid #eee;
            * {
                box-sizing: border-box;
            }
            .video {
                @include size(720px, 400px);
                background-color: #ccc;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .info {
                @include size(480px, 400px);
                padding: 5px 10px 0 25px;

                & > div + div {
                    margin-top: 10px;
                }
                &-name {
                    font-size: 16px;
                    font-weight: bold;
                }
                &-type {
                    div {
                        display: inline-block;
                    }
                }
                &-type, &-time, &-end, &-teacher {
                    font-size: 16px;
                }
                &-teacher {
                    margin-bottom: 50px;
                }
                &-count {
                    color: #999;
                }
                &-type2 {
                    & > div {
                        background-color: #30babe;
                        color: #fff;
                        display: inline-block;
                        line-height: 1;
                        padding: 10px;
                        border-radius: 8px;
                    }
                }
                &-price {

                    font-size: 16px;
                    span {
                        color: $fontColorRed;
                    }
                    del {
                        margin-left: 15px;
                        color: #999999;
                    }
                }
                &-ctrl {
                    ul {
                        list-style: none;
                        background-color: #f1f1f1;
                        display: inline-block;
                        padding: 7px 15px;
                        border-radius: 5px;

                        li {
                            a {
                                color: #666;
                                font-size: 14px;
                                line-height: 22px;
                                cursor: pointer;
                            }
                            span.icon {
                                vertical-align: bottom;
                                margin-right: 5px;
                                @include size(22px, 22px);
                            }
                            & + li {
                                margin-left: 10px;

                                a {
                                    margin-left: 10px;
                                }

                                &:before {
                                    content: '';
                                    display: block;
                                    @include size(1px, 21px);
                                    margin-top: 1px;
                                    background-color: #666;
                                    color: #666;
                                    float: left;
                                }
                            }
                        }
                    }
                }

                &-share {
                    dl {
                        dt {
                            line-height: 40px;
                            font-size: 14px;
                        }
                        dd {
                            margin: 0 0 0 10px;
                            a {
                                cursor: pointer;
                            }
                        }
                    }
                    .icon {
                        @include size(40px, 40px);
                    }
                }

                .buy {
                    a {
                        display: inline-block;
                        font-size: 16px;
                        color: #fff;
                        background-color: $fontColorBlue;
                        padding: 10px 35px;
                        border-radius: 5px;
                        cursor: pointer;

                        &:nth-of-type(2) {
                            margin-left: 10px;
                            background-color: $fontColorRed;
                        }
                    }
                }
            }
        }
        .course-tab {
            margin-top: 10px;
        }
        .recommend {
            .title {
                border-bottom: 3px solid #eee;
                font-size: 14px;
                font-weight: bold;
                color: #666;
                line-height: 40px;
            }

            & > ul {
                @include panelUl(285px, 305px, '4n+1');
                .course-img {
                    background-color: #ccc;
                    height: 190px;
                    position: relative;
                    .level {
                        background-image: url("../../assets/image/ic_7.png");
                        background-size: cover;
                        position: absolute;
                        width: 26px;
                        height: 21px;
                        top: 20px;
                        left: 20px;
                    }
                    .type {
                        position: absolute;
                        background-color: #303f9f;
                        color: #fff;
                        right: 10px;
                        bottom: 10px;
                        padding: 3px 13px;
                        border-radius: 20px;
                    }
                }
                .course-inf {
                    padding: 10px 15px;

                    .course-title {
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .course-teacher, .course-time {
                        margin-top: 6px;
                    }
                    .course-price {
                        margin-top: 14px;
                        .left {
                            color: #999;
                        }
                    }
                }
            }
        }
        .course-introduction {
            margin-top: 10px;
            .temp {
                width: 100%;
                img {
                    width: 100%;
                }

            }

            .file {
                box-sizing: border-box;
                @include size(400px, 100px);
                border: 1px solid #f1f1f1;
                border-radius: 5px;
                padding: 10px;
                position: relative;

                &-name {
                    width: 295px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                &-icon {
                    width: 80px;
                    height: 80px;
                    @include size(80px, 80px);
                    background-color: #ccc;
                    border-radius: 5px;
                }
                .size {
                    position: absolute;
                    left: 10px;
                    bottom: 10px;
                    color: #aaa;
                }
            }
        }

        .teacher-introduction {
            margin-top: 10px;
            .teacher-img {
                @include size(80px, 80px);
                border-radius: 100px;
                background-color: #ccc;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 100px;
                }
            }
            .teacher-info {
                line-height: 26px;
                margin-left: 10px;
                .name {
                    font-weight: bold;
                    margin-top: 15px;
                }
                .post {
                    color: #999;
                }
            }
            .comment {
                margin: 10px 0;
                p {
                    img {
                        max-width: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
        .project_Notes {
            img {
                width: 100%;
                max-width: 100%;
                object-fit: cover;
            }
        }

    }

</style>
