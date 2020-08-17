<template>
    <div class="exampage">
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


        <!-- 首次进入考试 -->
        <div class="firstTime-box clear" v-if="firstTime">
            <div class="examPage-firstTime">
                <div class="icon rili left"></div>
                <span class="left">{{ kaoshi }}年度考试</span>
                <div class="icon kaoshi left"></div>
                <span class="left">考试状态：
                    <span style="color:#E60012;" v-if="examType == 0">未参加</span>
                    <span style="color:#1687EF;" v-if="examType == 2">及格</span>
                    <span style="color:#E60012;" v-if="examType == 1">不及格</span>
                </span>
            </div>
            <div class="firstTime-item clear">
                <p><span>试卷总分：{{ exaTotal }}分</span><span>考试时间：{{ exaTime }}分钟</span></p>
                <p><span>及格分数：{{ exapass }}分</span><span>已考试次数：{{ exaCount }}次</span></p>
                <p>允许考试时间段：{{ exaNum[0] }}至{{ exaNum[1] }}</p>
                <div class="btn" :class="{disable : disable}" @click="runExam">开始考试</div>
                <div class="btn review" @click="examList">往期考试</div>
            </div>
        </div>


        <!-- 考试列表 -->
        <div class="data-box clear" v-if="!firstTime">
            <div class="data-list clear" v-if="dataNot">
                <examPage-item class="left" v-for="item in dataList" :key="item.id" :course-item="item"></examPage-item>
            </div>
            <!-- <pagination :pageInfo="pageInfo" @change-page="changePage" v-if="dataNot"></pagination> -->

            <div class="dataNot" v-if="!dataNot"><img src="../../assets/image/examPage-notBg.png"><p>您还没有考试记录</p></div>
        </div>


    </div>
</template>
<script>
import {Navigation,followBox,examPageItem,Pagination} from '../../components/public'
import {contentApi,examApi} from '../../api'
export default {
    name: "examPage",
    components: {Navigation,followBox,examPageItem,Pagination},
    data(){
        return{
            exaTotal: '',
            exaTime: '',
            exapass: '',
            exaNum: ['',''],
            exaCount: 0,
            basicid: '',
            disable: false,
            basicclosed:0,
            kaoshi: '',
            examType: 0,
            firstTime:true,
            dataNot: true,
            userInfo: this.$helper.utils.storage.get('userInfo') || {},
            dataList: [],
            pageInfo: {
                total: 0,
                pageSize: 3,
                currentPage: 1
            },
            // categoryId: '',
            // type: 10,
        }
    },
    mounted() {
        let $this = this;
        $this.getForm();
        $this.xueFenType();
        $this.firstType();
        $this.timeOut();
    },
    methods: {
        timeOut() {
            let $this = this
            setTimeout(function(){
                if($this.examType == 2){
                    $this.disable = true;
                }
            },500);
        },
        firstType() {
            const $this = this;
            examApi.basic({
                uid: this.userInfo.uid,
            }).then(resp => {
                if (resp.status === 1) {
                    // this.pageInfo.total = resp.data.total * 1;

                    let dataLenght = resp.data;
                    if(dataLenght.lenght != 0){
                        let data = resp.data[0];
                        if(data.child.status == 0){
                            this.basicid = data.basicid;
                            this.kaoshi = data.daytime;
                            this.examType = data.child.status;
                            this.exaTotal = data.child.examsetting.score;
                            this.exaTime = data.child.examsetting.examtime;
                            this.exapass = data.child.examsetting.passscore;
                            this.exaNum[0] = this.time(data.basicexam.opentime.start);
                            this.exaNum[1] = this.time(data.basicexam.opentime.end);
                        }else{
                            this.basicid = data.basicid;
                            this.kaoshi = data.daytime;
                            this.exaCount = data.count;
                            this.examType = data.child[0].status;
                            this.exaTotal = data.child[0].ehsetting.examsetting.score;
                            this.exaTime = data.child[0].ehsetting.examsetting.examtime;
                            this.exapass = data.child[0].ehsetting.examsetting.passscore;
                            this.exaNum[0] = this.time(data.basicexam.opentime.start);
                            this.exaNum[1] = this.time(data.basicexam.opentime.end);
                        }
                    }else{
                        this.firstTime = false;
                        this.dataNot = false;
                    }
                    // let dataList = $this.dataList;
                } else {
                    this.firstTime = true;
                }
            });
        },
        examList() {
            let $this = this;
            $this.firstTime = false;
            examApi.wqBasic({
                uid: $this.userInfo.uid,
            }).then(resp => {
                if (resp.status === 1) {
                    let data = resp.data;
                    if(data.lenght != 0){
                        $this.dataList = data;
                    }else{
                        $this.dataNot = false;
                    }

                } else {
                    $this.dataList = [];
                    $this.dataNot = false;
                }
            });
        },
        runExam(){
            if(this.disable == false){
                examApi.xuefenSign({
                    uid: this.userInfo.uid,
                    basicid: this.basicid
                }).then(resp => {
                    if (resp.status === 1) {
                        window.open(resp.data);
                    } else {
                        this.$message({
                            message: resp['msg'],
                            type: 'error'
                        });
                    }
                });
            }
        },
        xueFenType() {
            examApi.xueFenType({
                uid: this.userInfo.uid,//
                address_id: this.$route.query.address_id
            }).then(resp => {
                if (resp.status === 1) {
                    resp.data.time >= 50 ? this.disable = false : this.disable = true;
                } else {
                    this.disable = true;
                }
            });
        },
        getForm() {
            examApi.getForm({
                uid: this.userInfo.uid,
            }).then(resp => {
                if (resp.status === 1) {
                    resp.data.is_complete == 1 ? this.disable = false : this.disable = true;
                } else {
                    this.disable = true;
                }
            });
        },
        time(time) {
            let date = new Date(time * 1000);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y+M+D
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
    .data-list{
        padding-top: 40px;
    }
    .dataNot{
        margin: 119px auto 300px;
        width: 332px;
        img{
            display: block;
            width: 332px;
            height: 245px;
            margin-bottom: 30px;
        }
        p{
            font-size: 18px;
            color: #999;
            text-align: center;
        }
    }
    .firstTime-box{
        .examPage-firstTime{
            overflow: hidden;
            font-size: 17px;
            padding: 44px 0 30px;
            .rili{
                @include size (17px, 17px);
                margin-right: 8px;
                margin-top: 3px;
            }
            .kaoshi{
                @include size (17px, 17px);
                margin-right: 8px;
                margin-left: 63px;
                margin-top: 3px;
            }
        }
        .firstTime-item{
            width: 100%;
            height: 398px;
            box-shadow: 0px 0px 10px #AEAEAE;
            border-radius: 4px;
            padding-top: 58px;
            box-sizing: border-box;
            position: relative;
            p{
                display: block;
                width: 373px;
                color: #333;
                font-size: 16px;
                margin: 0 auto 30px;
                span{
                    display: inline-block;
                    text-align: left;
                    &:first-child{
                        width: 225px;
                    }
                }
                &:nth-child(3){
                    margin-bottom: 54px;
                }
            }
            .btn{
                display: block;
                margin: 0 auto;
                width: 245px;
                height: 44px;
                border-radius: 4px;
                color: #fff;
                background-color: #303F9F;
                font-size: 16px;
                text-align: center;
                line-height: 44px;
                cursor: pointer;
                &.disable{
                    background-color: #C5C5C5;
                    cursor: not-allowed;
                }
            }
            .review{
                position: absolute;
                right: 10px;
                top: 10px;
            }
        }
    }

</style>

