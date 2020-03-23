<template>
    <div class="store-course">
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

        <div class="project-list clear">
            <project-item class="left" v-for="item in respData" :key="item.id" :project-item="item"></project-item>
        </div>
        <div class="icon search-null" v-show="!respData.length"></div>

        <div class="page">
            <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
        </div>
    </div>
</template>

<script>
    import {ProjectItem,Pagination} from '../../components/public/index'
    import {storeApi, categoryApi,utilsApi} from '../../api'

    export default {
        name: "store-course",
        components: {ProjectItem,Pagination},
        data() {
            return {
                currentCat: 2,
                pageInfo: {
                    total: 0,
                    pageSize: 8,
                    currentPage: 1,
                },
                respData: {},
                categoryOneList: [],
                categoryTwoList: [],
                categoryOneId: -1,
                categoryTwoId: -1,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        mounted() {
            categoryApi.getShopType({
                type: 'ItemClassify'
            }).then((res) => {
                if (res.status === 1) {
                    this.categoryOneList = res.data
                    this.categoryOneId = this.categoryOneList[0].id
                    this.getChangeTwoList()
                }
            })
            // this.getChangeTwoList()
            // /this.getStore()
        },
        methods: {
            getStore() {
                storeApi.getStore({
                    uid: this.$route.params.id,
                    user_id: this.userInfo.uid,
                    type: 5,
                    category_id: this.categoryOneId,
                    category_store_id: this.categoryTwoId || '',
                    page_size: this.pageInfo.pageSize,
                    page: this.pageInfo.currentPage,
                }).then(resp => {
                    this.$parent.storeInfo = {
                        name: resp.data.store_name,
                        face: utilsApi.api + resp.data.store_face,
                        isFav: resp.data.is_attention,
                    }
                    // if (resp.status === 1) {
                    //     console.log(resp.data)
                    //     this.respData = resp.data.data
                    //     this.pageInfo = {
                    //         total: this.respData.total * 1,
                    //     }
                    // }
                    if (resp.status === 1) {
                        console.log(resp.data)
                        this.respData = resp.data.data
                        this.pageInfo.total = resp.data.total * 1
                    } else {
                        this.respData = []
                        this.pageInfo.total = 0
                    }
                })
            },
            changePage(num) {
                this.pageInfo.currentPage = num
                this.getStore()
            },
            // changeCat(cat) {
            //     this.currentCat = cat
            //     this.getStore()
            // },
            changeCateOne(obj) {
                if (this.categoryOneId === obj.id) return
                this.categoryOneId = obj.id
                this.getStore()
                this.getChangeTwoList()
            },
            getChangeTwoList(){
                categoryApi.getShopList({
                    uid: this.$route.params.id,
                    category_id: this.categoryOneId,
                    type: 'ItemClassify'
                }).then((resp) => {
                    if (resp.status === 1) {
                        this.categoryTwoList = resp.data
                        this.categoryTwoId = this.categoryTwoList[0].id
                        if (resp.data.length <= 0) {
                            this.getStore()
                        } else {
                            this.getStore()
                            this.categoryTwoList = resp.data
                            this.categoryTwoId = this.categoryTwoList[0].id
                        }
                    }
                    console.log("二级", resp.data)
                })
            },
            changeCateTwo(obj) {
                // if (this.categoryTwoId === obj.id) return
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

        .project-list {
            & > .project-item {
                @include dataItem('2n+1');
            }
        }
    }
</style>
