<template>
    <div class="examPage-item">
        <div class="examPage-pic pst">
            <img :src="thumb" src="../../assets/image/basicpic.png">
        </div>
        
        <div class="examPage-name pst">{{ courseItem.child[0].ehexam }}</div>
        <div class="examPage-totalScore pst">试卷总分：{{ courseItem.child[0].ehsetting.examsetting.score }}分</div>
        <div class="examPage-time pst">考试时间：{{ courseItem.child[0].ehsetting.examsetting.examtime }}分钟</div>
        <div class="examPage-passScore pst">及格分数：{{ courseItem.child[0].ehsetting.examsetting.passscore }}分</div>
        <div class="examPage-num pst">已考试次数：{{ courseItem.count }}次</div>
        <div class="examPage-timeSlot pst">允许考试时间段：{{ time(courseItem.basicexam.opentime.start) }}至{{ time(courseItem.basicexam.opentime.end) }}</div>
        <div class="examPage-type pst" :class="type">{{ type == 'yes' ? '及格' : '不及格' }}</div>
        <!-- <a class="examPage-btn pst" href="javascript:;" v-if="type == 'no'" @click="runExam()">开始考试</a> -->
    </div>
</template>

<script>
    import {utilsApi} from '../../api'

    export default {
        name: "examPage-item",
        data(){
            return{
                type: this.courseItem.child[0].status == 2 ? 'yes' : 'no',
                basicid: this.courseItem.basicid
            }
        },
        props: {
            courseItem: {
                type: Object,
                required: true,
            }
        },
        computed: {
            thumb() {
                return this.courseItem.basicpic ? this.courseItem.basicpic : null
            }
        },
        methods: {
            emitClick() {
                this.$emit('click')
                if (this.to) {
                    this.$router.push(this.to)
                } else if (this.autoJump) {
                    var names = ['liveCourseDetail', 'videoCourseDetail', 'downlineCourseDetail']
                    this.$router.push({
                        name: names[this.courseItem.type - 1],
                        params: {
                            courseId: this.courseItem.id,
                            tabId: 0,
                        }
                    })
                }
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
            display: block;
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
