<template>
    <div class="exampage">
        <!--导航-->
        <navigation class="mt-20"></navigation>
        <follow-box :id="this.$route.query.address_id"></follow-box>
        <div class="follow-nav clear mt-20">
            <router-link class="left" :to="{path: 'examNote', query: { address_id: this.$route.query.address_id}}">规则须知</router-link>
            <router-link class="left" :to="{path: 'examinfor', query: { address_id: this.$route.query.address_id}}">完善信息</router-link>
            <router-link class="left" :to="{path: 'examStudy', query: { address_id: this.$route.query.address_id}}">课程学习</router-link>
            <router-link class="left" :to="{path: 'examCertificate', query: { address_id: this.$route.query.address_id}}">生成证书</router-link>
            <!-- <router-link class="left" :to="{path: 'examEntrance', query: { address_id: this.$route.query.address_id || '179'}}">考试</router-link> -->
        </div>

        <div class="examInp">
            <div class="examInp-tips"><div class="icon examInfor"></div>
                <span v-if="subOn">以下信息请如实填写，一旦提交无法修改</span>
                <span v-else>信息已提交，当前无法修改</span>
            </div>
            <el-form :disabled="!subOn" :model="ruleForm" :rules="rules" :inline="true" label-width="100px" class="examInp-form" ref="ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入您的姓名" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select placeholder="请选择您的性别" v-model="ruleForm.sex">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                        <el-option label="保密" value="保密"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号" prop="card">
                    <el-input v-model="ruleForm.card" placeholder="请输入您的身份证号" :maxlength="18" @blur="validate()"></el-input>
                </el-form-item>
                <el-form-item label="职务" prop="job">
                    <el-input v-model="ruleForm.job" placeholder="请选择您的职务"></el-input>
                </el-form-item>
                <el-form-item label="职称" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="请选择您的职称"></el-input>
                </el-form-item>
                <el-form-item label="出生年月" prop="birthday">
                    <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="请选择您的出生年月"></el-date-picker>
                </el-form-item>
                <el-form-item label="工作单位" prop="unit">
                    <el-input v-model="ruleForm.unit" placeholder="请输入您的工作单位"></el-input>
                </el-form-item>
                <el-form-item label="学历" prop="xueli">
                    <el-select placeholder="请选择您的学历" v-model="ruleForm.xueli">
                        <el-option label="博士" value="博士"></el-option>
                        <el-option label="硕士" value="硕士"></el-option>
                        <el-option label="本科" value="本科"></el-option>
                        <el-option label="大专" value="大专"></el-option>
                        <el-option label="高中及以下" value="高中及以下"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地区" prop="province">
                    <el-select placeholder="请选择所在省份" style="width:200px" v-model="provinces">
                        <el-option v-for="item in provinceList" :key="item.code" :label="item.name"
                                    :value="item.name"></el-option>
                    </el-select>
                    <el-select placeholder="请选择所在城市" style="width:200px;margin-left: 5px" v-model="city">
                        <el-option v-for="item in cityList" :label="item.name" :key="item.code"
                                    :value="item.name"></el-option>
                    </el-select>
                    <el-select placeholder="请选择所在地区" style="width:200px;margin-left: 5px" v-model="areas">
                        <el-option v-for="item in countyList" :label="item.name" :key="item.code"
                                    :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="display:block;margin:0 auto;width:270px;">
                    <el-button type="primary" :disabled="dsab" @click="submit('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
