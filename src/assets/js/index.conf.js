/**
 * author: lints
 * date: 2018-06-28
 * description: 各项组件配置文件
 * */
import Vue from 'vue';
import utils from './utils.js';
import ajax from './axios.package.js';
const helper = {
  utils,
  $get: ajax.get,
  $post: ajax.post,
  $put: ajax.put,
  $del: ajax.del,
};

Vue.prototype.$helper = helper;
