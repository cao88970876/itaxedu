<template>
    <div class="exampage">
        <!--导航-->
        <navigation class="mt-20"></navigation>
        <follow-box :id="this.$route.query.address_id"></follow-box>
        <div class="follow-nav clear mt-20">
            <router-link class="left" :to="{path: 'examNote', query: { address_id: this.$route.query.address_id}}">规则须知</router-link>
            <router-link class="left" :to="{path: 'examinfor', query: { address_id: this.$route.query.address_id}}">完善信息</router-link>
            <router-link class="left" :to="{path: 'examStudy', query: { address_id: this.$route.query.address_id}}">课程学习</router-link>
            <router-link class="left" v-if="this.$route.query.address_id == '10450'" :to="{path: 'examEntrance', query: { address_id: this.$route.query.address_id || '179'}}">考试</router-link>
            <router-link class="left" :to="{path: 'examCertificate', query: { address_id: this.$route.query.address_id}}">生成证书</router-link>
            
        </div>

        <!-- 完善信息Tips -->
        <div class="examInp-tips" v-if="formType"><div class="icon examInfor"></div><span>您还未完善信息，请先完善</span><div class="icon examStudy2"></div><el-button class="goToExam" type="primary" @click="$router.push({path: 'examinfor', query: { address_id: this.$route.query.address_id}})">去完善信息</el-button></div>

        <!-- 去考试Tips -->
        <!-- <div class="examStudy-tips" v-if="xueShiType">
            <div class="icon examStudy2"></div>
            <span>
                您已学{{ classHour[2] - classHour[0] <= 0 ? '满' : '习'}}
                <span class="examStudy-red">{{ classHour[0] }}</span>学分，
                <span v-if="classHour[2] - classHour[0] <= 0">可以获取证书</span>
                <span v-else>离获取证书还剩<span class="examStudy-red">{{ classHour[1] }}</span>个学分</span>
            </span>
            <el-button v-if="disabled" class="goToExam" type="primary" @click="goToExam()">去学习</el-button>
        </div> -->

        <!-- 课程列表 -->
         <!-- v-html="dataList" -->
        <div class="data-list-box" v-for="i in dataList" :key="i.id">
            <h2 class="years">{{ i.year }}年度</h2>
            <p class="xueFen">
                <!-- 您已学{{ i.times - i.time <= 0 ? '满' : '习'}}
                <span class="examStudy-red">{{ i.time }}</span>学分，
                <span v-if="i.times - i.time <= 0">可以获取证书</span>
                <span v-else>离获取证书还剩<span class="examStudy-red">{{ i.last_time }}</span>个学分</span> -->
                您已学习 <span class="examStudy-red">{{ i.time }}</span> 学分，其中，
                <span v-if="i.time_detail.must_common_course==0?false:true" class="examStudy-red">公需科目（必修）：{{ i.time_detail.must_common_course }}学分；</span>
                <span v-if="i.time_detail.select_common_course==0?false:true" class="examStudy-red">公需科目（选修）：{{ i.time_detail.select_common_course }}学分；</span>
                <span v-if="i.time_detail.must_major_course==0?false:true" class="examStudy-red">专业科目：{{ i.time_detail.must_major_course }}学分；</span>
            </p>
            <p class="Tips">您可点击下面的课程进行购买</p>
            <div class="data-list clear">
                <course-item class="left" v-for="item in i.course_list" :key="item.id" :course-item="item"></course-item>
            </div>
        </div>

        <!-- <pagination :pageInfo="pageInfo" @change-page="changePage"></pagination> -->

    </div>
