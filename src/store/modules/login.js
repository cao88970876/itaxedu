import  api from '../../api/login'
const state = {
    userinfo: {},

};

const getters = {
    // getUserinfo: state => state.userinfo,
};

const mutations = {
    setUserinfo(state, payload){
        state.userinfo = payload;
    },
};
const actions = {
    // async login(contxt,payload){
    //     let res = await api.signin(payload);
    //     if(res.status === 1){
    //         contxt.commit('setUserinfo',res.data);
    //     }
    // }
};

export default {
    namespaced: true,//启用命名空间后外部调用需要加上文件名例:login/register
    state,
    getters,
    actions,
    mutations
}
