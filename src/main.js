import Vue from 'vue'
import App from './App.vue'
import {VueJsonp} from "vue-jsonp";

Vue.config.productionTip = false
Vue.use(VueJsonp)
new Vue({
    // 这里为什么不是template而是一个render呢？
    // 1.我们这里import导入的vue其实不是一个完整的vue文件，而是dist/vue.runtime.esm.js文件，没有template模板解析，这个文件的体积减小了1/3
    // 2.所以我们使用redder函数，函数传入了一个函数，这个是渲染页面的函数，我们使用这个函数传入我们要渲染的页面即可
    render: h => h(App),
    beforeMount() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')
