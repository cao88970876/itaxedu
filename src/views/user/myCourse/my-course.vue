<template>
    <div class="my-course personal-center-modules">
        <div class="module-name">我的课程</div>
        <div class="module-nav">
            <ul class="clear">
                <li class="left pointer ml-30" :class="{active: type===1}" @click="setType(1,2)">录播课</li>
                <li class="left pointer ml-30" :class="{active: type===2}" @click="setType(2,1)">直播课</li>
                <li class="left pointer ml-30" :class="{active: type===3}" @click="setType(3,3)">线下课</li>
                <li class="left pointer ml-30" :class="{active: type===4}" @click="setType(4)">知识专栏</li>
                <li class="left pointer ml-30" :class="{active: type===5}" @click="setType(5)">电子书</li>
            </ul>
        </div>
        <div class="data-list clear">
            <my-course-item v-if="type<4" class="left" v-for="item in dataList" :key="item.id"
                            :course-item="item" @click="goCoursePage(item)"
                            @add-comments="addComments(item, 1)"></my-course-item>
            <my-special-item v-if="type===4" class="left" v-for="item in dataList" :key="item.id"
                             :special-item="item" @click="goSpecialPage(item)"
                             @add-comments="addComments(item, 2)"></my-special-item>
            <my-book-item v-if="type>4" class="left" v-for="item in dataList" :key="item.id"
                          :book-item="item" @click="goBookPage(item)"
                          @add-comments="addComments(item, 3)"></my-book-item>
        </div>
        <pagination class="mb-20" :page-info="pageInfo" @change-page="changePage"></pagination>
    </div>
</template>

<script>
    import {Pagination, MyCourseItem, MyBookItem, MySpecialItem} from "../../../components/public/index";
    import {myStudyApi} from "../../../api/index";

    export default {
        name: "my-course",
        components: {Pagination, MyCourseItem, MyBookItem, MySpecialItem},
        data() {
            return {
                userInfo: this.$helper.utils.storage.get('userInfo'),
                type: 1,
                courseType: 2,
                pageInfo: {
                    total: 0,
                    pageSize: 8,
                    currentPage: 1,
                },
                dataList: []
            }
        },
        mounted() {
            this.emitRequest();
        },
        methods: {
            getCourses() {
                myStudyApi.myCourse({
                    uid: this.userInfo.uid,
                    type: this.courseType,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then(resp => {
                    this.resolveResp(resp);
                });
            },
            getSpecials() {
                myStudyApi.mySpecial({
                    uid: this.userInfo.uid,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then(resp => {
                    this.resolveResp(resp);
                });
            },
            getBooks() {
                myStudyApi.myBook({
                    uid: this.userInfo.uid,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then(resp => {
                    this.resolveResp(resp);
                });
            },
            setType(type, courseType) {
                if (this.type === type) return;
                this.type = type;
                this.courseType = courseType;
                this.pageInfo.currentPage = 1;
                this.pageInfo.total = 0;
                this.emitRequest();
            },
            changePage(page) {
                this.pageInfo.currentPage = page;
                this.emitRequest();
            },
            // 结果处理
            resolveResp(resp) {
                if (resp.status === 1) {
                    this.dataList = resp.data.data;
                    this.pageInfo.total = resp.data.total;
                }
            },
            // 请求触发
            emitRequest() {
                this.dataList = [];
                if (this.type < 4) {
                    this.getCourses();
                } else if (this.type === 4) {
                    this.getSpecials();
                } else if (this.type > 4) {
                    this.getBooks();
                }
            },
            goCoursePage(item) {
                if (item.type === 1) {
                    this.$router.push({name: 'myLiveCourse', params: {courseId: item.id, tabId: 0}})
                }
                else if (item.type === 2) {
                    this.$router.push({name: 'myVideoCourse', params: {courseId: item.id, tabId: 0}})
                }
                else if (item.type === 3) {
                    this.$router.push({name: 'myDownlineCourse', params: {courseId: item.id, tabId: 0}})
                }
            },
            goSpecialPage(item) {
                this.$router.push({name: 'mySpecial', params: {id: item.id}})
            },
            goBookPage(item) {
                this.$router.push({name: 'myBook', params: {id: item.id}})
            },
            addComments(item, type) {
                this.$router.push({name: 'addComments', params: {type, contentId: item.id}});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-course {
        .data-list {
            padding: 0 15px 15px;
        }
    }
</style>
