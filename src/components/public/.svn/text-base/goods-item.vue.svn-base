<template>
    <div class="goods-item pointer data-item" @click="emitClick">
        <div class="goods-img">
            <img :src="coverImg">
        </div>
        <div class="goods-info">
            <div class="name ellipsis" title="goodsItem.name" v-text="goodsItem.name"></div>
            <div class="current-price money" v-text="goodsItem.discounts_price"></div>
        </div>
    </div>
</template>

<script>
    import {utilsApi} from '../../api'

    export default {
        name: "goods-item",
        props: {
            goodsItem: {
                type: Object,
            },
            autoJump: {
                type: Boolean,
                default: true
            },
        },
        computed: {
            coverImg() {
                if (this.goodsItem.cover_img) {
                    return utilsApi.api + this.goodsItem.cover_img
                }
                return null
            },
        },
        methods: {
            emitClick() {
                this.$emit('click')
                if (this.to) {
                    this.$router.push(this.to)
                } else if (this.autoJump) {
                    this.$router.push({
                        name: 'goodsDetailed',
                        query: {
                            id: this.goodsItem.id
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixin";

    .goods-item {
        @include size(285px, 360px);

        .goods-img {
            @include imgCover();
            height: 285px;
        }
        .goods-info {
            padding: 10px;
            .name {
                margin-bottom: 6px;
            }
        }
    }
</style>