</template>
<script>
import {Navigation, followBox, CourseItem} from '../../components/public'
import {contentApi,examApi,indexApi} from '../../api'
export default {
    name: "examStudy",
    components: {Navigation, followBox, CourseItem},
    data(){
        return{
            formType: false,
            xueShiType: false,
            classHour: ['','',''],
            userInfo: this.$helper.utils.storage.get('userInfo') || {},
            dataList: null,
            disabled:true,
            pageInfo: {
                total: 0,
                pageSize: 8,
                currentPage: 1
            },
            // categoryId: '',
            // type: 10,
        }
    },
    mounted() {
        this.getForm();
        this.xueFenType();
        // this.getList();
        // indexApi.index().then(res => {
        //     this.dataList = res.data.course_type1;
        // })
    },
    methods: {
        getForm() {
            examApi.getForm({
                uid: this.userInfo.uid,
            }).then(resp => {
                if (resp.status === 1) {
                    this.formType = false;
                } else {
                    this.formType = true;
                }
            });
        },
        xueFenType() {
            examApi.xueFenType({
                uid: this.userInfo.uid,
                address_id: this.$route.query.address_id
            }).then(resp => {
                if (resp.status === 1) {
                    this.dataList = resp.data;
                }
            });
        },
        getList() {
            examApi.getList({
                page: this.pageInfo.currentPage,
                page_size: this.pageInfo.pageSize,
                address_id: this.$route.query.address_id
            }).then(resp => {
                if (resp.status === 1) {
                    this.pageInfo.total = resp.data.total * 1;
                    this.dataList = resp.data.content;
                } else {
                    this.dataList = [];
                    this.pageInfo.total = 0;
                    this.$message({
                        message: resp['msg'],
                        type: 'error'
                    });
                }
            });
        },

        // //分页
        // changePage(page) {
        //     this.pageInfo.currentPage = page;
        //     this.getList();
        // },

        // setCategory(obj) {
        //     if (obj.id === this.categoryId) return;
        //     this.categoryId = obj.id;
        //     this.getList();
        // },
        // setOrder(type) {
        //     if (this.type === type) return;
        //     this.type = type;
        //     this.getList();
        // },
        // search() {
        //     this.$router.push({name: 'courseSearch', params: {type: 2, searchStr: this.keywords}});
        // },
        goToExam(){
            // this.$router.push({name: 'examPage'})
            switch (this.$route.query.address_id) {
                case '3350':
                    window.location.href = 'http://www.itaxedu.com/pc/#/course/videoCourseDetail/3636/0'
                    break;
                case '4500':
                    window.location.href = 'http://www.itaxedu.com/pc/#/course/videoCourseDetail/3911/0'
                    break;
                case '3357':
                    window.location.href = 'http://www.itaxedu.com/pc/#/course/videoCourseDetail/3639/0'
                    break;
                default:
                    window.location.href = 'http://www.itaxedu.com/pc/#/course/videoCourseDetail/3278/0'
                    break;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";
    .follow-nav {
        padding-left: 20px;
        height: 32px;
        border-bottom: 1px solid #E9E9E9;
        font-size: 18px;
        a {
            color: #333;
            display: block;
            height: 32px;
            box-sizing: border-box;
            border-bottom-right-radius: 2px;
            border-bottom-left-radius: 2px;
            &.router-link-active {
                color: $fontColorRed;
                border-bottom: 4px solid #E60012;
            }
            &:hover {
                color: $fontColorRed;
            }
            & + a {
                margin-left: 69px;
            }
        }

    }
    .data-list-box{
        margin-bottom: 30px;
        padding-top: 30px;
        .years{
            font-size: 34px;
            color: #333;
            margin: 0 0 20px;
        }
        .xueFen{
            margin: 0 0 15px;
            font-size: 14px;
            span{
                color: #E60012;
            }
        }
        .Tips{
            margin: 0 0 15px;
            font-size: 16px;
        }
        .data-list{
            min-height: 300px;
        }
    }

    .examInp-tips{
        display: block;
        height: 18px;
        color: #1687EF;
        font-size: 16px;
        line-height: 18px;
        padding-top:42px;
        margin-bottom: 33px;
        .examInfor {
            @include size (18px, 18px);
            vertical-align: middle;
            margin-right: 8px;
            margin-top: -2px;
        }
        .examStudy2 {
            @include size (65px, 8px);
            vertical-align: middle;
            margin-left: 12px;
            margin-top: -2px;
        }
    }
    .examStudy-tips{
        display: block;
        margin-bottom: 20px;
        height: 18px;
        color: #333;
        font-size: 16px;
        line-height: 18px;
        margin-top: 20px;
        .examStudy-red{
            color: #E60012;
            font-size: 16px;
            font-weight: bold;
        }
        .examStudy {
            @include size (18px, 18px);
            vertical-align: middle;
            margin-right: 8px;
            margin-top: -2px;
        }

    }
    .goToExam{
        width: 138px;
        margin-left: 20px;
    }
</style>

