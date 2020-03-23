<template>
    <div class="my-special-item pointer data-item" @click="$emit('click')">
        <div class="title clear">
            <div v-if="levelIcon" class="level-icon left">
                <img :src="levelIcon">
            </div>
            <div class="left" v-text="specialItem.title"></div>
            <div class="right">
                <a class="pointer"><span v-text="$filter.timeFilter(specialItem.update_time,'MM-DD HH:mm')"></span>更新</a>
            </div>
        </div>
        <div class="price clear">
            <div class="left description ellipsis" v-text="specialItem.description"
                 :title="specialItem.description"></div>
            <div class="right">
                <span class="old-price money" v-if="specialItem.price!=='0.00'" v-text="specialItem.original_price"></span>
                <span class="current-price money" v-if="specialItem.price!=='0.00'" v-text="specialItem.price"></span>
                <span class="current-price free-money" v-else>免费</span>
            </div>
        </div>
        <ul class="user-img clear">
            <li class="left" v-for="(i,index) in specialItem.teacher">
                <img class="img" :src="faces[index]"/>
                <div class="name" v-text="i.name"></div>
            </li>
        </ul>
        <div v-if="!specialItem['is_comment']" class="icon edit" @click.stop="$emit('add-comments')"></div>
    </div>
</template>

<script>
    import {utilsApi} from "../../api"

    /**
     * prop
     *      specialItem [object]        课程对象
     * event
     *      add-comments                点击评论图标时触发
     */
    export default {
        name: "my-special-item",
        props: {
            specialItem: {
                type: Object
            }
        },
        computed: {
            faces() {
                let imgs = []
                if (this.specialItem.teacher && this.specialItem.teacher.length > 0) {
                    this.specialItem.teacher.forEach(val => {
                        imgs.push(utilsApi.api + val.face)
                    })
                }
                return imgs
            },
            levelIcon() {
                if (this.specialItem.level_icon)
                    return utilsApi.api + this.specialItem.level_icon
                return null
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .my-special-item {
        @include borderBox();
        @include size(503px, 175px);
        padding: 20px 15px;
        position: relative;

        .title {
            font-size: 14px;
            font-weight: bold;

            .level-icon {
                @include size(22px, 18px);
                @include imgCover();
                margin-right: 7px;
            }
            .right {
                a {
                    display: block;
                    padding: 3px 10px;
                    border-radius: 20px;
                    border: #303f9f 1px solid;
                    color: #303f9f;
                    font-size: 12px;
                    font-weight: normal;
                }
            }
        }
        .price {
            color: #999;
            margin-top: 7px;
        }
        .user-img {
            list-style: none;
            margin-top: 10px;
            li {
                & + li {
                    margin-left: 10px;
                }
            }
            .img {
                width: 50px;
                height: 50px;
                border-radius: 30px;
                background-color: #ccc;
                overflow: hidden;
            }
            .name {
                text-align: center;
                margin-top: 3px;
            }
        }
        .description {
            width: 330px;
        }
        .icon.edit {
            @include size(14px);
            display: block;
            position: absolute;
            right: 9px;
            bottom: 7px;
        }
    }
</style>
