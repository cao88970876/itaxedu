<template>
    <div class="noAnswerDetails_page">
        <div class="header">
            未回答详情
        </div>
        <div class="mains">
            <div class="answer_users clear">
                <div class="left">
                    <img :src="imgPath+questions.face" alt="">
                </div>
                <div class="left" v-text="questions.nickname">提问人的名字</div>
                <div class="right">{{questions.add_time | timeFilter }}</div>
            </div>
            <div class="questions_content" style="word-wrap: break-word" v-text="questions.contents">提问内容</div>
            <div class="questions_show">
                <div v-for="item in questions_show">
                    <img :src="imgPath+item" alt="" @click="enlarge(item)">
                </div>
            </div>
            <!--如果没人回答的时候可以点击取消-->
            <div class="dont" @click="$router.push({name:'myImmediatel',query: {id:id}})">
                立即回答
            </div>
        </div>
        <self-modal :modal-width="600" :show.sync="showModal">
            <div slot="modal-heading" style="height: 600px;">
                <img :src="imgPath+imgShow" alt="" style="width:100%;height: 100%;">
            </div>
        </self-modal>
    </div>
</template>

<script>
    import {myTaskApi} from '../../../api'
    import utils from '../../../assets/js/utils';
    import {SelfModal} from '../../../components/public'
    export default {
        name: "no-answer-details",
        components: {
            SelfModal
        },
        data() {
            return {
                imgShow: '',
                showModal:false,
                imgPath: utils.api,
                id: '',
                questions: {
                    answers: [],
                },
                questions_show: [],
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            myTaskApi.expertNoAnswer({
                id: this.id
            }).then((res) => {
                this.questions = res.data
                console.log(res.data.status)
                this.questions_show = res.data.img_data
                console.log("我的问题详情", res.data)
            })
        },
        methods:{
            enlarge(item) {
                this.showModal = true
                this.imgShow = item
            },
        }
    }
</script>

<style lang="scss" scoped>
    .noAnswerDetails_page {
        .header {
            padding: 20px;
            border-bottom: 1px solid #f1f1f1;
        }
        .mains {
            padding: 20px;
            .answer_users {

                margin-bottom: 15px;
                div:nth-child(1) {
                    width: 60px;
                    height: 60px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
                div:nth-child(2) {
                    line-height: 60px;
                    margin-left: 10px;
                    color: #333333;
                    font-size: 14px;
                    font-weight: bold;
                }
                div:nth-child(3) {
                    line-height: 60px;
                }
            }
            .questions_show {
                margin-top: 15px;
                display: flex;
                div {
                    width: 100px;
                    height: 100px;
                    background: #999999;
                    img {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }
                }
                div + div {
                    margin-left: 10px;
                }
            }
            .dont {
                margin: 50px 0 100px 20px;
                width: 200px;
                height: 40px;
                background: #f44336;
                color: #f1f1f1;
                border-radius: 4px;
                text-align: center;
                line-height: 40px;
            }
        }

    }
</style>
