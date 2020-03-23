<template>
    <div class="myresume">
        <div class="myresume_title">职位管理</div>
        <!--基本信息-->
        <div class="clear border">
            <el-form  :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                <el-form-item label="职位logo" prop="logo">
                    <div class="file-group">
                        <template>
                            <div  class="file-wrapper" @click="changeImage()">
                                <div class="file">
                                    <img :src="$helper.utils.api + ruleForm.logo">
                                </div>
                            </div>
                        </template>
                        <input type="file" v-if="clear" :accept="accept" @change="fileChange" ref="fileInput" style="display: none;"
                               area-hidden="true">
                    </div>
                </el-form-item>
                <div class="clear">
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
                        <el-form-item label="所属部门"  prop="department">
                            <el-input v-model="ruleForm.department" placeholder="请输入您的所属部门"></el-input>
                        </el-form-item>
                        <el-form-item label="所属地址" prop="address">
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
                        <el-form-item label="学历" prop="education">
                            <el-select  placeholder="请选择"  v-model="ruleForm.education">
                                <el-option v-for="item in alleducation"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="月薪" prop="salary_money">
                            <el-select  placeholder="请选择" v-model="ruleForm.salary_money">
                                <el-option v-for="item in salary"
                                           :key="item.id"
                                           :label="item.label"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在城市:"   prop="province">
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
                    <p class="title">职位发布者</p>
                    <div class="user_box clear">
                        <img :src="$helper.utils.api+userInfo.face"/>
                        <div class="name_box">
                            <p>{{userInfo.nickname}}</p>
                            <p>{{ruleForm.shop.institution}} | {{ruleForm.shop.position}}</p>
                        </div>
                    </div>
                </div>
                <div class="clear border">
                    <p class="title">职位标签</p>
                    <el-form-item label="职位标签:"  prop="category_id" >
                        <div class="user_box">
                            <span class="icon_box pointer"  v-for="(item,index) in tags" :key="item.id" @click="chooseTage(item,index)" :class="{active:status==item.status}">{{item.name}}</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="clear border">
                    <p class="title">职位描述</p>
                    <el-form-item label="职位标签:"  prop="describes" >
                        <el-input type="textarea" placeholder="请输入" v-model="ruleForm.describes"></el-input>
                    </el-form-item>
                </div>
                <div class="btn_box clear">
                    <el-button type="primary" class="taskSuccess" @click="taskSuccess(ruleForm,'ruleForm',1)"v-if="index==2">保存</el-button>
                    <el-button type="primary" class="failurePositions" @click="failurePositions()" v-if="index==2">下线</el-button>
                    <el-button type="primary" class="taskSuccess" @click="taskSuccess(ruleForm,'ruleForm',1)" v-if="index==3">重新发布</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    import address from "@/assets/json/pca-code.json";
    import {goodsApi as api,resumeApi,uploadApi} from '../../../api';
    import {IdentityUpload} from '../../../components/public'
    export default {
        name: "modifyjob",
        components:{IdentityUpload},
        data(){
            return{
                clear: true,
                accept: "image/*",
                images:"",
                closeclear: true,

                userInfo:this.$helper.utils.storage.get('userInfo'),
                //三级联动
                provinces: "",
                city: "",
                index:"",
                id:"",
                areas:"",
                provinceList: [],
                cityList: [],
                countyList: [],
                addressList:[],
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
                ruleForm: {
                    logo:"",
                    salary_money:"",
                    shop:{
                        institution:"",
                    },
                    category_id:[],
                },
                rules: {
                    name: [
                        { required: true, message: '请输入您的职位名称', trigger: 'blur' },
                    ],
                    position_type: [
                        { required: true, message: '请选择职位类别', trigger: 'change' }
                    ],
                    department: [
                        { required: true, message: '请输入所属部门 ', trigger: 'change' }
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
                },
            }
        },
        //3级联动
        created(){
            this.id=this.$route.query.id
            this.index=this.$route.query.status
            this.geteducation(1)
            this.geteducation(2)
            this.geteducation(3)
            this.getcategory()
            this.getDic()
            this.editRecruitDetail()
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
            addImage() {
                if (this.images.length >= 1) {
                    this.$message.error("最多只能上传8张图片！");
                    return;
                }
                this.isChange = false;
                this.clear = true;

                this.$refs.fileInput.click();
            },
            changeImage(index) {
                this.isChange = true;
                this.changeIndex = index;

                this.$refs.fileInput.click();
            },
            removeImage(index) {
                this.images.splice(index, 1);
                this.closeclear = true
            },
            fileChange() {
                const fileData = this.$refs.fileInput.files[0];
                this.clear = false;
                let formData = new FormData();
                formData.append("file", fileData, fileData.name);
                uploadApi.uploadImage(formData)
                    .then(res => {
                        console.log(res);
                        if (res.data.status === 1) {
                            if (this.isChange) {
                                // this.showImg=false
                                this.images=res.data.data.path;
                                this.ruleForm.logo=res.data.data.path
                                this.isChange = false;
                            } else {
                                // this.showImg=false
                                // this.editheard(this.images)
                            }
                            this.closeclear = false
                        } else {
                            this.$message.error(res.data.msg);
                        }

                        this.clear = true;
                    })
                    .catch(err => {
                        this.clear = true;
                        this.$message.error(err);
                    });
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
                })
            },
            getcategory(){
                resumeApi.positiontype({
                    id:this.$route.query.id
                }).then((res) => {
                    if(res.status==1){
                        this.category=res.data
                        // this.$message.success(res.msg)
                    }
                    console.log(res)
                })
            },
            failurePositions(){
                resumeApi.failurePosition({
                    id:this.id
                }).then((res) => {
                    if(res.status==1){
                        this.$router.push({name: 'jobmanagement'})
                        this.$message.success(res.msg)
                    }
                    console.log(res)
                })
            },
            chooseTage(item,index){
                if(item.status==0){
                    item.status=1
                    this.$set(this.tags,index,item)
                    this.ruleForm.category_id.push(item.id)
                    this.$refs["ruleForm"].validate()
                }else {
                    item.status=0
                    this.$set(this.tags,index,item)
                    this.ruleForm.category_id.splice(index,1)
                    this.$refs["ruleForm"].validate()
                }
                console.log(this.ruleForm.category_id)

            },
            getAddressList() {
                const logintoken = this.$helper.utils.storage.get('userInfo').logintoken
                api.getAddressList({logintoken}).then((res) => {
                    if(res.status==1)
                        this.addressList = res.data.data
                })
            },
            taskSuccess(ruleForm,formName,status){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        //学历
                        for(var i=0;i<this.alleducation.length;i++){
                            if(ruleForm.education==this.alleducation[i].name){
                                ruleForm.education=this.alleducation[i].id
                                break;
                            }
                        }
                        //工作性质
                        for(var i=0;i<this.typework.length;i++){
                            if(ruleForm.work_nature==this.typework[i].name){
                                ruleForm.work_nature=this.typework[i].id
                                break;
                            }
                        }
                        //工作经验
                        for(var i=0;i<this.allwork.length;i++){
                            if(ruleForm.work_experience==this.allwork[i].name){
                                ruleForm.work_experience=this.allwork[i].id
                                break;
                            }
                        }
                        //职位类别
                        for(var i=0;i<this.category.length;i++){
                            if(ruleForm.position_type==this.category[i].name){
                                ruleForm.position_type=this.category[i].id
                                break;
                            }
                        }
                        var param={
                            status:status*1,
                            logo:this.ruleForm.logo,
                            name:ruleForm.name,
                            position_type:ruleForm.position_type,
                            department:ruleForm.department,
                            category_id:ruleForm.category_id,
                            work_experience:ruleForm.work_experience,
                            education:ruleForm.education,
                            work_nature:ruleForm.work_nature,
                            salary_min:ruleForm.salary_money.split("-")[0].replace("K",""),
                            salary_max:ruleForm.salary_money.split("-")[1].replace("K",""),
                            province_id:this.province_id,
                            city_id:this.city_id,
                            area_id:this.area_id,
                            address:ruleForm.address,
                            describes:ruleForm.describes,
                        }
                        param.id=this.$route.query.id
                        resumeApi.update_enterprise_recruit(param).then((res) => {
                            if(res.status==1){
                                this.$router.push({name: 'jobmanagement'})
                            }
                        })
                    }
                })
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
                    console.log(res)
                })
            },
            editRecruitDetail(){
                let param={
                    id:this.$route.query.id,
                    uid:this.userInfo.uid
                }
                resumeApi.enterprise_recruit(param).then((res) => {
                    if(res.status==1){
                        let that=this
                        that.ruleForm=res.data;
                        that.ruleForm.logo=res.data.shop.logo
                        this.$set(that.ruleForm,"logo",res.data.shop.logo)
                        this.$set(that.ruleForm,"salary_money",res.data.salary_min+"K"+'-'+res.data.salary_max+"K")
                        console.log("that.ruleForm",that.ruleForm)
                        this.ruleForm.category_id=[]
                        for (var i=0;i<that.tags.length;i++){
                            for(var j=0;j<res.data.categories.length;j++){
                                if(that.tags[i].id==res.data.categories[j].id){
                                    that.tags[i].status=1;
                                    this.ruleForm.category_id.push((res.data.categories[j].id)*1)
                                    break;
                                }
                            }
                        }
                        //学历
                        for(var i=0;i<this.alleducation.length;i++){
                            if(res.data.education==this.alleducation[i].name){
                               this.ruleForm.education=this.alleducation[i].name
                                break;
                            }
                        }
                        //工作性质
                        for(var i=0;i<this.typework.length;i++){
                            if(res.data.work_nature==this.typework[i].name){
                                this.ruleForm.work_nature=this.typework[i].name
                                break;
                            }
                        }
                        //职位类别
                        for(var i=0;i<this.category.length;i++){
                            if(res.data.position_type==this.category[i].name){
                                this.ruleForm.position_type=this.category[i].name
                                break;
                            }
                        }
                        this.$set(that.ruleForm.categories,"categories",res.data.categories);
                        this.provinces=res.data.province
                        this.city=res.data.city
                        this.areas=res.data.area
                        console.log("职位详情",res)
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

<style scoped lang="scss">
    .myresume{
        .file-group {
            padding: 0.06rem;
            display: flex;
            align-items: center;
            align-content: flex-start;
            flex-flow: row wrap;
            .file-wrapper {
                box-sizing: border-box;
                padding: 0.06rem;
                position: relative;
                width: 80px;
                .file {
                    width: 80px;
                    height: 80px;
                    border-radius: 6px;
                    object-fit: cover;
                    & .add-file {
                        background: url("../../../assets/image/img/bg_1@3x.png");
                        background-size: 100% 100%;
                        height: 80px;
                        width: 80px;
                        border-radius: 6px;
                    }
                    img {
                        width: 80px;
                        height:80px;
                        border-radius: 6px;
                        object-fit: cover;
                    }
                }
                .close {
                    display: block;
                    position: absolute;
                    right: -0.03rem;
                    top: -0.03rem;
                    width: 0.24rem;
                    height: 0.24rem;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
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
                object-fit: cover;

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
            button {
                margin-right: 30px;
                padding: 10px 65px;
            }
            button.taskSuccess{
                background-color: #F44336;
                border-color: #F44336;
            }
            button.failurePositions{
                background-color: #303f9f;
                border-color: #303f9f;
            }
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
