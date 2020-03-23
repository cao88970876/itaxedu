<template>
    <div class="examEntrance">
        <!--导航-->
        <navigation class="mt-20"></navigation>
        <follow-box :id="this.$route.query.address_id || '179'"></follow-box>
        <div class="follow-nav clear mt-20">
            <router-link class="left" :to="{path: 'examNote', query: { address_id: this.$route.query.address_id || '179'}}">考试须知</router-link>
            <router-link class="left" :to="{path: 'examinfor', query: { address_id: this.$route.query.address_id || '179'}}">完善信息</router-link>
            <router-link class="left" :to="{path: 'examStudy', query: { address_id: this.$route.query.address_id || '179'}}">课程学习</router-link>
            <router-link class="left" :to="{path: 'examCertificate', query: { address_id: this.$route.query.address_id || '179'}}">生成证书</router-link>
            <router-link class="left" :to="{path: 'examEntrance', query: { address_id: this.$route.query.address_id || '179'}}">考试</router-link>
        </div>
        <div class="entranceBox">
            <div v-for="(i, index) in entranceList" :key="index" @click="openEntrance(i.id)"><img :src="i.pic" :alt="i.name" :data-id="i.id"></div>
        </div>
    </div>
</template>
<script>
import {Navigation,followBox} from '../../components/public'
import {examApi} from '../../api'
export default {
    name: "examEntrance",
    components: {Navigation,followBox},
    data() {
        return{
            userInfo: this.$helper.utils.storage.get('userInfo') || {},
            entranceList: [
                {
                    pic: require('../../assets/image/entrance1.png'),
                    name: '基础会计',
                    id:'6'
                },
                {
                    pic: require('../../assets/image/entrance2.png'),
                    name: '实操会计',
                    id:'7'
                },
                {
                    pic: require('../../assets/image/entrance3.png'),
                    name: '实操财务',
                    id:'8'
                },
                {
                    pic: require('../../assets/image/entrance4.png'),
                    name: '高端会计',
                    id:'9'
                },
                {
                    pic: require('../../assets/image/entrance5.png'),
                    name: '高端财务',
                    id:'10'
                },
                {
                    pic: require('../../assets/image/entrance6.png'),
                    name: '高端税务',
                    id:'11'
                },
            ]
        }
    },
    methods: {
        openEntrance(trid){
            examApi.openEntrance({
                uid: this.userInfo.uid,
                trid: trid
            }).then(resp => {
                if (resp.status === 1) {
                    window.open('http://test.itaxedu.com/' + resp.data, '_blank');
                } else {
                    this.$message({
                        message: resp['msg'],
                        type: 'error'
                    });
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/constant";
    @import "../../assets/scss/mixin";

    .examEntrance{
        .follow-nav {
            padding-left: 20px;
            height: 32px;
            border-bottom: 1px solid #E9E9E9;
            font-size: 18px;
            a {
                color: #333;
                display: block;
                height: 32px;
                box-sizing: border-box;
                border-bottom-right-radius: 2px;
                border-bottom-left-radius: 2px;
                &.router-link-active {
                    color: $fontColorRed;
                    border-bottom: 4px solid #E60012;
                }
                &:hover {
                    color: $fontColorRed;
                }
                & + a {
                    margin-left: 69px;
                }
            }
            
        }
        .entranceBox{
            display: flex;
            flex-flow: row wrap;
            align-content: flex-start;
            margin-bottom: 130px;
            padding: 45px 34px 0;
            div{
                width: 283px;
                height: 128px;
                cursor: pointer;
                margin-bottom: 35px;
                img{
                    display: block;
                    width: 248px;
                    height: 128px;
                    margin: 0 auto;
                }
            }
        }
        
        
    }
</style>

