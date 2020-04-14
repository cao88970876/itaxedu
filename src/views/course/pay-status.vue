<template>
    <div class="pay-status" v-show="haveShowed">
        <div class="pay-success" v-show="payStatus">
            <div class="title">支付成功</div>
            <div class="status-icon">
                <div class="icon pay-success"></div>
                <div class="">恭喜您支付成功</div>
            </div>
            <div class="ctrl-btn">
                <a v-if="isGive" @click="openGive">立即转赠</a>
                <a v-else @click="goBackCourse">立即查看</a>
            </div>
        </div>
        <div class="pay-failed" v-show="!payStatus">
            <div class="title">支付失败</div>
            <div class="status-icon">
                <div class="icon pay-failed"></div>
                <div class="">支付失败</div>
            </div>
            <div class="ctrl-btn">
                <a @click="goBackCourse">重新支付</a>
            </div>
        </div>
        <self-modal :show.sync="giveShow">
            <div slot="modal-heading">
                <div @click="accountGive" class="give-btn pointer">
                    <div>有账号</div>
                    <div>输入账号转赠</div>
                </div>
                <div @click="shareGive" class="give-btn pointer border-t">
                    <div>无账号</div>
                    <div>分享转赠</div>
                </div>
            </div>
        </self-modal>
        <self-modal heading="账号转赠" :show.sync="accountGiveModal">
            <div class="p-20">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="手机号码" :rules="[{required: true,message: '该项不能为空'},{pattern: /^1[345789]\d{9}$/,message:'请输入正确的手机号码'}]" prop="tel">
                        <el-input v-model="form.tel" placeholder="请输入要转赠他人手机号码"></el-input>
                    </el-form-item>
                </el-form>
                <div class="modal-btn">
                    <a class="pointer" @click="accountGiveModal = false">取消</a>
                    <a class="pointer ml-20" @click="accountSubmit">确定</a>
                </div>
            </div>
        </self-modal>
        <self-modal heading="分享转赠" :show.sync="giveShowModal">
            <div class="share-icon p-20">
                <a @click="giving('weBlog')"><span class="icon weblog"></span></a>
                <a @click="giving('qq')" class="ml-20"><span class="icon qq"></span></a>
            </div>
        </self-modal>
    </div>
</template>

