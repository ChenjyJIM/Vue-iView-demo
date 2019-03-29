// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Global from './components/util/Global'
import axios from 'axios'
import gojs from 'gojs'

Vue.prototype.go = gojs
Vue.prototype.GLOBAL = Global
Vue.config.productionTip = false
Vue.prototype.$ajax = axios


router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/regindex'){
    next()
  }else if( window.localStorage.getItem("token") === 'null' ){
    alert("您还未登录，请您登录！")
    return next('/login')
  }else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }

})


