<template>
    <div class="makeMoney_page">
        <div class="title">
            邀请赚取佣金
        </div>
        <div class="accumulative clear">
            <div class="howMake left">
                <div>已累计获得佣金(元)</div>
                <div v-text="moneyAll.money_sum"></div>
            </div>
            <div class="friends right" @click="invitation">邀请好友</div>
        </div>
        <div class="mains">
            <!--左边-->
            <div class="account">
                <div class="title clear">
                    <div class="left">历史收益</div>
                    <div class="right"><span class="el-icon-arrow-left"></span><span>1</span>/<span>12</span><span
                        class="el-icon-arrow-right"></span></div>
                </div>
                <div class="accountList">
                    <ul>
                        <li class="clear" v-for="item in myAccount">
                            <div class="left" v-text="item.group_by"></div>
                            <div class="left" v-text="item.remark"></div>
                            <div class="right"><span>+</span><span class="money" v-text="item.money"></span></div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--右边-->
            <div class="member">
                <div class="title clear">
                    <div class="left">我的会员</div>
                    <div class="right"><span class="el-icon-arrow-left"></span><span>1</span>/<span>12</span><span
                        class="el-icon-arrow-right"></span></div>
                </div>
                <div class="memberList">
                    <div>
                        <ul>
                            <li class="clear" v-for="item in myMember" @click="$router.push({name:'hisMember',query:{id:item.uid}})">
                                <div class="header_face left">
                                    <img :src="imgPath+item.face" alt="">
                                </div>
                                <div class="user_name left">
                                    <div class="name" v-text="item.nickname">
                                    </div>
                                    <div class="phone" v-text="item.phone">
                                    </div>
                                </div>
                                <div class="price right">
                                    <span class="money" v-text="item.get_money_sum"></span><span class="el-icon-arrow-right"></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <self-modal :modal-width="380" :show.sync="showModal" class="popup">
            <div slot="modal-heading">
                <div class="title">
                    分享
                </div>
            </div>
            <div class="info-share">
                <dl class="clear">
                    <!--<dd class="left"><a><span class="icon we-friend"></span></a></dd>-->
                    <!--<dd class="left"><a><span class="icon we-circle"></span></a></dd>-->
                    <dd class="left" @click="sharePage('weBlog')"><a><span class="icon weblog"></span></a></dd>
                    <dd class="left" @click="sharePage('qq')"><a><span class="icon qq"></span></a></dd>
                </dl>
            </div>
            <div class="btn">
                <button @click="shareBtn">取消</button>
            </div>
        </self-modal>
    </div>
</template>

