<!--商铺页面-->
<template>
    <div class="store-page">
        <app-header></app-header>
        <div class="page-content">
            <navigation></navigation>
            <div class="store-info mt-20 shadow-default clear">
                <div class="store-img temp-img left">
                    <img v-if="storeInfo.face" :src="storeInfo.face"/>
                </div>
                <div class="store-name left ml-15" v-text="storeInfo.name">商铺名称</div>
                <div class="store-star right mr-20 mt-25">
                    <a class="pointer" @click="favStore" v-if="!storeInfo.isFav">添加关注</a>
                    <a class="pointer active" @click="favStore" v-if="storeInfo.isFav">取消关注</a>
                </div>
            </div>
            <div class="store-nav mt-20">
                <ul>
                    <li>
                        <router-link :to="{name:'storeCourse',params: {id: $route.params.id}}">课程</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'storeSpecial',params: {id: $route.params.id}}">专栏</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'storeBook',params: {id: $route.params.id}}">电子书</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'storeShoppe',params: {id: $route.params.id}}">商城</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'storeProject',params: {id: $route.params.id}}">项目</router-link>
                    </li>
                </ul>
            </div>
            <div class="store-good mt-20">
                <router-view/>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {Navigation, AppHeader, AppFooter} from '../../components/public/index'
    import {utilsApi, storeApi} from '../../api'

    export default {
        name: "store",
        components: {
            Navigation, AppHeader, AppFooter
        },
        data() {
            return {
                imgPath: utilsApi.api,
                storeInfo: {},
            }
        },
        methods: {
            favStore() {
                storeApi.favStore({id: this.$route.params.id}).then(resp => {
                    if (resp.status === 1) {
                        this.storeInfo.isFav = this.storeInfo.isFav ? 0 : 1
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .store-page {
        @include borderBox();

        .store-info {
            @include size(100%, 100px);
            border-radius: 10px;
            padding: 10px;

            .store-img {
                @include size(80px);
                border-radius: 10px;
                overflow: hidden;

                img {
                    @include size(100%);
                    object-fit: cover;
                }
            }
            .store-name {
                line-height: 80px;
                font-weight: bold;
                font-size: 14px;
            }
            .store-star {
                a {
                    display: block;
                    @include size(100px, 30px);
                    line-height: 30px;
                    border: 1px solid #999;
                    color: #999;
                    border-radius: 100px;
                    text-align: center;
                    &.active {
                        color: #fff;
                        background-color: $fontColorRed;
                        border-color: $fontColorRed;
                    }
                }
            }
        }

        .store-nav {
            border-top: 2px solid #f1f1f1;
            border-bottom: 2px solid #f1f1f1;
            text-align: center;

            ul {
                display: inline-block;
                list-style: none;

                li {
                    display: inline-block;
                    font-size: 16px;
                    padding: 10px 80px;

                    a {
                        color: #333;
                        &.router-link-active {
                            color: $fontColorRed;
                        }
                    }
                }
            }
        }
        .store-good {
        }
    }
</style>
