import axios from 'axios';

let APiUrl = {
    //登录
    loginUrl: 'http://ch.itaxedu.com/api/user/login',
}

export default {
    //登陆
    login(obj) {
        return axios.post(APiUrl.loginUrl, {
            username: obj.username || '',
            password: obj.password || '',
            rememberme: obj.rememberme || ''
        })
    },
}