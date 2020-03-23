<template>
    <div class="book-reader">
        <div class="book-container clear">
            <aside class="book-nav">
            </aside>
            <article class="book-content" :style="{'background-color': currentColor,'font-size':currentFontSize+'px'}"
                     v-html="dataDetail.content"></article>
            <aside class="book-ctrl">
                <a class="book-list pointer" @click="modalShow=!modalShow"><span class="icon dir-icon"></span>目录</a>
                <div class="ctrl-title mt-20">背景</div>
                <div class="clear bg-color">
                    <div class="left pointer"
                         v-for="item in colorList"
                         :style="{'background-color':item}"
                         :class="{active:item===currentColor}"
                         @click="currentColor=item"></div>
                </div>
                <div class="ctrl-title mt-20">文字</div>
                <div class="clear ft-size mt-5">
                    <div class="left pointer" @click="changeFont(0)" :class="{disabled: currentFontSize===12}">
                        <span class="icon font-small"></span>--
                    </div>
                    <div class="left pointer ml-15" @click="changeFont(1)">
                        <span class="icon font-big"></span>++
                    </div>
                </div>
                <div class="ctrl-pagination mt-20">
                    <a class="pointer" @click="prevPage">上一章</a>
                    <a class="pointer mt-10" @click="nextPage">下一章</a>
                </div>
            </aside>
        </div>
        <!--模态框-->
        <self-modal heading="目录" :modal-width="1000" :show.sync="modalShow">
            <ul class="dir-list clear">
                <li class="left pointer" v-for="item in catalogList" @click="goContent(item)">
                    <span v-text="item.title"></span>
                    <span class="right" :class="{free:bookDetail.is_buy===0 && item.type===1,fee:bookDetail.is_buy===0 && item.type===2}"></span>
                </li>
            </ul>
        </self-modal>
        <self-modal :show.sync="buyTip">
            <div class="pb-30">
                <div class="buy-tip mt-20">购买后继续阅读</div>
                <div class="buy-img">
                    <img :src="bookDetail.thumb">
                </div>
                <div class="modal-btn">
                    <a class="pointer" @click="goBuy">立即购买</a>
                </div>
            </div>
        </self-modal>
    </div>
</template>

