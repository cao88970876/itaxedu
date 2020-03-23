<template>
    <div class="books-detail">
        <div class="page-content mt-20">
            <store-block :store-obj="storeObj" :to="{name: 'storeBook', params: {id:dataDetail.uid,isFav:dataDetail.is_collect}}"></store-block>
            <div class="book-block clear mt-20">
                <div class="book-img left">
                    <img :src="dataDetail.thumb" alt="">
                </div>
                <div class="book-info left ml-20">
                    <div class="info-name">
                        <img :src="dataDetail.level_icon">
                        <span class="icon business"></span><span v-text="dataDetail.title"></span>
                    </div>
                    <div class="info-desc mt-20" v-text="dataDetail.description"></div>
                    <div class="info-price money mt-20" v-text="dataDetail.price" v-if="dataDetail.price!=='0.00'"></div>
                    <div class="info-price free-money mt-20" v-else>免费</div>
                    <div class="info-ctrl mt-10">
                        <ul class="clear">
                            <li class="left">
                                <a class="pointer" @click="setCollect"><span class="icon star" :class="{'star-active':dataDetail.is_collect}"></span>收藏</a>
                            </li>
                            <li class="left">
                                <router-link :to="{name:'chat',query: {friendId: dataDetail.uid}}" class="pointer">
                                    <span class="icon waiter"></span>客服
                                </router-link>
                            </li>
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
                </div>
            </div>

            <tab :active="0">
                <tab-item heading="内容简介">
                    <div class="books-content" v-html="dataDetail.content"></div>
                </tab-item>
                <tab-item heading="目录">
                    <ul class="dir-list clear">
                        <li class="left pointer" v-for="item in catalogList" @click="toReader(item)">
                            <span class="left" v-text="item.title">目录1</span>
                            <span class="right"></span>
                        </li>
                    </ul>
                </tab-item>
            </tab>
        </div>
    </div>
</template>

<script>
    import {
        Tab,
        TabItem,
        Pagination,
        StoreBlock,
    } from '../../components/public'
    import {contentApi, utilsApi, commonApi} from '../../api'

    export default {
        name: "books-detail",
        components: {Tab, TabItem, Pagination, StoreBlock},
        data() {
            return {
                bookId: this.$route.params.id,
                dataDetail: {},
                storeObj: {},
                catalogList: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        mounted() {
            this.getDetail()
            this.getCatalog()
        },
        methods: {
            getDetail() {
                contentApi.getBookDetail({
                    id: this.bookId,
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        resp.data.level_icon = utilsApi.api + resp.data.level_icon
                        resp.data.thumb = utilsApi.api + resp.data.thumb
                        this.dataDetail = resp.data
                        this.storeObj = {
                            name: resp.data.store_name,
                            face: resp.data.store_face,
                        }
                    }
                })
            },
            getCatalog() {
                let params = {
                    id: this.bookId,
                }
                if (this.$helper.utils.storage.get('userInfo')) {
                    params.uid = this.$helper.utils.storage.get('userInfo').uid
                }
                contentApi.getBookCatalog(params).then(resp => {
                    if (resp.status === 1) {
                        this.catalogList = resp.data
                    }
                })
            },
            toReader(item) {
                if (item.type === 1) {
                    this.$router.push({
                        name: 'bookReader',
                        params: {
                            bookId: this.bookId,
                            catalogId: item.id,
                        },
                        query: {
                            title: item.title,
                        }
                    })
                } else {
                    this.$message.error('该电子书您还未购买')
                }
            },
            setCollect() {
                if (this.dataDetail.is_collect) {
                    commonApi.delCollect({
                        uid: this.userInfo.uid,
                        type: 3,
                        content_id: this.bookId,
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
                        type: 3,
                        content_id: this.bookId,
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
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .books-detail {
        @include borderBox();

        .books-content {
            @include imgCover();
        }

        .book-block {
            .book-img {
                @include size (268px, 370px);
                background-color: #ccc;
                @include imgCover();
            }

            .book-info {
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
                .info-desc {
                    font-size: 16px;
                    height: 120px;
                    overflow: hidden;
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
            }
        }

        .dir-list {

            li {
                @include dataItem('2n+1');
                width: 590px;
                line-height: 40px;
                box-shadow: 0 0 5px #ccc;
                font-size: 14px;
                padding: 0 10px;
                border-radius: 5px;

                .free:after {
                    content: '免费';
                    color: $fontColorBlue;
                }
                .fee:after {
                    content: '付费';
                    color: $fontColorRed;
                }
            }
        }
    }
</style>
