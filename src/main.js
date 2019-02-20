// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios=Axios;
Axios.defaults.withCredentials = true;
Vue.prototype.$qs = qs;
/* eslint-disable no-new */
// 引入Echarts
import VCharts from 'v-charts'
Vue.use(VCharts)
import Echarts from 'echarts'
Vue.prototype.$echarts = Echarts

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