<script>
    import {SelfModal} from '../../../components/public'
    import {myTaskApi,commonApi} from '../../../api'
    import utils from '../../../assets/js/utils';
    export default {
        name: "make-money-home",
        components: {SelfModal},
        data() {
            return {
                imgPath: utils.api,
                showModal: false,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                pageInfo: {
                    pageSize: 10,
                    total: 1,
                    currentPage: 1
                },
                myAccount: [],
                myMember:[],
                moneyAll:{}
            }
        },
        mounted() {
            this.getMoneyList()
            this.getAccountList()

        },
        methods: {
            invitation() {
                this.showModal = true
            },
            shareBtn() {
                this.showModal = false
            },
            getAccountList() {
                myTaskApi.getMyAccount({
                    uid: this.userInfo.uid,
                }).then((res) => {
                    if (res.status === 1) {
                        console.log("账户", res.data)
                        res.data.forEach(val=>{
                            this.myAccount = val.data
                        })
                    }
                })
            },
            getMoneyList() {
                myTaskApi.makeMoney().then((res) => {
                    if (res.status === 1){
                        console.log("会员", res.data)
                        this.myMember=res.data.users
                        this.moneyAll = res.data
                    }
                });
            },
            sharePage(type) {
                let _this = this
                commonApi.shareContent({
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        let params = {
                            url: encodeURIComponent(`http://zhongcaixun.zpftech.com/pc/#/register?distribution=${_this.userInfo.uid}`),
                            title: encodeURIComponent(_this.userInfo.nickname+"邀请您一起赚取佣金"),
                            content: encodeURIComponent('iTax智能财税共享服务平台'),
                            // pic: utils.api + _this.projectDetails.thumb,
                        }
                        let shareUrl = {
                            qq: `http://connect.qq.com/widget/shareqq/index.html?url=${params.url}&title=${params.title}&summary=${params.content}&pics=${params.pic}`,
                            weBlog: `http://service.weibo.com/share/share.php?url=${params.url}&title=${params.title}&content=${params.content}&pic=${params.pic}&appkey=${utils.api.appkey}`,
                        }
                        window.open(shareUrl[type], '_blank')
                    } else {
                        this.$message({
                            message: resp.msg,
                            type: 'error'
                        })
                    }
                })
            }


        }

    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/constant";
    @import "../../../assets/scss/mixin";

    .makeMoney_page {
        .title {
            padding: 15px 20px;
            font-size: 18px;
            color: #666666;
            border-bottom: 1px solid #f1f1f1;
        }
        .accumulative {
            padding: 5px 20px;
            border-bottom: 1px solid #f1f1f1;
            .howMake {
                div:nth-child(1) {
                    color: #999999;
                }
                div:nth-child(2) {
                    color: #f44336;
                    font-size: 20px;
                }
            }
            .friends {
                width: 120px;
                height: 40px;
                border-radius: 4px;
                background: #f44336;
                color: #ffffff;
                font-size: 16px;
                text-align: center;
                line-height: 40px;
                font-weight: bold;
            }
        }
        .mains {
            padding: 20px;
            display: flex;
            .account {
                width: 503px;
                margin-right: 20px;
                .title {
                    color: #ffffff;
                    padding: 5px 10px;
                    height: 25px;
                    background: #303f9f;
                    font-size: 14px;
                    line-height: 25px;
                    border-radius: 4px;
                }
                .accountList {
                    ul {
                        border: 1px solid #f1f1f1;
                        li {
                            border-bottom: 1px solid #f1f1f1;
                            padding: 8px 10px;
                            div:nth-child(1) {
                                color: #999999;
                                margin-right: 40px;
                            }
                            div:nth-child(2) {
                                color: #000000;
                            }
                            div:nth-child(3) {
                                color: #f44336;
                            }
                        }
                        li:hover {
                            background: #f1f1f1;
                        }
                    }
                }
            }
            .member {
                width: 503px;
                .title {
                    color: #ffffff;
                    padding: 5px 10px;
                    height: 25px;
                    background: #f44336;
                    font-size: 14px;
                    line-height: 25px;
                    border-radius: 4px;

                }
                .memberList {
                    ul {
                        li {
                            padding: 10px;
                            border-bottom: 1px solid #f1f1f1;
                            .header_face {
                                width: 50px;
                                height: 50px;
                                margin-right: 10px;
                                background: #999999;
                                img {
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                }
                            }
                            .user_name {
                                .name {
                                    color: #333333;
                                    font-weight: bold;
                                    margin-bottom: 20px;
                                }
                                .phone {
                                    color: #999999;
                                }
                            }
                            .price {
                                line-height: 50px;
                                span:nth-child(1) {
                                    color: #f44336;
                                    font-size: 14px;
                                    font-weight: bold;
                                }
                                span:nth-child(2) {
                                    color: #999999;
                                    font-size: 20px;
                                    font-weight: bold;
                                }

                            }
                        }
                        li:hover {
                            background: #f1f1f1;
                        }
                    }
                }
            }

        }
        .popup {
            padding-bottom: 50px;
            .title {
                font-size: 20px;
                font-weight: bold;
                border-bottom: 1px solid #f1f1f1;
                text-align: center;
            }
            .info-share {
                dl {
                    padding-left: 99px;
                    dt {
                        line-height: 40px;
                        font-size: 20px;
                    }
                    dd {
                        margin: 0 0 0 20px;
                        a {
                            cursor: pointer;
                        }
                    }
                }
                .icon {
                    @include size(60px, 60px);
                }
            }
            .btn {
                text-align: center;
                padding: 30px 0 50px 0;
                button {
                    width: 120px;
                    height: 40px;
                    border-radius: 4px;
                    text-align: center;
                    line-height: 40px;
                    outline: none;
                    border: 0;
                    background: #303f9f;
                    color: #ffffff;
                }
            }
        }

    }
</style>
