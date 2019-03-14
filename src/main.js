import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import echarts from "echarts";
import store from "./store";
import "./assets/css/card.css";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
