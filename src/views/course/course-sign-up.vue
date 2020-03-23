<template>
    <div class="course-sign-up">
        <div class="signUp">
            <div class="signUp_title">
                在线报名
            </div>
            <div class="signUp_inp">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
                    <el-form-item label="名字" prop="name" :rules="$rules.name" style="width: 400px">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="phone" :rules="$rules.phone" style="width: 400px">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" :rules="$rules.email" style="width: 400px">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="公司" prop="company" :rules="$rules.company" style="width: 400px">
                        <el-input v-model="ruleForm.company"></el-input>
                    </el-form-item>
                    <el-form-item label="职务" prop="position" :rules="$rules.position" style="width: 400px">
                        <el-input v-model="ruleForm.position"></el-input>
                    </el-form-item>
                    <el-form-item label="所在城市" prop="province" :rules="$rules.province">
                        <el-select placeholder="省" style="width:133px" v-model="provinces">
                            <el-option v-for="item in provinceList" :key="item.code" :label="item.name"
                                       :value="item.name"></el-option>
                        </el-select>
                        <el-select placeholder="市" style="width:133px;margin-left: 5px" v-model="city">
                            <el-option v-for="item in cityList" :label="item.name" :key="item.code"
                                       :value="item.name"></el-option>
                        </el-select>
                        <el-select placeholder="县" style="width:133px;margin-left: 5px" v-model="areas">
                            <el-option v-for="item in countyList" :label="item.name" :key="item.code"
                                       :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="signUp_btn">
                    <el-button class="btn" @click="signUp('ruleForm')">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import address from "../../assets/json/pca-code.json"
    import {contentApi} from "../../api"

    export default {
        name: "course-sign-up",
        data() {
            return {
                ruleForm: {
                    name: '',
                    phone: '',
                    email: '',
                    company: '',
                    position: '',
                    province: '',
                },
                //三级联动
                provinces: '',
                city: '',
                areas: '',
                provinceList: [],
                cityList: [],
                countyList: [],
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                courseId: this.$route.params.courseId,
                buy: this.$route.query.buy,
                free: this.$route.query.free,
            }
        },
        mounted() {
            //获取联动address
            this.provinceList = address
            this.province = this.provinceList[0].code
        },
        watch: {
            provinces(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.provinceList) {
                        if (item.name === v1) {
                            this.ruleForm.province = v1
                            this.$refs['ruleForm'].validate()
                            this.cityList = item.children
                            this.city = this.cityList[0].name
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
                            this.areas = this.countyList[0].name
                            break
                        }
                    }
                }
            }
        },
        methods: {
            signUp(formName) {
                const _this = this
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        contentApi.courseJoin({
                            uid: _this.userInfo.uid,
                            course_id: _this.courseId,
                            type: 2,
                            name: _this.ruleForm.name,
                            phone: _this.ruleForm.phone,
                            email: _this.ruleForm.email,
                            company: _this.ruleForm.company,
                            position: _this.ruleForm.position,
                            city: _this.provinces + _this.city + _this.areas,
                        }).then((resp) => {
                            if (resp.status === 1) {
                                let routerName = _this.buy ? 'coursePay' : 'downlineCourseDetail'
                                let params = _this.buy ? {courseId: _this.courseId} : {
                                    courseId: _this.courseId,
                                    tabId: 0
                                }
                                if (_this.free) {
                                    routerName = 'downlineCourseDetail'
                                    params = {
                                        courseId: _this.courseId,
                                        tabId: 0
                                    }
                                    contentApi.freePay({
                                        uid: _this.userInfo.uid,
                                        type: 1,
                                        content_id: _this.courseId,
                                    }).then(resp2 => {
                                        if (resp2.status === 1) {
                                            _this.$message({
                                                message: '购买成功，即将跳转',
                                                type: 'success',
                                                onClose() {
                                                    _this.$router.push({name: routerName, params})
                                                },
                                            })
                                        } else {
                                            _this.$message.error(resp2.msg)
                                        }
                                    })
                                } else {
                                    _this.$message({
                                        message: '报名成功，即将跳转',
                                        type: 'success',
                                        onClose() {
                                            _this.$router.push({name: routerName, params})
                                        },
                                    })
                                }
                            } else {
                                _this.$message.error(resp.msg)
                            }
                        })
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .course-sign-up {
        .nav {
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 20px;
        }
        .signUp {
            width: 520px;
            height: 500px;
            margin: 20px auto;
            .signUp_title {
                font-size: 16px;
                font-weight: bold;
                margin: 20px 0;
            }
            .signUp_inp {

            }
            .signUp_btn {
                text-align: center;
                .btn {
                    width: 150px;
                    height: 40px;
                    color: #fff;
                    background: #f44336;
                }
            }
        }
    }
</style>
