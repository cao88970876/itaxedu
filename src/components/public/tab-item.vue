<template>
    <li class="tab-tem" v-show="viewId===$parent.viewActive && show">
        <slot></slot>
    </li>
</template>

<script>
    /**
     * tab组件子组件
     *
     * @property heading [string] tab页标题，默认'默认标签'
     * @property show [boolean] 是否显示该标签页，默认true
     */
    export default {
        name: "tab-item",
        props: {
            heading: {
                type: String,
                default: '默认标签'
            },
            show: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                viewId: 0
            }
        },
        mounted() {
            let headingList = this.$parent.headingList
            if (headingList instanceof Array)
                headingList.push(this.heading)
        }
    }
</script>

<style scoped>
</style>
