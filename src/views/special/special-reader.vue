<template>
    <div class="special-reader">
        <ul class="crumbs clear mt-10">
            <li class="left">知识专栏</li>
            <li class="left">只是专栏详情</li>
            <li class="left" v-text="title"></li>
        </ul>
        <div class="special-title" v-text="dataDetail.title"></div>
        <div class="special-info">
            <span>发布者：</span>
            <span v-text="dataDetail.nickname"></span>
            <span v-time="dataDetail.create_time"></span>
        </div>
        <div class="mt-20" v-show="dataDetail.video">
            <dy-video :width="videoConf.width" :height="videoConf.height" :src="videoConf.src" :poster="videoConf.poster"></dy-video>
        </div>
        <div class="mt-20" v-show="dataDetail.voice">
            <audio :src="voiceConf.src" controls style="width: 500px;"></audio>
            <!--<dy-video :width="voiceConf.width" :height="voiceConf.height" :src="voiceConf.src"></dy-video>-->
        </div>
        <div class="mt-20 special-content" v-html="dataDetail.content"></div>
        <div class="comment-title">评论</div>
        <div class="special-comment">
            <div class="comment-item" v-for="item in comments">
                <div class="comment-info">
                    <div class="clear">
                        <div class="user-img left">
                            <img :src="item.face">
                        </div>
                        <div class="username left" v-text="item.nickname"></div>
                    </div>
                    <div class="comment-time">{{item.create_time|timeFilter('MM-DD HH:mm:ss')}}</div>
                </div>
                <div class="comment" v-text="item.content"></div>
            </div>
        </div>
        <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
        <div class="create-comment mt-30">
            <textarea name="" id="" cols="30" rows="10" placeholder="请输入" v-model="commentContent"></textarea>
            <a class="pointer commit-btn mt-20" @click="createComment">发表</a>
        </div>
    </div>
</template>

<script>
    import {Pagination, DyVideo} from '../../components/public'
    import {contentApi, utilsApi} from '../../api'

    export default {
        name: "special-reader",
        components: {Pagination, DyVideo},
        data() {
            return {
                specialId: this.$route.params.specialId,
                catalogId: this.$route.params.catalogId,
                title: this.$route.params.title,
                dataDetail: {},
                pageInfo: {
                    total: 0,
                    pageSize: 10,
                    currentPage: 1,
                },
                comments: [],
                commentContent: '',
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                videoConf: {
                    width: 1200,
                    height: 500,
                    src: '',
                    poster: '',
                },
                voiceConf: {
                    width: 500,
                    height: 36,
                    src: '',
                },
            }
        },
        mounted() {
            this.getDetail()
            this.getComments()
            // contentApi.courseProgress(params)
        },
        methods: {
            getDetail() {
                contentApi.getSpecialCatalogDetail({
                    id: this.catalogId,
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.dataDetail = resp.data
                        this.videoConf.src = utilsApi.api + this.dataDetail.video
                        this.videoConf.poster = utilsApi.api + this.dataDetail.thumb
                        this.voiceConf.src = utilsApi.api + this.dataDetail.voice
                    }
                })
            },
            getComments() {
                contentApi.getCatalogCommentList({
                    uid: this.userInfo.uid,
                    knowledge_log_id: this.catalogId,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.comments = resp.data.data
                        for (let item of this.comments) {
                            item.face = utilsApi.api + item.face
                        }
                        this.pageInfo.total = resp.data.total || 0
                    }
                })
            },
            changePage(num) {
                this.pageInfo.currentPage = num
                this.getComments()
            },
            createComment() {
                if (!this.commentContent) {
                    this.$message.error('评论内容不能为空')
                    return
                }
                contentApi.createSpecialComment({
                    uid: this.userInfo.uid,
                    knowledge_log_id: this.catalogId,
                    knowledge_id: this.specialId,
                    content: this.commentContent,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.commentContent = ''
                        this.getComments()
                    } else {
                        this.$message.error(resp.msg)
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .special-reader {
        .special-title {
            font-size: 18px;
            text-align: center;
            line-height: 30px;
        }
        .special-info {
            color: #999;
        }
        .special-content {
            @include imgCover();
        }

        .comment-title {
            font-size: 14px;
            font-weight: bold;
            padding: 10px 0;
            border-top: 1px solid #e1e1e1;
            border-bottom: 1px solid #e1e1e1;
        }

        .special-comment {
            margin-top: 10px;

            .comment-item {
                border-bottom: 1px solid #e1e1e1;
            }

            .comment-item + .comment-item {
                margin-top: 20px;
            }

            .user-img {
                @include size(80px, 80px);
                border-radius: 100px;
                background-color: #ccc;
                overflow: hidden;

                @include imgCover();
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
                    bottom: 40px;
                }
            }
            .comment {
                margin: 20px 0 10px;
            }
        }
        .create-comment {
            text-align: center;
            font-size: 14px;
            @include borderBox();

            textarea {
                resize: none;
                @include size(100%, 250px);
                display: block;
                outline: none;
                border-color: #eee;
                background-color: #eee;
                padding: 10px;
                border-radius: 10px;
                transition: all .3s;

                &:focus {
                    border-color: #39f;
                    background-color: #fff;
                    border-radius: 0;
                }
            }
            a.commit-btn {
                background-color: $fontColorBlue;
                color: #fff;
                padding: 8px 40px;
                border-radius: 5px;
                display: inline-block;
            }
        }
    }
</style>
