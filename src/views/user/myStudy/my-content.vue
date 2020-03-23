<template>
    <div class="my-content">
        <div class="module-nav">
            <ul class="clear">
                <li class="left pointer ml-30" :class="{active:studyStatus===1}" @click="setStatus(1)">学习中</li>
                <li class="left pointer ml-30" :class="{active:studyStatus===0}" @click="setStatus(0)">未学习</li>
                <li class="left pointer ml-30" :class="{active:studyStatus===2}" @click="setStatus(2)">已学习</li>
                <li class="left pointer ml-30" :class="{active:studyStatus===3}" @click="studyRecord(3)">学习记录</li>
            </ul>
        </div>
        <div class="data-content" v-show="studyStatus!==3">
            <div class="content-type">
                <ul class="clear">
                    <li @click="setType(1,2)" :class="{active: contentType===1&&courseType===2}" class="left pointer ">
                        录播课
                    </li>
                    <li @click="setType(1,1)" :class="{active: contentType===1&&courseType===1}" class="left pointer ml-15">
                        直播课
                    </li>
                    <li @click="setType(2)" :class="{active: contentType===2}" class="left pointer ml-15">知识专栏</li>
                    <li @click="setType(3)" :class="{active: contentType===3}" class="left pointer ml-15">电子书</li>
                </ul>
            </div>
            <div class="course-list clear" v-if="contentType===1">
                <course-item class="left" v-for="item in dataList" :key="item.id"
                             :course-item="item.contents" @click="goCoursePage(item)"
                             :auto-jump="false" :is-record="true"
                             :record="{minute:item.minute,catalogName:item.catalog_name,status:item.status}"></course-item>
            </div>
            <div class="special-list clear" v-if="contentType===2">
                <special-item class="left" v-for="item in dataList" :key="item.id"
                              :to="{name: 'mySpecial', params: {id: item.contents.id}}"
                              :special-item="item.contents" :is-record="true"
                              :record="{status:item.status,catalogName:item.catalog_name}"></special-item>
            </div>
            <div class="book-list clear" v-if="contentType===3">
                <book-item class="left" v-for="item in dataList" :key="item.id"
                           :to="{name: 'myBook', params: {id: item.contents.id}}"
                           :book-item="item.contents" size="small" :is-record="true"
                           :record="{status:item.status,catalogName:item.catalog_name}"></book-item>
            </div>
            <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
        </div>
        <div class="study-record" v-show="studyStatus===3">
            <ul class="dy-step-bar">
                <li class="pl-10 pb-10" v-for="item,index in recordList" :key="index">
                    <div class="date" v-text="$filter.timeFilter(item[0].create_time, 'M月D日')"></div>
                    <div class="record-item mt-10" v-for="sItem in item" :key="sItem.id">
                        <div class="record-head">
                            <span class="time" v-text="$filter.timeFilter(sItem.create_time, 'HH:mm:ss')">13:10</span>
                            <span class="title ml-10" v-if="sItem.type!==1" v-text="$filter.enumFilter(sItem.type, 'typeFilter')"></span>
                            <span class="title ml-10" v-if="sItem.type===1" v-text="$filter.enumFilter(sItem.course_type, 'courseTypeFilter')"></span>
                        </div>
                        <div class="record-content" v-text="sItem.note"></div>
                    </div>
                </li>
            </ul>
            <pagination :page-info="recordPage" @change-page="otherPage"></pagination>
        </div>
    </div>
</template>

<script>
    import {Pagination, CourseItem, SpecialItem, BookItem,} from '../../../components/public'
    import {myStudyApi} from "../../../api";

    export default {
        name: "my-content",
        components: {Pagination, CourseItem, SpecialItem, BookItem,},
        data() {
            return {
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                studyStatus: 1,
                contentType: 1,
                courseType: 2,
                pageInfo: {
                    total: 0,
                    pageSize: 4,
                    currentPage: 1,
                },
                recordPage: {
                    total: 0,
                    pageSize: 10,
                    currentPage: 1,
                },
                dataList: [],
                recordList: [],
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            setStatus(type) {
                this.pageInfo.currentPage = 1
                this.pageInfo.total = 0
                this.studyStatus = type
                this.getList()
            },
            setType(contentType, courseType) {
                this.contentType = contentType
                this.courseType = courseType
                this.getList()
            },
            studyRecord(type) {
                if (type) {
                    this.studyStatus = type
                    this.recordPage.total = 0
                    this.recordPage.currentPage = 1
                }
                this.recordList = []
                myStudyApi.studyRecord({
                    uid: this.userInfo.uid,
                    page: this.recordPage.currentPage,
                    page_size: this.recordPage.pageSize,
                }).then(resp => {
                    if (resp.status === 1) {
                        let data = resp.data.data
                        this.recordPage.total = resp.data.total
                        let time = ''
                        data.forEach(val => {
                            if (time !== this.$filter.timeFilter(val.create_time, 'M月D日')) {
                                time = this.$filter.timeFilter(val.create_time, 'M月D日')
                                this.recordList.push([val])
                            } else {
                                this.recordList[this.recordList.length - 1].push(val)
                            }
                        })
                    } else {
                        this.recordPage.total = 0
                        this.recordPage.currentPage = 1
                    }
                })
            },
            otherPage(page) {
                this.recordPage.currentPage = page
                this.studyRecord()
            },
            getList() {
                this.dataList = []
                myStudyApi.getContentByStatus({
                    uid: this.userInfo.uid,
                    status: this.studyStatus,
                    type: this.contentType,
                    course_type: this.courseType,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then(resp => {
                    if (resp.status === 1) {
                        this.dataList = resp.data.data
                        this.pageInfo.total = resp.data.total * 1 || 0
                    }
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                this.getList()
            },
            // 跳转课程
            goCoursePage(item) {
                if (item.course_type === 1) {
                    this.$router.push({name: 'myLiveCourse', params: {courseId: item.content_id, tabId: 0}})
                }
                else if (item.course_type === 2) {
                    this.$router.push({name: 'myVideoCourse', params: {courseId: item.content_id, tabId: 0}})
                }
                else if (item.course_type === 3) {
                    this.$router.push({name: 'myDownlineCourse', params: {courseId: item.content_id, tabId: 0}})
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .my-content {
        .data-content {
            padding: 15px;
        }
        .content-type {
            ul {
                li {
                    padding: 5px 20px;
                    border: 1px solid #eee;
                    border-radius: 5px;
                    color: #666;
                    user-select: none;

                    &.active {
                        background-color: #eee;
                        color: #000;
                    }
                }
            }
        }
        .study-record {
            padding: 15px;
            .date {
                font-weight: bold;
            }
            .record-head {
                color: #999;
            }
            .record-content {
                font-size: 14px;
                font-weight: bold;
            }
        }
        .course-item, .book-item {
            width: 241px;
        }
        .special-item {
            width: 503px;
        }
    }
</style>
