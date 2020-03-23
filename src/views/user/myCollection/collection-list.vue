<template>
    <div class="collection-list personal-center-modules">
        <div class="module-name">我的收藏</div>
        <div class="module-nav">
            <ul class="clear">
                <li class="left pointer ml-30" :class="{active: type===1}" @click="setType(1)">课程</li>
                <li class="left pointer ml-30" :class="{active: type===2}" @click="setType(2)">知识专栏</li>
                <li class="left pointer ml-30" :class="{active: type===3}" @click="setType(3)">电子书</li>
                <li class="left pointer ml-30" :class="{active: type===4}" @click="setType(4)">商城</li>
                <li class="left pointer ml-30" :class="{active: type===5}" @click="setType(5)">项目</li>
            </ul>
        </div>
        <div class="data-list clear p-15">
            <course-item v-if="type===1" class="left" v-for="item in dataList" :key="item.id" :course-item="item.item"></course-item>
            <special-item v-if="type===2" class="left" v-for="item in dataList" :key="item.id" :special-item="item.item" size="small"></special-item>
            <book-item v-if="type===3" class="left" v-for="item in dataList" :key="item.id" :book-item="item.item" size="small"></book-item>
            <goods-item v-if="type===4" class="left" v-for="item in dataList" :key="item.id" :goods-item="item.item"></goods-item>
            <project-item v-if="type===5" class="left" v-for="item in dataList" :key="item.id" :project-item="item.item" size="small"></project-item>
        </div>
        <pagination :pageInfo="pageInfo" @change-page="changePage" class="mb-20"></pagination>
    </div>
</template>

<script>
    import {Pagination, CourseItem, SpecialItem, BookItem, GoodsItem, ProjectItem,} from '../../../components/public'
    import {myStudyApi} from "../../../api";

    export default {
        name: "collection-list",
        components: {Pagination, CourseItem, SpecialItem, BookItem, GoodsItem, ProjectItem,},
        data() {
            return {
                // 1-课程 2-专栏 3-电子书 4-商品 5-项目
                type: 1,
                dataList: [],
                pageInfo: {
                    total: 0,
                    pageSize: 8,
                    currentPage: 1,
                },
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                this.dataList = []
                myStudyApi.collectionList({
                    type: this.type,
                    page: this.pageInfo.currentPage,
                    pageSize: this.pageInfo.pageSize,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.dataList = resp.data.data
                        this.pageInfo.total = resp.data.total
                    } else {
                        this.$message({
                            message: resp.msg,
                            type: 'error'
                        })
                    }
                })
            },
            setType(type) {
                if (this.type === type) return;
                this.pageInfo.currentPage = 1
                this.type = type
                this.getList()
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                this.getList()
            },
        }
    }
</script>

<style lang="scss" scoped>
    .collection-list {
        .course-item,
        .book-item,
        .goods-item {
            width: 241px;
        }
        .special-item,
        .project-item {
            width: 503px;
        }
    }
</style>
