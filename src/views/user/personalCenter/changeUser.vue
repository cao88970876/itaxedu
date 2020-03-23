<template>

    <div class="content">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px">
            <el-form-item label="头像" class="name_box" prop="Img">
                <identity-upload :src="form.Img" class="upload" ref="cardpositive"></identity-upload>
            </el-form-item>
            <el-form-item label="姓名" class="name_box" prop="name">
                <el-input v-model="form.name" placeholder="请输入你的姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="form.gender" size="medium">
                    <el-radio border label="男"></el-radio>
                    <el-radio border label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="专家类型" class="birthday_time" prop="value" v-if="user.type==2">
                <el-select placeholder="请选择专家类型" style="width:133px" v-model="form.value">
                    <el-option v-for="item in tmpData" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" class="birthday_time">
                <el-date-picker
                    v-model="form.year"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="所在城市">
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
            <el-form-item label="擅长领域" prop="desc" v-if="user.type===2">
                <el-input type="textarea" v-model="form.desc" property="请输入您擅长的领域"></el-input>
            </el-form-item>
            <el-form-item label="答疑方向" prop="desc" v-if="user.type===2">
                <el-input type="textarea" v-model="form.ques" property="请输入答疑方向"></el-input>
            </el-form-item>
            <el-form-item class="btn_box">
                <el-button type="primary" @click="submitForm()">保存</el-button>
                <el-button @click="clearChange">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {myAccountApi, myuserApi as userchange, goodsApi as api} from '../../../api';
    import {IdentityUpload} from '../../../components/public'
    import moment from 'moment'
    //地址
    import address from "@/assets/json/pca-code.json";

    export default {
        name: "changeUser",
        components: {IdentityUpload},
        data() {
            return {
                tmpData: [],
                user: this.$helper.utils.storage.get('userInfo'),
                form: {
                    Img: this.$helper.utils.storage.get('userInfo').face,
                    name: this.$helper.utils.storage.get('userInfo').nickname,
                    gender:
                        this.$helper.utils.storage.get("userInfo").sex === 1
                            ? "男"
                            : this.$helper.utils.storage.get("userInfo").sex === 2 ? "女" : "未知",
                    year:
                        this.$helper.utils.storage.get("userInfo").birthday === ""
                            ? "1950"
                            : this.$helper.utils.storage.get("userInfo").birthday,
                    // type: [],
                    resource: '',
                    desc: this.$helper.utils.storage.get('userInfo').expertise,
                    ques: this.$helper.utils.storage.get('userInfo').answer,
                    expertData: '',
                    value: this.$helper.utils.storage.get('userInfo').experts_type_id,
                },
                labelPosition: 'right',
                //默认地址
                add: true,
                addresType: true,
                checked: true,
                ck: '',
                //三级联动
                provinces: this.$helper.utils.storage.get("userInfo").city == ""
                    ? ""
                    : this.$helper.utils.storage.get("userInfo").city.split(" ")[0],
                city: this.$helper.utils.storage.get("userInfo").city == ""
                    ? ""
                    : this.$helper.utils.storage.get("userInfo").city.split(" ")[1],
                areas: this.$helper.utils.storage.get("userInfo").city == ""
                    ? ""
                    : this.$helper.utils.storage.get("userInfo").city.split(" ")[2],
                provinceList: [],
                cityList: [],
                addressList:[],
                countyList: [],
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    year: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                },
            }
        },


        //3级联动
        watch: {
            provinces(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.provinceList) {
                        if (item.name === v1) {
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
        created() {
            this.getExpertsType()
            console.log("用户信息", this.user)
        },
        methods: {
            getExpertsType() {
                //  获取专家类型
                userchange.expertsType().then(res => {
                    console.log('专家类型=>', res)
                    if (res.status === 1) {
                        this.tmpData = res.data;
                    }
                })
            },
            getaccountInfo() {
                //  获取用户信息
                myAccountApi.accountInfo({uid: this.user.uid}).then(res => {
                    console.log('用户信息=>', res)
                    if (res.status === 1) {
                        this.$helper.utils.storage.set("userInfo", res.data);
                    }
                })
            },
            submitForm() {
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         debugger
                let _gender = 0;
                if (this.form.gender === "男") {
                    _gender = 1;
                } else {
                    _gender = 2;
                }
                if (this.user.type !== 2) {
                    userchange.edit({
                        uid: this.$helper.utils.storage.get("userInfo").uid,
                        nickname: this.form.name,
                        face: this.$refs.cardpositive.images.toString(),
                        birthday: moment(this.form.year).format('YYYY-MM-DD'),
                        city: this.provinces + " " + this.city + " " + this.areas,
                        sex: _gender,
                    }).then(res => {
                        if (res.status === 1) {
                            this.getaccountInfo()
                            this.$message.success("修改成功")
                            this.$router.push({name: 'userInform'})
                        } else {
                            this.$message.error(res.msg)
                        }
                    });
                } else if (this.user.type === 2) {
                    userchange.editExpert({
                        uid: this.$helper.utils.storage.get("userInfo").uid,
                        nickname: this.form.name,
                        face: this.$refs.cardpositive.images.toString(),
                        experts_type_id: this.form.value,
                        birthday: moment(this.form.year).format('YYYY-MM-DD'),
                        city: this.provinces + " " + this.city + " " + this.areas,
                        sex: _gender,
                        expertise: this.form.desc,
                        answer: this.form.ques
                    }).then((res) => {
                        if (res.status === 1) {
                            this.getaccountInfo()
                            this.$message.success("修改成功")
                            this.$router.push({name: 'userInform'})
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }

            },
            //选中一个的效果
            checkedOne(index) {
                this.check = index;
            },
            //获取地址
            getAddressList() {
                const logintoken = this.$helper.utils.storage.get('userInfo').logintoken
                api.getAddressList({logintoken}).then((res) => {
                    if (res.status == 1)
                        this.addressList = res.data.data
                })
            },
            //取消
            clearChange() {
                this.$router.push({name: 'userInform'})
            }
        },
        mounted() {
            //获取地址
            console.log("个人信息", this.user)
            this.getAddressList()
            //获取联动address
            this.provinceList = address
            this.province = this.provinceList[0].code
        },
    }
</script>

<style scoped lang="scss">
    .content {
        padding: 30px;
        .name_box {
            width: 300px;
        }
        .birthday_time {
            .el-select {
                width: 150px;
            }
        }
        .upload {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 50%;
        }
        .btn_box {
            button {
                padding: 10px 60px;
                &:first-child {
                    background-color: #F44336;
                    border-color: #F44336;
                    margin-right: 30px;
                }
                &:last-child {
                    background-color: #303F9F;
                    border-color: #303F9F;
                    color: white;
                }
            }
        }
    }
</style>
