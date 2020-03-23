<template>
    <div class="pagination">
        <el-pagination
            background layout="prev, pager, next, jumper, total"
            :total="pageInfo.total"
            :page-size="pageInfo.pageSize"
            :current-page.sync="pageInfo.currentPage"
            @current-change="changePage"></el-pagination>
    </div>
</template>

<script>
    /**
     * @prop pageInfo [Object]
     *          pageSize [number]
     *          total [number]
     *          currentPage [number]
     *  @event change-page return pageNo.
     */
    export default {
        name: "pagination",
        props: {
            pageInfo: {
                type: Object,
                default() {
                    return {
                        pageSize: 8,
                        total: 0,
                        currentPage: 1
                    }
                }
            },
        },
        methods: {
            changePage(pageNum) {
                this.$emit('change-page', pageNum)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pagination {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
</style>
