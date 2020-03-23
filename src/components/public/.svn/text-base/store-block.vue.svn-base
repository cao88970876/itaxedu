<template>
    <div class="store-block shadow-default clear">
        <div class="store-img temp-img left">
            <img :src="face"/>
        </div>
        <div class="store-name left ml-15" v-text="storeObj.name">商铺名称</div>
        <div class="store-income right mr-20 mt-20">
            <a class="pointer" @click="toRouter">进入店铺</a>
        </div>
    </div>
</template>

<script>
    import {utilsApi} from '../../api'

    /**
     * props
     *          to          [object]    路由配置
     *          store-obj [obj]         店铺信息
     *                  name
     *                  face
     */
    export default {
        name: "store-block",
        props: {
            to: Object,
            storeObj: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                imgPath: utilsApi.api
            }
        },
        computed: {
            face() {
                if (this.storeObj.face) {
                    return utilsApi.api + this.storeObj.face
                }
                return null
            }
        },
        methods: {
            toRouter() {
                if (this.to && this.to.name) {
                    this.$router.push(this.to)
                } else {
                    this.$emit('click')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .store-block {
        @include borderBox();
        @include size(100%, 100px);
        border-radius: 10px;
        padding: 10px;

        .store-img {
            @include size(80px);
            border-radius: 10px;
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
        .store-income {
            a {
                display: block;
                padding: 10px 20px;
                color: #fff;
                border-radius: 5px;
                background-color: $fontColorBlue;
            }
        }
    }
</style>
