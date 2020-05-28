<template>
    <div class="myresume">
        <div class="myresume_title">我的简历</div>
        <!--基本信息-->
        <div class="clear border">
            <el-form  :model="info" :rules="rules"   ref="info"  label-width="100px" class="demo-ruleForm">
                <el-form-item  prop="logo">
                    <div class="file-group clear">
                        <template>
                            <div  class="file-wrapper" @click="changeImage()">
                                <div class="file">
                                    <div class="add-file" v-if="showImg"></div>
                                    <img :src="$helper.utils.api + images" v-if="!showImg">
                                </div>
                            </div>
                        </template>
                        <input type="file" v-if="clear" :accept="accept" @change="fileChange" ref="fileInput" style="display: none;" area-hidden="true">
                    </div>
                </el-form-item>
                <div style="position: relative">
                    <p class="title">基本信息(必填）</p>
                    <div style="width:51%;float: left;">
                        <el-form-item label="姓      名:"  prop="name">
                            <span  v-if="info.show_sure_work">{{info.name||'暂无'}}</span>
                            <el-input v-model="info.name" placeholder="请输入您的姓名" v-if="info.show_edit_work"></el-input>
                        </el-form-item>
                        <el-form-item label="最高学历:" prop="education">
                            <span  v-if="info.show_sure_work">{{info.education||'暂无'}}</span>
                            <el-select placeholder="请输入您的最高学历" style="width:133px" v-if="info.show_edit_work" v-model="info.education">
                                <el-option v-for="item in alleducation"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在城市:"  prop="province">
                            <span  v-if="info.show_sure_work">{{info.city||'暂无'}}</span>
                            <el-select placeholder="省" style="width:133px" v-model="provinces" v-if="info.show_edit_work">
                                <el-option v-for="item in provinceList" :key="item.code" :label="item.name"
                                           :value="item.name"></el-option>
                            </el-select>
                            <el-select placeholder="市" style="width:133px;margin-left: 5px" v-model="city" v-if="info.show_edit_work">
                                <el-option v-for="item in cityList" :label="item.name" :key="item.code"
                                           :value="item.name"></el-option>
                            </el-select>
                            <el-select placeholder="县" style="width:133px;margin-left: 5px" v-model="areas" v-if="info.show_edit_work">
                                <el-option v-for="item in countyList" :label="item.name" :key="item.code"
                                           :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系邮箱:"  prop="email">
                            <span  v-if="info.show_sure_work">{{info.email||'暂无'}}</span>
                            <el-input v-model="info.email" placeholder="请输入您的邮箱地址" v-if="info.show_edit_work"></el-input>
                        </el-form-item>
                    </div>
                    <div style="width:35%;float: left">
                        <el-form-item label="性别:"  prop="sex">
                            <span  v-if="info.show_sure_work">{{info.sex}}</span>
                            <el-radio-group v-model="info.sex" size="medium" v-if="info.show_edit_work">
                                <el-radio border label="男"></el-radio>
                                <el-radio border label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="工作年限:" prop="year_num">
                            <span  v-if="info.show_sure_work">{{info.year_num||'暂无'}}</span>
                            <el-select placeholder="请输入您的工作年限"  v-if="info.show_edit_work" v-model="info.year_num"  @change="currentSel">
                                <el-option v-for="item in allwork"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系电话:" prop="phone">
                            <span  v-if="info.show_sure_work">{{info.phone||'暂无'}}</span>
                            <el-input v-model="info.phone" placeholder="请输入您的电话号码" v-if="info.show_edit_work"></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期:" prop="birthday">
                            <span  v-if="info.show_sure_work">{{info.birthday ||'暂无'}}</span>
                            <el-date-picker
                                v-model="info.birthday"
                                type="month"
                                v-if="info.show_edit_work"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="sure_content pointer" v-if="info.show_sure_work" @click="edit_info(info,'info')"><a>编辑</a></div>
                    <div class="sure_content pointer" v-if="info.show_edit_work" @click="sure_info(info,'info')"><a>保存</a></div>
                </div>
            </el-form>
        </div>
        <!--工作经历-->
        <div class="clear border">
            <p class="title">工作经历(必填）</p>
            <template  v-for="(item,index) in experience">
                <el-form :model="item" :rules="experiences"   :ref="'experience'+index" label-width="100px" class="demo-ruleForm pad_border  "
                         :key="item.id" :dataLength="experience.length">
                    <div class="clear">
                        <el-form-item label="公司名称:"  style="width:40%;float: left" prop="company_name">
                            <span  v-if="item.show_sure_work">{{item.company_name}}</span>
                            <el-input v-model="item.company_name" placeholder="请输入您的公司名称" v-if="item.show_edit_work"></el-input>
                        </el-form-item>
                        <el-form-item label="职位名称："  style="width:35%;float: left" prop="position_name">
                            <span v-if="item.show_sure_work">{{item.position_name}}</span>
                            <el-input placeholder="请输入您的职位名称" v-model="item.position_name" v-if="item.show_edit_work"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear">
                        <el-form-item label="在职时间:"  prop="start_time"   style="float: left">
                            <span  v-if="item.show_sure_work">{{item.start_time}}</span>
                            <el-date-picker
                                v-model="item.start_time"
                                type="date"
                                v-if="item.show_edit_work"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item  prop="end_time" style="float: left;margin-left:-100px">
                            <span>&nbsp;&nbsp;至&nbsp;&nbsp; </span>
                            <span  v-if="item.show_sure_work">{{item.end_time}}</span>
                            <el-date-picker
                                v-model="item.end_time"
                                v-if="item.show_edit_work"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <el-form-item label="工作内容:" style="width:75%;"  prop="contents">
                        <span  v-if="item.show_sure_work">{{item.contents}}</span>
                        <el-input type="textarea" v-model="item.contents" v-if="item.show_edit_work"></el-input>
                    </el-form-item>
                    <div class="sure_content pointer" @click="sure_work(item,index)" v-if="item.show_edit_work"><a>保存</a></div>
                    <div class="sure_content pointer" @click="edit_work(item,index)" v-if="item.show_sure_work"><a>编辑</a></div>
                    <div class="del_content pointer" @click="del_work(2,item)"><a>删除</a></div>
                </el-form>
            </template>
            <p class="add_list pointer"  @click="goRouterEdit"><img src="../../../assets/image/img/add_resume.png"/>添加工作经历</p>
        </div>
        <!--教育经历 (必填）-->
        <div class="clear border">
            <p class="title">教育经历(必填）</p>
            <template  v-for="(item,index) in education" >
                <el-form :model="item" :rules="educations"   :ref="'education'+index"  label-width="100px" class="demo-ruleForm pad_border" :key="item.id" :dataLength="education.length">
                    <div class="clear">
                        <el-form-item label="学校名称:" style="width: 40%;float: left"  prop="school_name">
                            <span  v-if="item.show_sure_work">{{item.school_name}}</span>
                            <el-input v-model="item.school_name" placeholder="请输入您毕业学校名称"  v-if="item.show_edit_work"></el-input>
                        </el-form-item>
                        <el-form-item label="专业名称：" prop="major_name" style="width:35%;float: left">
                            <span  v-if="item.show_sure_work">{{item.major_name}}</span>
                            <el-input v-model="item.major_name" placeholder="请输入您的专业名称"  v-if="item.show_edit_work"></el-input>
                        </el-form-item>
                        <el-form-item label="学      历:" prop="education" style="width: 40%;float: left" >
                            <span  v-if="item.show_sure_work">{{item.education}}</span>
                            <el-select placeholder="请输入您的最高学历" style="width:133px" v-if="item.show_edit_work" v-model="item.education">
                                <el-option v-for="item in alleducation"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="毕业年份:" prop="years">
                            <span  v-if="item.show_sure_work">{{item.years}}</span>
                            <el-date-picker
                                v-model="item.years"
                                type="date"
                                v-if="item.show_edit_work"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="sure_content pointer" v-if="item.show_edit_work" @click="sure_education(item,index)"><a>保存</a></div>
                    <div class="sure_content pointer" v-if="item.show_sure_work" @click="edit_education(item,index)"><a>编辑</a></div>
                    <div class="del_content pointer" @click="del_work(1,item)"><a>删除</a></div>
                </el-form>
            </template>
            <p class="add_list pointer" @click="goeducation()"><img src="../../../assets/image/img/add_resume.png" />添加教育经历</p>
        </div>
        <!--求职意向(必填）-->
        <div class="clear border">
            <p class="title">求职意向(必填）</p>
            <el-form :model="hope" :rules="hopeRuler"   ref="hope"   label-width="100px" class="demo-ruleForm " style="position: relative">
                <div class="clear">
                    <el-form-item label="期望职位:" prop="position_type"  style="width: 49%;float: left">
                        <span  v-if="hope.show_sure_work">{{hope.position_type}}</span>
                        <el-select  placeholder="请选择您期望的职位" v-model="hope.position_type" v-if="hope.show_edit_work">
                            <el-option v-for="item in position"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div  style="width: 49%;float: left">
                    <el-form-item label="工作性质:" prop="work_nature">
                        <span  v-if="hope.show_sure_work">{{hope.work_nature}}</span>
                        <el-select  placeholder="请选择" v-model="hope.work_nature" v-if="hope.show_edit_work" >
                            <el-option v-for="item in work_nature"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"
                                       ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="当前状态:" style="width: 100%;" prop="work_type">
                        <span  v-if="hope.show_sure_work">{{hope.work_type}}</span>
                        <el-select  placeholder="请选择" v-model="hope.work_type" v-if="hope.show_edit_work">
                            <el-option  v-for="item in allhope"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="width:51%;float: left">
                    <el-form-item label="薪资要求:" style="width:100%;" prop="salary_money">
                        <span  v-if="hope.show_sure_work">{{hope.salary_money}}</span>
                        <el-select  placeholder="期望的薪资" v-model="hope.salary_money" v-if="hope.show_edit_work" @change="changeMoney(hope.salary_money)">
                            <el-option
                                v-for="item in salary"
                                :key="item.id"
                               :label="item.name"
                               :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="期望城市:"   prop="hopeprovince">
                        <span  v-if="hope.show_sure_work">{{hope.work_city}}</span>
                        <el-select placeholder="省" style="width:133px" v-model="hopeprovinces"  v-if="hope.show_edit_work">
                            <el-option v-for="item in provinceList" :key="item.code" :label="item.name"
                                       :value="item.name"></el-option>
                        </el-select>
                        <el-select placeholder="市" style="width:133px;margin-left: 5px" v-model="hopecity"  v-if="hope.show_edit_work">
                            <el-option v-for="item in cityList" :label="item.name" :key="item.code"
                                       :value="item.name"></el-option>
                        </el-select>
                        <el-select placeholder="县" style="width:133px;margin-left: 5px" v-model="hopeareas"  v-if="hope.show_edit_work">
                            <el-option v-for="item in countyList" :label="item.name" :key="item.code"
                                       :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="sure_content pointer" v-if="hope.show_sure_work" @click="edit_hope(hope)"><a>编辑</a></div>
                <div class="sure_content pointer" v-if="hope.show_edit_work" @click="sure_hope(hope)"><a>保存</a></div>
            </el-form>
        </div>

        <!--项目经验 (必填）-->
        <div class="clear border">
            <p class="title">项目经验</p>
            <template v-for="(item,index) in project" >
                <el-form :model="item" :rules="projects"   :ref="'project'+index"  label-width="100px" class="demo-ruleForm pad_border"  :key="item.id" :dataLength="project.length">
                    <div class="clear">
                        <el-form-item label="项目名称:" prop="name" style="width: 54%;float: left" >
                            <span  v-if="item.show_sure_work">{{item.name}}</span>
                            <el-input v-model="item.name" placeholder="请输入项目名称" v-if="item.show_edit_work"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear">
                        <el-form-item label="时 间  段:" prop="start_time" style="float: left;" >
                            <span  v-if="item.show_sure_work">{{item.start_time}}</span>
                            <el-date-picker
                                v-model="item.start_time"
                                type="date"
                                placeholder="选择日期"  v-if="item.show_edit_work">
                            </el-date-picker>
                            <span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                        </el-form-item>
                        <el-form-item prop="end_time" style="float: left;margin-left: -100px">
                            <span  v-if="item.show_sure_work">{{item.end_time}}</span>
                            <el-date-picker
                                v-model="item.end_time"
                                type="date"
                                v-if="item.show_edit_work"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <el-form-item label="项目职责:" style="width: 54%;"  prop="duty">
                        <span  v-if="item.show_sure_work">{{item.duty}}</span>
                        <el-input  v-model="item.duty"  v-if="item.show_edit_work"></el-input>
                    </el-form-item>
                    <el-form-item label="项目描述:"  prop="contents" >
                        <span  v-if="item.show_sure_work">{{item.contents}}</span>
                        <el-input type="textarea" v-model="item.contents"  v-if="item.show_edit_work"></el-input>
                    </el-form-item>
                    <div class="sure_content pointer"  @click="sure_project(item,index)"  v-if="item.show_edit_work"><a>保存</a></div>
                    <div class="sure_content pointer"  @click="edit_project(item,index)"  v-if="item.show_sure_work"><a>编辑</a></div>
                    <div class="del_content pointer" @click="del_work(3,item)"><a>删除</a></div>
                </el-form>
            </template>
            <p class="add_list pointer"  @click="goprojectEdit"><img src="../../../assets/image/img/add_resume.png" />添加项目经验</p>
        </div>

        <!--技能评价-->
        <div class="clear">
            <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm pad_border" >
                <el-form-item label="技能评价:" v-if="evaluations" style="width: 70%">
                    <span v-if="evaluations.show_sure_work">{{evaluations.evaluations||'暂无'}}</span>
                    <el-input type="textarea" v-model="evaluations.evaluations" v-if="evaluations.show_edit_work"> </el-input>
                </el-form-item>
                <div class="sure_content pointer" @click="sure_evaluations(evaluations)" v-if="evaluations.show_edit_work"><a>保存</a></div>
                <div class="sure_content pointer" @click="edit_evaluations(evaluations)" v-if="evaluations.show_sure_work"><a>编辑</a></div>
            </el-form>
        </div>
        <!--技能评价-->
        <div class="clear">
            <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm pad_border" >
                <el-form-item label="自我描述:" v-if="describes" style="width:70%" >
                    <span  v-if="describes.show_sure_work">{{describes.describes||'暂无'}}</span>
                    <el-input type="textarea" v-model="describes.describes"  v-if="describes.show_edit_work"> </el-input>
                </el-form-item>
                <div class="sure_content pointer" @click="sure_describes(describes)" v-if="describes.show_edit_work"><a>保存</a></div>
                <div class="sure_content pointer" @click="edit_describes(describes)" v-if="describes.show_sure_work"><a>编辑</a></div>
            </el-form>
        </div>
    </div>

</template>

<script>
    import address from "@/assets/json/pca-code.json";
    import {goodsApi,resumeApi,uploadApi} from '../../../api';
    import {uploadImg} from '../../../components/public'
    import moment from 'moment'
    export default {
        name: "resume",
        components:{uploadImg},
        data(){
            return{
                clear: true,
                accept: "image/*",
                images:"",
                closeclear: true,

                userInfo: this.$helper.utils.storage.get('userInfo'),
                //三级联动
                provinces: "",
                city: "",
                areas:"",
                showImg:true,
                hopeprovinces:"",
                hopecity:"",
                hopeareas:"",
                provinceList: [],
                cityList: [],
                countyList: [],
                addressList:[],
                value:"",
                id: "",
                years:"",
                info: {
                    show_edit_work:false,
                    show_sure_work:true,
                    head_img:"", //头像
                    province:""
                }, //个人信息
                experience: [], //工作经历
                education:[], //教育经历
                position:{}, //期望职位
                hope: {show_edit_work:true, show_sure_work:true,salary_money:"",}, //求职意向
                project: [], //项目经验
                evaluations: { }, //技能评价
                describes: { show_edit_work:false, show_sure_work:true,}, //自我描述
                salary:  [
                            {
                                id: 0,
                                name: "0K-3K",
                                value: [0, 3]
                            },
                            {
                                id: 1,
                                name: "3K-5K",
                                value: [3, 5]
                            },
                            {
                                id: 2,
                                name: "5K-10K",
                                value: [5, 10]
                            },
                            {
                                id: 3,
                                name: "10K-15K",
                                value: [10, 15]
                            },
                            {
                                id: 4,
                                name: "15K-20K",
                                value: [15, 20]
                            },
                            {
                                id: 5,
                                name: "20K-50K",
                                value: [20, 50]
                            },
                            {
                                id: 6,
                                name: "50K-100K",
                                value: [50, 100]
                            },
                            {
                                id: 7,
                                name: "100K以上",
                                value: [100, 999999]
                            }
                ],
                work_nature:[],
                alleducation:{},
                allwork:{},
                allhope:{},
                ruleForm:[],
                rules: {
                    birthday:[
                            { required: true, message: '请选择出生日期', trigger: 'blur' },
                    ],
                    logo:[
                        { required: true, message: '请输入选择头像', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入您的姓名', trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ],
                    education: [
                        { required: true, message: '请选择最高学历', trigger: 'change' }
                    ],
                    province: [
                        { required: true, message: '请选择所在城市', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '请输入您的邮箱地址', trigger: 'change' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    year_num: [
                        { required: true, message: '请选择您的工作年限', trigger: 'change' }
                    ],
                    phone: [
                        {pattern: /^1[3456789]\d{9}$/, required: true, message: '请输入正确的电话号码', trigger: 'blur',}
                    ],
                },
                experiences: {
                    position_name: [
                        { required: true, message: '请输入您的职位名称', trigger: 'blur' },
                    ],
                    company_name: [
                        { required: true, message: '请输入您的公司名称', trigger: 'blur' }
                    ],
                    start_time: [
                        { required: true, message: '请选择开始日期', trigger: 'blur' }
                    ],
                    end_time: [
                        { required: true, message: '请选择结束日期', trigger: 'blur' }
                    ],
                    contents: [
                        { required: true, message: '请输入您的工作内容', trigger: 'blur' }
                    ],
                },
                educations: {
                    school_name: [
                        { required: true, message: '请输入学校名称', trigger: 'blur' },
                    ],
                    major_name: [
                        { required: true, message: '请输入您的专业名称', trigger: 'blur' }
                    ],
                    education: [
                        { required: true, message: '请选择学历', trigger: 'change' }
                    ],
                    years: [
                        { required: true, message: '请选择毕业年份', trigger: 'blur' }
                    ],
                },
                projects: {
                    name: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                    ],
                    duty: [
                        { required: true, message: '请输入项目职责', trigger: 'blur' }
                    ],
                    start_time: [
                        { required: true, message: '请选择开始日期', trigger: 'blur' }
                    ],
                    end_time: [
                        { required: true, message: '请选择结束日期', trigger: 'blur' }
                    ],
                    contents: [
                        { required: true, message: '请输入工作经历', trigger: 'blur' }
                    ],
                },
                hopeRuler: {
                    position_type: [
                        { required: true, message: '请输入期望的职位', trigger: 'change' },
                    ],
                    work_nature: [
                        { required: true, message: '请选择工作性质', trigger: 'change' }
                    ],
                    work_type: [
                        { required: true, message: '请选择当前状态', trigger: 'change' }
                    ],
                    salary_money: [
                        { required: true, message: '请选择薪资要求', trigger: 'change' }
                    ],
                    hopeprovince: [
                        { required: true, message: '请选择期望城市', trigger: 'change' }
                    ],
                }
            }
        },
        created() {
            this.geteducation(1)
            this.geteducation(2)
            this.geteducation(3)
            this.getposition()
            this.geteducation(5)

        },
        //3级联动
        watch: {
            hopeprovinces(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.provinceList) {
                        if (item.name === v1) {
                            this.cityList = item.children
                            this.hopecity = this.cityList[0].name
                            this.hope.work_city_id= this.cityList[0].code
                            break
                        }
                    }
                }
            },
            hopecity(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.cityList) {
                        if (item.name === v1) {
                            this.countyList = item.children
                            this.hopeareas = this.countyList[0].name
                            break
                        }
                    }
                }
            },
            provinces(v1, v2) {
                if (v1 !== v2) {
                    for (let item of this.provinceList) {
                        if (item.name === v1) {
                            this.cityList = item.children
                            this.provinces = item.name
                            this.info.province = item.name
                            // this.$refs['info'].validate()
                            this.city = this.cityList[0].name
                            this.info.city_id= this.cityList[0].code
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
                            this.info.city_id= item.code
                            this.areas = this.countyList[0].name
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
                                this.showImg=false
                                this.images=res.data.data.path;
                                this.info.logo=res.data.data.path;
                                this.editheard(this.images)
                                this.isChange = false;
                            } else {
                                this.showImg=false
                                this.images=res.data.data.path;
                                this.info.logo=res.data.data.path;
                                this.editheard(this.images)
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

            editheard(images){
                let params = {head_img:images};
                    resumeApi.update(params).then((res) => {
                        if(res.status==1){
                            this.$refs['hope'].validate()
                            this.getresume()
                            this.$message.success("简历头像修改成功")
                        }
                        else {
                            this.$message.error(res.msg)
                        }
                    })
            },
            currentSel(selVal){
               this.info.year_num=selVal
            },
            changeMoney(value){
                this.hope.salary_money=value[0]+"K-"+value[1]+"K"
                this.$set(this.hope,'salary_money',this.hope.salary_money)
                this.$refs['hope'].validate()
                this.hope.salary_min=value[0]
                this.hope.salary_max=value[1]
            },
            getposition(){
                resumeApi.positiontype().then((res) => {
                    if(res.status==1){
                    this.position=res.data
                    console.log("res.data",res.data)
                    }
                })
            },
            geteducation(status){
                let type={type:status}
                // 字典类型 1工作经验 2学历要求 3工作性质 4职位类别 5工作状态
                resumeApi.getrecruidictionary(type).then((res) => {
                    if(res.status==1){
                       switch (status) {
                           case 1:
                               this.allwork=res.data
                               break;
                           case 2:
                               this.alleducation=res.data
                               break;
                           case 3:
                               this.work_nature=res.data
                               break;
                           case 5:
                               this.allhope=res.data
                               break;
                       }

                    }
                    console.log(res)
                })
            },
            edit_info(info){
                this.info.logo=info.head_img
                this.provinces="北京市"
                this.info.province="北京市"
                info.show_edit_work=true
                info.show_sure_work=false
            },
            sure_info(info,ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if(valid){
                        for(let n=0;n<this.allwork.length;n++){
                            if(info.year_num==this.allwork[n].name){
                                info.year_num=this.allwork[n].id
                            }
                        }
                        for(let n=0;n<this.alleducation.length;n++){
                            if(info.education==this.alleducation[n].name){
                                info.education=this.alleducation[n].id
                            }
                        }
                        this.info.show_edit_work=false
                        let params = {
                            head_img:info.head_img,
                            name:info.name,
                            birthday:info.birthday.getFullYear()+'-'+(info.birthday.getMonth()+1),
                            sex: info.sex == "男" ? 1 : info.sex  == "女" ? 2 : 1,
                            year_num:info.year_num,
                            phone:info.phone,
                            email:info.email,
                            city_id:this.info.city_id,
                            evaluations:this.evaluations.evaluations, //技能评价
                            describes:this.describes.describes, //自我描述
                            education:info.education, //学历
                        };
                        resumeApi.update(params).then((res) => {
                            if(res.status==1){
                                this.getresume()
                                this.info.show_sure_work=true
                            }
                            else {
                                this.$message.error(res.msg)
                            }
                            console.log(res)
                        })
                    }
                })
            },

            del_work(type,item){
                if(!item.id){
                    switch(type) {
                        case 1:
                            this.education.pop()
                            console.log("this.education==",this.education)
                            break;
                        case 2:
                            this.experience.pop()
                            console.log("this.experience==",this.experience)
                            break;
                        case 3:
                            this.project.pop()
                            console.log("this.project==",this.project)
                            break;
                    }

                    return false
                }
                let params = {
                   type:type,
                    id:item.id
                };
                console.log(params)
                resumeApi.deletework(params).then((res) => {
                    if(res.status==1){
                        this.getresume()
                    }
                    console.log(res)
                })
            },//删除工作经验
            edit_work(item,index){
                item.show_edit_work=true;
                item.show_sure_work=false;
                this.$set(this.experience,index,item);
            },//编辑工作经验
            sure_work(item,index){//保存工作经验
                this.$refs['experience'+index].forEach(val => {
                    val.validate((valid) => {
                        if(valid){
                            if(item.id){
                                let params = {
                                    company_name:item.company_name,
                                    position_name:item.position_name,
                                    start_time:moment(item.start_time, 'YYYY-MM-DD HH:mm:ss')/1000,
                                    end_time:moment(item.end_time, 'YYYY-MM-DD HH:mm:ss')/1000,
                                    contents:item.contents,
                                    id:item.id
                                };
                                if(params.start_time>params.end_time){
                                    this.$message.error("请选择正确的时间区域")
                                    return false
                                }
                                console.log(params)
                                resumeApi.editwork(params).then((res) => {
                                    if(res.status==1){
                                        this.getresume()
                                    }
                                    console.log(res)
                                })
                            }
                            else {
                                let params = {
                                    company_name:item.company_name,
                                    position_name:item.position_name,
                                    start_time:moment(item.start_time, 'YYYY-MM-DD HH:mm:ss')/1000,
                                    end_time:moment(item.end_time, 'YYYY-MM-DD HH:mm:ss')/1000,
                                    contents:item.contents,
                                };
                                if(params.start_time>params.end_time){
                                    this.$message.error("请选择正确的时间区域")
                                    return false
                                }
                                resumeApi.addwork(params).then((res) => {
                                    if(res.status==1){
                                        this.getresume()
                                    }
                                    console.log(res)
                                })
                            }
                        }
                    })
                })


            }, //保存工作经验

            edit_education(item,index){
                item.show_edit_work=true;
                item.show_sure_work=false;
                this.$set(this.education,index,item);
            },

            edit_hope(hope){
                if(hope.salary_max==0)
                    this.hope.salary_money=""
                else this.hope.salary_money=hope.salary_min+"K-"+hope.salary_max+"K"
                this.hopeprovinces="北京市"
                this.hope.hopeprovince="北京市"
                this.hope.show_edit_work=true;
                this.hope.show_sure_work=false;
            },//编辑求职意向
            sure_hope(hope){
                this.$refs['hope'].validate((valid)=>{
                    if(valid){
                        this.hope.show_edit_work=false;
                        for(let n=0;n<this.work_nature.length;n++){
                            if(hope.work_nature==this.work_nature[n].name){
                                hope.work_nature=this.work_nature[n].id
                            }
                        }
                        for(let n=0;n<this.allhope.length;n++){
                            if(hope.work_type==this.allhope[n].name){
                                hope.work_type=this.allhope[n].id
                            }
                        }
                        for(let n=0;n<this.position.length;n++){
                            if(hope.position_type==this.position[n].name){
                                hope.position_type=this.position[n].id
                            }
                        }
                        let params = {
                            position_type:hope.position_type, //期望职位类型 对应字典表id
                            work_nature:hope.work_nature, //工作性质 对应字典表id
                            salary_min:hope.salary_min, //期望最低薪资
                            salary_max:hope.salary_max, //期望最高薪资
                            work_city_id:hope.work_city_id, //期望工作城市 id
                            work_type:hope.work_type, //当前工作状态
                        };
                        console.log("hope",params)
                        resumeApi.update(params).then((res) => {
                            if(res.status==1){
                                this.getresume()
                                this.hope.show_sure_work=true;
                            }
                            else {
                                this.$message.error(res.msg)
                            }
                            console.log(res)
                        })
                        }
                    })
            },//保存求职意向
            getresume(){
                resumeApi.getResume().then(res => {
                    console.log("获取简历信息>>>", res);
                    if (res.status === 1) {
                        let data = res.data;
                        this.id = data.id;
                        if(res.data.head_img){
                            this.showImg=false
                            this.images=res.data.head_img
                        }
                        this.info = {
                            name: data.name,
                            birthday: data.birthday,
                            education: data.education,
                            age: data.age,
                            year_num:data.year_num,
                            city: data.city,
                            phone: data.phone,
                            email: data.email,
                            sex:  data.sex == 1 ? "男" : data.sex  == 2 ? "女" : "未知",
                            show_edit_work:false,
                            show_sure_work:true,
                            head_img:data.head_img
                        };
                        this.experience = data.resume_work;
                        if(this.experience.length>0){
                            for (var i=0;i<this.experience.length;i++) {
                                this.experience[i].show_edit_work=false
                                this.experience[i].show_sure_work=true;
                                this.experience[i].start_time=this.$filter.timeFilter(this.experience[i].start_time, 'YYYY-MM-DD');
                                this.experience[i].end_time=this.$filter.timeFilter(this.experience[i].end_time, 'YYYY-MM-DD');
                            }
                        }
                        this.education = data.resume_education;
                        if(this.education.length>0){
                            for (var i=0;i<this.education.length;i++) {
                                this.education[i].show_edit_work=false
                                this.education[i].show_sure_work=true
                            }
                        }
                        this.hope = {
                            position_type: data.position_type,
                            work_nature: data.work_nature,
                            salary_min: data.salary_min,
                            salary_max: data.salary_max,
                            work_city: data.work_city,
                            work_type: data.work_type,
                            show_edit_work:false,
                            show_sure_work:true,
                            salary_money:data.salary_min+"K-"+data.salary_max+"K"
                        };
                        this.project = data.resume_item;
                        if(this.project.length>0){
                            for (var i=0;i<this.project.length;i++) {
                                this.project[i].show_edit_work=false
                                this.project[i].show_sure_work=true
                                this.project[i].start_time=this.$filter.timeFilter(this.project[i].start_time, 'YYYY-MM-DD');
                                this.project[i].end_time=this.$filter.timeFilter(this.project[i].end_time, 'YYYY-MM-DD');
                            }
                        }
                        this.evaluations = {
                            evaluations:data.evaluations,
                            show_edit_work:false,
                            show_sure_work:true,
                        };
                        this.describes ={
                            describes:data.describes,
                            show_edit_work:false,
                            show_sure_work:true,
                        };
                    }
                });
            }, //获取简历

            sure_education(item,index){
                this.$refs['education'+index].forEach(val => {
                    val.validate((valid)=>{
                        if(valid){
                            for(let n=0;n<this.alleducation.length;n++){
                                if(item.education==this.alleducation[n].name){
                                    item.education=this.alleducation[n].id
                                }
                            }
                            let params = {
                                school_name:item.school_name,
                                major_name:item.major_name,
                                education:item.education,
                                years:item.years,
                            };
                            if(typeof(params.years)=="object"){
                                params.years=params.years.getFullYear()
                            }
                            if(item.id){
                                params.id=item.id
                                resumeApi.updatededucation(params).then((res) => {
                                    if(res.status==1)
                                        this.getresume()
                                    else
                                        this.$message.error(res.msg)
                                    console.log(res)
                                })
                            }else {
                                console.log("sure_education",params)
                                resumeApi.addeducation(params).then((res) => {
                                    if(res.status==1)
                                        this.getresume()
                                    else
                                        this.$message.error(res.msg)
                                    console.log(res)
                                })
                            }
                        }
                    })
                })

            },

            goprojectEdit(){ //添加项目经验
                this.project.push({show_edit_work:true,show_sure_work:false,})
                // console.log("this.project",this.project)
            },

            sure_project(item,index){
                this.$refs['project'+index].forEach(val => {
                    val.validate((valid)=>{
                            if(valid){
                                if(item.id){
                                    let params = {
                                        name:item.name,
                                        duty:item.duty,
                                        start_time:moment(item.start_time, 'YYYY-MM-DD HH:mm:ss')/1000,
                                        end_time:moment(item.end_time, 'YYYY-MM-DD HH:mm:ss')/1000,
                                        contents:item.contents,
                                        id:item.id
                                    };
                                    if(params.start_time>params.end_time){
                                        this.$message.error("请选择正确的时间区域")
                                        return false
                                    }
                                    resumeApi.editproject(params).then((res) => {
                                        if(res.status==1){
                                            this.getresume()
                                        }
                                        console.log(res)
                                    })
                                }
                                else {
                                    let params = {
                                        name:item.name,
                                        duty:item.duty,
                                        start_time:moment(item.start_time, 'YYYY-MM-DD HH:mm:ss')/1000,
                                        end_time:moment(item.end_time, 'YYYY-MM-DD HH:mm:ss')/1000,
                                        contents:item.contents,
                                    };
                                    if(params.start_time>params.end_time){
                                        this.$message.error("请选择正确的时间区域")
                                        return false
                                    }
                                    resumeApi.addproject(params).then((res) => {
                                        if(res.status==1){
                                            this.getresume()
                                        }
                                        console.log(res)
                                    })
                                }
                            }
                            })
                    })

            }, //添加项目经验
            edit_project(item,index){
                item.show_edit_work=true;
                item.show_sure_work=false;
                this.$set(this.project,index,item);
            },
            edit_evaluations(){
                this.evaluations.show_edit_work=true;
                this.evaluations.show_sure_work=false;
            },
            sure_evaluations(){
                this.evaluations.show_edit_work=false;
                this.evaluations.show_sure_work=true;
                let params = {
                    evaluations:this.evaluations.evaluations, //技能评价
                };
                resumeApi.update(params).then((res) => {
                    if(res.status==1){
                        this.getresume()
                    }
                    else {
                        this.$message.error(res.msg)
                    }
                    console.log(res)
                })
            },
            sure_describes(){
                this.describes.show_edit_work=false;
                this.describes.show_sure_work=true;
                let params = {
                    describes:this.describes.describes, //技能评价
                };
                resumeApi.update(params).then((res) => {
                    if(res.status==1){
                        this.getresume()
                    }
                    else {
                        this.$message.error(res.msg)
                    }
                    console.log(res)
                })
            },
            edit_describes(){
                this.describes.show_edit_work=true;
                this.describes.show_sure_work=false;
            },
            getAddressList() {
                const logintoken = this.$helper.utils.storage.get('userInfo').logintoken
                goodsApi.getAddressList({logintoken}).then((res) => {
                    if(res.status==1)
                        this.addressList = res.data.data
                })
            },

            goRouterEdit() {
                this.experience.push({show_edit_work:true,show_sure_work:false,})
            },

            goeducation(){
                this.education.push({show_edit_work:true,show_sure_work:false,})
            }
        },
        mounted() {
            //获取地址
            this.getresume()
            this.getAddressList()
            //获取联动address
            this.provinceList = address
        },
    }
</script>

<style  lang="scss" scoped>
    .myresume{
        .el-form-item__content{
            margin-left: 0!important;
        }
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
                width:80px;
                margin-left: -100px;
                .file {
                    width: 80px;
                    height: 80px;
                    border-radius:50%;
                    object-fit: cover;
                    & .add-file {
                        background: url("../../../assets/image/img/bg_1@3x.png");
                        background-size: 100% 100%;
                        height: 80px;
                        width: 80px;
                        border-radius: 50%;
                    }
                    img {
                        width: 80px;
                        height:80px;
                        border-radius:50%;
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
        .myresume_title{
            font-size: 20px;
            margin-bottom: 20px;
        }
        .pad_border{
            border-bottom: 1px solid #EEEEEE;
            padding: 10px 0;
            position: relative;
        }
        .border{
            border-bottom: 1px solid #EEEEEE;
            margin: 10px 0;
        };
        .del_content{
            text-align: center;
            position: absolute;
            top:60px;
            right: 0;
            a{
                padding:10px 40px;
                background-color:#f44336 ;
                border-radius: 8px;
                color: white;
                display: inline-block;
            }
        }
        .sure_content{
            text-align: center;
            position: absolute;
            top:10px;
            right: 0;
                a{
                    padding:10px 40px;
                    background-color:#303f9f ;
                    border-radius: 8px;
                    color: white;
                    display: inline-block;
            }
        }
        .btn_box {
            text-align: center;
        }button {
            background-color: #F44336;
            border-color: #F44336;
            margin-right: 30px;
            padding: 10px 65px;
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
