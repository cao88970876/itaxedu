// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import './assets/js/index.conf.js'
// 视频插件及样式
import 'video.js/dist/video-js.min.css'
import VideoJs from 'video.js'
// 全局样式
import './assets/scss/icon.scss'
import "./assets/scss/global.scss";
import './assets/icon/iconfont.css';
import MyPlugin from './plugins/myPlugin'
// 打印插件
import Print from './plugins/print'

window.VideoJs = VideoJs

Vue.config.productionTip = false;

Vue.use(ElementUI)
Vue.use(MyPlugin)
Vue.use(Print)
const vm = new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>',
    data: {
        loading: null,
    }
});

window.vm = vm
