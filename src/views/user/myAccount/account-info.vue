<template>
    <div class="account-info">
        <div class="account-head clear">
            <div class="left">我的账户</div>
            <div class="right">
                <a class="card-used pointer" @click="entityCardModal=true">实体卡使用</a>
                <a class="card-used pointer ml-20" @click="$router.push({name:'myCoupon'})">我的优惠券</a>
            </div>
        </div>
        <div class="wallet clear line-border">
            <div class="left">
                <div class="user-face left">
                    <img :src="accountInfo.face"/>
                </div>
                <div class="wallet-money ml-10 left">
                    <div class="title">账户余额(元)</div>
                    <div class="num" v-text="accountInfo.balance">1000.00元</div>
                </div>
            </div>
            <div class="ctrl right mt-20">
                <router-link class="recharge left" :to="{name:'recharge'}">充值</router-link>
                <router-link class="withdraw left ml-10" :to="{name:'withdraw'}">提现</router-link>
            </div>
        </div>
        <div class="record-list line-border">
            <dl>
                <dt>账户明细</dt>
                <dd class="clear ml-0" v-for="item in dataList" :key="item.id">
                    <div class="left date">{{item.create_time|timeFilter('YYYY-MM-DD HH:mm:ss')}}</div>
                    <div class="left content ellipsis" v-text="item.note">购买。。。。</div>
                    <div class="right cash" :class="{in:item.type===1,out:item.type===2}" v-text="item.money"></div>
                </dd>
            </dl>
        </div>
        <pagination :page-info="pageInfo" @change-page="changePage" class="mb-20 mt-0"></pagination>
        <!--实体卡模态框-->
        <self-modal heading="实体卡" :show.sync="entityCardModal" :margin-top="200" @close="resetForm" @click-shadow="resetForm">
            <div class="entity-card-modal">
                <el-form ref="cardForm" :model="form" label-width="60px">
                    <el-form-item label="卡号" prop="cardNo" :rules="{required: true, message: '该项不能为空'}">
                        <el-input v-model="form.cardNo"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="cardPwd" :rules="{required: true, message: '该项不能为空'}">
                        <el-input v-model="form.cardPwd"></el-input>
                    </el-form-item>
                </el-form>
                <div class="btn-group">
                    <a class="btn btn-blue pointer" @click="entityCardModal=false">取消</a>
                    <a class="btn btn-red pointer ml-30" @click="entityCardUse">确认</a>
                </div>
            </div>
        </self-modal>
        <!--系列卡模态框-->
        <self-modal :show.sync="getSeriesModal" :margin-top="200">
            <div slot="modal-heading" class="course-modal-heading pt-20">
                <div class="course-img m-auto">
                    <img :src="cardReturn.thumb">
                </div>
                <div class="tip mt-10">您抽中了<span class="course-name" v-text="cardReturn.title">xxx</span>课程</div>
                <span class="close icon modal-close pointer" @click="getSeriesModal=false"></span>
            </div>
            <div class="btn-group mt-10 pb-20">
                <a class="btn btn-red pointer" @click="refresh">立即领取</a>
            </div>
        </self-modal>
        <!--万能卡模态框-->
        <self-modal :show.sync="getUniversalModal" :margin-top="200">
            <div slot="modal-heading" class="money-modal-heading pt-20">
                <div class="money-img m-auto">
                    <div class="icon red-packets"></div>
                </div>
                <div class="tip mt-10">恭喜您获得<span class="money" v-text="cardReturn.price"></span></div>
                <span class="close icon modal-close pointer" @click="getUniversalModal=false"></span>
            </div>
            <div class="btn-group mt-10 pb-20">
                <a class="btn btn-red pointer" @click="refresh">立即领取</a>
            </div>
        </self-modal>
    </div>
</template>

