<template>
    <div class="downline-course-detail">
        <store-block class="mt-20"
                     :to="{name: 'storeCourse', params: {id:courseDetail.uid},query: {isFav:courseDetail.is_collect}}"
                     :store-obj="{id: courseDetail.uid,name:courseDetail.store_name,face:courseDetail.store_face}"></store-block>
        <div class="course-info mt-20 clear">
            <div class="video left">
                <img v-if="courseDetail.thumb" :src="imgPath+courseDetail.thumb" alt="">
            </div>
            <div class="info left">
                <div class="info-name">
                    <span class="icon business"></span><span v-text="courseDetail.title"></span>
                </div>
                <div class="info-type">
                    <div>类型：</div>
                    <div v-text="courseDetail.tag_name"></div>
                </div>
                <div class="info-teacher">
                    <span v-text="courseDetail.nickname"></span>
                    <span v-if="courseDetail.experts_name" v-text="`[${courseDetail.experts_name}]`"></span>
                </div>
                <div class="info-time">
                    时间：<span v-text="$filter.timeFilter(courseDetail.line_start_time,'M月DD日 HH:mm')"></span>-<span v-text="$filter.timeFilter(courseDetail.line_end_time,'HH:mm')"></span>
                </div>
                <div class="info-count"><span v-text="courseDetail.sales_volume||0"></span>人已购买</div>
                <div class="info-type2">
                    <a :href="courseDetail.qukuai_urls" target="_blank" class="icon block-chain"></a>
                </div>
                <div class="info-ctrl">
                    <ul class="clear">
                        <li class="left">
                            <a class="pointer" @click="setCollect"><span class="icon star" :class="{'star-active':courseDetail.is_collect}"></span>收藏</a>
                        </li>
                        <li class="left"><a class="pointer"><span class="icon waiter"></span>客服</a></li>
                        <li class="left">
                            <a class="pointer" @click="$router.push({name: 'storeCourse', params: {id:courseDetail.uid,isFav:courseDetail.is_collect}})"><span class="icon shoppe"></span>店铺</a>
                        </li>
                    </ul>
                </div>
                <div class="info-share">
                    <dl class="clear">
                        <dt class="left">分享</dt>
                        <dd class="left"><a @click="sharePage('weBlog')"><span class="icon weblog"></span></a></dd>
                        <dd class="left"><a @click="sharePage('qq')"><span class="icon qq"></span></a></dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="course-tab">
            <tab :active="tabActive" @get-tab-id="changeTab">
                <tab-item heading="课程介绍">
                    <div class="course-introduction">
                        <div class="course-content" v-html="courseDetail.content"></div>
                        <div class="file pointer clear" @click="download(courseDetail.pdfs)" v-if="courseDetail.ext">
                            <div class="file-name left" v-text="courseDetail.names" :title="courseDetail.names"></div>
                            <div class="file-icon right"></div>
                            <div class="size">{{courseDetail.size | fileSizeFilter}}</div>
                        </div>
                    </div>
                </tab-item>
                <tab-item heading="主讲老师">
                    <div class="teacher-introduction">
                        <div class="clear">
                            <div class="teacher-img left" v-if="teacherInfo.face">
                                <img :src="imgPath+teacherInfo.face">
                            </div>
                            <div class="teacher-info left">
                                <div class="name" v-text="teacherInfo.name"></div>
                                <div class="post" v-text="teacherInfo.experts_name"></div>
                            </div>
                        </div>
                        <div class="comment" v-text="teacherInfo.description"></div>
                    </div>
                </tab-item>
                <tab-item :show="courseDetail.is_one===2" heading="课程目录">
                    <div class="course-table">
                        <ul class="clear">
                            <li class="left" v-for="item in courseTable">
                                <div class="table-title ellipsis" v-text="item.title"></div>
                                <div class="clear gray-font">
                                    <div class="left"><span v-text="item.study_count"></span>人已学过</div>
                                    <div class="right">
                                        <span v-text="$filter.timeFilter(item.line_start_time, 'MM月DD日 HH:mm')"></span>-<span v-text="$filter.timeFilter(item.line_end_time, 'HH:mm')"></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </tab-item>
                <tab-item heading="评价">
                    <div class="course-comment">
                        <div class="comment-item" v-for="(item, index) in commentList">
                            <div class="clear">
                                <div class="user-img left">
                                    <img :src="imgPath+item.face">
                                </div>
                                <div class="username left" v-text="item.nickname"></div>
                            </div>
                            <div class="comment" v-text="item.content"></div>
                        </div>
                    </div>
                </tab-item>
            </tab>
        </div>
    </div>
</template>

