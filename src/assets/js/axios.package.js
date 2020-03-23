/**
 * author: lints
 * date: 2018-06-15
 * description: axios封装
 * */
import axios from 'axios';
import qs from 'qs';
import utils from './utils.js'
//公共请求部分配置
axios.defaults.baseURL = utils.api;
// axios.defaults.headers['logintoken'] = utils.storage.get('userInfo').logintoken;

const ajax = {
    post: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data))
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    get: function (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    put: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, qs.stringify(data))
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    del: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.delete(url, qs.stringify(data))
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }
};

// 请求拦截器
axios.interceptors.request.use((config) => {
    // config.headers={
    //         // 'Content-Type': 'multipart/form-data',
    //         logintoken:utils.storage.get('userInfo') ? utils.storage.get('userInfo').logintoken : null
    //     }
    config.headers.logintoken =utils.storage.get('userInfo') ? utils.storage.get('userInfo').logintoken : null
    return config;
}, function (error) {
    // vm.loading.close();
    // Toast('请求失败！');
    return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(function (response) {
    // vm.loading.close();
    if (response.data.status===100) {
        sessionStorage.removeItem('userInfo')
        vm.$router.replace({name: 'login'})
    }
    return response;
}, function (error) {
    // vm.loading.close();
    // Toast('获取数据失败！');
    return Promise.reject(error);
});

export default ajax;