<script>
    import {SelfModal} from "../../components/public";
    import {payApi, contentApi, utilsApi, commonApi} from "../../api"

    export default {
        name: "pay-status",
        components: {SelfModal},
        data() {
            return {
                payStatus: true,
                orderNum: null,
                courseId: this.$route.params.courseId,
                // 接口查询完成后显示
                haveShowed: false,
                isGive: this.$route.query.isGive,
                orderId: this.$route.query.orderId,
                giveShow: false,
                accountGiveModal: false,
                giveShowModal: false,
                userInfo: this.$helper.utils.storage.get('userInfo')||{},
                courseDetail: {},
                form: {
                    tel: '',
                },
                giveType: 1,
            }
        },
        created() {
            this.orderNum = this.$route.params.orderNum
            this.getOrderStatus()
            contentApi.courseDetail({id: this.courseId}).then(resp => {
                if (resp.status === 1) {
                    this.courseDetail = resp.data
                } else {
                    this.$message({
                        message: resp.msg,
                        type: 'error'
                    })
                }
            })
        },
        methods: {
            getOrderStatus() {
                payApi.findOrderByNo({
                    order_num: this.orderNum,
                    type: 1,
                }).then(resp => {
                    if (resp.status === 1) {
                        // data.status 1.已支付  2.未支付
                        this.payStatus = resp.data.status === 1
                    } else {
                        this.payStatus = false
                    }
                    this.haveShowed = true
                })
            },
            goBackCourse() {
                let routeName
                switch (this.courseDetail.type) {
                    case 1: {
                        routeName = 'liveCourseDetail'
                        break;
                    }
                    case 2: {
                        routeName = 'videoCourseDetail'
                        break;
                    }
                    case 3: {
                        routeName = 'downlineCourseDetail'
                        break;
                    }
                }
                this.$router.push({name: routeName, params: {courseId: this.courseId, tabId: 0}})
            },
            openGive() {
                this.giveShow=true
                this.form.tel = null
                this.$refs['form'].resetFields()
            },
            accountGive() {
                this.giveShow = false
                this.accountGiveModal = true
                this.giveType = 1
            },
            shareGive() {
                this.giveShow = false
                this.giveShowModal = true
                this.giveType = 2
            },
            sharePage(type) {
                let _this = this
                commonApi.shareContent({
                    uid: this.userInfo.uid,
                }).then(resp => {
                    let url = 'http://zhongcaixun.zpftech.com/wechat/index.html#/share/gift'
                    url += `?id=${this.courseId}`
                    url += `&uid=${this.userInfo.uid}`
                    url += `&order_id=${this.orderId}`
                    url += `&head_img=${this.userInfo.face}`
                    url += `&nickname=${this.userInfo.nickname}`
                    if (resp.status === 1) {
                        let params = {
                            url: encodeURIComponent(url),
                            title: encodeURIComponent(_this.courseDetail.title),
                            content: encodeURIComponent('iTax智能财税共享服务平台'),
                            pic: utilsApi.api + _this.courseDetail.thumb,
                        }
                        let shareUrl = {
                            qq: `http://connect.qq.com/widget/shareqq/index.html?url=${params.url}&title=${params.title}&summary=${params.content}&pics=${params.pic}`,
                            weBlog: `http://service.weibo.com/share/share.php?url=${params.url}&title=${params.title}&content=${params.content}&pic=${params.pic}&appkey=${utilsApi.appkey}`,
                        }
                        window.open(shareUrl[type], '_blank')
                    } else {
                        this.$message({
                            message: resp.msg,
                            type: 'error'
                        })
                    }
                })
            },
            accountSubmit() {
                if (this.giveType === 1) {
                    this.$refs['form'].validate((flag, obj) => {
                        if (flag) {
                            this.giving()
                        }
                    })
                }
            },
            giving(type) {
                const _this = this
                contentApi.giving({
                    uid: this.userInfo.uid,
                    course_id: this.courseId,
                    order_id: this.orderId,
                    phone: this.form.tel,
                    type: this.giveType,
                }).then(resp => {
                    if (resp.status === 1) {
                        if (this.giveType === 2) {
                            this.sharePage(type)
                        }
                        this.$message({
                            message: '转赠成功',
                            type: 'success',
                            onClose() {
                                _this.goBackCourse()
                            },
                        })
                    } else {
                        this.$message.error(resp.msg)
                    }
                })
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .pay-status {
        .pay-success,
        .pay-failed {
            .title {
                font-size: 14px;
            }
            .status-icon {
                text-align: center;
                font-size: 14px;
                margin: 80px 0 80px;

                .icon {
                    @include size(150px, 150px);
                    border-radius: 200px;
                    margin-bottom: 20px;
                }
            }
            .ctrl-btn {
                text-align: center;
                margin-bottom: 100px;
                a {
                    border: 1px solid #999;
                    font-size: 16px;
                    padding: 6px 40px;
                    border-radius: 100px;
                    cursor: pointer;
                }
            }
        }

        .border-t {
            border-top: 1px solid #ccc;
        }
        .give-btn {
            text-align: center;
            padding: 20px;
            & > div:nth-of-type(1) {
                font-size: 14px;
            }
            & > div:nth-of-type(2) {
                color: #999999;
            }
        }
        .modal-btn {
            text-align: center;
            a {
                display: inline-block;
                padding: 5px 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
        .share-icon {
            text-align: center;
            & > a {
                display: inline-block;

                &>span.icon {
                    display: block;
                    @include size(50px);
                }
            }
        }
    }
</style>