import {Navigation,followBox} from '../../components/public'
import address from "../../assets/json/pca-code.json";
import {examApi} from '../../api'
export default {
    name: "examInfor",
    components: {Navigation,followBox},
    data(){
        return{
            dsab: false,
            subOn:true,
            userInfo: this.$helper.utils.storage.get('userInfo') || {},
            //三级联动
            provinceList: [],
            cityList: [],
            countyList: [],
            provinces: '',
            city: '',
            areas: '',
            //表单
            ruleForm: {
                name: '',
                sex: '',
                card: '',
                unit: '',
                title: '',
                birthday: '',
                province: "",
                job: '',
                xueli: '',
                city: '',
                areas: ''
            },
            rules: {
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur'},
                ],
                card: [
                    {required: true, message: '请输入身份证号', trigger: 'blur'},
                    {pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号'}
                ],
                unit: [
                    {required: true, message: '请输入工作单位', trigger: 'blur'},
                ],
                title: [
                    {required: true, message: '请选择职称', trigger: 'blur'},
                ],
                birthday: [
                    {required: true, message: '请选择出生日期', trigger: 'blur'},
                ],
                province: [
                    {required: true, message: '请选择所在城市', trigger: 'blur'},
                ],
                job: [
                    {required: true, message: '请输入职务', trigger: 'blur'},
                ],
                xueli: [
                    {required: true, message: '请选择学历', trigger: 'blur'},
                ],
            },
        }
    },
    mounted(){
        //获取联动address
        this.provinceList = address;
        this.addForm();
    },
    //3级联动
    watch: {
        provinces(v1, v2) {
            if (v1 !== v2) {
                for (let item of this.provinceList) {
                    if (item.name === v1) {
                        this.ruleForm.province = item.name
                        this.cityList = item.children
                        // this.city = this.cityList[0].name
                        // this.ruleForm.city = this.cityList[0].name
                        this.$refs['ruleForm'].validate()
                        break
                    }
                }
            }
        },
        city(v1, v2) {
            if (v1 !== v2) {
                for (let item of this.cityList) {
                    if (item.name === v1) {
                        this.countyList = item.children
                        // this.areas = this.countyList[0].name
                        // this.ruleForm.areas = this.countyList[0].name
                        break
                    }
                }
            }
        }
    },
    methods: {
        addForm() {
            examApi.getForm({
                uid: this.userInfo.uid,
            }).then(resp => {
                if (resp.status === 1) {
                    let data = resp.data;
                    this.ruleForm.name = data.name;
                    this.ruleForm.card = data.card;
                    this.ruleForm.birthday = new Date((data.birthday) * 1000);
                    this.ruleForm.job = data.job;
                    this.provinces = data.province;
                    this.city = data.city;
                    this.areas = data.area;
                    this.ruleForm.sex = data.sex;
                    this.ruleForm.title = data.title;
                    this.ruleForm.unit = data.unit;
                    this.ruleForm.xueli = data.xueli;
                    this.subOn = false;
                } else {
                    this.$message({
                        message: resp['msg'],
                        type: 'error'
                    });
                }
            });
        },
        validate(){//验证身份证信息
            examApi.validate({
                name: this.ruleForm.name,
                card: this.ruleForm.card,
                address_id: this.$route.query.address_id
            }).then(resp => {
                if (resp.status === 1) {
                    this.dsab = false;
                } else {
                    this.dsab = true;
                    this.$message({
                        message: resp['msg'],
                        type: 'error'
                    });
                }
            });
        },
        submit(formName){
            let birthday = Math.round(new Date(this.ruleForm.birthday) / 1000);
            let obj = {
                uid:this.userInfo.uid,
                name:this.ruleForm.name,
                sex:this.ruleForm.sex,
                card:this.ruleForm.card,
                title:this.ruleForm.title,
                job:this.ruleForm.job,
                birthday:birthday,
                province:this.ruleForm.province,
                unit:this.ruleForm.unit,
                xueli:this.ruleForm.xueli,
                city: this.city,
                area: this.areas,
                address_id: this.$route.query.address_id
            };

            this.$refs[formName].validate(valid => {
                if (valid) {
                    examApi.setForm(obj).then(resp => {
                        if (resp.status === 1) {
                            this.subOn = false;
                            this.$message.success("提交成功");
                        } else {
                            this.$message({
                                message: resp['msg'],
                                type: 'error'
                            });
                        }
                    });

                } else {
                    this.$message.error("请输入完整的表单");
                    return false;
                }
            });
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
    .examInp{
        padding: 40px 160px 0;
        width: 1200px;
        height: 540px;
        background: url(../../assets/image/exam-infor-bg.png) no-repeat center;
        box-sizing: border-box;
        .examInp-tips{
            display: block;
            height: 18px;
            text-align: center;
            color: #1687EF;
            font-size: 18px;
            margin-bottom: 50px;
            text-align: center;
            .examInfor {
                @include size (18px, 18px);
                vertical-align: middle;
                margin-right: 8px;
                margin-top: -2px;
            }
        }
        .examInp-form{
            .el-input,.el-select,.el-date-editor,.el-button {
                width: 270px;
            }
        }

    }

</style>

