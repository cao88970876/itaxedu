<template>
    <div class="authentication_page">
        <div class="title">
            资料认证
        </div>

        <div class="formInp">
            <div class="authentication_type">
                <div @click="type=1" :class="{'active':type===1}">专家</div>
                <div @click="type=2" :class="{'active':type===2}">机构</div>
            </div>
            <div v-show="type===1">
                <el-form :model="userFrom" :rules="rulesFrom" ref="userFrom" label-width="100px" class="demo-ruleForm"
                         @submit.native.prevent>
                    <el-form-item label="姓名" prop="userName" style="width: 400px">
                        <el-input v-model="userFrom.userName" placeholder="请输入您的姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="userIdOne" style="width: 400px">
                        <el-input v-model="userFrom.userIdOne" placeholder="请输入您的证件号"></el-input>
                    </el-form-item>
                    <!--图片-->
                    <div class="uploadID">
                        <div class="idCard">
                            身份证
                        </div>
                        <div class="upload_img clear">
                            <div class="upload_idCard left">
                                <uploadImg style="width: 200px" ref="personaCardpositive"></uploadImg>
                                <p>正面<span>(个人信息)</span></p>
                            </div>
                            <div class="upload_idCard left">
                                <uploadImg style="width: 200px" ref="personaCardback"></uploadImg>
                                <p>反面<span>(国徽面)</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="certificate_box">
                        <div class="certificate_img">
                            <div class="title">专家资格证书</div>
                            <div class="upImg">
                                <Uploads ref="personaExpertcard"></Uploads>
                            </div>
                        </div>
                    </div>
                </el-form>
                <div class="authenticationBtn" @click="personalBtn('userFrom')">
                    提交
                </div>
            </div>
            <div v-show="type===2">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         @submit.native.prevent>
                    <el-form-item label="姓名" prop="name" style="width: 400px">
                        <el-input v-model="ruleForm.name" placeholder="请输入您的姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="userId" style="width: 400px">
                        <el-input v-model="ruleForm.userId" placeholder="请输入您的证件号"></el-input>
                    </el-form-item>
                    <el-form-item label="机构名称" prop="mechanism" style="width: 400px">
                        <el-input v-model="ruleForm.mechanism" placeholder="请输入您的机构名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地址" prop="address" style="width: 400px">
                        <el-input v-model="ruleForm.address" placeholder="请输入机构地址"></el-input>
                    </el-form-item>
                    <el-form-item label="机构职位" prop="userJob" style="width: 400px">
                        <el-input v-model="ruleForm.userJob" placeholder="请输入您的职位"></el-input>
                    </el-form-item>
                    <el-form-item label="公司规模" prop="scale" style="width: 400px">
                        <el-select v-model="ruleForm.scale" placeholder="请选择公司规模" style="width: 300px">
                            <el-option v-for="(item,index) in scaleList"
                                       :label="item"
                                       :key="item.id"
                                       :value="item"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="机构行业" prop="industry" style="width: 400px">
                        <el-select v-model="ruleForm.industry" placeholder="请选择机构行业" style="width: 300px">
                            <el-option v-for="(item,index) in industryList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="融资情况" prop="financing">
                        <el-select v-model="ruleForm.financing" placeholder="请选择活动区域" style="width: 300px">
                            <el-option v-for="(item,index) in financingList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <!--图片-->
                    <div class="uploadID">
                        <div class="idCard">
                            身份证
                        </div>
                        <div class="upload_img clear">
                            <div class="upload_idCard left">
                                <uploadImg style="width: 200px" ref="cardpositive"></uploadImg>
                                <p>正面<span>(个人信息)</span></p>
                            </div>
                            <div class="upload_idCard left">
                                <uploadImg style="width: 200px" ref="cardback"></uploadImg>
                                <p>反面<span>(国徽面)</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="certificate_box">
                        <div class="certificate_img">
                            <div class="title">营业执照</div>
                            <div>
                                <uploadImg ref="business" style="width: 200px"></uploadImg>
                            </div>
                        </div>
                    </div>
                </el-form>
                <div class="authenticationBtn" @click="authenticationBtn('ruleForm')">提交</div>
            </div>


        </div>
    </div>
</template>

