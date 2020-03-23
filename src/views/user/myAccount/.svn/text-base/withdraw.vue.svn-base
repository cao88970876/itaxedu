<template>
    <div class="withdraw">
        <ul class="crumbs clear">
            <li class="left">我的账户</li>
            <li class="left">提现</li>
        </ul>
        <div class="card-list mt-10">
            <div>选择银行卡</div>
            <ul class="mt-10">
                <li v-for="item in dataList">
                    <label class="pointer">
                        <div class="clear">
                            <div class="left">
                                <input type="radio" style="display: none;" :value="item.id" v-model="bankId">
                                <span class="icon mt-15 radio-no-checked" :class="{'radio-checked':bankId===item.id}"></span>
                            </div>
                            <div class="left ml-10 bank-logo">
                                <img :src="item.icon">
                            </div>
                            <div class="left ml-10">
                                <div class="mt-5" v-text="item.bank_name"></div>
                                <div class="card-type" v-text="item.lastNoInfo"></div>
                            </div>
                        </div>
                    </label>
                </li>
                <li class="add-card pointer" @click="$router.push({name: 'addCard'})">
                    <span class="icon add-btn"></span>
                    <span class="ml-5">添加银行卡</span>
                </li>
            </ul>
        </div>
        <div class="money-num mt-15">
            <div>提现金额</div>
            <div class="mt-5">
                <el-form ref="form" :model="form">
                    <el-form-item :rules="[{required: true,message: '该项不能为空'}]" prop="price">
                        <el-input v-model="form.price" type="number" placeholder="提现金额不得小于100"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tip mt-5">提现手续费<span v-text="serviceFee"></span>%</div>
        </div>
        <div class="mt-60 mb-30">
            <a class="commit-btn pointer" @click="withdrawCommit">提现</a>
        </div>
    </div>
</template>

<script>
    import {myAccountApi, utilsApi, commonApi} from '../../../api'

    export default {
        name: "withdraw",
        data() {
            return {
                dataList: [],
                bankId: null,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                form: {},
                serviceFee: 0
            }
        },
        mounted() {
            this.getList()
            this.getServiceFee()
        },
        methods: {
            getServiceFee() {
                commonApi.serverConf({type: 1}).then(resp => {
                    if (resp.status === 1) {
                        this.serviceFee = resp.data.service * 100
                    }
                })
            },
            getList() {
                myAccountApi.myBankList({
                    uid: this.userInfo.uid
                }).then(resp => {
                    if (resp.status === 1) {
                        this.dataList = resp.data
                        this.dataList.forEach(item => {
                            item.icon = utilsApi.api + item.icon
                            item.lastNoInfo = `尾号${item.bank_num.substring(item.bank_num.length - 4, item.bank_num.length)} 储蓄卡`
                        })
                    }
                })
            },
            withdrawCommit() {
                let _this = this
                this.$refs['form'].validate(flag => {
                    if (!this.bankId) {
                        this.$message({
                            message: '请选择银行',
                            type: 'error'
                        })
                        return
                    }
                    if (flag) {
                        myAccountApi.withdraw({
                            uid: this.userInfo.uid,
                            user_bank_id: this.bankId,
                            price: this.form.price,
                        }).then(resp => {
                            if (resp.status === 1) {
                                this.$message({
                                    message: '提现成功，即将跳转',
                                    type: 'success',
                                    onClose() {
                                        _this.$router.push({name: 'accountInfo'})
                                    },
                                })
                            } else {
                                this.$message({
                                    message: resp.msg,
                                    type: 'error'
                                })
                            }
                        })
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .withdraw {
        @include borderBox();
        padding: 0 10px 10px;
        .card-list {
            width: 400px;

            ul {
                border: 1px solid #eee;
                border-radius: 10px;
                li {
                    padding: 10px;

                    & + li {
                        border-top: 1px solid #eee;
                    }
                    label {
                        .icon {
                            @include size (16px);
                        }
                        .bank-logo {
                            @include size(50px);
                            background-color: #ccc;
                            @include imgCover();
                        }
                        .card-type {
                            color: #999;
                        }
                    }

                    &.add-card {
                        text-align: center;
                        color: #999;

                        .icon {
                            display: inline-block;
                            vertical-align: bottom;
                            border: 1px solid #666;
                            border-radius: 20px;
                            @include size(16px);
                            background-size: 60%;
                        }
                    }
                }
            }
        }
        .money-num {
            width: 400px;
            .tip {
                color: #999;
            }
        }
        .commit-btn {
            display: block;
            color: #fff;
            background-color: $fontColorRed;
            border-radius: 10px;
            width: 160px;
            line-height: 40px;
            text-align: center;
            margin-left: 125px;
            font-size: 14px;
        }
    }
</style>
