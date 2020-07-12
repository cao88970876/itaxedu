<template>
    <div class="examCertificate">
        <!--导航-->
        <navigation class="mt-20"></navigation>
        <follow-box :id="this.$route.query.address_id"></follow-box>
        <div class="follow-nav clear mt-20">
            <router-link class="left" :to="{path: 'examNote', query: { address_id: this.$route.query.address_id}}">规则须知</router-link>
            <router-link class="left" :to="{path: 'examinfor', query: { address_id: this.$route.query.address_id}}">完善信息</router-link>
            <router-link class="left" :to="{path: 'examStudy', query: { address_id: this.$route.query.address_id}}">课程学习</router-link>
            <router-link class="left" v-if="this.$route.query.address_id == '10450'" :to="{path: 'examEntrance', query: { address_id: this.$route.query.address_id || '179'}}">考试</router-link>
            <router-link class="left" :to="{path: 'examCertificate', query: { address_id: this.$route.query.address_id}}">生成证书</router-link>
            
        </div>


        <div class="examCerDate">
            <span>时间：</span>
            <el-date-picker
                v-model="starDate"
                @change="dateChange"
                type="year"
                placeholder="请选择起始年份">
            </el-date-picker>
        </div>

        <div class="data-list clear">
            <examCer-item class="left" v-for="item in dataList" :key="item.id" :course-item="item" :address-id="$route.query.address_id" @showExamAlert="showExamAlert"></examCer-item>
        </div>
        <examCerAlert v-show="Alert" :pic="AlertPic" @examCloseClick="examCloseClick()"></examCerAlert>
    </div>
</template>
<script>
import {Navigation,followBox,examCerItem,examCerAlert} from '../../components/public'
import {contentApi,examApi} from '../../api'
export default {
    name: "examCertificate",
    components: {Navigation,followBox,examCerItem,examCerAlert},
    data(){
        return{
            Alert: false,
            AlertPic: '',
            CerAlertImg:'',
            starDate: '',
            dataNot: true,
            userInfo: this.$helper.utils.storage.get('userInfo') || {},
            dataList: [],
            pageInfo: {
                total: 0,
                pageSize: 8,
                currentPage: 1
            },
            // categoryId: '',
            // type: 10,
        }
    },
    mounted() {
        this.getList();
    },

    methods: {
        dateChange(){
            let starDate = Math.round(new Date(this.starDate) / 1000);
            examApi.xuefenHistory({
                uid: this.userInfo.uid,
                date: starDate,
                address_id: this.$route.query.address_id
            }).then(resp => {
                if (resp.status === 1) {
                    this.dataList = resp.data;
                } else {
                    this.dataList = [];
                    this.$message({
                        message: resp['msg'],
                        type: 'error'
                    });
                }
            });
        },
        showExamAlert(data){
            this.AlertPic = data;
            this.Alert = true;
        },
        examCloseClick(){
            this.Alert = false;
        },
        getList() {
            examApi.xuefenHistory({
                uid: this.userInfo.uid,
                address_id: this.$route.query.address_id
            }).then(resp => {
                if (resp.status === 1) {
                    this.dataList = resp.data;
                } else {
                    this.dataList = [];
                    this.$message({
                        message: resp['msg'],
                        type: 'error'
                    });
                }
            });
        },
        // 去考试
        runExam() {
            if(!this.disable) this.$router.push({path: 'examNote', query: { id: this.$route.query.address_id}})
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
    .examCerDate{
        padding-top: 32px;
        span{
            font-size: 16px;
            color: #333;
        }
    }

    .data-list{
        padding-top: 40px;
    }
    .data-list>.examCer-item {
        margin: 0 0 46px 46px;
    }
    .data-list>.examCer-item:nth-of-type(4n+1){
        margin-left: 0;
    }


</style>
