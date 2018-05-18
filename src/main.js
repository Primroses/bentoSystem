// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import Router from 'vue-router'
import '../src/components/util'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(Router)
Vue.use(ElementUI)


const router = new Router({
  // mode : "history",
  routes : routes
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

