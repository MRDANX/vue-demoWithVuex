// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import router from './router'
// import vuex from 'vuex'
import Layout from '@/components/Layout'
import store from '@/store'
import "es6-promise/auto";

// Vue.use(vuex);

Vue.prototype.$http = axios;


Vue.config.productionTip = false
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  router,
  components: {
    Layout
  },
  template: '<Layout/>'
})