<script>
    import {Tab, TabItem, StoreBlock} from '../../components/public'
    import {contentApi, utilsApi, commonApi} from '../../api'

    export default {
        name: "downline-course-detail",
        components: {
            Tab,
            TabItem,
            StoreBlock,
        },
        data() {
            return {
                keywords: '',
                imgPath: utilsApi.api,
                tabActive: 0,
                courseDetail: {},
                teacherInfo: {},
                commentList: [],
                courseTable: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        created() {
            this.tabActive = this.$route.params.tabId * 1
        },
        computed: {
            courseId() {
                return this.$route.params.courseId
            }
        },
        mounted() {
            this.getCourseDetail()
            this.getTeacherInfo()
            this.getCommentList()
        },
        methods: {
            getCourseDetail() {
                contentApi.courseDetail({
                    uid: this.userInfo.uid,
                    id: this.courseId
                }).then(resp => {
                    if (resp.status === 1) {
                        this.courseDetail = resp.data
                        if (this.courseDetail.is_one === 2) {
                            this.getCourseTable()
                        }
                    } else {
                        this.$message({
                            message: resp.msg,
                            type: 'error'
                        })
                    }
                })
            },
            getTeacherInfo() {
                contentApi.courseTeacher({
                    id: this.courseId
                }).then(resp => {
                    if (resp.status === 1) {
                        this.teacherInfo = resp.data instanceof Array ? resp.data[0] : {}
                    }
                })
            },
            getCommentList() {
                contentApi.courseComment({
                    id: this.$route.params.courseId
                }).then(resp => {
                    if (resp.status === 1) {
                        this.commentList = resp.data.data
                    }
                })
            },
            getCourseTable() {
                contentApi.courseTable({
                    id: this.courseId
                }).then(resp => {
                    if (resp.status === 1) {
                        this.courseTable = resp.data.data
                    } else {
                        this.$message({
                            message: resp.msg,
                            type: 'error'
                        })
                    }
                })
            },
            changeTab(tabId) {
                this.$router.push({
                    name: 'myDownlineCourse',
                    params: {
                        courseId: this.$route.params.courseId,
                        tabId
                    }
                })
            },
            // 报名
            download(pdfUrl) {
                window.open(this.imgPath + pdfUrl, '_blank')
            },
            setCollect() {
                if (this.courseDetail.is_collect) {
                    commonApi.delCollect({
                        uid: this.userInfo.uid,
                        type: 1,
                        content_id: this.courseId,
                    }).then(resp => {
                        if (resp.status === 1) {
                            this.courseDetail.is_collect = 0
                        } else {
                            this.$message({
                                message: resp.msg,
                                type: 'error'
                            })
                        }
                    })
                } else {
                    commonApi.addCollect({
                        uid: this.userInfo.uid,
                        type: 1,
                        content_id: this.courseId,
                    }).then(resp => {
                        if (resp.status === 1) {
                            this.courseDetail.is_collect = 1
                        } else {
                            this.$message({
                                message: resp.msg,
                                type: 'error'
                            })
                        }
                    })
                }
            },
            // 分享
            sharePage(type) {
                let _this = this
                commonApi.shareContent({
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        let params = {
                            url: encodeURIComponent(location.href),
                            title: encodeURIComponent(_this.courseDetail.title),
                            content: encodeURIComponent('iTax智能财税共享服务平台'),
                            pic: utilsApi.api + _this.courseDetail.thumb,
                        }
                        let shareUrl = {
                            qq: `http://connect.qq.com/widget/shareqq/index.html?url=${params.url}&title=${params.title}&summary=${params.content}&pics=${params.pic}`,
                            weBlog: `http://service.weibo.com/share/share.php?url=${params.url}&title=${params.title}&content=${params.content}&pic=${params.pic}&appkey=${utilsApi.appkey}`,
                        }
                        window.open(shareUrl[type], '_blank')
                    } else {
                        this.$message({
                            message: resp.msg,
                            type: 'error'
                        })
                    }
                })
            }
        },
        watch: {
            courseId(v1, v2) {
                if (v1 !== v2) {
                    this.getCourseDetail()
                    this.getTeacherInfo()
                    this.getCommentList()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .downline-course-detail {

        img {
            width: 100%;
            height: 100%;
        }

        .business {
            @include size(25px, 20px);
            vertical-align: bottom;
            margin-right: 10px;
        }

        .course-info {
            padding: 0 0 20px 0;
            border-bottom: 5px solid #eee;
            * {
                box-sizing: border-box;
            }
            .video {
                @include size(720px, 400px);
                @include imgCover();
                background-color: #ccc;
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
                        &:nth-of-type(2) {
                            background-color: $fontColorBlue;
                            color: #fff;
                            font-size: 12px;
                            border-radius: 10px;
                            padding: 0 12px;
                            line-height: 21px;
                        }
                    }
                }
                &-type, &-teacher, &-time {
                    font-size: 16px;
                }
                &-count {
                    color: #999;
                }
                &-type2 {
                    & > div {
                        .icon.block-chain {
                            display: block;
                            @include size(109px, 40px);
                            border-radius: 8px;
                        }
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
                        @include size(40px);
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

        .course-table {
            font-size: 14px;
            ul {
                @include panelUl(590px, 80px, '2n+1');
                & > li {
                    padding: 10px;
                    line-height: 30px;
                }
                .table-title {
                    @include size(100px, auto);
                }
            }
        }

        .course-introduction {
            margin-top: 10px;
            /*todo 临时样式，调接口后删除*/
            .temp-text {
                line-height: 20px;
            }
            /*todo 临时样式，调接口后删除*/
            .temp-img {
                height: 300px;
                background-color: #ccc;
                margin: 10px 0;
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
                @include size(80px);
                border-radius: 100px;
                background-color: #ccc;
                overflow: hidden;

                @include imgCover();
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

        .course-comment {
            margin-top: 10px;
            .user-img {
                @include size(80px, 80px);
                @include imgCover();
                border-radius: 100px;
                background-color: #ccc;
                overflow: hidden;
            }
            .username {
                line-height: 80px;
                font-weight: bold;
                margin-left: 10px;
            }
            .comment {
                margin: 10px 0;
            }
        }

        .course-tab {
            margin-top: 10px;
        }
    }
</style>
