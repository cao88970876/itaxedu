<template>
<div class="followBox">
    <div class="store-info mt-20 shadow-default clear">
        <div class="store-img temp-img left">
            <img v-if="storeInfo.face" :src="storeInfo.face"/>
        </div>
        <div class="store-name left ml-15" v-text="storeInfo.name">商铺名称</div>
        <div class="store-star right mr-20 mt-25">
            <a class="pointer" @click="favStore" v-if="!storeInfo.isFav">添加关注</a>
            <a class="pointer active" @click="favStore" v-if="storeInfo.isFav">取消关注</a>
        </div>
    </div>
    <div class="XuefenNotifyList" v-if="storeId =='8435' && !show">
        <div class="XuefenNotifyItem" @click="notifyPage()" :NotifyId="list.id" v-for="list in XuefenNotifyList" :key="list.id">
            {{ list.title }}
        </div>
    </div>
</div>
</template>
<script>
import {utilsApi, storeApi} from '../../api'
export default {
    name: "follow-box",
    data() {
        return{
            pageSize: 8,
            currentPage: 1,
            categoryOneId: -1,
            categoryTwoId: -1,
            userInfo: this.$helper.utils.storage.get('userInfo') || {},
            storeInfo: {},
            storeId:this.id || '179',
            XuefenNotifyList: []
        }
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        show: {
            type: Boolean,
            required: true
        }
    },
    mounted() {
        this.getStore();
        this.getXuefenNotify();
    },
    watch: {
        id(e) {
            this.storeId = this.id;
            this.getStore();
        }
    },
    methods: {
        getStore() {
            storeApi.getStore({
                uid: this.storeId,
                user_id: this.userInfo.uid,
                type: 3,
                category_id: this.categoryOneId,
                category_store_id: this.categoryTwoId,
                page_size: this.pageSize,
                page: this.currentPage,
            }).then(resp => {
                if (resp.status === 1 || resp.status === 2) {
                    this.respData = resp.data
                    this.storeInfo = {
                        name: this.respData.store_name,
                        face: utilsApi.api + this.respData.store_face,
                        isFav: this.respData.is_attention,
                    }
                }
            })
        },
        getXuefenNotify() {
            storeApi.xuefenNotify({}).then(resp => {
                if (resp.status === 1) {
                    this.XuefenNotifyList = resp.data
                }
            })
        },
        favStore() {
            storeApi.favStore({id: this.storeId}).then(resp => {
                if (resp.status === 1) {
                    this.storeInfo.isFav = this.storeInfo.isFav ? 0 : 1
                }
            })
        },
        notifyPage() {
            this.$router.push({path: 'notifyPage', query: { id: this.storeId}})
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .store-info {
        @include size(100%, 100px);
        border-radius: 10px;
        margin-bottom: 35px;
        padding: 10px;
        box-sizing: border-box;
        .store-img {
            @include size(80px);
            border-radius: 10px;
            overflow: hidden;

            img {
                @include size(100%);
                object-fit: cover;
            }
        }
        .store-name {
            line-height: 80px;
            font-weight: bold;
            font-size: 14px;
        }
        .store-star {
            a {
                display: block;
                @include size(100px, 30px);
                line-height: 30px;
                border: 1px solid #999;
                color: #999;
                border-radius: 100px;
                text-align: center;
                &.active {
                    color: #fff;
                    background-color: $fontColorRed;
                    border-color: $fontColorRed;
                }
            }
        }
    }
    .XuefenNotifyList{
        @include size(100%, auto);
        border-radius: 10px;
        margin-bottom: 30px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-flow: wrap;
        justify-content: flex-start;
        border: 1px solid #ccc;
        .XuefenNotifyItem{
            width: 50%;
            font-size: 14px;
            margin-bottom: 15px;
            cursor: pointer;
            padding-right: 40px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            align-content: center;
        }
    }
    
</style>