<script>
    import {AppHeader, SelfModal} from '../../components/public'
    import {contentApi, utilsApi} from '../../api'

    export default {
        name: "book-reader",
        components: {AppHeader, SelfModal,},
        data() {
            return {
                colorList: ['#ffffff', '#e9efef', '#fcefcd', '#cbc9d8', '#bad7d2', '#d1bba4',],
                currentColor: '#ffffff',
                currentFontSize: 12,
                modalShow: false,
                bookId: this.$route.params.bookId,
                catalogId: this.$route.params.catalogId,
                title: this.$route.query.title,
                dataDetail: {},
                catalogList: [],
                currentIndex: -1,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                bookDetail: {},
                buyTip: false,
            }
        },
        mounted() {
            this.getDetail()
            this.getCatalogList()
            this.getBookDetail()
        },
        methods: {
            changeFont(type) {
                const interval = 2
                if (!type) {
                    if (this.currentFontSize === 12) return
                    this.currentFontSize -= interval
                }
                else
                    this.currentFontSize += interval
            },
            getBookDetail() {
                contentApi.getBookDetail({
                    id: this.bookId,
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.bookDetail = resp.data
                        this.bookDetail.thumb = utilsApi.api + this.bookDetail.thumb
                    }
                })
            },
            getDetail() {
                contentApi.getBookCatalogDetail({
                    id: this.catalogId,
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.dataDetail = resp.data
                    }
                })
            },
            getCatalogList() {
                contentApi.getBookCatalog({
                    id: this.bookId,
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.catalogList = resp.data
                        for (let i in this.catalogList) {
                            if (this.catalogId * 1 === this.catalogList[i].id * 1) {
                                this.currentIndex = i * 1
                                break
                            }
                        }
                    }
                })
            },
            goContent(item) {
                if (this.bookDetail.is_buy === 0 && item.type === 2) {
                    this.modalShow = false
                    this.buyTip = true
                    return
                }
                for (let i in this.catalogList) {
                    if (this.catalogId * 1 === this.catalogList[i].id * 1) {
                        this.currentIndex = i * 1
                        break
                    }
                }
                this.$router.replace({
                    name: 'bookReader',
                    params: {
                        bookId: this.bookId,
                        catalogId: item.id,
                    },
                    query: {
                        title: item.title,
                    }
                })
            },
            prevPage() {
                if (this.currentIndex > 0) {
                    const catalog = this.catalogList[this.currentIndex - 1]
                    if (this.bookDetail.is_buy === 0 && catalog.type === 2) {
                        this.buyTip = true
                        return
                    }
                    this.catalogId = catalog.id
                    this.currentIndex --
                    this.$router.replace({
                        name: 'bookReader',
                        params: {
                            bookId: this.bookId,
                            catalogId: this.catalogId,
                        },
                        query: {
                            title: catalog.title,
                        }
                    })
                } else {
                    this.$message.error('已经是第一章了')
                }
            },
            nextPage() {
                if (this.currentIndex < this.catalogList.length - 1) {
                    const catalog = this.catalogList[this.currentIndex + 1]
                    if (this.bookDetail.is_buy === 0 && catalog.type === 2) {
                        this.buyTip = true
                        return
                    }
                    this.catalogId = catalog.id
                    this.currentIndex ++
                    this.$router.replace({
                        name: 'bookReader',
                        params: {
                            bookId: this.bookId,
                            catalogId: this.catalogId,
                        },
                        query: {
                            title: catalog.title,
                        }
                    })
                } else {
                    this.$message.error('已经是最后一章了')
                }
            },
            goBuy () {
                this.$router.push({name: 'booksPay', params: {id: this.bookId}})
            },
        },
        watch: {
            catalogId(v1, v2) {
                if (v1 !== v2) {
                    this.getDetail()
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .book-reader {
        @include borderBox();
        position: absolute;
        top: 71px;
        right: 0;
        bottom: 0;
        left: 0;

        .app-header, .book-container {
            position: absolute;
            width: 100%;
        }
        .book-container {
            top: 0;
            bottom: 0;

            @mixin lrAside() {
                position: absolute;
                width: 315px;
                height: 100%;
            }

            .book-nav {
                @include lrAside();
                left: 0;
            }
            .book-ctrl {
                @include lrAside();
                right: 0;
                padding: 20px;
                overflow: auto;

                .book-list {
                    color: #fff;
                    background-color: $fontColorBlue;
                    font-size: 14px;
                    vertical-align: bottom;
                    padding: 5px 20px;
                    border-radius: 10px;

                    .icon {
                        @include size(20px);
                    }
                }
                .ctrl-title {
                    font-size: 14px;
                }
                .bg-color {
                    & > div {
                        @include size(70px, 40px);
                        border: 1px solid #eee;
                        margin: 15px 0 0 15px;
                        border-radius: 10px;

                        &.active {
                            border-color: $fontColorBlue;
                        }

                        &:nth-of-type(3n+1) {
                            margin-left: 0;
                        }
                    }
                }

                .ft-size {
                    color: $fontColorBlue;
                    .icon {
                        @include size(16px);
                    }
                    & > div {
                        border: 1px solid #ccc;
                        padding: 10px 30px;
                        border-radius: 10px;
                        user-select: none;

                        &.disabled {
                            background-color: #f1f1f1;
                            cursor: not-allowed;
                        }
                    }
                }

                .ctrl-pagination {
                    a {
                        display: block;
                        writing-mode: vertical-lr;
                        background-color: $fontColorBlue;
                        color: #fff;
                        padding: 0 10px;
                        border-radius: 10px;
                        letter-spacing: 5px;
                        user-select: none;
                        text-align: center;
                        height: 100px;
                    }
                }
            }
            .book-content {
                position: absolute;
                left: 315px;
                right: 315px;
                height: 100%;
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                overflow: auto;
                padding: 20px;
            }
        }

        .dir-list {
            padding: 0 30px 20px;

            li {
                @include dataItem('2n+1');
                width: 460px;
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

        .buy-tip {
            text-align: center;
        }

        .buy-img {
            @include size(200px, 280px);
            @include imgCover();
            margin: 20px auto;
            border-radius: 10px;
            overflow: hidden;
        }
        .modal-btn {
            a {
                background-color: $fontColorRed;
                border: 0;
                color: #fff;
            }
        }
    }
</style>
