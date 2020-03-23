<template>
    <div class="store-course">
        <div class="store-type-no1 clear">
            <a class="left pointer" :class="{active:currentCat===2}" @click="changeCat(2)">录播课</a>
            <a class="left pointer" :class="{active:currentCat===1}" @click="changeCat(1)">直播课</a>
            <a class="left pointer" :class="{active:currentCat===3}" @click="changeCat(3)">线下课</a>
        </div>
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
            <course-item class="left" v-for="item in respData.data" :key="item.id" :course-item="item"></course-item>
        </div>
        <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {CourseItem, Pagination} from '../../components/public'
    import {storeApi, categoryApi, utilsApi} from '../../api'

    export default {
        name: "store-course",
        components: {Pagination, CourseItem},
        data() {
            return {
                currentCat: 2,
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
                    type: 1,
                    course_type: this.currentCat,
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
                    type: 1,
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
            changeCat(cat) {
                this.currentCat = cat
                this.getStore()
            },
            changeCateOne(obj) {
                if (this.categoryOneId === obj.id) return
                this.categoryOneId = obj.id
                // this.getStore()
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

    .store-course {
        @include borderBox();
    }
</style>
