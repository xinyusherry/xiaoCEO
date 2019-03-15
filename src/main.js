import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import echarts from "echarts";
import store from "./store";
import "./assets/css/card.css";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import axios from 'axios';
import qs from 'qs';


axios.defaults.baseURL = '/microservice-ui';   //配置接口地址
axios.defaults.transformRequest= [function (data) {
  // 对 data 进行任意转换处理
  return qs.stringify({JsonParam:JSON.stringify(data)})
}],


Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
