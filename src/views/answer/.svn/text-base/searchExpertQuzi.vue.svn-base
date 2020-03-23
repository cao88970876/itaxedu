<template>
    <div class="immediately_page page-content">
        <div class="nav">
            <navigation></navigation>
        </div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/answer/answerList' }">财税问答</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/answer/searchExpert'}"> 找专家</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/answer/expertDetails'}">专家详情</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/answer/immediately'}">专家详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="check_open">
            <div class="title">公开提问</div>
            <div class="check">
                <label>
                    <input type="radio" :value="1" v-model="isPublic"/>
                    <i class="icon radio-no-checked" :class="{'radio-checked':isPublic===1}"></i>是
                </label>
                <label>
                    <input type="radio" :value="0" v-model="isPublic"/>
                    <i class="icon radio-no-checked" :class="{'radio-checked':isPublic===0}"></i>否
                </label>
            </div>
        </div>

        <div class="questions">
            问题详情
        </div>
        <div class="questions_inp">
            <el-input type="textarea" resize="none" v-model="questionsText" maxlength="999" :autosize="{ minRows: 10, maxRows: 50}"
                      placeholder="请告知咨询问题的详细内容"></el-input>
        </div>
        <div class="questions_img">
            <div class="title">问题截图</div>
            <div class="upload clear">
                <Uploads ref="Expertcard"></Uploads>
            </div>
        </div>
        <div class="argeemen">
            <el-checkbox v-model="checked" class="check"></el-checkbox>
            已经阅读并同意
            <span @click="show()">《提问须知》</span>
        </div>

        <div class="release">
            <button class="btn" @click="release">发布</button>
        </div>
        <!--弹出框-->
        <div class="popup" v-show="popup_show">
            <div class="popup_mains">
                <div class="popup_title">
                    目录 <span @click="hidden()"><img src="../../assets/image/ic_73.png" alt=""></span>
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
    import '../../assets/scss/icon.scss'
    import api from '@/api/answerApi'
    import utils from '../../assets/js/utils';
    import {Uploads} from '../../components/public'

    export default {
        name: "searchExpertQuzi",
        components: {
            navigation,
            Uploads,
        },
        data() {
            return {
                isPublic: 1,
                dialogImageUrl: '',
                dialogVisible: false,
                checked: false,
                //弹出层
                popup_show: false,
                answerNeed: {},
                questionsText: '',
                uid: '',
                price: '',
            }
        },
        methods: {
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
            //发布
            release() {
                const params = {
                    price: this.price,
                    is_open: this.isPublic,
                    contents: this.questionsText,
                    expert_uid: this.uid,
                    img_data: JSON.stringify(this.$refs.Expertcard.images),
                }
                console.log(params)
                if (this.checked === true) {
                    if (this.questionsText !== '') {
                        console.log(params)
                        this.$router.push({
                            name: 'searchExpertPay',
                            query: {params: encodeURIComponent(JSON.stringify(params))}
                        })
                    } else {
                        this.$message.error("请输入完整的表单");
                    }
                } else {
                    this.$message.error('请认真阅读提问须知')
                }
            }
        },
        mounted() {
            this.uid = this.$route.query.id
            this.price = this.$route.query.price
            api.answerNeed().then((res) => {
                this.answerNeed = res.data
            })
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .immediately_page {
        .nav {
            padding-bottom: 20px;
            border-bottom: 2px solid #f1f1f1;
            margin-bottom: 20px;
        }
        .check_open {
            margin-top: 20px;
            .title {
                font-weight: bold;
            }
            .check {
                margin-top: 20px;
                & > label {
                    margin-right: 30px;
                    cursor: pointer;
                    line-height: 20px;
                    font-size: 14px;

                    & > input[type=radio] {
                        display: none;
                    }
                    .icon {
                        @include size(18px, 17px);
                        vertical-align: bottom;
                        margin-right: 10px;
                        position: relative;
                        top: -1px;
                    }
                }

            }
        }
        .questions {
            margin-top: 20px;
        }
        .questions_inp {
            margin-top: 15px;
            textarea {
                width: 100%;
                height: 300px;
                background: #f1f1f1;
            }
        }
        .questions_img {
            margin-top: 20px;
            border-bottom: 1px solid #f1f1f1;
            padding-bottom: 10px;
            .upload {
                margin-top: 10px;
            }
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
                    p {
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
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
