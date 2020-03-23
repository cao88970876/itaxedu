<template>
    <div class="add-card">
        <ul class="crumbs clear">
            <li class="left">我的账户</li>
            <li class="left">提现</li>
            <li class="left">添加银行卡</li>
        </ul>
        <div class="card-form">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="持卡人姓名" :rules="[{required: true,message: '该项不能为空'}]" prop="name">
                    <el-input v-model="form.name" placeholder="请输入持卡人姓名"></el-input>
                </el-form-item>
                <el-form-item label="卡号" :rules="[{required: true,message: '该项不能为空'}]" prop="bankNum">
                    <el-input v-model="form.bankNum" placeholder="请输入卡号"></el-input>
                </el-form-item>
                <el-form-item label="所属银行" :rules="[{required: true,message: '该项不能为空'}]" prop="bankId">
                    <el-select v-model="form.bankId" placeholder="请选择银行" style="width: 100%;">
                        <el-option v-for="item in dataList" :label="item.name" :key="item.id" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开户行" :rules="[{required: true,message: '该项不能为空'}]" prop="openBank">
                    <el-input v-model="form.openBank" placeholder="请输入开户行"></el-input>
                </el-form-item>
            </el-form>
            <div class="commit mt-60 mb-60">
                <a class="commit-btn pointer" @click="addCard">保存</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {myAccountApi} from '../../../api'

    export default {
        name: "add-card",
        data() {
            return {
                form: {
                    name: '',
                    bankNum: '',
                    bankId: '',
                    openBank: '',
                },
                dataList: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {}
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            addCard() {
                this.$refs['form'].validate((flag, obj) => {
                    if (flag) {
                        myAccountApi.addBank({
                            uid: this.userInfo.uid,
                            name: this.form.name,
                            bank_num: this.form.bankNum,
                            bank_id: this.form.bankId,
                            open_bank: this.form.openBank,
                        }).then(resp => {
                            const _this = this
                            if (resp.status === 1) {
                                this.$message({
                                    message: '保存成功，即将跳转',
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
            },
            getList() {
                myAccountApi.allBankList().then(resp => {
                    if (resp.status === 1) {
                        this.dataList = resp.data
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .add-card {
        @include borderBox();
        padding: 0 10px 10px;

        .card-form {
            width: 400px;
        }
    }
</style>
