<template>
    <div class="video-course-detail">
        <store-block class="mt-20"
                     :to="{name: 'storeCourse', params: {id:courseDetail.uid,isFav:courseDetail.is_collect}}"
                     :store-obj="{id: courseDetail.uid,name:courseDetail.store_name,face:courseDetail.store_face}"></store-block>
        <div class="course-info clear mt-20 pb-20">
            <div class="video left">
                <dy-video ref="myVideo" :src="videoUrl" :poster="courseDetail.thumb" @current-time="watchProgress"></dy-video>
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
                    <span v-text="`[${courseDetail.experts_name}]`" v-if="courseDetail.experts_name"></span>
                </div>
                <div class="info-time">时长：<span v-text="$filter.timeLongFilter(courseDetail.duration)"></span></div>
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
                <div class="clear buy">
                    <a class="left pointer" @click="play">立即播放</a>
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
                            <li class="left pointer" v-for="item in courseTable" @click="changeVideo(item)">
                                <div style="width:100%"  class="table-title ellipsis" v-text="item.title"></div>
                                <div class="clear gray-font">
                                    <div class="left"><span v-text="item.study_count"></span>人已学过</div>
                                    <div class="right" v-text="$filter.timeLongFilter(item.duration)"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </tab-item>
                <tab-item heading="评价">
                    <div class="course-comment mt-10">
                        <div class="comment-item" v-for="item in commentList">
                            <div class="comment-info">
                                <div class="clear">
                                    <div class="user-img left">
                                        <img :src="imgPath+item.face">
                                    </div>
                                    <div class="username left" v-text="item.nickname"></div>
                                </div>
                                <div class="comment-time">{{item.create_time | timeFilter('MM-DD HH:mm:ss')}}</div>
                            </div>
                            <div class="comment" v-text="item.content"></div>
                        </div>
                    </div>
                </tab-item>
            </tab>
        </div>
        <self-modal :modal-width="300" :show.sync="showModal" class="popup" :shadowClickClose="false">
            <div slot="modal-heading" class="popup_header">请答题</div>
            <div class="check">
                <ul>
                    <li v-for="item in cancel" :key="item.id">
                        <div class="btn">
                            <p>{{item.name}}</p>
                            <label v-for="n in item.options"  :key="n.id" @click="selectQuestion(item)">
                                <input type="radio" :value="n.id" v-model="isPublic"/>
                                <i class="icon radio-no-checked" :class="{'cancel-checked':isPublic===n.id}"></i>
                                <div style="user-select: none;">{{n.content}}</div>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="popup_footer">
                <div @click="dontBuy">确定</div>
            </div>
        </self-modal>
    </div>
</template>

