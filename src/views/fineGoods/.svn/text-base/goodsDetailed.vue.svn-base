<template>
    <div class="goodsDetailed_page page-content">
        <!--导航-->
        <div>
            <navigation></navigation>
        </div>
        <!--搜索-->
        <div class="goodsDetailed_search">
            <search-input v-model="keyword" @search="search"></search-input>
        </div>
        <div class="goodsDetailed_buy">
            <div class="goodsDetailed_show">
                <div class="show_goods">
                    <img :src="currentImg" alt="">
                </div>
                <div class="show_list">
                    <div v-for="item in goods_show" @click="tabImg(item)"
                         :class="{'active': currentImg===imgPath+item}"><img :src="imgPath+item" alt=""></div>
                </div>
            </div>
            <div class="goodsDetailed_detail">
                <div class="goods_name">
                    <div class="name" v-text="goodsDetails.name"></div>
                    <div class="buyNum"><span v-text="goodsDetails.buy_num"></span>人已购买</div>
                </div>
                <div class="goods_one">
                    <!--一级标题-->
                    <div class="category" v-text="goodsDetails.spec_name_one">
                    </div>
                    <ul class="category_one clear">
                        <!--<div class="left pointer" @click="checkedOne(item)">{{item.name}}</div>-->
                        <li class="left pointer" v-for="item in speci" :class="{'active':checkOne===item.spec_id}">
                            <label @click="checkedOne(item)">
                                <input type="radio" :value="item.spec_id" v-model="checkOne"/>
                                <span v-text="item.name"></span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="goods_one">
                    <!--&lt;!&ndash;二级标题&ndash;&gt;-->
                    <div class="category" v-text="goodsDetails.spec_name_two">
                    </div>
                    <ul class="category_one clear">
                        <!--<div class="left pointer" @click="checkedOne(item)">{{item.name}}</div>-->
                        <li class="left pointer" v-for="item in twoSpeciList"
                            :class="{'active':checkTwo===item.spec_id}">
                            <label @click="checkedTwo(item)">
                                <input type="radio" :value="item.spec_id" v-model="checkTwo"/>
                                <span v-text="item.name"></span>
                            </label>
                        </li>
                    </ul>
                </div>

                <div class="buy_number">
                    <div class="number">购买个数</div>
                    <div class="goods_number">
                        <el-input-number size="mini" v-model="num1" :min="1"></el-input-number>
                    </div>
                </div>
                <div class="goods_price">
                    <span class="newPrice money" v-text="newPrice*100*num1/100"></span>
                    <span v-if="goodsDetails.discounts_price!==''" class="oldPrice money" v-text="oldPrice"></span>
                </div>
                <div class="info">
                    <div class="info-ctrl">
                        <ul class="clear">
                            <li class="left" @click="setCollect"><a>
                                <span class="icon star"
                                      :class="{'star-active':goodsDetails.is_collect===1||goodsDetails.is_collect===true}"></span>收藏</a>
                            </li>
                            <li class="left" @click="Talk"><a><span class="icon waiter"></span>客服</a></li>
                            <li class="left"
                                @click="$router.push({name:'storeCourse',params:{id:goodsDetails.shop_uid}})"><a><span
                                class="icon shoppe"></span>店铺</a></li>
                        </ul>
                    </div>
                    <div class="info-share">
                        <dl class="clear">
                            <dt class="left">分享</dt>
                            <!--<dd class="left"><a><span class="icon we-friend"></span></a></dd>-->
                            <!--<dd class="left"><a><span class="icon we-circle"></span></a></dd>-->
                            <dd class="left" @click="sharePage('weBlog')"><a><span class="icon weblog"></span></a></dd>
                            <dd class="left" @click="sharePage('qq')"><a><span class="icon qq"></span></a></dd>
                        </dl>
                    </div>
                    <div class="clear buy">
                        <a class="left" @click="addCart">加入购物车</a>
                        <a class="left" @click="immediately">立即购买</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="goods_details_tab">
            <tab :active="0">
                <tab-item heading="商品详情" class="goods_details_jieshao">
                    <div class="course-introduction">
                        <div class="temp">
                            <div class="temp-text" v-html="goodsDetails.intros">
                            </div>
                        </div>
                    </div>
                </tab-item>
                <tab-item heading="商品评论" class="goods_details_comment">
                    <div class="answer_mains">
                        <div class="answer_problem">
                            <ul>
                                <li v-for="item in commentList">
                                    <div class="answerList">
                                        <div class="header_img">
                                            <img :src="imgPath+item.face">
                                        </div>
                                        <div class="answer_name" v-text="item.nickname">
                                        </div>
                                        <div class="answer_time">
                                            {{item.add_time | timeFilter}}
                                        </div>
                                    </div>
                                    <div v-text="item.contents">
                                    </div>
                                    <div class="answer_showImg">
                                        <!--零时样式-->
                                        <div v-for="item1 in item.img_data">
                                            <img :src="imgPath+item1" @click="enlarge(item1)">
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </tab-item>
            </tab>
        </div>

        <self-modal :modal-width="600" :show.sync="showModal">
            <div slot="modal-heading" style="height: 600px;">
                <img :src="imgPath+imgShow" alt="" style="width:100%;height: 100%;">
            </div>
        </self-modal>
        <self-modal :show.sync="loginTip">
            <div class="pb-30">
                <div class="login-tip">欢迎来到中财讯</div>
                <div class="modal-btn">
                    <a class="pointer" @click="$router.push({name: 'login'})">去登录</a>
                    <a class="pointer ml-20" @click="loginTip=false">先看看</a>
                </div>
            </div>
        </self-modal>
    </div>
