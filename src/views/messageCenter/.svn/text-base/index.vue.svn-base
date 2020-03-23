<template>
    <div class="index_page">
        <app-header></app-header>
        <div class="mains page-content">
            <div class="message_index">
                <ul>
                    <li>
                        <router-link :to="{name: 'system'}">
                            <div class="iconfont icon-lingdang"></div>
                            <div>通知消息</div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'logistics'}">
                            <div class="iconfont icon-c-huoche"></div>
                            <div>物流消息</div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'chatMessage'}">
                            <div class="iconfont icon-duihua"></div>
                            <div>对话消息</div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="message right">
                <router-view></router-view>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {AppHeader, AppFooter} from '../../components/public'

    export default {
        components: {AppHeader, AppFooter},
        name: "index"
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .index_page {
        .mains {
            /*width: 100%;*/
            display: flex;
            .message_index {
                ul {
                    width: 120px;
                    height: 600px;
                    li {
                        width: 100%;
                        height: 80px;
                        text-align: center;
                        padding-top: 30px;
                        a {
                            color: #999999;
                            .iconfont {
                                font-size: 20px;
                            }
                            &.router-link-active {
                                color: $fontColorRed;
                            }
                        }
                    }
                }
            }
            .message {
                flex: 1;
                border-left:1px solid #f1f1f1 ;
            }
        }

    }

</style>
