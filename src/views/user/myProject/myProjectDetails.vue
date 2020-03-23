<template>
    <div class="myProjectDetails_page">
        <div class="title">
            项目详情
        </div>
        <div class="course-info clear">
            <div class="video left">
                <img :src="imgPath+projectDetails.cover_img">
            </div>
            <div class="info left">
                <div class="info-name" v-text="projectDetails.name"></div>
                <div class="info-type">
                    <div>项目地址：</div>
                    <div v-text="projectDetails.address"></div>
                </div>
                <div class="info-time">项目时间：
                    {{projectDetails.start_time | timeFilter('Y年M月D日')}}~{{projectDetails.end_time |
                    timeFilter('M月D日')}}
                </div>
                <div class="info-end">报名截止时间:{{projectDetails.apply_time | timeFilter('Y年M月D日')}}</div>
                <div class="info-teacher">讲师：{{projectDetails.lecturer}}</div>

                <div class="info-price money" v-text="projectDetails.price">100</div>
                <div class="clear buy">
                    <div class="left" @click="Talk">联系客服</div>
                    <!--<router-link :to="{name: 'onlineOrder',query:{id:this.id} }" class="left">立即购买</router-link>-->
                </div>
            </div>
        </div>
        <div class="myTab">
            <div class="course-tab">
                <tab :active="0">
                    <tab-item heading="项目介绍">
                        <div class="course-introduction">
                            <div class="temp" v-html="projectDetails.intros">

                            </div>
                        </div>
                    </tab-item>
                    <tab-item heading="服务老师">
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
                        <div class="project_Notes" v-html="projectDetails.notice">
                        </div>
                    </tab-item>
                </tab>
            </div>
        </div>

    </div>
</template>

<script>
    import {myTaskApi} from '../../../api' //接口是写在 任务悬赏里面的
    import utils from '../../../assets/js/utils';
    import {TabItem,Tab} from "../../../components/public";
    import {commonApi} from '../../../api'
    export default {
        name: "my-project-details",
        components: {
            Tab,
            TabItem,
        },
        data(){
            return{
                id:'',
                imgPath: utils.api,
                projectDetails: {},
                teacherLIst: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        mounted(){
            this.id=this.$route.query.id
            myTaskApi.myProjectDetails({
                id:this.id,
                uid:this.userInfo.uid
            }).then((res)=>{
                console.log("我的项目详情",res.data)
                this.projectDetails = res.data
                this.teacherLIst = res.data.lecturers
            })
        },
        methods:{
            Talk() {
                if (this.userInfo.uid === this.projectDetails.shop_uid) {
                    this.$message.error("你不能与自己聊天")
                    return false
                }
                this.$router.push({name: 'chat', query: {friendId: this.projectDetails.shop_uid}})
            },


        }
    }
</script>

<style lang="scss">
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .myProjectDetails_page {
        .title{
            padding: 15px 20px;
            font-size: 18px;
            color: #666666;
            border-bottom: 1px solid #f1f1f1;
        }
        .course-info {
            padding: 20px;
            border-bottom: 5px solid #eee;
            * {
                box-sizing: border-box;
            }
            .video {
                @include size(536px, 300px);
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
                    color: $fontColorRed;
                    font-size: 16px;
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
                    div {
                        font-size: 16px;
                        color: #fff;
                        background-color: $fontColorBlue;
                        padding: 10px 35px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                }
            }
        }
        .myTab{
            padding: 20px;
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
                        background-image: url("../../../assets/image/ic_7.png");
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
                    max-width: 100%;
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
                img{
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
            }
        }
        .project_Notes{
            img{
                width: 100%;
            }
        }
    }
</style>