<script>
    import {myTaskApi} from '../../../api'//接口是写在 任务悬赏里面的
    import {uploadImg, Uploads} from '../../../components/public'

    export default {
        name: "authentication",
        components: {uploadImg, Uploads},
        mounted() {
            myTaskApi.getFinancing().then((res) => {
                this.financingList = res.data
            });
            myTaskApi.getIndustry().then((res) => {
                this.industryList = res.data
            });
        },
        data() {
            return {
                scaleList: ['1人 — 19人', '20人 — 99人', '100人 — 499人', '500人 — 999人', '1000人及以上'],
                financingList: [],
                industryList: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                type: 1,
                userFrom: {
                    userName: '',
                    userIdOne: '',
                },
                rulesFrom: {
                    userName: [
                        {required: true, message: '请输入名字', trigger: 'blur'}
                    ],
                    userIdOne: [
                        {required: true, message: '请输入身份证号', trigger: 'blur'},
                        {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号'},
                    ]
                },
                ruleForm: {
                    name: '',//名字
                    userId: '',//身份证
                    mechanism: '',//机构
                    address: '',//地址
                    userJob: '',//职位
                    scale: '',//规模
                    industry: '',//行业
                    financing: '',//融资情况
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名字', trigger: 'blur'}
                    ],
                    userId: [
                        {required: true, message: '请输入身份证号', trigger: 'blur'},
                        {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号'}
                    ],
                    mechanism: [
                        {required: true, message: '请输入机构名称', trigger: 'blur'},
                    ],
                    address: [{required: true, message: '请输入你的所在地址', trigger: 'blur'},],
                    userJob: [{required: true, message: '请输入你的职位', trigger: 'blur'},],
                    scale: [{required: true, message: '请输入公司规模', trigger: 'change'},],
                    industry: [{required: true, message: '请选择机构行业', trigger: 'change'}],
                    financing: [{required: true, message: '请选择融资情况', trigger: 'change'}],
                }
            }
        },
        methods: {
            //个人认证
            personalBtn(formName) {
                if (this.$refs.personaCardpositive.images.length > 0 && this.$refs.personaCardback.images.length > 0) {
                    if (this.$refs.personaExpertcard.images.length > 0) {
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                myTaskApi.attestation({
                                    name: this.userFrom.userName,
                                    uid: this.userInfo.uid,
                                    type: 1,
                                    idcard: this.userFrom.userIdOne,
                                    idcard_photo: this.$refs.personaCardpositive.images.toString(),
                                    idcard_photo_v: this.$refs.personaCardback.images.toString(),
                                    certificate: this.$refs.personaExpertcard.images.toString(),
                                }).then((res) => {
                                    console.log(res.data)
                                    if (res.status === 1) {
                                        this.$router.push({name: 'userInform'})
                                    } else {
                                        this.$message.error(res.msg);
                                    }
                                })
                            } else {
                                this.$message.error("请输入正确的信息");
                                return false;
                            }
                        });
                    } else {
                        this.$message.error("请上传资格证书")
                    }
                } else {
                    this.$message.error("请上传证件")
                }
            },


            //公司认证
            authenticationBtn(formName) {

                if (this.$refs.cardpositive.images.length > 0 && this.$refs.cardback.images.length > 0) {
                    if (this.$refs.business.images.length > 0) {
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                myTaskApi.attestation({
                                    name: this.ruleForm.name,
                                    uid: this.userInfo.uid,
                                    type: 2,
                                    idcard: this.ruleForm.userId,
                                    idcard_photo: this.$refs.cardpositive.images.toString(),
                                    idcard_photo_v: this.$refs.cardback.images.toString(),
                                    institution: this.ruleForm.mechanism,
                                    address: this.ruleForm.address,
                                    position: this.ruleForm.userJob,
                                    scale: this.ruleForm.scale,
                                    business_id: this.ruleForm.industry,
                                    financing_id: this.ruleForm.financing,
                                    license: this.$refs.business.images.toString(),
                                }).then((res) => {
                                    console.log(res.data)
                                    if (res.status === 1) {
                                        this.$router.push({name: 'userInform'})
                                    } else {
                                        this.$message.error(res.msg);
                                    }
                                })
                            } else {
                                this.$message.error("请输入正确的信息");
                                return false;
                            }
                        });
                    } else {
                        this.$message.error("请上传营业执照")
                    }
                } else {
                    this.$message.error("请上传证件")
                }

            }
        },

    }
</script>

<style lang="scss" scoped>
    .authentication_page {
        .title {
            padding: 15px 20px;
            font-size: 16px;
            color: #333333;
            font-weight: bold;
        }
        .formInp {
            .authentication_type {
                margin: 15px 0 15px 20px;
                display: flex;
                div {
                    padding: 3px 10px;
                    border: 1px solid #f1f1f1;
                    border-radius: 6px;
                    color: #999999;
                    margin-right: 20px;

                }
                .active {
                    background: #303f9f;
                    color: #ffffff;
                }
            }
            .uploadID {
                height: 200px;
                padding-left: 20px;
                .idCard {
                    font-size: 14px;
                    margin-bottom: 6px;
                }
                .upload_img {
                    padding-bottom: 50px;
                    .upload_idCard {
                        margin-right: 50px;
                        text-align: center;
                        p {
                            span {
                                color: #999999;
                            }
                        }
                    }
                }

            }
            .certificate_box {
                padding: 20px;
                .certificate_img {
                    font-size: 14px;
                    margin-bottom: 6px;
                    .title {
                        margin-bottom: 6px;
                    }
                    .upImg {
                        /*height: 180px;*/
                    }
                }
                .certificate {
                    width: 150px;
                }
            }
        }
        .authenticationBtn {
            margin: 20px;
            width: 120px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            background: #303f9f;
            color: #ffffff;
            border-radius: 4px;
        }
    }
</style>
