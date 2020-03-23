<template>
    <div class="book-item pointer data-item" :class="size+'-size'" @click="emitClick">
        <div class="left book-img">
            <img :src="imgPath+bookItem.thumb">
        </div>
        <div class="right book-info">
            <div class="title clear">
                <div v-if="levelIcon" class="level left">
                    <img :src="levelIcon">
                </div>
                <div class="left ellipsis" :title="bookItem.title" v-text="bookItem.title"></div>
            </div>
            <div class="desc">
                <div class="ellipsis-2" v-text="bookItem.description"></div>
                <div class="shadow-p"></div>
            </div>
            <div class="record" v-if="isRecord">
                <template v-if="record.status===1">{{record.catalogName}}</template>
                <template v-else>共{{catalog}}章</template>
            </div>
            <div class="price" v-else>
                <span class="old-price money" v-if="bookItem.price!=='0.00'" v-text="bookItem.original_price"></span>
                <span class="current-price money" v-if="bookItem.price!=='0.00'" v-text="bookItem.price"></span>
                <span class="current-price free-money" v-else>免费</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {utilsApi,contentApi} from '../../api'

    export default {
        name: "book-item",
        props: {
            bookItem: {
                type: Object,
                default() {
                    return {
                        thumb: '',
                        description: '这是一段描述',
                        title: '鲁班八号',
                        original_price: 99,
                        price: 99,
                    }
                }
            },
            to: {
                type: Object,
                default: null
            },
            autoJump: {
                type: Boolean,
                default: true
            },
            size: {
                type: String
            },
            isRecord: {
                type: Boolean,
                default: false
            },
            record: {
                type: Object,
            }
        },
        data() {
            return {
                imgPath: utilsApi.api,
                catalog: 0,
                userInfo: this.$helper.utils.storage.get('userInfo') || {}
            }
        },
        computed: {
            levelIcon(){
                if (this.bookItem.level_icon) {
                    return utilsApi.api + this.bookItem.level_icon
                }
                return null
            },
        },
        mounted() {
            if (this.isRecord) {
                contentApi.getBookCatalog({
                    uid: this.userInfo.uid,
                    id: this.bookItem.id,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.catalog = resp.data.length
                    }
                })
            }
        },
        methods: {
            emitClick() {
                this.$emit('click')
                if (this.to) {
                    this.$router.push(this.to)
                } else if (this.autoJump) {
                    this.$router.push({
                        name: 'booksDetail',
                        params: {
                            id: this.bookItem.id
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixin";

    .book-item {
        @include size(285px, 140px);
        padding: 10px;

        &.small-size {
            .book-info {
                width: 120px;
                .title {
                    div:nth-of-type(2) {
                        width: 90px;
                    }
                }
            }
        }

        .level {
            @include size(22px, 18px);
            margin-right: 7px;

            img {
                width: 100%;
            }
        }
        .book-img {
            background-color: #ccc;
            border-radius: 10px;
            width: 90px;
            height: 120px;
            overflow: hidden;

            @include imgCover();
        }
        .book-info {
            width: 165px;
            height: 120px;
            position: relative;

            .title {
                font-size: 14px;
                font-weight: bold;
                div:last-child {
                    width: 112px;
                    height: 20px;
                }
            }

            .desc {
                margin-top: 7px;
                color: #999;
                height: 68px;
                overflow: hidden;
                position: relative;

                .shadow-p {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 50px;
                    /*background: linear-gradient(#fff0,#ffff,#ffff,#ffff);*/
                }
            }

            .price {
                position: absolute;
                bottom: 0;
                right: 0;
            }
            .record {
                position: absolute;
                left: 0;
                bottom: 0;
                color: #999;
            }
        }
    }
</style>
