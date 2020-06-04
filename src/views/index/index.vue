<template>
    <div class="index">
        <app-header></app-header>
        <div class="page-content">
            <!--搜索-->
            <search-input v-model="searchStr" @search="search"></search-input>
            <!--导航-->
            <navigation class="mt-20"></navigation>
            <!--轮播-->
            <banner type="0"></banner>
            <!--直播课-->
            <index-panel class="mt-20" heading="直播课" :more="{name: 'liveCourse'}">
                <div class="data-list clear">
                    <course-item class="left" v-for="item in course_type1" :key="item.id"
                                 :course-item="item"></course-item>
                </div>
            </index-panel>
            <!--录播课-->
            <index-panel class="mt-20" heading="录播课" :more="{name: 'videoCourse'}">
                <div class="data-list clear">
                    <course-item class="left" v-for="item in course_type2" :key="item.id"
                                 :course-item="item"></course-item>
                </div>
            </index-panel>
            <!--线下课-->
            <index-panel class="mt-20" heading="线下课" :more="{name: 'downlineCourse'}">
                <div class="data-list clear">
                    <course-item class="left" v-for="item in course_type3" :key="item.id"
                                 :course-item="item"></course-item>
                </div>
            </index-panel>
            <!--最新专栏-->
            <index-panel class="mt-20" heading="最新专栏" :more="{name: 'specialIndex'}">
                <div class="data-list clear">
                    <special-item class="left" v-for="item in knowledge" :key="item.id"
                                  :special-item="item"></special-item>
                </div>
            </index-panel>
            <!--财税问答-->
            <index-panel class="mt-20" heading="财税问答" :more="{name: 'answer'}">
                <div class="data-list clear">
                    <answer-item class="left" v-for="item in quiz" :key="item.id" :answer-item="item"
                                 @click="$router.push({name: 'answerDetails', query: {id: item.id}})"></answer-item>
                </div>
            </index-panel>
            <!--每天一本书-->
            <index-panel class="mt-20" heading="每天一本书" :more="{name: 'booksIndex'}">
                <div class="data-list clear">
                    <book-item class="left" v-for="item in book" :key="item.id" :book-item="item"></book-item>
                </div>
            </index-panel>
            <!--热销商品-->
            <index-panel class="mt-20" heading="热销商品" :more="{name: 'fineGoods'}">
                <div class="data-list clear">
                    <goods-item class="left" v-for="item in goods" :key="item.id" :goods-item="item"></goods-item>
                </div>
            </index-panel>
            <!--项目策划-->
            <index-panel class="mt-20" heading="项目策划" :more="{name: 'project'}">
                <div class="data-list clear">
                    <project-item class="left" v-for="item in project" :key="item.id" :project-item="item"></project-item>
                </div>
            </index-panel>
            <!--热门任务-->
            <index-panel class="mt-20 task" heading="热门任务" :more="{name: 'taskReward'}">
                <div class="index-panel-body">
                    <ul class="clear">
                        <li class="left pointer" v-for="item in tasks" :key="item.id"
                            @click="$router.push({name: 'taskDetails', query: {id: item.id}})">
                            <div class="task-name" v-text="item.name">任务名称</div>
                            <div class="task-content" v-text="item.notes"></div>
                            <div class="task-time clear">
                                <div class="left time-icon">{{item.add_time  | timeFilter('YYYY年MM月DD日') }}</div>
                                <div class="right current-price" v-text="'¥'+item.money"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </index-panel>
            <!--热门岗位-->
            <index-panel class="mt-20 work" heading="热门岗位" :more="{name: 'recruitList'}">
                <div class="index-panel-body">
                    <hot-item :recruits="recruits"></hot-item>
                </div>
            </index-panel>
            <!--热门商铺-->
            <index-panel class="mt-20 shop" heading="热门商铺">
                <div class="index-panel-body">
                    <ul class="clear">
                        <li class="left clear" v-for="item in stores">
                            <div class="left shop-img">
                                <img :src="item.face"/>
                            </div>
                            <div class="right shop-info">
                                <div class="name" v-text="item.nickname"></div>
                                <div class="control clear">
                                    <div class="add-star left">
                                        <a class="pointer" :class="{active: item.is_attention}" @click="addStar(item)">添加关注</a>
                                    </div>
                                    <div class="to-shop right">
                                        <router-link :to="{name: 'storeCourse',params: {id: item.uid}}">进入店铺
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </index-panel>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {
        Navigation, SearchInput, Banner, AppHeader, AppFooter, CourseItem, indexPanel,
        SpecialItem, BookItem, HotItem, GoodsItem, ProjectItem, AnswerItem,
    } from '../../components/public'
    import {indexApi, utilsApi, storeApi} from '../../api'

    export default {
        name: "index",
        components: {
            Navigation, SearchInput, Banner, AppHeader, AppFooter, CourseItem, indexPanel,
            SpecialItem, BookItem, HotItem, GoodsItem, ProjectItem, AnswerItem,
        },
        data() {
            return {
                searchStr: '',
                course_type1: [],
                course_type2: [],
                course_type3: [],
                knowledge: [],
                quiz: [],
                book: [],
                goods: [],
                project: [],
                recruits: [],
                tasks: [],
                stores: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {}
            }
        },
        mounted() {
            switch (document.domain) {
                case 'sichuan.itaxedu.com':
                    this.$router.push({path: 'exam', query: { address_id: '3350'}})
                    this.$helper.utils.storage.set('addressId','3350')
                    break;
                case 'gd.itaxedu.com':
                    this.$router.push({path: 'exam', query: { address_id: '3357'}})
                    this.$helper.utils.storage.set('addressId','3357')
                    break;
                case 'sz.itaxedu.com':
                    this.$router.push({path: 'exam', query: { address_id: '4500'}})
                    this.$helper.utils.storage.set('addressId','4500')
                    break;
                case 'jx.itaxedu.com':
                    this.$router.push({path: 'exam', query: { address_id: '8435'}})
                    this.$helper.utils.storage.set('addressId','8435')
                    break;
                case 'tj.itaxedu.com':
                    this.$router.push({path: 'exam', query: { address_id: '179'}})
                    this.$helper.utils.storage.set('addressId','179')
                    break;
                case 'bj.itaxedu.com':
                    this.$router.push({path: 'exam', query: { address_id: '8650'}})
                    this.$helper.utils.storage.set('addressId','8650')
                    break;
                case 'hn.itaxedu.com':
                    this.$router.push({path: 'exam', query: { address_id: '10450'}})
                    this.$helper.utils.storage.set('addressId','10450')
                    break;
                default:
                    break;
            }
            indexApi.index().then(res => {
                // 直播
                this.course_type1 = res.data.course_type1;
                // 录播
                this.course_type2 = res.data.course_type2;
                // 线下课程
                this.course_type3 = res.data.course_type3;
                // 专栏
                this.knowledge = res.data.knowledge
                // 财税问答
                this.quiz = res.data.quiz
                // 每天一本书
                this.book = res.data.book
                // 热销商品
                this.goods = res.data.goods
                // 项目策划
                this.project = res.data.items
                // 热门岗位
                this.recruits = res.data.recruits
                // 热门任务
                this.tasks = res.data.tasks
            })
            indexApi.hotStore({
                uid: this.userInfo.uid,
            }).then(resp => {
                if (resp.status === 1) {
                    this.stores = resp.data
                    this.stores.forEach(item => {
                        item.face = utilsApi.api + item.face
                    })
                }
            })
        },
        methods: {
            search() {
                this.$router.push({name: 'search', params: {keywords: this.searchStr}})
            },
            addStar(item) {
                if(this.userInfo.uid) {
                    item.is_attention = item.is_attention === 1 ? 0 : 1
                    storeApi.favStore({id: item.uid}).then(resp => {
                        if (resp.status !== 1) {
                            item.is_attention = item.is_attention === 1 ? 0 : 1
                        }
                    })
                } else {
                    this.$message.error('您还未登录');
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .index {

        img {
            width: 100%;
            height: 100%;
        }

        .task {
            .index-panel-body > ul {
                @include panelUl(590px, 120px, '2n+1');
                & > li {
                    padding: 10px;
                }
            }
            &-name {
                font-size: 14px;
                font-weight: bold;
            }
            &-content {
                margin-top: 7px;
                height: 46px;
                overflow: hidden;
            }
            &-time {
                color: #999;
                margin-top: 10px;

                & > .time-icon {
                    padding-left: 20px;
                    position: relative;
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        background-image: url("../../assets/image/ic_5.png");
                        background-size: cover;
                        left: 0;
                        top: 0;
                    }
                }
            }
        }

        .work {
            .index-panel-body > ul {
                @include panelUl(285px, 145px, '4n+1');
                & > li {
                    padding: 10px;
                }
            }
            &-title {
                font-size: 14px;
                font-weight: bold;
            }
            &-date, &-info {
                color: #999;
            }
            &-info {
                margin-top: 5px;
            }
            &-type ul {
                margin-top: 8px;
                list-style: none;
                li {
                    background-color: #f3f3f3;
                    border-radius: 3px;
                    padding: 2px 8px;

                    & + li {
                        margin-left: 8px;
                    }
                }
            }
            &-company {
                margin-top: 12px;

                .company-img {
                    background-color: #ccc;
                    width: 45px;
                    height: 45px;
                    margin-right: 5px;
                    border-radius: 5px;
                }

                .company-block {
                    width: 210px;
                }

                .company-name {
                    font-weight: bold;
                    margin: 6px 0;
                }
                .company-info {
                    color: #999;
                }
            }
        }

        .shop {
            .index-panel-body > ul {
                @include panelUl(386px, 110px, '3n+1');
                & > li {
                    padding: 10px;
                    * {
                        box-sizing: border-box;
                    }
                }
            }
            &-img {
                width: 90px;
                height: 100%;
                background-color: #d32332;
                border-radius: 10px;
                overflow: hidden;
            }
            &-info {
                width: 265px;
                height: 100%;
                position: relative;

                .name {
                    font-size: 14px;
                    font-weight: bold;
                }

                .control {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    a {
                        display: inline-block;
                        width: 80px;
                        height: 28px;
                        border-radius: 30px;
                        line-height: 26px;
                        border: 0;
                    }
                    .add-star {
                        a {
                            width: 100px;
                            border: 1px solid #ccc;
                            color: #ccc;
                            position: relative;
                            padding-left: 35px;
                            &:before {
                                content: '';
                                display: inline-block;
                                width: 20px;
                                height: 18px;
                                background-image: url("../../assets/image/ic_8.png");
                                background-size: 100%;
                                background-repeat: no-repeat;
                                position: absolute;
                                left: 12px;
                                top: 5px;
                            }

                            &.active, &:hover {
                                border-color: $fontColorRed;
                                color: $fontColorRed;
                                &:before {
                                    background-image: url("../../assets/image/ic_9.png");
                                }
                            }
                        }
                    }
                    .to-shop {
                        a {
                            color: #fff;
                            border: 1px solid #303f9f;
                            background-color: #303f9f;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>
