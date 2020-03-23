<template>
    <div class="choiceFav_page">
        <div class="choiceFav_title">
            选择你感兴趣的内容
        </div>
        <div class="choiceFav_title2">
            根据你的喜好我们为你推荐相关信息
        </div>
        <div class="classification">
            <div class="title_left"></div>
            <div class="text">分类</div>
            <div class="title_rghit"></div>
        </div>
        <ul class="classification_mains">
            <li v-for="(item, index) in platform" :class="{active: checkPlatform(item.id)}">
                <label>
                    <input type="checkbox" :value="item.id" v-model="platformID"/>
                    <div v-text="item.name"></div>
                </label>
            </li>
        </ul>
        <div class="classification">
            <div class="title_left"></div>
            <div class="text">行业</div>
            <div class="title_rghit"></div>
        </div>
        <ul class="industry">
            <li v-for="item in industry" :class="{'active':checkIndustry(item.id)}">
                <label>
                    <input type="checkbox" :value="item.id" v-model="industryId"/>
                    <div v-text="item.name"></div>
                </label>
            </li>
        </ul>
        <div class="classification">
            <div class="title_left"></div>
            <div class="text">身份</div>
            <div class="title_rghit"></div>
        </div>
        <ul class="identity">
            <li v-for="item in identity" v-text="item.name" :class="{'active':identityId===item.id}"
                @click="checkIdentity(item)">
            </li>
        </ul>
        <div class="complete">
            <button class="complete_btn" @click="goIndex">完成</button>
        </div>
    </div>
</template>

<script>
    import api from '@/api/login'

    export default {
        name: "choice-fav",
        data() {
            return {
                // flag: false,
                platform: [],
                industry: [],
                identity: [],
                platformID: [],
                industryId: [],
                identityId: '',
                userInfo: this.$helper.utils.storage.get('userInfo') || {},
            }
        },
        mounted() {
            api.platformList().then((res) => {
                if (res.status === 1) {
                    console.log(res.data)
                    this.platform = res.data.data
                }
            });
            api.industryUser().then((res) => {
                if (res.status === 1) {
                    console.log(res.data)
                    this.industry = res.data.data
                }
            });
            api.identityList().then((res) => {
                if (res.status === 1) {
                    console.log(res.data)
                    this.identity = res.data.data
                }
            });
        },
        methods: {
            goIndex() {
                if (this.platformID.length > 0 && this.industryId.length > 0 && this.identityId !== '') {
                    api.goSeeIndex({
                        category_id: this.platformID,
                        tag_id: this.industryId,
                        identity_id: this.identityId,
                        uid: this.userInfo.uid
                    }).then((res) => {
                        console.log(res)
                        if (res.status === 1) {
                            this.$router.push({name: 'index'})
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                } else {
                    this.$message.error("请认真选择你感兴趣的内容")
                    return false
                }


            },
            checkPlatform(id) {
                let flag = false
                for (let i in this.platformID) {
                    flag = this.platformID[i] === id
                    if (flag) {
                        break
                    }
                }
                return flag
            },
            checkIndustry(id) {
                let flag = false
                for (let i in this.industryId) {
                    flag = this.industryId[i] === id
                    if (flag) {
                        break
                    }
                }
                return flag
            },
            checkIdentity(item) {
                this.identityId = item.id
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixin";

    .choiceFav_page {
        width: 400px;
        height: 500px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        .choiceFav_title {
            font-size: 22px;
            color: #333333;
            letter-spacing: -0.72px;
            text-align: center;
        }
        .choiceFav_title2 {
            margin-top: 30px;
            font-size: 18px;
            color: #333333;
            letter-spacing: -0.48px;
            text-align: center;
        }
        .classification {
            width: 340px;
            display: flex;
            margin: 20px auto;
            .text {
                width: 60px;
                text-align: center;
                position: relative;
                top: 10px;
                color: #999999;
                font-size: 18px;
            }
            .title_left, .title_rghit {
                flex: 1;
                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            }
        }

        .classification_mains {
            display: flex;
            flex-flow: row wrap;
            li {
                font-size: 14px;
                padding: 3px 15px;
                border: 1px solid #999999;
                border-radius: 20px;
                margin-bottom: 10px;
                cursor: pointer;
                label {
                    display: block;
                    @include size(100%);
                    & > input[type=checkbox] {
                        display: none;
                    }
                }
                & + li {
                    margin-left: 10px;
                }
                &.active {
                    background: #303F9F;
                    color: #ffff;
                }
            }
        }

        .industry {
            display: flex;
            flex-flow: row wrap;
            li {
                font-size: 14px;
                padding: 3px 15px;
                border: 1px solid #999999;
                border-radius: 20px;
                margin-bottom: 10px;
                cursor: pointer;
                label {
                    width: 100%;
                    height: 100%;
                    & > input[type=checkbox] {
                        display: none;
                    }
                }
                & + li {
                    margin-left: 10px;
                }
                &.active {
                    background: #303F9F;
                    color: #ffff;
                }
            }
        }
        .identity {
            display: flex;
            flex-flow: row wrap;
            li {
                font-size: 14px;
                padding: 3px 15px;
                border: 1px solid #999999;
                border-radius: 20px;
                margin-top: 15px;
                cursor: pointer;
                & + li {
                    margin-left: 10px;

                }
                &.active {
                    background: #303F9F;
                    color: #ffff;
                }
            }
        }
        .complete {
            text-align: center;
            margin-top: 30px;
            .complete_btn {
                border: 0;
                outline: none;
                background: #f44336;
                width: 150px;
                height: 40px;
                border-radius: 4px;
                color: #ffff;
            }
        }
    }
</style>
