<template>
    <transition name="modal">
        <div class="self-modal" v-show="isShow">
            <div class="modal-shadow"></div>
            <a class="modal-container" @click="clickShadow($event)">
                <div class="modal" :style="{width: `${modalWidth}px`,'margin-top':`${marginTop}px`}">
                    <slot name="modal-heading" >
                        <div class="modal-heading">
                            <span v-text="heading"></span>
                            <span class="icon modal-close pointer" @click="closeModal"></span>
                        </div>
                    </slot>
                    <slot></slot>
                </div>
            </a>
        </div>
    </transition>
</template>

<script>
    /**
     * prop
     *          modal-width  [number]     宽度
     *          margin-top   [number]     顶部距离
     *          heading       [string]      标题
     *          show.sync    [boolean]    是否显示
     *
     * slot
     *          default                         模态框自定义内容
     *          modal-heading                模态框自定义头部
     *
     * event
     *          click-shadow                  点击模态框外部事出发
     *          close                         点击关闭按钮事件
     */
    export default {
        name: "self-modal",
        props: {
            shadowClickClose:{
                type: Boolean,
                default: true
            },
            modalWidth: {
                type: Number,
                default: 400
            },
            heading: String,
            show: {
                type: Boolean,
                default: false
            },
            marginTop: {
                type: Number,
                default: 80,
            },
        },
        data() {
            return {
                isShow: false
            }
        },
        mounted() {
            this.isShow = this.show
        },
        methods: {
            closeModal() {
                this.isShow = false
                this.$emit('update:show', false)
                this.$emit('close')
                // debugger
            },
            clickShadow(e) {
                this.recursion(e.target)
            },
            recursion(obj) {
                const root = this.$el.querySelector('.modal')
                if (obj) {
                    if (obj === root) {
                        return
                    } else {
                        this.recursion(obj.parentElement)
                    }
                } else {
                    if(this.shadowClickClose){
                        this.closeModal()
                    }
                    this.$emit('click-shadow')
                }
            }
        },
        watch: {
            show(v1, v2) {
                if (v1 !== v2) {
                    this.isShow = v1
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixin";

    .modal-enter-active, .modal-leave-active {
        transition: opacity .3s;
    }

    .modal-enter, .modal-leave-to {
        opacity: 0;
    }

    .self-modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;

        .modal-shadow {
            @include size(100%);
            position: absolute;
            background-color: #000;
            opacity: .75;
        }
        .modal-container {
            position: absolute;
            overflow: auto;
            @include size(100%);

            .modal {
                background-color: #fff;
                margin: 80px auto 30px;
                border-radius: 5px;
            }

            .modal-heading {
                $height: 46px;

                position: relative;
                text-align: center;
                font-size: 16px;
                height: $height;
                line-height: $height;
                border-bottom: 1px solid #f1f1f1;

                .modal-close {
                    @include size (26px);
                    position: absolute;
                    right: 10px;
                    top: 10px
                }
            }
        }
    }
</style>
