<template>
    <div class="dy-tab">
        <div class="tab-heading">
            <ul>
                <li v-for="(item, index) in headingList" :style="{'width': itemWidth}" v-show="$children[index].show">
                    <a v-text="item" @click="tabView(index)" :class="{'active': viewActive===index}"></a>
                </li>
            </ul>
        </div>
        <div class="tab-body">
            <ul>
                <slot></slot>
            </ul>
        </div>
    </div>
</template>

<script>
    /**
     * tab切换组件
     *
     * @property active [number] 默认打开的tab页
     *
     * @event get-tab-id [return id] 点击tab标签时返回当前tab页面Id
     */
    export default {
        name: "tab",
        props: {
            active: Number
        },
        data() {
            return {
                headingList: [],
                itemWidth: '',
                viewActive: 0
            }
        },
        mounted() {
            this.itemWidth = 1200 / this.headingList.length + 'px'
            this.$children.forEach((val, i) => {
                val.viewId = i
            })
            this.viewActive = this.active
        },
        methods: {
            tabView(index) {
                this.viewActive = index
                this.$emit('get-tab-id', index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";

    .dy-tab {
        & > .tab-heading {
            border-bottom: 3px solid $fontColorRed;
            & > ul {
                display: flex;
                justify-content: center;
                list-style: none;

                & > li {
                    width: 200px;
                    line-height: 50px;
                    text-align: center;
                    & > a {
                        display: block;
                        cursor: pointer;
                        position: relative;
                        font-size: 16px;

                        &.active {
                            color: $fontColorRed;
                            &:after {
                                content: '';
                                display: block;
                                width: 0;
                                height: 0;
                                border-bottom: 8px solid $fontColorRed;
                                border-left: 5px solid transparent;
                                border-right: 5px solid transparent;
                                position: absolute;
                                left: 50%;
                                margin-left: -5px;
                                bottom: 0;
                            }
                        }
                    }
                }
            }
        }
        .tab-body {
            & > ul {
                list-style: none;
            }
        }
    }
</style>
