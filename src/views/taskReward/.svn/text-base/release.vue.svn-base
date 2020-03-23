<template>
    <div class="release_page page-content">
        <!--导航-->
        <div class="nav">
            <navigation></navigation>
        </div>
        <div class="Details_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/task/taskReward' }">任务悬赏</el-breadcrumb-item>
                <el-breadcrumb-item>发布悬赏</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="release_inp" @submit.native.prevent>
            <div class="title">
                任务名称
            </div>
            <div class="title">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入任务名称" style="width: 400px"></el-input>
                </el-form-item>
            </div>
            <div class="title">
                任务分类
            </div>
            <div class="title">
                <el-form-item prop="taskSelect">
                    <el-select v-model="ruleForm.taskSelect" placeholder="请选择问题类型" style="width: 400px">
                        <el-option v-for="(item,index) in taskType"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="title">
                截止时间
            </div>
            <div class="title">
                <el-form-item prop="date">
                    <el-date-picker type="date" placeholder="选择日期"
                                    v-model="ruleForm.date"
                                    style="width: 200px;"
                                    format="yyyy - MM - dd"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="title">
                任务赏金
            </div>
            <div>
                <el-form-item prop="price">
                    <el-input v-model="ruleForm.price" placeholder="请输入任务赏金" style="width: 400px"></el-input>
                </el-form-item>
            </div>
            <div class="title">
                任务地址
            </div>
            <div>
                <el-form-item prop="address">
                    <el-input v-model="ruleForm.address" placeholder="请输入任务地址" style="width: 400px"></el-input>
                </el-form-item>
            </div>
            <div class="title">
                任务介绍
            </div>
            <div>
                <el-form-item prop="dese">
                    <el-input type="textarea" @input="descInput" maxlength="1000" v-model="ruleForm.dese"
                              placeholder="请输入任务介绍" resize="none"
                              :autosize="{ minRows: 10, maxRows: 50}">
                    </el-input>
                    <div class="fontNum">{{textlength}}/1000</div>
                </el-form-item>
            </div>

            <div class="answerBtn">
                <button @click="release('ruleForm')">发布悬赏</button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import navigation from '../../components/public/navigation';
    import api from '@/api/taskRewardApi';

    export default {
        name: "release",
        components: {
            navigation,
        },
        data() {
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                textlength: 0,
                ruleForm: {
                    name: '',
                    date: '',
                    price: '',
                    address: '',
                    taskSelect: '',
                    dese: '',
                },
                //验证
                rules: {
                    name: [
                        {required: true, message: '请输入任务名称', trigger: 'blur'},
                    ],
                    taskSelect: [
                        {required: true, message: '请选择分类', trigger: 'change'},
                    ],
                    date: [
                        {required: true, message: '请选择时间', trigger: 'change'},
                    ],
                    price: [
                        {required: true, message: '请输入金额', trigger: 'blur'},
                        { pattern: /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/,required: true, message: '请输入正确金额', trigger: 'blur' }
                    ],
                    address: [
                        {required: true, message: '请输出地址', trigger: 'blur'},
                    ],
                    dese: [
                        {required: true, message: '请输入详细内容', trigger: 'blur'},
                    ],
                },
                //分类
                taskType: [],
            }
        },
        methods: {
            //获取输出框的字数
            descInput() {
                this.textlength = this.ruleForm.dese.length;
            },
            //发布
            release(formName) {
                //console.log(this.ruleForm.date)
                const params = {
                    name: this.ruleForm.name,
                    classify_id: this.ruleForm.taskSelect,
                    end_time: this.ruleForm.date,
                    money: this.ruleForm.price,
                    address: this.ruleForm.address,
                    notes: this.ruleForm.dese,
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$router.push({
                            name: 'promptlyPay',
                            query: {
                                data: encodeURIComponent(JSON.stringify(params))
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted() {
            //分类
            api.taskclassifyList().then((res) => {
                this.taskType = res.data
                console.log("分类", res.data)
            });
        }


    }
</script>

<style lang="scss">
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .release_page {
        .nav {
            padding-bottom: 20px;
            border-bottom: 1px solid #f1f1f1;
        }
        .Details_breadcrumb {
            margin-top: 20px;
        }
        .release_inp {
            margin-top: 20px;
            .title {
                font-weight: bold;
                font-size: 14px;
                margin-bottom: 5px;
            }
            .fontNum {
                color: #999999;
                margin-top: 5px;
                text-align: right;
            }
        }
        .answerBtn {
            margin-bottom: 60px;
            text-align: center;
            button {
                width: 150px;
                height: 40px;
                border: 1px solid #f44336;
                outline: none;
                background: #f44336;
                color: #fff;
                border-radius: 4px;
                font-weight: bold;
            }
        }
    }

</style>
