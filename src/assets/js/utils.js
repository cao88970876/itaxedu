/*
* author: lints
* date: 2018-06-28
* description: 公共方法，常量等全局配置
* */
import Vue from 'vue';
import ajax from './axios.package'

const utils = {
    // api: 'http://itaxedu.com',
   api: 'http://119.57.167.245:8080',
    appkey: '3265393086',
    storage: {
        get: function (str) {
            return JSON.parse(sessionStorage.getItem(str))
        },
        set: function (str, data) {
            sessionStorage.setItem(str, JSON.stringify(data))
        }
    },
    trim(val) {
        //去除字符串中的空格
        return val.replace(/\s/g, "")
    },
    autoPrefix(obj) {
        const keys = Object.keys(obj)
        for (let i of keys) {
            obj[i] = this.api + obj[i]
        }
    },
    urlParam(url, params) {
        let keys = Object.keys(params)
        let strArr = url.split('/')
        let result = ''
        strArr.forEach(i => {
            if (i[0] === ':') {
                keys.forEach(j => {
                    if (j === i.substring(1, i.length)) {
                        i = params[j].toString()
                    }
                })
            }
            result += i + '/'
        })
        return result.substring(0, result.length - 1)
    },
    createApi(options) {
        let _this = this
        let result = {}
        let funNames = Object.keys(options)
        funNames.forEach(name => {
            result[name] = obj => {
                const method = options[name][0]
                let url = _this.api + options[name][1]
                if (obj)
                    url = this.urlParam(url, obj)
                return ajax[method](url, obj)
            }
        })
        return result
    }
};


export default utils;
Vue.prototype.$utils = utils;
