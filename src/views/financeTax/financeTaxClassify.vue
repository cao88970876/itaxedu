<template>
    <div class="financeTaxClassify_page page-content">

        <div class="financeTax_breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ name: 'financeTaxHome' }">财税库</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '' }">中国法规大全</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="classify">
            <dl class="clear">
                <dt class="left">分类:</dt>
                <dd class="left pointer"
                    v-for="item in classify"
                    :class="{'active':check===item.id}"
                    @click="checkOne(item)"
                >
                    <label>
                        <input type="radio" :value="item.id" v-model="check"/>
                        <span v-text="item.name"></span>
                    </label>
                </dd>
            </dl>
        </div>
        <div class="order-by clear mt-20">
            <ul class="order-item">
                <li class="left" @click="getCheckID()" v-for="item in checkTwo"
                    :class="{'active':checkChild===item.id}">
                    <label>
                        <input type="radio" :value="item.id" v-model="checkChild"/>
                        <span v-text="item.name"></span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="mains">
            <ul class="taxList">
                <li v-for="item in financeTaxList" @click="$router.push({name:'financeTaxDetail',query:{id:item.id}})">
                    <div class="time">{{item.create_time | timeFilter}}</div>
                    <div v-text="item.title">
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <pagination :page-info="pageInfo" @change-page="changePage"></pagination>
        </div>
    </div>
</template>

<script>
    import {Navigation, Pagination} from '../../components/public'
    import {financeTaxAPi} from '../../api'

    export default {
        name: "finance-tax-classify",
        components: {Navigation, Pagination},
        data() {
            return {
                params: {},
                classify: [],
                check: '',
                checkTwo: [],
                checkChild: '',
                pageInfo: {
                    pageSize: 10,
                    total: 1,
                    currentPage: 1
                },
                financeTaxList:[],
            }
        },
        mounted() {
            this.params = JSON.parse(decodeURIComponent(this.$route.query.params));
            console.log(this.params)
            this.classify = this.params._child
            console.log(this.classify)
            this.check = this.classify[0]
            this.checkTwo = this.classify[0]._child
            this.getCheckID();



        },
        methods: {
            checkOne(item) {
                console.log(item)
                this.checkTwo = item._child
                this.checkChild = item._child[0]['id']
                this.getCheckID();
            },
            getCheckID() {
                console.log(this.checkChild)
                financeTaxAPi.financeTax({
                    tax_catgory_id: this.checkChild,
                    page: this.pageInfo.currentPage,
                    page_size: this.pageInfo.pageSize,
                }).then((res) => {
                    if (res.status === 1) {
                        console.log(res.data)
                        this.financeTaxList=res.data.data
                        this.pageInfo.total = res.data.total * 1 || 0
                    }
                })
            },
            changePage(page) {
                this.pageInfo.currentPage = page
                this. getCheckID()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .financeTaxClassify_page {
        .financeTax_breadcrumb {
            margin-top: 30px;
        }
        & > div.classify {
            color: #bac3ff;
            font-size: 14px;
            margin-top: 10px;

            dl {
                background-color: $fontColorBlue;
                border-radius: 10px;
                margin: 0;
                dt, dd {
                    margin: 0 0 0 16px;
                    padding: 0;
                    line-height: 40px;
                }
                dd {
                    cursor: pointer;
                    label {
                        width: 100%;
                        height: 100%;
                        input[type=radio] {
                            display: none;
                        }
                    }
                    &.active {
                        color: #fff;
                    }
                }
            }
        }
        & > .order-by {
            height: 40px;
            background-color: #f1f1f1;
            .order-item {
                padding-left: 15px;
                li {
                    font-size: 14px;
                    color: #333333;
                    margin-right: 15px;
                    line-height: 40px;
                    label {
                        width: 100%;
                        height: 100%;
                        input[type=radio] {
                            display: none;
                        }
                    }
                }
                .active {
                    color: #f44336;
                }
            }

        }
        .mains {
            margin-top: 15px;
            border-top: 1px solid #f1f1f1;
            .taxList {
                padding-top: 10px;
                li {
                    border-bottom: 1px solid #f1f1f1;
                    padding: 15px 0;
                    .time {
                        color: #999999;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
</style>
