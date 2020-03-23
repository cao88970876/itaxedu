<template>
    <div class="examCer-item" v-if="box">
        <div class="examCer-pic">
            <img :src="thumb" :onerror="loading">
        </div>
        <p class="examCer-text">获取时间：{{ time(courseItem.create_time) }}</p>
        <el-button class="examCer-btn" @click="examShowAlert">查看</el-button>
    </div>
</template>

<script>
    import {utilsApi,examApi} from '../../api'

    export default {
        name: "examCer-item",
        data(){
            return{
                type: 'yes',
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                thumb:'',
                loading: 'this.src="' + require('../../assets/image/blank.png') + '"',
                box: false
                
            }
        },
        props: {
            courseItem: {
                type: Object,
                required: true,
            },
            addressId: {
                type: String,
                required: true,
            }
        },
        mounted() {
            let $this = this;
            //  $this.thumb = "http://" + this.courseItem.file_path;

            examApi.xuefenCertificate({
                uid: this.userInfo.uid,
                ehid: this.courseItem.ehid,
                addressId: this.addressId
            }).then(resp => {
                if (resp.status === 1) {
                    $this.thumb = "http://" + resp.data;
                    this.box = true;
                }else{
                    this.box = false;
                    this.$message({
                        message: resp['msg'],
                        type: 'error'
                    });
                    
                }
            });
        },
        computed: {
            // thumb() {
            //     examApi.xuefenCertificate({
            //         uid: this.userInfo.uid,
            //         xuefen: this.courseItem.ehscore
            //     }).then(resp => {
            //         console.log(resp);
            //         if (resp.status === 1) {
            //             this.data ? Vue.set(data,'thumb', this.data) : null
            //         }
            //     });
            // }
        },
        methods: {
            examShowAlert() {
                this.$emit('showExamAlert',this.thumb);
            },
            time(time) {
                let date = new Date(time * 1000);
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();
                return Y+M+D+h+m+s
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";


    .examCer-item{
        width: 265px;
        height: auto;
        .examCer-pic {
            margin-bottom: 16px;
            background: #fff url("../../assets/image/loading.gif") no-repeat center;
            width: 265px;
            height: 188px;
            overflow: hidden;
            @include imgCover();
            box-shadow: 0px 0px 6px #ccc;
            border-radius: 6px;
        }
        .examCer-text{
            font-size: 16px;
            color: #333;
            text-align: center;
            margin-bottom: 17px;
        }
        .examCer-btn{
            display: block;
            margin: 0 auto;
            width: 219px;
            color: #303F9F;
            border-color: #303F9F;
        }
    }


    .examPage-item {
        width: 100%;
        height: 228px;
        box-shadow: 0px 0px 10px #AEAEAE;
        border-radius: 4px;
        margin-bottom: 42px;
        position: relative;
        .pst{
            position: absolute;
            font-size: 16px;
            color: #333;
        }
        .examPage-pic {
            background-color: #ccc;
            width: 324px;
            height: 182px;
            left: 20px;
            top: 23px;
            overflow: hidden;
            @include imgCover();
        }
        .examPage-name{
            left: 394px;
            top: 58px;
        }
        .examPage-totalScore{
            left: 594px;
            top: 58px;
        }
        .examPage-time{
            left: 794px;
            top: 58px;
        }
        .examPage-passScore{
            left: 394px;
            top: 106px;
        }
        .examPage-num{
            left: 594px;
            top: 106px;
        }
        .examPage-timeSlot{
            left: 394px;
            top: 152px;
        }
        .examPage-type{
            right: 30px;
            top: 50px;
            width: 131px;
            height: 33px;
            box-sizing: border-box;
            border-radius: 17px;
            border: 1px solid;
            text-align: center;
            line-height: 31px;
            font-size: 16px;
            &.yes{
                color: #1687EF;
                border-color:#1687EF;
            }
            &.no{
                color: #F44336;
                border-color:#F44336;
            }
        }
        .examPage-btn{
            right: 30px;
            top: 132px;
            width: 245px;
            height: 44px;
            border-radius: 4px;
            font-size: 16px;
            color: #fff;
            background-color: #303F9F;
            text-align: center;
            line-height: 44px;
        }
    }
</style>