<script>
    import {SelfModal, Pagination} from '../../../components/public'
    import {myAccountApi, utilsApi,} from '../../../api'

    export default {
        name: "account-info",
        components: {SelfModal, Pagination,},
        data() {
            return {
                entityCardModal: false,
                getSeriesModal: false,
                getUniversalModal: false,
                form: {
                    cardNo: '',
                    cardPwd: '',
                },
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                accountInfo: {},
                pageInfo: {
                    total: 0,
                    pageSize: 10,
                    currentPage: 1,
                },
                dataList: [],
                cardReturn: {},
            }
        },
        mounted() {
            this.refresh()
        },
        methods: {
            refresh() {
                this.getInfo()
                this.getList()
                this.entityCardModal = false
                this.getSeriesModal = false
                this.getUniversalModal = false
            },
            getInfo() {
                myAccountApi.accountInfo({
                    uid: this.userInfo.uid
                }).then(resp => {
                    if (resp.status === 1) {
                        this.accountInfo = resp.data
                        this.accountInfo.face = utilsApi.api + this.accountInfo.face
                    }
                })
            },
            getList() {
                myAccountApi.moneyList({
                    uid: this.userInfo.uid,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize
                }).then(resp => {
                    if (resp.status === 1) {
                        this.dataList = resp.data.data
                        this.pageInfo.total = resp.data.total || 0
                    }
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                this.getList()
            },
            entityCardUse() {
                this.$refs['cardForm'].validate(flag => {
                    if (flag) {
                        myAccountApi.entityCard({
                            uid: this.userInfo.uid,
                            card_num: this.form.cardNo,
                            password: this.form.cardPwd,
                        }).then(resp => {
                            this.entityCardModal = false
                            this.resetForm()
                            debugger
                            if (resp.status === 1) {
                                this.cardReturn = resp.data
                                // 万能卡
                                if (this.cardReturn.type === 1) {
                                    this.getUniversalModal = true
                                }
                                // 系列卡
                                else {
                                    this.getSeriesModal = true
                                    this.cardReturn.thumb = utilsApi.api + this.cardReturn.thumb
                                }
                            } else {
                                this.$message({
                                    message: resp.msg,
                                    type: 'error'
                                })
                            }
                        })
                    }
                })
            },
            resetForm() {
                this.$refs['cardForm'].resetFields()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .account-info {
        @include borderBox();
        .line-border {
            border-top: 1px solid #eeeeee;
        }
        .account-head {
            padding: 10px 30px;

            .card-used {
                color: $fontColorBlue;
            }
        }
        .wallet {
            padding: 10px 30px;
            .user-face {
                @include size (80px);
                border-radius: 100px;
                overflow: hidden;
                background-color: #ccc;
                @include imgCover();
            }
            .wallet-money {
                margin-top: 18px;
                .title {
                    color: #999;
                }
                .num {
                    font-size: 20px;
                    font-weight: bold;
                }
            }

            .ctrl {
                a {
                    display: block;
                    background-color: $fontColorBlue;
                    border-radius: 10px;
                    padding: 10px 30px;
                    color: #fff;
                    font-size: 14px;

                    &.recharge {
                        background-color: $fontColorRed;
                    }
                }
            }
        }
        .record-list {
            padding: 10px 30px;
            dl {
                dt {
                    background-color: #d8d8d8;
                    font-size: 16px;
                    padding: 10px;
                }
                dd {
                    padding: 10px;
                    border: 1px solid #d8d8d8;
                    border-top: 0;

                    .date {
                        width: 150px;
                        color: #999;
                    }

                    .content {
                        width: 700px;
                    }

                    .cash {
                        width: 120px;
                        text-align: right;

                        &.in {
                            color: $fontColorRed;
                            &:before {
                                content: "+";
                            }
                        }
                        &.out {
                            color: $fontColorBlue;
                            &:before {
                                content: "-";
                            }
                        }
                    }
                }
            }
        }
        .btn-group {
            text-align: center;
            .btn {
                display: inline-block;
                width: 100px;
                line-height: 36px;
                color: #fff;
                text-align: center;
                font-size: 14px;
                border-radius: 7px;

                &.btn-blue {
                    background-color: $fontColorBlue;
                }
                &.btn-red {
                    background-color: $fontColorRed;
                }
            }
        }
        .entity-card-modal {
            padding: 20px;
        }
        .course-modal-heading, .money-modal-heading {
            position: relative;
            .course-img, .money-img {
                border-radius: 10px;
                overflow: hidden;
                @include imgCover();
            }
            .course-img {
                @include size(150px, 100px);
            }
            .money-img {
                @include size(80px, 100px);
                .icon {
                    @include size(100%);
                }
            }
            .tip {
                text-align: center;
                .course-name, .money {
                    color: $fontColorRed;
                }
            }
            .close {
                @include size(26px);
                position: absolute;
                right: 10px;
                top: 10px
            }
        }
    }
</style>
