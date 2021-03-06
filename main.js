import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

import uView from "uview-ui";
Vue.use(uView)
Vue.config.$store = store
Vue.prototype.$baseUrl = 'http://106.54.234.86:39080'

const app = new Vue({
	store,
    ...App
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
