<template>
    <div class="live-course-detail">
        <navigation class="mt-20"></navigation>
        <div class="course-type clear mt-20 mb-20">
            <router-link class="left" :to="{name: 'videoCourse'}"
                         :class="{'router-link-active':$route.name.indexOf('videoCourse')+1}">录播课
            </router-link>
            <router-link class="left" :to="{name: 'liveCourse'}"
                         :class="{'router-link-active':$route.name.indexOf('liveCourse')+1}">直播课
            </router-link>
            <router-link class="left" :to="{name: 'downlineCourse'}"
                         :class="{'router-link-active':$route.name.indexOf('downlineCourse')+1}">线下课
            </router-link>
        </div>
        <store-block class="mt-20"
                     :to="{name: 'storeCourse', params: {id:courseDetail.uid},query: {isFav:courseDetail.is_collect}}"
                     :store-obj="{id: courseDetail.uid,name:courseDetail.store_name,face:courseDetail.store_face}"></store-block>
        <div class="course-info pb-20 mt-20 clear">
            <div class="video left">
                <dy-live :poster="courseDetail.thumb" v-if="!tryEnd" :room-id="roomId" :limit-time="courseDetail.shikan_time" @current-time="watchProgress" @intercept="intercept"></dy-live>
                <div class="buy-tip pointer" @click="buy" :class="{show: isPause}">购买后继续观看</div>
                <div class="try-watch-tip" v-if="courseDetail.is_buy===0">可试看{{courseDetail.shikan_time/60}}分钟，立即购买可观看完整版</div>
            </div>
            <div class="info left">
                <div class="info-name">
                    <span class="icon business mr-10"></span><span v-text="courseDetail.title"></span>
                </div>
                <div class="info-type">
                    <div>类型：</div>
                    <div v-text="courseDetail.tag_name"></div>
                </div>
                <div class="info-teacher">
                    <span v-text="courseDetail.nickname"></span>
                    <span v-if="courseDetail.experts_name" v-text="`[${courseDetail.experts_name}]`"></span>
                </div>
                <div class="info-time">时间：今天19:00-20:00</div>
                <div class="info-count"><span v-text="courseDetail.sales_volume||0"></span>人已购买</div>
                <div class="info-type2">
                    <a :href="courseDetail.qukuai_urls" target="_blank" class="icon block-chain"></a>
                </div>
                <div class="info-price money" v-if="courseDetail.price!=='0.00'" v-text="courseDetail.price"></div>
                <div v-else class="info-price free-money">免费</div>
                <div class="info-ctrl">
                    <ul class="clear">
                        <li class="left">
                            <a class="pointer" @click="setCollect"><span class="icon star" :class="{'star-active':courseDetail.is_collect}"></span>收藏</a>
                        </li>
                        <li class="left"><router-link :to="{name:'chat',query: {friendId: courseDetail.uid}}" class="pointer"><span class="icon waiter"></span>客服</router-link></li>
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
                <div class="clear buy">
                    <a class="left pointer" @click="courseJoin">立即预约</a>
                    <a class="left pointer ml-10" @click="buy">立即购买</a>
                </div>
            </div>
        </div>
        <div class="course-tab mt-10">
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
                    <div class="teacher-introduction mt-10">
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
                            <li class="left" v-for="item in courseTable" @click="changeLive(item)">
                                <div class="table-title ellipsis" v-text="item.title"></div>
                                <div class="clear gray-font">
                                    <div class="left"><span v-text="item.study_count"></span>人已学过</div>
                                    <div class="right">
                                        <span v-text="$filter.timeFilter(item.start_time, 'MM月DD日 HH:mm')"></span>-<span v-text="$filter.timeFilter(item.end_time, 'HH:mm')"></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </tab-item>
                <tab-item heading="评价">
                    <div class="course-comment mt-10">
                        <div class="comment-item" v-for="(item, index) in commentList">
                            <div class="clear">
                                <div class="user-img left">
                                    <img :src="imgPath+item.face">
                                </div>
                                <div class="username left ml-10" v-text="item.nickname"></div>
                            </div>
                            <div class="comment" v-text="item.content"></div>
                        </div>
                    </div>
                </tab-item>
            </tab>
        </div>
        <div class="recommend">
            <div class="title">课程推荐</div>
            <div class="course-list clear">
                <course-item class="left" v-for="item in courseDetail.lists" :key="item.id" :course-item="item"></course-item>
            </div>
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
    import {
        Navigation,
        Tab,
        TabItem,
        CourseItem,
        SelfModal,
        DyLive,
        StoreBlock
    } from '../../components/public'
    import {contentApi, utilsApi, commonApi} from '../../api'

    export default {
        name: "live-course-detail",
        components: {Navigation, Tab, TabItem, CourseItem, SelfModal, DyLive, StoreBlock},
        data() {
            return {
                imgPath: utilsApi.api,
                keywords: '',
                 nowm:0,
                tabActive: 0,
                courseDetail: {},
                teacherInfo: {},
                commentList: [],
                courseTable: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                loginTip: false,
                player: null,
                roomId: '',
                isPause: false,
                tryEnd: false,
            }
        },
        computed: {
            courseId() {
                return this.$route.params.courseId
            }
        },
        created() {
            this.tabActive = this.$route.params.tabId * 1
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
                        this.courseDetail.shikan_time = this.courseDetail.shikan_time * (this.courseDetail.is_buy ? 0 : 1)
                        this.courseDetail.thumb = utilsApi.api + this.courseDetail.thumb
                        if (this.courseDetail.is_one === 2) {
                            this.getCourseTable()
                        } else {
                            this.roomId = this.courseDetail.weihou_live_id
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
                    id: this.$route.params.courseId
                }).then(resp => {
                    if (resp.status === 1) {
                        this.courseTable = resp.data.data
                        this.roomId = this.courseTable[0].weihou_live_id
                        this.videoId = this.courseTable[0].id
                    }
                })
            },
            changeTab(tabId) {
                this.$router.push({
                    name: 'liveCourseDetail',
                    params: {
                        courseId: this.$route.params.courseId,
                        tabId
                    }
                })
            },
            buy() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                if (this.courseDetail.is_buy) {
                    this.$message({
                        message: '该课程您已购买',
                        type: 'error'
                    })
                    return
                }
                if (this.courseDetail.price === '0.00') {
                    contentApi.freePay({
                        uid: this.userInfo.uid,
                        type: 1,
                        content_id: this.courseId,
                    }).then(resp => {
                        if (resp.status === 1) {
                            this.$message.success('购买成功')
                        } else {
                            this.$message.error(resp.msg)
                        }
                    })
                } else {
                    this.$router.push({name: 'coursePay', params: {courseId: this.courseId}})
                }
            },
            download(pdfUrl) {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                window.open(this.imgPath + pdfUrl, '_blank')
            },
            search() {
                this.$router.push({name: 'courseSearch', params: {type: 1, searchStr: this.keywords}})
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
            },
            courseJoin() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                contentApi.courseJoin({
                    uid: this.userInfo.uid,
                    course_id: this.courseId,
                    type: 1,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.$message.success('预约成功')
                    } else {
                        this.$message.error(resp.msg)
                    }
                })
            },
            watchProgress(time) {
                const curTime = Math.ceil(Math.ceil(time) / 60)
                let params = {
                    uid: this.userInfo.uid,
                    content_id: this.courseId,
                    course_type: 2,
                    minute: curTime,
                    fenzhong: curTime,
                }
                if (this.courseDetail.is_one === 2) {
                    params.catalog_id = this.videoId
                }
                 if (this.nowm != curTime) {
                      if (curTime == this.nowm + 1 && curTime != 1) {
                          contentApi.courseProgress(params)
                      }
                        this.nowm = curTime 
                    }
               
            },
            intercept(player) {
                this.isPause = true
                this.tryEnd = true
            },
            changeLive(item) {
                this.roomId = item.weihou_live_id
                this.videoId = item.id
                this.tryEnd = false
            },
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

    .live-course-detail {

        .business {
            @include size(25px, 20px);
            vertical-align: bottom;
        }

        .course-info {
            border-bottom: 5px solid #eee;
            * {
                box-sizing: border-box;
            }
            .video {
                @include size(720px, 400px);
                background-color: #ccc;
                position: relative;

                .buy-tip {
                    display: none;
                    position: absolute;
                    background-color: $fontColorRed;
                    color: #fff;
                    width: 200px;
                    line-height: 50px;
                    left: 50%;
                    top: 50%;
                    margin: -25px 0 0 -100px;
                    text-align: center;
                    font-size: 14px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px #333;

                    &.show {
                        display: block;
                    }
                }

                .try-watch-tip {
                    position: absolute;
                    color: #fff;
                    font-size: 16px;
                    top: 5px;
                    left: 10px;
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
                    .icon.block-chain {
                        display: block;
                        @include size(109px, 40px);
                        border-radius: 8px;
                    }
                }
                &-price {
                    color: $fontColorRed;
                    font-size: 16px;

                    &.free-money {
                        color: $fontColorBlue;
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

                        &:nth-of-type(2) {
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
            .user-img {
                @include size(80px);
                @include imgCover();
                border-radius: 100px;
                background-color: #ccc;
                overflow: hidden;
            }
            .username {
                line-height: 80px;
                font-weight: bold;
            }
            .comment {
                margin: 10px 0;
            }
        }

        .recommend {
            .title {
                border-bottom: 3px solid #eee;
                font-size: 14px;
                font-weight: bold;
                color: #666;
                line-height: 40px;
            }
        }
    }
</style>
