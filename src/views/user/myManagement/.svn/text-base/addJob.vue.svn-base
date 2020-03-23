<template>
    <div class="myresume_addjob">
        <div class="myresume_title">发布职位</div>
        <!--基本信息-->
        <div class="clear">
            <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                <el-form-item  label="职位logo" prop="logo">
                    <uploadImg style="width: 80px" ref="cardpositive" @ImagesValidate="ImagesValidate"></uploadImg>
                </el-form-item>
                <div class="clear border">
                    <div style="width: 49%;float: left">
                        <el-form-item label="职位名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入您的职位名称"></el-input>
                        </el-form-item>
                        <el-form-item label="工作经验" prop="work_experience">
                            <el-select  placeholder="请选择" v-model="ruleForm.work_experience">
                                <el-option v-for="item in allwork"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="工作性质" prop="work_nature">
                            <el-select  placeholder="请选择" v-model="ruleForm.work_nature">
                                <el-option v-for="item in typework"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属部门" prop="department">
                            <el-input v-model="ruleForm.department" placeholder="请输入您的所属部门"></el-input>
                        </el-form-item>
                        <el-form-item label="所属地址" prop="address" >
                            <el-input v-model="ruleForm.address" placeholder="请输入您的所属地址"></el-input>
                        </el-form-item>
                    </div>
                    <div style="width:51%;float: left">
                        <el-form-item label="职位类别" prop="position_type">
                            <el-select  placeholder="请选择" v-model="ruleForm.position_type">
                                <el-option v-for="item in category"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学历"  prop="education">
                            <el-select  placeholder="请选择"  v-model="ruleForm.education">
                                <el-option v-for="item in alleducation"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="月薪"  prop="salary_money">
                            <el-select  placeholder="请选择" v-model="ruleForm.salary_money">
                                <el-option v-for="item in salary"
                                           :key="item.id"
                                           :label="item.label"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在城市:" prop="province">
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
                    </div>
                </div>
                <div class="clear border">
                    <p class="title">职位标签</p>
                    <el-form-item label="职位标签:" prop="category_id">
                        <div class="user_box">
                            <span class="icon_box pointer"  v-for="(item,index) in tags" :key="item.id" @click="chooseTage(item,index)" :class="{active:status==item.status}">{{item.name}}</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="clear border" >
                    <p class="title">职位描述</p>
                    <el-form-item label="职位描述:" prop="describes">
                        <el-input type="textarea" placeholder="请输入" v-model="ruleForm.describes" ></el-input>
                    </el-form-item>
                </div>
                <div class="btn_box" >
                    <button type="primary" @click="submitForm('ruleForm')" class="pointer">发布职位</button>
                </div>
            </el-form>
        </div>
        <!--工作经历-->

    </div>

</template>

