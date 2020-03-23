<template>
    <div class="my-focus personal-center-modules">
        <div class="module-name">我的关注</div>
        <div class="data-list clear module-content">
            <div class="my-store-item data-item pointer left p-10 clear" v-for="item in this.focusList" :key="item.id">
                <div class="left store-img">
                    <img :src="item.attention_user.face">
                </div>
                <div class="left store-name ellipsis ml-10">我的店铺</div>
                <div class="focus-btn">
                    <!--<a class="pointer add"><span class="icon heart mr-5"></span>添加关注</a>-->
                    <a class="pointer cancel" @click="cancelFocus(item)"><span class="icon heart_active mr-5"></span>取消关注</a>
                </div>
            </div>
        </div>
        <pagination :pageInfo="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {Pagination} from "../../components/public";
    import {storeApi, utilsApi} from "../../api";

    export default {
        name: "my-focus",
        components: {Pagination},
        data() {
            return {
                focusList: [],
                pageInfo: {
                    total: 0,
                    pageSize: 8,
                    currentPage: 1,
                },
            }
        },
        mounted() {
            this.getFocusList()
        },
        methods: {
            getFocusList() {
                storeApi.myFocus({
                    pageSize: this.pageInfo.pageSize,
                    page: this.pageInfo.currentPage,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.focusList = resp.data.data
                        this.pageInfo.total = resp.data.total
                        this.focusList.forEach(val => {
                            val.attention_user.face = utilsApi.api + val.attention_user.face
                        })
                    }
                })
            },
            cancelFocus(item) {
                storeApi.favStore({id: item.attention_id}).then(resp => {
                    if (resp.status === 1) {
                        this.$message({
                            message: resp.msg,
                            type: 'success'
                        })
                        this.getFocusList()
                    } else {
                        this.$message({
                            message: resp.msg,
                            type: 'error'
                        })
                    }
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page;
                this.getFocusList()
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .my-focus {
        .module-name {
            border-bottom: 0;
        }
        .module-content {
            padding: 0 15px 15px;
        }

        .my-store-item {
            @include borderBox();
            @include size(328px, 100px);
            position: relative;

            .store-img {
                @include size(80px);
                @include imgCover();
                background-color: $fontColorRed;
                overflow: hidden;
                border-radius: 10px;
            }

            .store-name {
                width: 217px;
                font-size: 14px;
            }

            .focus-btn {
                position: absolute;
                right: 10px;
                bottom: 10px;

                a {
                    display: block;
                    padding: 3px 8px;
                    border-radius: 20px;
                    border: 1px solid;

                    &.add {
                        color: #999;
                        border-color: #999;
                    }
                    &.cancel {
                        color: $fontColorRed;
                        border-color: $fontColorRed;
                    }

                    .icon {
                        @include size(16px);
                        display: inline-block;
                        vertical-align: bottom;
                    }
                }
            }
        }
    }
</style>
