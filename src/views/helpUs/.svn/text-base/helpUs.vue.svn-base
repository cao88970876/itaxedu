<template>
    <!--充值问题-->
    <div>
        <app-header></app-header>
        <div class="helpUs">
            <div class="help_btn">
                <ul class="help_list">
                    <li v-for="item in helpList" :class="{'active':item.id===OneId}" @click="seeHelp(item)">
                        <div class="icon"><img :src="imgPath+item.icon" alt=""></div>
                        <div class="text" v-text="item.title"></div>
                    </li>
                </ul>
            </div>
            <div class="help_mains">
                <div>
                    <ul>
                        <li v-for="item in mains" @click="goodsDet(item)">
                            <p v-text="item.title"></p>
                        </li>
                    </ul>
                </div>
                <div class="paging">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="10">
                    </el-pagination>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>

</template>
<script>
    import api from '@/api/helpContent'
    import utils from '../../assets/js/utils'
    import {AppHeader, AppFooter} from '../../components/public'

    export default {
        name: "help-us",
        components: {AppHeader, AppFooter},
        data() {
            return {
                helpList: [],
                imgPath: utils.api,
                mains: [],
                OneId:'',
            }
        },
        mounted() {
            this.getList().then(()=>{
                api.helpList({
                    help_cat_id: 1
                }).then((res) => {
                    this.mains = res.data.data
                    console.log(res.data)
                })
            })

        },
        methods: {
            getList() {
                return new Promise((resolve, reject) =>{
                    api.helpCate().then((res) => {
                        console.log(res.data)
                        this.helpList = res.data
                        this.OneId= res.data[0].id
                        resolve()
                    })
                })
            },
            seeHelp(item) {
                api.helpList({
                    help_cat_id: item.id
                }).then((res) => {
                    this.mains = res.data.data
                    console.log(res.data)
                })
            },
            goodsDet(item){
                this.$router.push({name:'helpDelt',query:{params:encodeURIComponent(JSON.stringify(item))}})
                console.log(item)
            },

        }

    }
</script>
<style lang="scss" scoped>
    .helpUs {
        display: flex;
        /*左边按钮*/
        .help_btn {
            width: 120px;
            height: 100%;
            .help_list {
                li {
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    padding-top: 20px;
                    cursor: pointer;
                    & .active {
                        color: #f44336;
                        border-right: 2px solid #f44336;
                    }
                    .icon {
                        width: 27px;
                        height: 27px;
                        margin: 0 auto;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .text {
                        margin: 5px auto;
                    }

                    /*a {*/
                    /*display: block;*/
                    /*font-size: 14px;*/
                    /*color: #999999;*/
                    /*position: relative;*/
                    /*.icon {*/
                    /*margin: auto;*/
                    /*width: 27px;*/
                    /*height: 27px;*/
                    /*}*/
                    /*.list_title {*/
                    /*margin: 0;*/
                    /*}*/
                    /*}*/
                    /*.router-link-active{*/
                    /*color: #f44336;*/
                    /*&:after {*/
                    /*content: '';*/
                    /*display: block;*/
                    /*width: 4px;*/
                    /*height: 60px;*/
                    /*background-color: #f44336;*/
                    /*position: absolute;*/
                    /*right: 0;*/
                    /*top:0;*/
                    /*}*/
                    /*}*/
                    /*&.recharge-q {*/
                    /*.icon {*/
                    /*background: url("../../assets/image/ic_18.png");*/
                    /*}*/
                    /*a.router-link-active {*/
                    /*.icon {*/
                    /*background: url("../../assets/image/ic_22.png");*/
                    /*}*/
                    /*}*/
                    /*}*/
                    /*&.account-q {*/
                    /*.icon {*/
                    /*background: url("../../assets/image/ic_19.png");*/
                    /*}*/
                    /*a.router-link-active {*/
                    /*.icon {*/
                    /*background: url("../../assets/image/ic_23.png");*/
                    /*}*/
                    /*}*/
                    /*}*/
                    /*&.page-q {*/
                    /*.icon {*/
                    /*background: url("../../assets/image/ic_20.png");*/
                    /*}*/
                    /*}*/
                    /*&.video-q{*/
                    /*.icon {*/
                    /*background: url("../../assets/image/ic_21.png");*/
                    /*}*/
                    /*}*/
                }

            }
        }
        /*内容*/
        .help_mains {
            flex: 1;
            height: 500px;
            padding: 20px;
            border-left: 1px solid #999999;
            font-size: 18px;
            color: #333333;
            letter-spacing: 0;
            line-height: 30px;
            position: relative;
            .paging {
                position: absolute;
                bottom: 10px;
                left: 40%;
            }
        }
    }
</style>
