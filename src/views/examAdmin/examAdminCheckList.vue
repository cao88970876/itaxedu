<template>
    <div class="examAdminCheckList">
        <div class="listTit">证书列表</div>

        <div class="yearList"  v-for="year in yearList" :key="year">
            <div class="year-item">{{ year }}年度</div>
            <div class="data-list clear">
                <examCer-item class="left" v-for="item in dataList" :key="item.id" :course-item="item" @showExamAlert="showExamAlert"></examCer-item>
            </div>
        </div>
        
        <examCerAlert v-show="Alert" :pic="AlertPic" @examCloseClick="examCloseClick()"></examCerAlert>
    </div>
</template>
<script>
import {examCerItem,examCerAlert} from '../../components/public'
import {contentApi} from '../../api'
export default {
    name: "examAdminCheckList",
    components: {examCerItem,examCerAlert},
    data(){
        return{
            Alert: false,
            AlertPic: '',
            CerAlertImg:'',
            userInfo: this.$helper.utils.storage.get('userInfo') || {},
            dataList: [],
            yearList: ['2019','2018','2017'],
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
        showExamAlert(data){
            this.AlertPic = data;
            this.Alert = true;
        },
        examCloseClick(){
            this.Alert = false;
        },
        getList() {
            contentApi.courseList({
                uid: this.userInfo.uid,
                category_id: this.categoryId,
                cat: 2,
                type: this.type,
                page: this.pageInfo.currentPage,
                page_size: this.pageInfo.pageSize,
            }).then(resp => {
                console.log(resp);
                if (resp.status === 1) {
                    this.pageInfo.total = resp.data.total * 1;
                    this.dataList = resp.data.data;
                } else {
                    this.dataList = [];
                    this.pageInfo.total = 0;
                    this.$message({
                        message: resp['msg'],
                        type: 'error'
                    });
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";
    .examAdminCheckList{
        width: 1200px;
        margin: 150px auto 50px;
        .listTit{
            position: relative;
            padding-left: 12px;
            font-size: 22px;
            color: #333;
            font-weight: bold;
            margin-bottom: 30px;
            &::before{
                content: "";
                position: absolute;
                display: block;
                width: 3px;
                height: 22px;
                left: 0;
                top: 0;
                background-color: #303F9F;
            }
        }
        .year-item{
            width: 98px;
            height: 30px;
            border-radius: 15px;
            font-size: 16px;
            color: #fff;
            line-height: 30px;
            text-align: center;
            background-color: #303F9F;
            margin-bottom: 10px;
        }
        .data-list>.examCer-item {
            margin: 0 0 46px 46px;
        }
        .data-list>.examCer-item:nth-of-type(4n+1){
            margin-left: 0;
        }
    }
    
    
    
    
</style>