<script>
    import {
        Tab,
        TabItem,
        StoreBlock,
        DyVideo,
        SelfModal
    } from '../../components/public'
    import {contentApi, utilsApi, commonApi} from '../../api'

    export default {
        name: "video-course-detail",
        components: {Tab, TabItem, StoreBlock, DyVideo,SelfModal},
        data() {
            return {
                imgPath: utilsApi.api,
                tabActive: 0,
                 nowm:0,
                videoUrl: '',
                videoId: '',
                courseDetail: {},
                teacherInfo: {},
                commentList: [],
                courseTable: [],
                isPause: false,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                cancel: [],
                showModal: false,
                isPublic: '',
                question_id:"",
                time:null,
                newTime:0,
                players:null
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
            this.getQuestionList()
        },
        methods: {
            selectQuestion(item){
                this.question_id=item.id
                console.log(this.question_id,this.isPublic)
            },
            //确认
            dontBuy() {
                if (!this.userInfo.uid) {
                    this.showModal = false
                    this.loginTip = true
                    return
                }
                if (this.isPublic==''||this.question_id=="") {
                    this.$message.error("请回答问题")
                    return
                }
                contentApi.courseQuestion({
                    uid: this.userInfo.uid,
                    question_id: this.question_id,//题目id
                    option_id: this.isPublic,//选项id
                }).then((res) => {
                    if(res.status===1){
                        this.$message.success("提交成功")
                        this.showModal = false;
                        this.isPublic=""
                        this.question_id=""
                        this.players.play()
                        this.players.controls(true) //去除视屏的控制键
                    }
                })
            },
            getQuestionList(){
                contentApi.getQuestion().then((res) => {
                    this.cancel = res.data
                })
            },
            getCourseDetail() {
                contentApi.courseDetail({
                    uid: this.userInfo.uid,
                    id: this.courseId
                }).then(resp => {
                    if (resp.status === 1) {
                        this.courseDetail = resp.data
                        this.courseDetail.thumb = utilsApi.api + this.courseDetail.thumb
                        this.courseDetail.shikan_time = this.courseDetail.shikan_time * (this.courseDetail.is_buy ? 0 : 1)
                        if (this.courseDetail.is_one === 2) {
                            this.getCourseTable()
                        } else {
                             this.videoUrl = this.courseDetail.video_url;
                          //  this.videoUrl = utilsApi.api + this.courseDetail.video
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
                    id: this.courseId
                }).then(resp => {
                    if (resp.status === 1) {
                        this.commentList = resp.data.data
                    }
                })
            },
            getCourseTable() {
                contentApi.courseTable({
                    id: this.courseId,
                     page_size: 10000
                }).then(resp => {
                    if (resp.status === 1) {
                        this.courseTable = resp.data.data
                        this.videoUrl = this.courseTable[0].video_url
                        this.videoId = this.courseTable[0].id
                    }
                })
            },
            changeTab(tabId) {
                this.$router.replace({
                    name: 'myVideoCourse',
                    params: {
                        courseId: this.courseId,
                        tabId
                    }
                })
            },
            download(pdfUrl) {
                window.open(this.imgPath + pdfUrl, '_blank')
            },
            setCollect() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
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
                let _this = this
                commonApi.shareContent({
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        let params = {
                            url: encodeURIComponent(location.href),
                            title: encodeURIComponent('iTax智能财税共享服务平台'),
                            content: encodeURIComponent(_this.courseDetail.title),
                            pic: _this.courseDetail.thumb,
                        }
                        let shareUrl = {
                            qq: `http://connect.qq.com/widget/shareqq/index.html?url=${params.url}&title=${params.title}&desc=${params.content}&pics=${params.pic}`,
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
            watchProgress(time,player) {
                this.players=player
                if((time-this.newTime)>=this.courseDetail.tanchuang*1 && false){
                    this.showModal=true
                    this.newTime=time
                    player.pause() //暂停
                    player.controls(false) //去除视屏的控制键
                }else {
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
                  
                }
            },
            changeVideo(item) {
                // if (this.videoUrl === utilsApi.api + item.video) return
                // this.isPause = false
                // this.videoUrl = utilsApi.api + item.video
                // this.videoId = item.id

                this.isPause = false
                this.videoUrl = item.video_url
                this.videoId = item.id
            },
            play() {
                this.$refs['myVideo'].play()
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
    .popup {
        .popup_header {
            text-align: center;
            font-size: 14px;
            padding: 10px;
        }
        .check {
            padding: 20px;
            ul {
                li {
                    margin-bottom: 15px;
                    .btn {
                        & > label {
                            display: flex;
                            cursor: pointer;
                            line-height: 20px;
                            font-size: 14px;
                            margin-bottom: 10px;
                            & > input[type=radio] {
                                display: none;
                            }
                            .icon {
                                @include size(20px, 20px);
                                vertical-align: bottom;
                                margin-right: 10px;
                                position: relative;
                                top: -1px;
                            }
                        }
                    }
                }
            }
        }
        .popup_footer {
            height: 40px;
            text-align: center;
            line-height: 40px;
            display: flex;
            border-top: 1px solid #f1f1f1;
            margin-top: 20px;
            div {
                width: 100%;
                border-left: 1px solid #f1f1f1;
                color: #f44336;
                cursor: pointer;
            }
        }
    }
    .video-course-detail {

        img {
            @include size(100%);
        }
        .business {
            @include size(25px, 20px);
            vertical-align: bottom;
            margin-right: 10px;
        }

        .course-info {
            border-bottom: 5px solid #eee;
            @include borderBox();

            .video {
                @include size(720px, 400px);
                background-color: #ccc;
                position: relative;
            }
            .info {
                @include size(480px, 400px);
                padding: 5px 10px 0 25px;
                position: relative;

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
                    position: absolute;
                    left: 25px;
                    bottom: 0;
                    a {
                        display: inline-block;
                        font-size: 16px;
                        color: #fff;
                        background-color: $fontColorBlue;
                        padding: 10px 35px;
                        border-radius: 5px;
                    }
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
                    @include size(295px, auto);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                &-icon {
                    @include size(80px);
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

        .course-comment {

            .comment-item + .comment-item {
                margin-top: 20px;
            }

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
                margin-left: 10px;
            }
            .comment-info {
                position: relative;
                .comment-time {
                    color: #999;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }
            .comment {
                margin: 10px 0;
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

        .teacher-introduction {
            margin-top: 10px;
            .teacher-img {
                @include size(80px, 80px);
                border-radius: 100px;
                background-color: #ccc;
                overflow: hidden;
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

        .course-tab {
            margin-top: 10px;
            font-size: 14px;
        }
    }
</style>