</template>
<script>
    import {Navigation, SearchInput, SelfModal} from '../../components/public'
    import tab from '../../components/public/tab'
    import tabItem from '../../components/public/tab-item'
    import api from '@/api/goodsApi';
    import utils from '../../assets/js/utils';
    import {commonApi, utilsApi} from '../../api'

    export default {
        name: "goods-detailed",
        components: {
            Navigation,
            SearchInput,
            tab,
            tabItem,
            SelfModal,
        },
        data() {
            return {
                keyword: '',
                loginTip: false,
                imgShow: '',
                showModal: false,
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
                imgPath: utils.api,
                num1: '',
                id: '',
                //商品内容
                goodsDetails: {},
                sec_spec: [],
                goods_show: [],
                commentList: [],
                comment_show: [],
                //1级规格
                speci: [],
                //2级规格
                twoSpeciList: [],
                newPrice: '',
                oldPrice: '',
                checkOne: {},
                checkTwo: '',
                currentImg: '',
                //商品数量
                goods_count: '',
            };
        },
        methods: {
            Talk() {
                if (this.userInfo.uid === this.goodsDetails.shop_uid) {
                    this.$message.error("你不能与自己聊天")
                    return false
                }
                this.$router.push({name: 'chat', query: {friendId: this.goodsDetails.shop_uid}})
            },
            immediately() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return false
                }
                if ((this.goodsDetails.stock_num - this.goodsDetails.sales_num) <= 0) {
                    this.$message.error("商品库存不足")
                    return false
                } else {
                    this.$router.push({
                        name: 'singleGoods',
                        query: {id: this.id, num: this.num1, speci_id: this.checkTwo}
                    })
                }
            },
            //添加到购物车
            addCart() {
                console.log(this.checkTwo)
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                api.addcarts({
                    //商品id
                    goods_id: this.id,
                    num: this.num1,
                    spec_id: this.checkTwo,
                    //商品的规格
                    //商品数量
                }).then((res) => {
                    if (res.status === 1) {
                        this.$message.success(res.msg);
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            //一级分类
            checkedOne(item) {
                if (item.son) {
                    this.twoSpeciList = item.son
                    this.checkTwo = this.twoSpeciList[0].spec_id
                    this.newPrice = this.twoSpeciList[0].discounts_price
                    this.oldPrice = this.twoSpeciList[0].price
                    this.goods_count = this.twoSpeciList[0].stock_num
                } else {
                    this.newPrice = this.goodsDetails.discounts_price
                    this.oldPrice = this.goodsDetails.price

                }
            },
            //二级分类
            checkedTwo(item) {
                this.newPrice = item.discounts_price
                this.oldPrice = item.price
            },
            //收藏        是否收藏 1已收藏 0未收藏
            setCollect() {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                console.log(this.id)
                api.addCollect({
                    goods_id: this.id,
                    uid: this.userInfo.uid,
                }).then((res) => {
                    // this.goodsDetails.is_collect = 1

                    this.goodsDetails.is_collect = !this.goodsDetails.is_collect;
                })
            },

            sharePage(type) {
                if (!this.userInfo.uid) {
                    this.loginTip = true
                    return
                }
                let _this = this
                commonApi.shareContent({
                    uid: this.userInfo.uid,
                }).then(resp => {
                    if (resp.status === 1) {
                        let params = {
                            url: encodeURIComponent(location.href),
                            title: encodeURIComponent(_this.goodsDetails.name),
                            content: encodeURIComponent('iTax智能财税共享服务平台'),
                            pic: utils.api + _this.goods_show[0],
                        }
                        let shareUrl = {
                            qq: `http://connect.qq.com/widget/shareqq/index.html?url=${params.url}&title=${params.title}&desc=${params.content}&pics=${params.pic}`,
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
            },
            enlarge(item) {
                this.showModal = true
                this.imgShow = item
            },
            tabImg(item) {
                this.currentImg = utilsApi.api + item
            },
            search() {
                this.$router.push({name: 'searchGoods', params: {keyword: this.searchStr}})
            },

        },
        mounted() {
            this.id = this.$route.query.id;
            //商品内容
            console.log("用户UID", this.userInfo.uid,)
            api.goodsDetails({
                goods_id: this.id,
                uid: this.userInfo.uid,
            }).then((res) => {
                if (res.status === 1) {
                    this.goods_show = res.data.img_data
                    //详细的 商品
                    this.goodsDetails = res.data
                    this.currentImg = utilsApi.api + this.goods_show[0]
                    console.log("详细的商品", this.goodsDetails)
                    //1级规格
                    this.goods_count = res.data.stock_num
                    if (res.data.goods_spec.length > 0) {
                        this.speci = res.data.goods_spec
                        this.checkOne = this.speci[0].spec_id
                        this.checkedOne(this.speci[0])
                        // this.goods_count = this.speci[0].spec_id
                        return
                    }
                    this.newPrice = res.data.discounts_price
                    this.oldPrice = res.data.price

                    // console.log("1级规格", res.data.goods_spec)
                    // if (this.goodsDetails.spec_name_one === '') {
                    //     this.newPrice = this.goodsDetails.discounts_price
                    //     this.oldPrice = this.goodsDetails.price
                    // }
                }
            });
            //评论
            api.goodsComment({
                goods_id: this.id
            }).then((res) => {
                this.commentList = res.data.data
            });
        },

    }
</script>
<style lang="scss">
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .goodsDetailed_page {
        .goodsDetailed_search {
            margin-top: 20px;
        }
        .goodsDetailed_buy {
            margin-top: 30px;
            display: flex;
            padding-bottom: 10px;
            border-bottom: 4px solid #f1f1f1;
            .goodsDetailed_show {
                width: 400px;
                height: 510px;
                .show_goods {
                    background: #999999;
                    width: 100%;
                    height: 400px;
                    @include imgCover();
                }
                .show_list {
                    margin-top: 10px;
                    display: flex;
                    div + div {
                        margin-left: 10px;
                    }
                    div {
                        width: 91px;
                        height: 100px;
                        background: #999999;
                        @include imgCover();
                        &.active {
                            border: 2px solid #303f9f;
                        }
                    }
                }
            }
            .goodsDetailed_detail {
                flex: 1;
                height: 510px;
                margin-left: 20px;
                .goods_name {
                    .name {
                        font-size: 20px;
                        color: #333333;
                        letter-spacing: -0.77px;
                    }
                    .buyNum {
                        margin-top: 5px;
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: -0.48px;
                    }
                }
                .goods_one {
                    height: 50px;
                    margin-top: 10px;
                    .category {
                        font-size: 14px;
                        color: #333333;
                    }
                    .category_one {
                        margin-top: 5px;
                        li {
                            margin-left: 10px;
                            background: #F3F3F3;
                            border-radius: 4px;
                            color: #333333;
                            padding: 5px 10px;
                            text-align: center;
                            label {
                                width: 100%;
                                height: 100%;
                                input[type=radio] {
                                    display: none;
                                }
                            }
                        }
                        .active {
                            border: 1px solid #f44336;
                            color: #f44336;
                            background: #ffff;
                        }
                    }

                }
            }
            .goods_two {
                margin-top: 10px;
                .spec {
                    color: #333333;
                    font-size: 14px;
                }
                .spec_one {
                    display: flex;
                    margin-top: 5px;
                    & div {
                        margin-left: 10px;
                        background: #F3F3F3;
                        border-radius: 4px;
                        color: #333333;
                        padding: 5px 10px;
                        text-align: center;
                    }
                    .active {
                        border: 1px solid #f44336;
                        color: #f44336;
                        background: #ffff;
                    }
                }
            }
            .buy_number {
                margin-top: 10px;
                .number {
                    font-size: 14px;
                    color: #333333;
                }
                .goods_number {
                    padding: 5px 0 0 10px
                }
            }
            .goods_price {
                margin-top: 20px;
                .newPrice {
                    color: #F44336;
                    letter-spacing: -0.72px;
                    font-size: 20px;
                }
                .oldPrice {
                    margin-left: 10px;
                    letter-spacing: -0.72px;
                    font-size: 20px;
                    color: #999999;
                    text-decoration: line-through;
                }
            }
            .info {
                margin-top: 20px;
                &-ctrl {
                    ul {
                        list-style: none;
                        background-color: #f1f1f1;
                        display: inline-block;
                        padding: 7px 15px;
                        border-radius: 5px;

                        li {
                            a {
                                color: #666;
                                font-size: 14px;
                                line-height: 22px;
                                cursor: pointer;
                            }
                            span.icon {
                                vertical-align: bottom;
                                margin-right: 5px;
                                @include size(22px, 22px);
                            }
                            & + li {
                                margin-left: 10px;

                                a {
                                    margin-left: 10px;
                                }

                                &:before {
                                    content: '';
                                    display: block;
                                    @include size(1px, 21px);
                                    margin-top: 1px;
                                    background-color: #666;
                                    color: #666;
                                    float: left;
                                }
                            }
                        }
                    }
                }
                &-share {
                    dl {
                        dt {
                            line-height: 40px;
                            font-size: 14px;
                        }
                        dd {
                            margin: 0 0 0 10px;
                            a {
                                cursor: pointer;
                            }
                        }
                    }
                    .icon {
                        @include size(40px, 40px);
                    }
                }
                .buy {
                    a {
                        display: inline-block;
                        font-size: 16px;
                        color: #fff;
                        background-color: $fontColorBlue;
                        padding: 10px 35px;
                        border-radius: 5px;
                        cursor: pointer;

                        &:nth-of-type(2) {
                            margin-left: 10px;
                            background-color: $fontColorRed;
                        }
                    }
                }
            }
        }
        .goods_details_tab {
            .goods_details_jieshao {
                padding-top: 15px;
                .course-introduction {
                    margin-top: 10px;
                    .temp-text {
                        line-height: 20px;
                        img {
                            max-width: 100%;
                            object-fit: cover;
                        }
                    }
                    .temp-img {
                        height: 300px;
                        background-color: #ccc;
                        margin: 10px 0;
                    }
                    .file {
                        box-sizing: border-box;
                        @include size(400px, 100px);
                        border: 1px solid #f1f1f1;
                        border-radius: 5px;
                        padding: 10px;
                        position: relative;

                        &-name {
                            width: 295px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        &-icon {
                            width: 80px;
                            height: 80px;
                            @include size(80px, 80px);
                            background-color: #ccc;
                            border-radius: 5px;
                        }
                        .size {
                            position: absolute;
                            left: 10px;
                            bottom: 10px;
                            color: #aaa;
                        }
                    }
                }
            }
            .goods_details_comment {
                .answer_mains {
                    padding: 15px 0;
                    .answer_problem {
                        ul {
                            margin-top: 10px;
                            list-style: none;
                            li {
                                margin-top: 10px;
                                padding-bottom: 20px;
                                border-bottom: 2px solid #f1f1f1;
                                .answerList {
                                    display: flex;
                                    margin-bottom: 10px;
                                    .header_img {
                                        width: 80px;
                                        height: 80px;
                                        background: #999999;
                                        border-radius: 50%;
                                        img {
                                            @include size(100%, 100%);
                                            border-radius: 50%;
                                        }

                                    }
                                    .answer_name {
                                        width: 124px;
                                        padding-left: 10px;
                                        height: 60px;
                                        line-height: 60px;
                                        font-weight: bold;
                                    }
                                    .answer_time {
                                        color: #999999;
                                        margin-left: 880px;

                                    }
                                }
                                .answer_showImg {
                                    margin-top: 10px;
                                    display: flex;
                                    div {
                                        width: 100px;
                                        height: 100px;
                                        background: #999999;
                                        margin-right: 10px;
                                        img {
                                            @include size(100%, 100%);
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }

        }
        .login-tip {
            text-align: center;
            line-height: 55px;
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
    }


</style>
