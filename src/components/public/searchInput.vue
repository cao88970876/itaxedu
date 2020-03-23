<template>
    <div class="search-input clear">
        <div class="left search-left">
            <input type="text" class="left" placeholder="请输入" v-model="searchStr" @click="inputActive" @keyup.enter="searchClick">
            <transition>
                <ul class="record-list" v-show="recordShow">
                    <li class="record-tip">历史记录</li>
                    <li class="clear" v-for="(item,index) in recordList" @click="setItem(item)" v-show="itemShow(item)">
                        <span class="left" v-text="item"></span>
                        <a class="right remove" @click.stop="removeItem(index)"></a>
                    </li>
                </ul>
            </transition>
        </div>
        <a class="left" @click="searchClick"></a>
    </div>
</template>

<script>
    export default {
        name: "searchInput",
        // v-model值
        props: ['value'],
        data() {
            return {
                // 输入框文本
                searchStr: '',
                // 历史记录列表
                recordList: [],
                // 是否显示记录列表
                recordShow: false
            }
        },
        mounted() {
            this.searchStr = this.value || ''
            let searchRecordList = sessionStorage.getItem('searchRecordList')
            if (searchRecordList) {
                this.recordList = JSON.parse(searchRecordList)
            }
        },
        methods: {
            // 搜索按钮点击事件，添加历史搜索记录
            searchClick() {
                this.recordShow = false
                // 最大历史记录数量
                const maxLength = 5
                if (this.searchStr) {
                    this.recordList.unshift(this.searchStr)
                    this.recordList = Array.from(new Set(this.recordList))
                    if (this.recordList.length > maxLength) {
                        this.recordList.pop()
                    }
                    sessionStorage.setItem('searchRecordList', JSON.stringify(this.recordList))
                } else {
                    this.$message.error('请输入搜索关键字')
                    return
                }
                this.$emit('search')
            },
            // 移除单条记录
            removeItem(index) {
                this.recordList.splice(index, 1)
                sessionStorage.setItem('searchRecordList', JSON.stringify(this.recordList))
                this.recordShow = this.recordList.length
            },
            // 点击输入框，判断是否显示记录
            inputActive() {
                this.recordShow = this.recordList.length > 0
                if (this.recordShow) {
                    this.addListen()
                }
            },
            // 添加点击监听
            addListen() {
                document.body.addEventListener('click', this.clickEvent)
            },
            // 移除点击监听
            removeListen() {
                document.body.removeEventListener('click', this.clickEvent)
            },
            // 事件函数
            clickEvent(e) {
                let _this = this

                // 递归（边缘查询）
                function recursion(dom) {
                    if (dom) {
                        if (dom === _this.$el.querySelector('.search-left')) {
                            return
                        } else {
                            recursion(dom.parentElement)
                        }
                    } else {
                        _this.recordShow = false
                    }
                }

                recursion(e.target)
            },
            // 选择历史记录
            setItem(data) {
                this.searchStr = data
                this.recordShow = false
            },
            // 模糊匹配
            itemShow(data) {
                return data.indexOf(this.searchStr = this.searchStr || '') + 1
            }
        },
        // 组件销毁时移除监听
        destroyed() {
            this.removeListen()
        },
        watch: {
            // （伪）双向绑定v-model值
            searchStr(v1, v2) {
                if (v1 !== v2) {
                    this.$emit('input', this.searchStr)
                }
            },
            value(v1, v2) {
                if (v1 !== v2) {
                    this.searchStr = v1
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .search-input {
        position: relative;
        z-index: 10;
        margin: auto;
        $height: 40px;
        width: 900px;

        * {
            box-sizing: border-box;
        }
        & > .left {
            & > input {
                display: block;
                width: 800px;
                height: $height;
                outline: none;
                border-radius: 10px 0 0 10px;
                border: 0;
                background-color: #f1f1f1;
                padding: 0 10px;
            }
            & > .record-list {
                position: absolute;
                width: 785px;
                list-style: none;
                background-color: #fff;
                box-shadow: 0 6px 7px #aaa;
                left: 15px;
                top: $height;
                overflow: hidden;

                li {
                    padding: 8px;
                    font-size: 14px;
                    font-weight: bold;

                    &.record-tip {
                        color: #999;
                        font-size: 12px;
                        padding: 3px 8px;
                    }

                    & + li:hover {
                        background-color: #efefef;
                    }

                    a.remove {
                        display: block;
                        width: 19px;
                        height: 19px;
                        background: url("../../assets/image/ic_cancle.png") no-repeat 0 2px;
                        background-size: 80%;
                        cursor: pointer;
                    }
                }
            }
        }
        & > a {
            display: block;
            background: $fontColorRed url("../../assets/image/ic_3.png") no-repeat 34px 6px;
            background-size: 28%;
            width: 100px;
            height: $height;
            border-radius: 0 10px 10px 0;
            cursor: pointer;
        }

        .v-enter-active, .v-leave-active {
            transition: all .2s linear;
        }
        .v-enter {
            max-height: 0;

            &-to {
                max-height: 205px;
            }
        }
        .v-leave {
            max-height: 205px;

            &-to {
                max-height: 0;
            }
        }
    }
</style>