<script>
    import address from "@/assets/json/pca-code.json";
    import {goodsApi as api,resumeApi} from '../../../api';
    import {uploadImg} from '../../../components/public'
    export default {
        name: "addJob",
        components:{uploadImg},
        data(){
            return{
                userInfo:this.$helper.utils.storage.get('userInfo'),
                //三级联动
                provinces: "",
                city: "",
                areas:"",
                provinceList: [],
                cityList: [],
                countyList: [],
                area_id:"",
                city_id:"",
                province_id:"",
                salary: [
                    { id: "0,3", label: "0k-3K", checked: false ,value:"0,3" },
                    { id: "3,5", label: "3k-5K", checked: false,value:"3,5"},
                    { id: "5,10", label: "5k-10K", checked: false,value:"5,10" },
                    { id: "10,15", label: "10k-15K", checked: false ,value:"10,15"},
                    { id: "15,20", label: "15k-20K", checked: false ,value:"15,20"},
                    { id: "20,50", label: "20k-50K", checked: false ,value:"20,50"},
                    { id: "50,100", label: "50k-100K", checked: false,value:"50,100" },
                    { id: "100,99999", label: "100K以上", checked: false ,value:"100,99999"}
                ],
                alleducation:{},//学历
                allwork:{},//工作经验
                typework:{},//工作性质
                category:{},//职位类别
                tags:{},
                status:1,
                index:"",
                addressList:[],
                ruleForm: {
                    logo:"",
                    name:"",//职位名称
                    position_type:"",//职位类型id (必填
                    department:"",//所属部门 (必填）
                    work_experience:"",//工作经验id (必填
                    education:"",//学历要求 (必填
                    work_nature:"",//工作性质
                    salary_min:"",
                    salary_max:"",
                    describes:"",//职位描述 (必填
                    salary_money:"",
                    category_id:[],
                    province:""

                },
                rules: {
                    name: [
                        { required: true, message: '请输入职位名称', trigger: 'blur' },
                        { min:1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                    ],
                    position_type: [
                        { required: true, message: '请选择职位类别', trigger: 'change' }
                    ],
                    department: [
                        { required: true, message: '请输入所属部门 ', trigger: 'blur' }
                    ],
                    work_experience: [
                        {  required: true, message: '请选择工作经验', trigger: 'change' }
                    ],
                    education: [
                        {  required: true, message: '请选择学历', trigger: 'change' }
                    ],
                    work_nature: [
                        { required: true, message: '请选择工作性质', trigger: 'change' }
                    ],
                    salary_money: [
                        { required: true, message: '请选择月薪', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '请输入所属地址', trigger: 'blur' }
                    ],
                    category_id: [
                        { required: true, message: '请选择职位标签', trigger: 'change' }
                    ],
                    describes: [
                        { required: true, message: '请输入职位描述', trigger: 'blur' }
                    ],
                    logo: [
                        { required: true, message: '请选择职位logo', trigger: 'blur' }
                    ],
                    province: [
                        { required: true, message: '请选择所在城市', trigger: 'change' }
                    ],
                }
            }
        },
        //3级联动
        created(){
            this.geteducation(1)
            this.geteducation(2)
            this.geteducation(3)
            this.getcategory()
            this.getDic()
        },
        watch: {
            provinces(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.provinceList) {
                        if (item.name === v1) {
                            this.cityList = item.children
                            this.city = this.cityList[0].name
                            this.province_id = this.provinceList[0].code
                            this.city_id = this.cityList[0].code
                            this.ruleForm.province = item.name
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
                            this.areas = this.countyList[0].name
                            this.area_id = this.countyList[0].code
                            break
                        }
                    }
                }
            }
        },
        methods:{
            ImagesValidate(img){
                this.ruleForm.logo=img[0]
                this.$refs['ruleForm'].validate()
            },
            geteducation(status){
                let type={type:status}
                resumeApi.getrecruidictionary(type).then((res) => {
                    if(res.status==1){
                        switch (status) {
                            case 1:
                                this.allwork=res.data  //工作经验
                                break;
                            case 2:
                                this.alleducation=res.data //学历
                                break;
                            case 3:
                                this.typework=res.data //工作性质
                                break;
                        }

                    }
                    console.log(res)
                })
            },
            getcategory(){
                resumeApi.positiontype().then((res) => {
                    if(res.status==1){
                        this.category=res.data //职位类别
                    }
                    console.log(res)
                })
            },
            chooseTage(item,index){
                if(item.status==0){
                    item.status=1
                    this.$set(this.tags,index,item)
                    this.ruleForm.category_id.push(item.id)
                    this.$refs['ruleForm'].validate()
                }else {
                    item.status=0
                    this.$set(this.tags,index,item)
                    this.ruleForm.category_id.splice(index,1)
                    this.$refs['ruleForm'].validate()
                }
                console.log(this.category_id)

            },
            getAddressList() {
                const logintoken = this.$helper.utils.storage.get('userInfo').logintoken
                api.getAddressList({logintoken}).then((res) => {
                    if(res.status==1)
                        this.addressList = res.data.data
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var param={
                            logo:this.$refs.cardpositive.images.toString(),
                            name:this.ruleForm.name,
                            position_type:this.ruleForm.position_type,
                            department:this.ruleForm.department,
                            category_id:this.ruleForm.category_id,
                            work_experience:this.ruleForm.work_experience,
                            education:this.ruleForm.education,
                            work_nature:this.ruleForm.work_nature,
                            salary_min:this.ruleForm.salary_money.split(",")[0],
                            salary_max:this.ruleForm.salary_money.split(",")[1],
                            province_id:this.province_id,
                            city_id:this.city_id,
                            area_id:this.area_id,
                            address:this.ruleForm.address,
                            describes:this.ruleForm.describes,
                        }
                        resumeApi.create_enterprise_recruit(param).then((res) => {
                            if(res.status==1){
                                this.$router.push({name: 'tasksuccess'})
                            }else {
                                this.$message.error(res.msg)
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getDic() {
                resumeApi.course_tag().then((res) => {
                    if(res.status==1){
                        this.tags = res.data.data;
                        for (var i=0;i<this.tags.length;i++) {
                            this.tags[i].status=0
                        }
                        console.log(this.tags)
                    }
                })
            },
        },
        mounted() {
            //获取地址
            this.getAddressList()
            //获取联动address
            this.provinceList = address
            this.province = this.provinceList[0].code
        },
    }
</script>

<style  lang="scss">
    .myresume_addjob{
        .file-group .file-wrapper{
            height: 80px!important;
        }
        .el-textarea__inner{
            height: 80px!important;
        }
        .myresume_title{
            font-size: 20px;
            margin-bottom: 20px;
        }
        .user_box{
            padding: 10px 0;
            .icon_box{
                padding: 0 20px;
                border-radius: 6px;
                color: #333;
                background-color: #f3f3f3;
                display: inline-block;
                margin-left: 10px;
                margin-bottom: 10px;
            }
            .icon_box.active{
                padding: 0 20px;
                border-radius: 6px;
                color: white;
                background-color: #303f9f;
                display: inline-block;
            }
            img{
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background-color: #999999;
                float: left;

            }
            .name_box{
                float: left;
                font-size: 15px;
                margin-left: 20px;
                p{
                    margin:5px 0;
                }
                p:last-child{
                    color: #999999;
                }
            }
        }
        .border{
            border-bottom: 1px solid #EEEEEE;
            margin: 10px 0;
        };
        .btn_box {
            text-align: center;
        }button {
             background-color: #F44336;
             margin-right: 30px;
             padding: 10px 65px;
            border: none;
            border-radius:6px;
            color: white;
         }
        padding: 20px;
        .title{
            padding-left: 20px;
            border-left: 3px solid #F44336;
            font-size: 16px;

        }
        .add_list{
            text-align: center;
            font-size: 15px;
            width: 200px;
            margin:0 auto 20px auto;
            img{
                width: 30px;
                height: 30px;
                position: relative;
                top:9px;
                margin-right:8px;
            }
        }
        .add_list:hover{
            cursor: pointer;
        }
    }
</style>
