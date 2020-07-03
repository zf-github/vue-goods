import Vue from 'vue'
import App from './App.vue'
import router from "./routes"
import http from "./utils/Http"
import load from "./utils/Loading"
import messageBox from "./utils/MessageBox"
import message from "./utils/message"

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$load = load
Vue.prototype.$messageBox = messageBox
Vue.prototype.$message = message

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
