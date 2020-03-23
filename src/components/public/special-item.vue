<template>
    <div class="special-item pointer data-item" @click="emitClick" :class="size+'-size'">
        <div class="title clear">
            <div class="level left" v-if="levelIcon">
                <img :src="levelIcon">
            </div>
            <div class="left" v-text="specialItem.title"></div>
            <div class="right">
                <router-link :to="{path:'#'}">
                    <span v-text="$filter.timeFilter(specialItem.update_time,'MM-DD HH:mm')"></span>更新
                </router-link>
            </div>
        </div>
        <div class="price clear">
            <div class="left description ellipsis" v-text="specialItem.description"
                 :title="specialItem.description"></div>
            <div class="right" v-if="!isRecord">
                <span class="old-price money" v-if="specialItem.price!=='0.00'" v-text="specialItem.original_price"></span>
                <span class="current-price money" v-if="specialItem.price!=='0.00'" v-text="specialItem.price"></span>
                <span class="current-price free-money" v-else>免费</span>
            </div>
        </div>
        <div class="record" v-if="isRecord">
            <template v-if="record.status===1">{{record.catalogName}}</template>
            <template v-else>已更新{{catalog}}章</template>
        </div>
        <ul class="user-img clear" v-else>
            <li class="left" v-for="i in specialItem.teacher">
                <div class="img">
                    <img :src="imgPath+i.face"/>
                </div>
                <div class="name" v-text="i.name"></div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {utilsApi, contentApi} from '../../api'

    export default {
        name: "special-item",
        props: {
            specialItem: {
                type: Object,
                default() {
                    return {
                        title: '鲁班八号',
                        description: '专栏描述',
                        original_price: 99,
                        price: 99,
                        teacher: [
                            {
                                face: '',
                                name: '张老师',
                            },
                            {
                                face: '',
                                name: '张老师',
                            },
                            {
                                face: '',
                                name: '张老师',
                            },
                        ]
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
                type: String,
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
            levelIcon() {
                if (this.specialItem.level_icon) {
                    return utilsApi.api + this.specialItem.level_icon
                }
                return null
            }
        },
        mounted() {
            if (this.isRecord) {
                contentApi.getSpecialCatalogList({
                    uid: this.userInfo.uid,
                    id: this.specialItem.id,
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
                        name: 'specialDetail',
                        params: {
                            id: this.specialItem.id
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixin";

    .special-item {
        @include size(590px, 175px);
        padding: 20px 15px;
        position: relative;

        &.small-size {
            .description {
                width: 350px;
            }
        }

        .title {
            font-size: 14px;
            font-weight: bold;

            .level {
                @include size(20px, 17px);
                margin-right: 7px;
                img {
                    width: 100%;
                }
            }
            .right {
                a {
                    display: block;
                    padding: 3px 10px;
                    border-radius: 20px;
                    border: #303f9f 1px solid;
                    color: #303f9f;
                    font-size: 12px;
                    font-weight: normal;
                }
            }
        }
        .price {
            color: #999;
            margin-top: 7px;
        }
        .user-img {
            list-style: none;
            margin-top: 10px;
            li {
                & + li {
                    margin-left: 10px;
                }
            }
            .img {
                width: 50px;
                height: 50px;
                border-radius: 30px;
                overflow: hidden;
                @include imgCover();
            }
            .name {
                text-align: center;
                margin-top: 3px;
            }
        }
        .description {
            width: 420px;
        }
        .record {
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: #999;
        }
    }
</style>
