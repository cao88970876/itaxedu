<template>
    <div class="store-special">
        <div class="store-type-no2 clear mt-5">
            <a class="left">分类：</a>
            <a class="left pointer" :class="{active:item.id===categoryOneId}"
               v-for="item in categoryOneList"
               v-text="item.name" @click="changeCateOne(item)"></a>
        </div>
        <div class="store-type-no3 clear mt-5 pl-50 ml-40">
            <a class="left pointer" :class="{active:item.id===categoryTwoId}"
               v-for="item in categoryTwoList" v-text="item.name"
               @click="changeCateTwo(item)"></a>
        </div>
        <!--<div class="store-type-no4 clear mt-5">-->
            <!--<a class="left pointer active">综合排序</a>-->
            <!--<a class="left pointer">销量优先</a>-->
            <!--<a class="left pointer">好评优先</a>-->
            <!--<a class="left pointer">价格</a>-->
        <!--</div>-->

        <div class="icon search-null" v-show="!respData.data.length"></div>
        <div class="data-list clear">
            <special-item class="left" v-for="item in respData.data" :key="item.id" :special-item="item"></special-item>
        </div>

        <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {SpecialItem, Pagination} from '../../components/public'
    import {storeApi, categoryApi,utilsApi} from '../../api'

    export default {
        name: "store-special",
        components: {SpecialItem, Pagination},
        data() {
            return {
                pageInfo: {
                    total: 0,
                    pageSize: 8,
                    currentPage: 1,
                },
                respData: {data: []},
                categoryOneList: [],
                categoryTwoList: [],
                categoryOneId: -1,
                categoryTwoId: -1,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        mounted() {
            categoryApi.categoryList().then(resp => {
                if (resp.status === 1) {
                    this.categoryOneList = resp.data.data
                    this.categoryOneId = this.categoryOneList[0].id
                    this.getCateTowList()
                }
            })
        },
        methods: {
            getStore() {
                storeApi.getStore({
                    uid: this.$route.params.id,
                    user_id: this.userInfo.uid,
                    type: 2,
                    category_id: this.categoryOneId,
                    category_store_id: this.categoryTwoId,
                    page_size: this.pageInfo.pageSize,
                    page: this.pageInfo.currentPage,
                }).then(resp => {
                    if (resp.status === 1 || resp.status === 2) {
                        this.respData = resp.data
                        this.$parent.storeInfo = {
                            name: this.respData.store_name,
                            face: utilsApi.api + this.respData.store_face,
                            isFav: this.respData.is_attention,
                        }
                        this.pageInfo = {
                            total: this.respData.total * 1,
                            currentPage: this.respData.page * 1,
                            pageSize: this.respData.page_size * 1,
                        }
                    }
                })
            },
            changePage(num) {
                this.pageInfo.currentPage = num
                this.getStore()
            },
            getCateTowList() {
                categoryApi.categoryStore({
                    uid: this.$route.params.id,
                    category_id: this.categoryOneId,
                    type: 2,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.categoryTwoList = resp.data
                        this.categoryTwoId = this.categoryTwoList[0].id
                    } else {
                        this.categoryTwoList = []
                        this.categoryTwoId = null
                    }
                    this.getStore()
                })
            },
            changeCateOne(obj) {
                if(this.categoryOneId === obj.id) return
                this.categoryOneId = obj.id
                this.getCateTowList()
            },
            changeCateTwo(obj) {
                if (this.categoryTwoId === obj.id) return
                this.categoryTwoId = obj.id
                this.getStore()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";
    @import "../course/course-store";
</style>
