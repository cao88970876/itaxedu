<template>
    <div class="riskAssessment_page page-content">
        <!--导航-->
        <div>
            <navigation></navigation>
        </div>
        <div class="mains clear">
            <div class="clear">
                <div class="left_box">
                    <el-form :model="ruleForm"  ref="ruleForm" label-width="150px" class="demo-ruleForm">
                        <div class="title_box">财税风险评估</div>
                        <div class="left_title_box">您可以导入并填写一下内容进行计算：</div>
                        <el-form-item label="资产负债表：" class="updata_box">
                            <el-upload
                                class="upload-demo"
                                :action=$helper.utils.api
                                :before-upload="beforeUpload"
                                multiple
                                :limit="1"
                                :before-remove="beforeRemove"
                                :file-list="fileList">
                                <el-button size="small" type="primary" >立即上传</el-button>
                                <!--<el-button size="small" type="once_primary" v-if="!isshow.first">重新上传</el-button>-->
                            </el-upload>
                            <a class="down_box" @click="balance_download()">对应的模板下载</a>
                        </el-form-item>
                        <el-form-item label="利润及利润分配表："  class="updata_box">
                            <el-upload
                                class="upload-demo"
                                :action=$helper.utils.api
                                :before-upload="beforeUpload1"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                :file-list="fileList">
                                <el-button size="small" type="primary" >立即上传</el-button>
                                <!--<el-button size="small" type="once_primary" >重新上传</el-button>-->
                            </el-upload>
                            <a class="down_box" @click="profit_download()">对应的模板下载</a>
                        </el-form-item>
                        <el-form-item label="现金流量表："  class="updata_box">
                            <el-upload
                                class="upload-demo"
                                :action=$helper.utils.api
                                :before-upload="beforeUpload2"
                                 multiple
                                :limit="1"
                                :before-remove="beforeRemove"
                                :file-list="fileList">
                                <el-button size="small" type="primary" >立即上传</el-button>
                                <!--<el-button size="small" type="once_primary" >重新上传</el-button>-->
                            </el-upload>
                            <a class="down_box" @click="cash_download()">对应的模板下载</a>
                        </el-form-item>
                        <el-form-item label="所属行业：" prop="work_category" :rules="$rules.work_category">
                            <el-select v-model="ruleForm.work" placeholder="请选择活动区域"  style="float: left;width: 200px;margin-right: 10px">
                                <el-option v-for="(item,index) in category"
                                           :label="item.name"
                                           :key="item.id"
                                           :value="item.code" ></el-option>
                            </el-select>
                            <el-select v-model="ruleForm.work_category" placeholder="请选择活动区域"  name="category_id"  style="float: left;width: 200px;margin-right: 10px">
                                <el-option  v-for="item in get_sub_category"
                                            :label="item.name"
                                            :key="item.id"
                                            :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="已交增值税："   prop="vat_paid" :rules="$rules.vat_paid">
                            <el-input  v-model="ruleForm.vat_paid"  name="vat_paid"></el-input>
                        </el-form-item>
                        <el-form-item label="已交企业所得税：" prop="cit_paid" :rules="$rules.cit_paid">
                            <el-input  v-model="ruleForm.cit_paid"  name="cit_paid"></el-input>
                        </el-form-item>
                        <el-form-item label="销售收入：" prop="sales_revenue_input" :rules="$rules.sales_revenue_input">
                            <el-input v-model="ruleForm.sales_revenue_input"  name="sales_revenue_input"></el-input>
                        </el-form-item>
                        <el-form-item class="button_box">
                            <el-button  type="primary" @click="submit('ruleForm')">生成</el-button>
                            <el-button  class="reset" @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="right_box">
                    <el-form :model="personalIncome"  ref="personalIncome" label-width="140px" class="demo-ruleForm">
                        <div class="title_box">个人所得税计算</div>
                        <el-form-item label="税前工资：" prop="grossPay" :rules="$rules.grossPay">
                            <el-input v-model="personalIncome.grossPay"></el-input>
                        </el-form-item>
                        <el-form-item label="各项社会保险费：" prop="premiums" :rules="$rules.premiums">
                            <el-input v-model="personalIncome.premiums"></el-input>
                        </el-form-item>
                        <el-form-item class="button_box">
                            <el-button type="primary" @click="submitForm('personalIncome')">计算</el-button>
                            <el-button class="reset" @click="resetForm('personalIncome')">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="result_box">
                        <p>计算结果</p>
                        <p>应纳税所得额：{{result.income}}元</p>
                        <p>适用税率：{{result.taxRate}}%</p>
                        <p>速算扣除数：{{result.fastMoney}}元</p>
                        <p>应缴税款：{{result.payable}}元</p>
                        <p>实发工资：{{result.Payroll}}元</p>
                    </div>
                </div>
            </div>
            <div class="content" v-if="is_down_box">
                <div  class="big_box">
                    <a class="btn_box" @click="down_text">下载报表</a>
                    <pre v-html="content"></pre>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {Navigation, SearchInput, Banner} from '../../components/public'
    import {riskAssessment} from '../../api'
    import Api from '../../api/upload';
    let formData = new FormData();
    export default {
        name: "risk-assessment",
        components: {
            Navigation,
            SearchInput,
            Banner
        },
        data() {
            return {
                fileList: [],
                personalIncome:{},
                isshow:{
                    first:true,
                    two:true,
                    three:true,
                },
                result:{
                   income:0,//应纳税所得额
                   taxRate:0,//适用税率
                   fastMoney:0,//速算扣除数
                    payable:0,//应缴税款
                    Payroll:0,//实发工资
                },
                ruleForm: {
                    work:'',
                    work_category:"",
                    vat_paid:"",
                    cit_paid:"",
                    sales_revenue_input:"",
                },
                category:{},
                get_sub_category:{},
                param:"",
                is_down_box:false,
                content:"",
                uuid:""
            };
        },
        watch:{
            'ruleForm.work'(val){
                this.sub_category(val);
            },
        },
      created(){
            this.get_category()
      },
        methods: {
            cash_download(){
                window.open(this.$helper.utils.api+"/api/recruit/analyze/cash_flow_sheet_download");
            },
            profit_download(){
                window.open(this.$helper.utils.api+"/api/recruit/analyze/profit_statement_download");
            },
            balance_download(){
                window.open(this.$helper.utils.api+"/api/recruit/analyze/balance_sheet_download");
            },
            //1级分类
            get_category(){
                riskAssessment.get_category().then((res)=>{
                    if(res.status == 1){
                        this.category=res.data
                    }
                })
            },
            sub_category(code){
                riskAssessment.sub_category({
                    code:code
                }).then((res)=>{
                    if(res.status == 1){
                        this.get_sub_category=res.data
                    }
                })
            },
            down_text(){
                window.open(this.$helper.utils.api+"/api/recruit/analyze/export_report"+"?uuid="+this.uuid);
            },
            submitForm(formName) {
                if(this.personalIncome.grossPay=="0"||this.personalIncome.grossPay=="0.0"||this.personalIncome.grossPay=="0.00"||this.personalIncome.grossPay<5000){
                    this.$message.error("请输入大于5000的金额")
                    return false
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let money=this.personalIncome.grossPay*1-this.personalIncome.premiums*1-5000 //应纳税所得额
                        let Getmoney=this.personalIncome.grossPay*1//应该发的工资
                        let Getmoneygold=this.personalIncome.premiums*1//五险一金
                        this.result.income=this.personalIncome.grossPay*1-this.personalIncome.premiums*1-5000
                        if(money<=2910){
                           this.result.taxRate=3
                           this.result.fastMoney=0
                            this.result.payable=money*0.3
                            this.result.Payroll=Getmoney-Getmoneygold-this.result.payable
                        }else if(money>2910&&money<=11010){
                            this.result.taxRate=10
                            this.result.fastMoney=210
                            this.result.payable=money*0.1-210
                            this.result.Payroll=Getmoney-Getmoneygold-this.result.payable
                        }else if(money>11010&&money<=21410){
                            this.result.taxRate=20
                            this.result.fastMoney=1410
                            this.result.payable=money*0.2-1410
                            this.result.Payroll=Getmoney-Getmoneygold-this.result.payable
                        }else if(money>21410&&money<=28910){
                            this.result.taxRate=25
                            this.result.fastMoney=2660
                            this.result.payable=money*0.25-2660
                            this.result.Payroll=Getmoney-Getmoneygold-this.result.payable
                        }else if(money>28910&&money<=42910){
                            this.result.taxRate=30
                            this.result.fastMoney=4410
                            this.result.payable=money*0.3-4410
                            this.result.Payroll=Getmoney-Getmoneygold-this.result.payable
                        }else if(money>42910&&money<=59160){
                            this.result.taxRate=35
                            this.result.fastMoney=4410
                            this.result.payable=money*0.35-7160
                            this.result.Payroll=Getmoney-Getmoneygold-this.result.payable
                        }else{
                            this.result.taxRate=45
                            this.result.fastMoney=15160
                            this.result.payable=money*0.45-15160
                            this.result.Payroll=Getmoney-Getmoneygold-this.result.payable
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.result.income=0
                this.result.taxRate=0
                this.result.fastMoney=0
                this.result.payable=0
                this.result.Payroll=0
                this.ruleForm.work=""
                this.ruleForm.work_category=""
                this.fileList=[]
                this.$refs[formName].resetFields();
            },
            beforeUpload(file) {
                formData.append("balance_sheet", file, file.name);
            },
            beforeUpload1(file) {
                formData.append('profit_statement', file, file.name);
            },
            beforeUpload2(file) {
                formData.append('cash_flow_sheet', file, file.name);
            },
            beforeRemove(file, fileList) {},
            submit(formName) {
                if(this.ruleForm.vat_paid=="0"||this.ruleForm.vat_paid=="0.0"||this.ruleForm.vat_paid=="0.00"){
                    this.$message.error("请输入大于0的金额")
                    return false
                }
                if(this.ruleForm.cit_paid=="0"||this.ruleForm.cit_paid=="0.0"||this.ruleForm.cit_paid=="0.00"){
                    this.$message.error("请输入大于0的金额")
                    return false
                }
                if(this.ruleForm.sales_revenue_input=="0"||this.ruleForm.sales_revenue_input=="0.0"||this.ruleForm.sales_revenue_input=="0.00"){
                    this.$message.error("请输入大于0的金额")
                    return false
                }
                formData.append("category_id",this.ruleForm.work_category);
                formData.append("vat_paid",this.ruleForm.vat_paid);
                formData.append("cit_paid",this.ruleForm.cit_paid);
                formData.append("sales_revenue_input",this.ruleForm.sales_revenue_input);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        Api.analyze(formData).then((res)=>{
                            if(res.data.status == 1){
                                this.content=res.data.data.doc
                                this.uuid=res.data.data.uuid
                                this.is_down_box=true
                                this.resetForm('ruleForm')
                            }else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .riskAssessment_page {
        .mains{
            margin-top: 30px;
            .result_box{
                p{
                    font-size: 14px;
                }
                &+p:first-child{
                    font-weight: bold;
                }
            }
            .right_box{
                float: right;
                border: 1px solid #DFDFDF;
                padding: 20px;
                width: 40%;
                .title_box{
                    text-align: center;
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
            }
            .left_box{
                float: left;
                border: 1px solid #DFDFDF;
                padding: 20px;
                width: 50%;
                .down_box{
                    float: left;
                    position: absolute;
                    top: 0;
                    left: 89px;
                    color: #303f9f;
                    cursor: pointer;
                    &:hover{
                        text-decoration:underline;
                    }
                }
                .title_box{
                    text-align: center;
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .left_title_box{
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .updata_box{
                    position: relative;
                    .el-button--primary{
                        background-color: #303f9f!important;
                        border-color: #303f9f!important;
                    }
                    .el-button--once_primary{
                        background-color: #999!important;
                        border-color: #999!important;
                        color: white;
                    }
                }
            }
            .button_box{
                .reset{
                    background-color: #999999!important;
                    border-color: #999999!important;
                    color: white;
                    padding: 13px 50px;
                }
                .el-button--primary{
                    background-color: #f44336!important;
                    border-color: #f44336!important;
                    color: white;
                    padding: 13px 50px;
                }
            }
            .content{
                border: 1px solid #DFDFDF;
                width: 100%;
                margin-top: 30px;
                .big_box{
                    padding: 20px;
                    .first_box{
                        text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    p{
                        margin: 0;
                    }
                }
                .btn_box{
                    background-color: #303f9f;
                    border-color: #303f9f;
                    color: #fff;
                    padding: 13px 50px;
                    font-size: 14px;
                    border-radius: 4px;
                    display: inline-block;
                }
            }
        }

    }

</style>
