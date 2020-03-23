<template>
    <div class="special-detail">

        <navigation class="mt-20"></navigation>

        <ul class="crumbs clear mt-10">
            <li class="left">知识专栏</li>
            <li class="left">知识专栏详情</li>
        </ul>

        <store-block :store-obj="storeObj" :to="{name: 'storeSpecial', params: {id:dataDetail.uid,isFav:dataDetail.is_collect}}"></store-block>

        <div class="special-block clear mt-20">
            <div class="special-img left">
                <img :src="dataDetail.thumb">
            </div>
            <div class="special-info left ml-20">
                <div class="info-name">
                    <img :src="dataDetail.level_icon">
                    <span v-text="dataDetail.title"></span>
                </div>
                <div class="desc-block mt-20">
                    <div class="info-desc ellipsis-m" v-text="dataDetail.description"></div>
                    <div class="info-update-time mt-10">
                        <span>更新时长：</span>
                        <span v-time="dataDetail.start_time"></span>至<span v-time="dataDetail.end_time"></span>
                    </div>
                </div>
                <div class="info-price money mt-20" v-text="dataDetail.price" v-if="dataDetail.price!=='0.00'"></div>
                <div class="info-price free-money mt-20" v-else>免费</div>
                <div class="info-ctrl mt-10">
                    <ul class="clear">
                        <li class="left">
                            <a class="pointer" @click="setCollect"><span class="icon star" :class="{'star-active':dataDetail.is_collect}"></span>收藏</a>
                        </li>
                        <li class="left"><router-link :to="{name:'chat',query: {friendId: dataDetail.uid}}" class="pointer"><span class="icon waiter"></span>客服</router-link></li>
                        <li class="left">
                            <a class="pointer" @click="$router.push({name: 'storeCourse', params: {id:dataDetail.uid,isFav:dataDetail.is_collect}})"><span class="icon shoppe"></span>店铺</a>
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
                    <a class="left" @click="freeRead">免费试读</a>
                    <a class="left" @click="pay">立即订阅</a>
                </div>
            </div>
        </div>

        <tab :active="0" class="mt-20">
            <tab-item heading="内容简介">
                <div class="special-panel mt-20">
                    <div class="panel-heading">专栏简介</div>
                    <div class="panel-body">
                        <div class="detail-content" v-html="dataDetail.content"></div>
                    </div>
                </div>
                <div class="special-panel mt-20 border-t">
                    <div class="panel-heading mt-20">发布老师</div>
                    <div class="panel-body">
                        <div class="teacher-introduction" v-for="item in dataDetail.teacher">
                            <div class="clear mt-10">
                                <div class="teacher-img left" v-if="item.face">
                                    <img :src="item.face">
                                </div>
                                <div class="teacher-info left">
                                    <div class="name" v-text="item.name"></div>
                                    <div class="post" v-text="item.experts_name"></div>
                                </div>
                            </div>
                            <div class="comment" v-text="item.description"></div>
                        </div>
                    </div>
                </div>
                <div class="special-panel mt-20 border-t">
                    <div class="panel-heading mt-20">订阅须知</div>
                    <div class="panel-body">
                        <div class="detail-content mt-10" v-html="dataDetail.notice"></div>
                    </div>
                </div>
            </tab-item>
            <tab-item heading="目录">
                <div class="dir-list clear">
                    <div class="dir-item shadow-default left pointer" v-for="item in catalogList"
                         @click="goContent(item)">
                        <div class="dir-img left">
                            <img :src="item.thumb">
                            <div class="free" v-show="dataDetail.is_buy===0 && item.type===1">免费</div>
                        </div>
                        <div class="dir-info left ml-10">
                            <div class="dir-title" v-text="item.title">标题</div>
                            <div class="dir-desc mb-20 ellipsis-m" v-text="item.description"></div>
                            <div class="dir-other clear">
                                <div class="left"><span class="icon clock"></span><span
                                    v-time="`${item.create_time}|YYYY-MM-DD`"></span></div>
                                <div class="left"><span class="icon book"></span><span v-text="item.study_count"></span>人学过
                                </div>
                                <div class="left">
                                    <span class="icon fabulous" :class="{'fabulous-active':item.is_like}" @click.stop="like(item)"></span><span
                                    v-text="item.like_count"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </tab-item>
        </tab>
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
    import {Navigation, Tab, TabItem, StoreBlock, SelfModal} from '../../components/public'
    import {contentApi, utilsApi, commonApi} from '../../api'

    export default {
        name: "special-detail",
        components: {Navigation, Tab, TabItem, StoreBlock, SelfModal},
        data() {
            return {
                dataDetail: {},
                specialId: this.$route.params.id,
                storeObj: {},
                catalogList: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                loginTip: false,
            }
        },
        mounted() {
            this.getDetail()
            this.getCatalog()
        },
        methods: {
            getDetail() {
                contentApi.getSpecialDetail({
                    id: this.specialId,
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        resp.data.level_icon = utilsApi.api + resp.data.level_icon
                        this.dataDetail = resp.data
                        this.dataDetail.thumb = utilsApi.api + this.dataDetail.thumb
                        this.storeObj = {
                            name: resp.data.store_name,
                            face: resp.data.store_face,
                        }
                        if (this.dataDetail.teacher.length) {
                            for (let item of this.dataDetail.teacher) {
                                item.face = utilsApi.api + item.face
                            }
                        }
                    } else {
                        this.$message({
                            message: resp.msg,
                            type: 'error'
                        })
                    }
                })
            },
            getCatalog() {
                let params = {
                    id: this.specialId,
                }
                if (this.$helper.utils.storage.get('userInfo')) {
                    params.uid = this.$helper.utils.storage.get('userInfo').uid
                }
                contentApi.getSpecialCatalogList(params).then(resp => {
                    if (resp.status === 1) {
                        this.catalogList = resp.data
                        for (let item of this.catalogList) {
                            item.thumb = utilsApi.api + item.thumb
                        }
                    }
                })
            },
            freeRead() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                let temp = null
                for (let i in  this.catalogList) {
                    if (this.catalogList[i].type === 1) {
                        temp = this.catalogList[i]
                        break
                    }
                }
                if(temp) {
                    this.$router.push({
                        name: 'specialReader',
                        params: {
                            specialId: this.specialId,
                            catalogId: temp.id,
                            title: temp.title,
                        }
                    })
                } else {
                    this.$message.error('该专栏无没有可试读章节')
                }
            },
            setCollect() {
                if (this.dataDetail.is_collect) {
                    commonApi.delCollect({
                        uid: this.userInfo.uid,
                        type: 2,
                        content_id: this.specialId,
                    }).then(resp => {
                        if (resp.status === 1) {
                            this.dataDetail.is_collect = 0
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
                        type: 2,
                        content_id: this.specialId,
                    }).then(resp => {
                        if (resp.status === 1) {
                            this.dataDetail.is_collect = 1
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
                            title: encodeURIComponent(_this.dataDetail.title),
                            content: encodeURIComponent('iTax智能财税共享服务平台'),
                            pic: _this.dataDetail.thumb,
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
            pay() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                if (this.dataDetail.is_buy === 1) {
                    this.$message.error('该专栏您已订阅')
                    return
                }
                if (this.dataDetail.price === '0.00') {
                    contentApi.freePay({
                        uid: this.userInfo.uid,
                        type: 2,
                        content_id: this.specialId,
                    }).then(resp => {
                        if (resp.status === 1) {
                            this.$message.success('订阅成功')
                            this.getDetail()
                        } else {
                            this.$message.error(resp.msg)
                        }
                    })
                } else {
                    this.$router.push({name: 'specialPay', params: {id: this.specialId}})
                }
            },
            goContent(item) {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                if (this.dataDetail.is_buy || item.type === 1) {
                    this.$router.push({
                        name: 'specialReader',
                        params: {specialId: this.specialId, catalogId: item.id, title: item.title}
                    })
                } else {
                    this.$message.error('该专栏您还未购买')
                }
            },
            // 点赞
            like(item) {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                let ifc = item.is_like ? 'specialLikeCancel' : 'specialLikeAdd'
                contentApi[ifc]({
                    uid: this.userInfo.uid,
                    knowledge_log_id: item.id,
                    knowledge_id: this.specialId
                }).then(resp => {
                    if (resp.status === 1) {
                        this.getCatalog()
                    } else {
                        this.$message.error(resp.msg)
                    }
                })
            },
        },
    }
</script>

<style lang="scss">
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .special-detail {
        @include borderBox();

        .border-t {
            border-top: 3px solid #e1e1e1;
        }

        .special-panel {
            .panel {
                &-heading {
                    font-size: 14px;
                    &:before {
                        content: '';
                        display: inline-block;
                        @include size(3px, 20px);
                        background-color: $fontColorRed;
                        vertical-align: bottom;
                        margin-right: 10px;
                    }
                }
            }
        }
        .detail-content {
            img {
                max-width: 100%;
                object-fit: cover;
            }
        }
        .teacher-introduction {
            margin-top: 10px;
            & + .teacher-introduction {
                border-top: 1px solid #f1f1f1;
            }
            .teacher-img {
                @include size(80px, 80px);
                border-radius: 100px;
                background-color: #ccc;
                overflow: hidden;

                img {
                    @include size(100%);
                    object-fit: cover;
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

        .special-block {
            .special-img {
                @include size (660px, 370px);

                img {
                    @include size (100%);
                    object-fit: cover;
                }
            }
            .special-info {
                @include size(520px, 370px);

                .info-name {
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 30px;

                    img {
                        width: 20px;
                        vertical-align: middle;
                    }
                }
                .desc-block {
                    @include size(100%, 120px);
                    .info-desc {
                        font-size: 16px;
                        max-height: 90px;
                        -webkit-line-clamp: 4;
                    }
                    .info-update-time {
                        border: 1px solid $fontColorBlue;
                        color: $fontColorBlue;
                        display: inline-block;
                        padding: 2px 10px;
                        border-radius: 50px;
                    }
                }
                .info-price {
                    color: $fontColorRed;
                    font-size: 16px;

                    &.free-money {
                        color: $fontColorBlue;
                    }
                }
                .info-ctrl {
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

                .info-share {
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

        .dir-list {
            .dir-item {
                @include size(590px, 174px);
                @include dataItem('2n+1');
                border-radius: 10px;
                padding: 10px;

                .dir-img {
                    @include size(270px, 154px);
                    border-radius: 10px;
                    overflow: hidden;
                    background-color: #ccc;
                    position: relative;

                    .free {
                        background-color: #0000007a;
                        padding: 2px 11px;
                        border-radius: 20px;
                        color: #fff;
                        position: absolute;
                        top: 10px;
                        right: 10px;
                    }

                    img {
                        @include size(100%);
                        object-fit: cover;
                    }
                }
                .dir-info {
                    @include size(290px, 100%);

                    .dir-title {
                        font-size: 14px;
                        font-weight: bold;
                        line-height: 30px;
                    }
                    .dir-desc {
                        height: 85px;
                        line-height: 17px;
                        -webkit-line-clamp: 5;
                    }
                    .dir-other {
                        & > div {
                            & + div {
                                margin-left: 20px;
                            }
                        }
                        .icon {
                            @include size(16px);
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
</style>
