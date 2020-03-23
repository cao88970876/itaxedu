<template>
    <div class="putQuestions_page page-content">
        <!--导航-->
        <div class="nav">
            <navigation></navigation>
        </div>
        <div class="answerDetails_breadcrumb">
            <div class="gouBack">
                <span @click="gou">财税问答</span><span><</span> <span>快速提问</span>
            </div>
            <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
            <!--<el-breadcrumb-item :to="{ path: '/answer/answerList' }">财税问答</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>快速提问</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
        </div>
        <div class="putQuestions_mains">
            <div class="putQuestions_title">
                问题类型
            </div>
            <el-form class="release_inp" ref="ruleForm" :rules="rules" :model="ruleForm" @submit.native.prevent>
                <div class="inp">
                    <el-form-item prop="answerSelect">
                        <el-select v-model="ruleForm.answerSelect" placeholder="请选择问题类型">
                            <el-option v-for="(item,index) in answerType"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="questions">
                    问题详情
                </div>
                <div class="questions_inp">
                    <el-form-item prop="dese">
                        <el-input type="textarea" class="textarea" @input="descInput" maxlength="999"
                                  v-model="ruleForm.dese"
                                  placeholder="请告知咨询问题的详细内容" resize="none">
                        </el-input>
                        <div class="fontNum">{{textlength}}/1000</div>
                    </el-form-item>
                </div>
                <div class="questions_img clear">
                    <div class="title">问题截图</div>
                    <div class="upload clear">
                        <Uploads ref="Expertcard"></Uploads>
                    </div>
                </div>
                <div class="pay">
                    支付：<span v-text="price.money" class="money">100</span>
                </div>
                <div class="explain">
                    你将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请斟酌确认。
                </div>
                <div class="argeemen">
                    <el-checkbox v-model="checked" class="check"></el-checkbox>
                    已经阅读并同意
                    <span @click="show()">《提问须知》</span>
                </div>
                <div class="release">
                    <button class="btn" @click="release('ruleForm')">发布</button>
                </div>
            </el-form>
        </div>
        <!--弹出框-->
        <div class="popup" v-show="popup_show">
            <div class="popup_mains">
                <div class="popup_title">
                    提问须知 <span @click="hidden()"><img src="../../assets/image/ic_73.png" alt=""></span>
                </div>
                <div class="text">
                    <div v-html="answerNeed.content">
                    </div>
                </div>
                <div class="agree">
                    <button @click="agree()">阅读并同意</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import navigation from '../../components/public/navigation'
    import api from '@/api/answerApi'
    import {myTaskApi} from '../../api'
    import utils from '../../assets/js/utils'
    import {Uploads} from '../../components/public'

    export default {
        name: "put-questions",
        components: {
            navigation,
            Uploads,
        },

        data() {
            return {
                price: {},
                textlength: 0,
                //下拉框
                region: '',
                //阅读
                checked: false,
                form: {},
                //弹出层
                popup_show: false,
                answerNeed: {},
                //问题类型
                answerType: [],
                ruleForm: {
                    answerSelect: '',
                    dese: ''
                },
                rules: {
                    answerSelect: [{required: true, message: '请选择分类', trigger: 'change'},],
                    dese: [{required: true, message: '请输入详细内容', trigger: 'blur'},],
                }

            }
        },
        methods: {
            //获取输出框的字数
            descInput() {
                this.textlength = this.ruleForm.dese.length;
            },

            show() {
                this.popup_show = true
            },
            hidden() {
                this.popup_show = false
            },
            agree() {
                this.popup_show = false
                this.checked = true
            },
            gou() {
                this.$router.back(-1)
            },
            //提交
            release(formName) {
                if (this.checked === true) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            //
                            //console.log(this.ruleForm.answerSelect)
                            //已经能拿到ID 差丢到支付页面 支付
                            const params = {
                                answerSelect: this.ruleForm.answerSelect,
                                dese: this.ruleForm.dese,
                                answerImg: JSON.stringify(this.$refs.Expertcard.images),
                            }
                            console.log(params)
                            this.$router.push({
                                name: 'fastPaySee',
                                query: {params: encodeURIComponent(JSON.stringify(params))}
                            })
                            console.log(params)
                        } else {
                            this.$message.error("请输入完整信息在提交")
                            return false;
                        }
                    });
                } else {
                    this.$message.error("请认真阅读提问须知");
                }

            },
        },
        mounted() {
            api.expertTypeList().then((res) => {
                this.answerType = res.data
                //console.log("分类", res.data.data)
            });
            api.answerNeed().then((res) => {
                this.answerNeed = res.data
            });
            api.PaySee({
                type: 1,
            }).then((res) => {
                console.log(res.data)
                this.price = res.data
            })
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .putQuestions_page {
        .nav {
            padding-bottom: 20px;
            border-bottom: 2px solid #f1f1f1;
            margin-bottom: 20px;
        }
        .answerDetails_breadcrumb {
            .gouBack {
                span {
                    margin-right: 15px;
                    font-size: 14px;
                }
                span:nth-child(1) {
                    font-weight: bold;
                }
            }
        }
        .putQuestions_mains {
            margin-top: 25px;
            .inp {
                margin: 15px 0;
            }
            .questions_inp {
                margin-top: 15px;
                textarea {
                    width: 100%;
                    height: 300px;
                    background: #f1f1f1;
                }
                .fontNum {
                    color: #999999;
                    margin-top: 5px;
                    text-align: right;
                }
            }
            .questions_img {
                border-bottom: 1px solid #f1f1f1;
                padding-bottom: 10px;
                .upload {
                    margin-top: 10px;
                }
            }
            .pay {
                margin-top: 10px;
                font-weight: bold;
                font-size: 16px;
                padding-bottom: 10px;
                border-bottom: 1px solid #f1f1f1;
                span {
                    color: #f44336;
                }
            }
            .explain {
                margin: 10px 0;
                color: #999999;
            }
            .argeemen {
                .check {
                    margin-right: 10px;
                }
                span {
                    color: #409EFF;
                }
            }
            .release {
                margin-top: 20px;
                text-align: center;
                .btn {
                    border: 0;
                    border-radius: 4px;
                    width: 150px;
                    height: 40px;
                    outline: none;
                    background: #f44336;
                    color: #fff;
                    font-size: 16px;
                }
            }
        }
        .popup {
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            opacity: 1;
            background: rgba(0, 0, 0, 0.5);
            .popup_mains {
                width: 1200px;
                margin: 30px auto;
                background: #fff;
                z-index: 200;
                border-radius: 6px;
                padding: 20px 0;
                position: relative;
                .popup_title {
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #f1f1f1;
                    margin-bottom: 15px;
                    span {
                        width: 30px;
                        height: 30px;
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        img {
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
                .text {
                    padding: 0 40px;
                    margin-bottom: 15px;
                    div {
                        p {
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
                .show {
                    width: 100%;
                    height: 400px;
                    background: #999999;
                }
                .agree {
                    text-align: center;
                    button {
                        border: 0;
                        border-radius: 4px;
                        width: 150px;
                        height: 40px;
                        outline: none;
                        background: #f44336;
                        color: #fff;
                        font-size: 16px;
                    }
                }
            }
        }
    }

</style>
