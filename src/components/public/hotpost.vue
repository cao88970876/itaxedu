<template>
    <div class="index-panel work">
        <div class="index-panel-body">
            <ul class="clear">
                <li class="left clear"  v-for="(item,index) in recruits" :key="index" @click="GoDetails(item.id)">
                    <div class="clear">
                        <div class="left work-title" v-if="activeName*1==1">{{item.name}}</div>
                        <div class="left work-title" v-if="activeName*1==2">{{item.position_name}}</div>
                        <div class="right work-date">{{item.add_time |timeFilter('MM月DD日')}}</div>
                    </div>
                    <div class="work-info">{{item.province}} | {{item.city}} | {{item.work_experience}} | {{item.education}}</div>
                    <div class="work-type">
                        <ul class="clear">
                            <li class="left" v-for="n in item.categories ">{{n.name}}</li>
                        </ul>
                    </div>
                    <div class="clear work-company">
                        <img class="left company-img" :src="imgPath+item.shop.logo"/>
                        <div class="left company-block">
                            <div class="company-name" v-if="activeName*1==1">{{item.shop.institution}}</div>
                            <div class="company-name" v-if="activeName*1==2">{{item.name}}</div>
                            <div class="clear">
                                <div class="left company-info">{{item.shop.financing}} | {{item.shop.scale}} | {{item.shop.business}}</div>
                                <div class="right current-price" v-if="activeName*1==1">{{item.salary_min}}K-{{item.salary_max}}K</div>
                                <div class="right current-price" v-if="activeName*1==2">￥{{item.money}}</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="icon search-null"  v-if="!recruits.length"></div>
        </div>
    </div>
</template>
<script>
    import {utilsApi} from '../../api'
    export default {
        name: "hotpost",
        props: {
            recruits: {
                type: "",
                default: ''
            },
            activeName:""
        },
        data() {
            return {
                imgPath: utilsApi.api,
            }
        },
        methods:{
            GoDetails(id){
                if(this.activeName*1==2){
                    this.$router.push({name: 'recruitTaskDetails', query: {id:id}});
                }else {
                    this.$router.push({name: 'recruitDetails', query: {id:id}});

                }
            }
        },

    }
</script>
<style lang="scss" scoped >
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";
    .work {
        .icon.search-null {
            background: url(../../assets/image/ic_33.png) no-repeat 50%;
            background-size: contain;
        }
        .search-null{
            display: block;
            width: 302px;
            height: 190px;
            margin: 200px auto;
        }
    .index-panel-body > ul {
    @include panelUl(385px, 145px, '3n+1');
    & > li {
          padding: 10px;
    }
        & > li:hover {
            cursor: pointer;
        }
    }
    &-title {
         font-size: 14px;
         font-weight: bold;
     }
    &-date, &-info {
                 color: #999;
             }
    &-info {
         margin-top: 5px;
     }
    &-type ul {
         margin-top: 8px;
         list-style: none;
    li {
        background-color: #f3f3f3;
        border-radius: 3px;
        padding: 2px 8px;

    & + li {
          margin-left: 8px;
      }
    }
    }
    &-company {
         margin-top: 12px;

    .company-img {
        width: 45px;
        height: 45px;
        margin-right: 5px;
        border-radius: 5px;
    }

    .company-block {
        width: 315px;
    }

    .company-name {
        font-weight: bold;
        margin: 6px 0;
    }
    .company-info {
        color: #999;
    }
    }

    }
</style>
