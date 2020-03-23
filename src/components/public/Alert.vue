<template>
    <section class="alert-wrapper" @touchmove.stop v-show="show">
        <div class="alert-content">
            <div class="title_box">提示</div>
            <div v-if="title" class="title">{{title}}</div>
            <div class="content">{{ message }}<slot></slot></div>
            <div class="button-group">
                <div class="cancel pointer" @click="cancelClick">{{ cancelText }}</div>
                <div class="confirm pointer" @click="confirmClick">{{ confirmText }}</div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            message: {
                type: String,
                default: ''
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            confirmText: {
                type: String,
                default: '确定'
            },
            show: {
                type: Boolean,
                required: true
            }
        },
        model: {
            prop: 'show',
            event: 'handleShow'
        },
        methods: {
            cancelClick() {
                this.$emit('handleShow', false)
                this.$emit('cancel')
            },
            confirmClick() {
                this.$emit('handleShow', false)
                this.$emit('confirm')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .alert-wrapper {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0,0,0,0.50);
        z-index: 99;
        .alert-content {
            background: #fff;
            border-radius: .16rem;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            .title{
                font-size:14px;
                font-weight: 600;
                color:#333;
                border-bottom:1px solid rgba(0,0,0,0.06);
                padding: 0.2rem 0;
                text-align: center;
            }
            .title_box{
                padding: 10px 0;
                background: #E5E5E5;
                text-align: center;
                font-size: 16px;
                color: #333333;
            }
            .content {
                padding: 16px 43px;
                font-size: 14px;
                line-height:24px;
                text-align: center;
            }
            .button-group {
                border-top: 1px solid rgba(#000, .06);
                display: flex;
                align-items: center;
                font-size:15px;
                height: 50px;
                line-height: 50px;
                .cancel {
                    flex: 1;
                    text-align: center;
                    border-right: 2px solid #fdfdfd;
                    color: #999;
                }
                .confirm {
                    flex: 1;
                    text-align: center;
                    color: #F44336;
                }
            }
        }
    }
</style>
