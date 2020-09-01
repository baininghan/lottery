import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: uni.getStorageSync('userInfo'),
		token: ''
	},
	getters: {
		hasLogin: state => {
			return state.hasLogin;
		},
		userInfo: state => {
			return state.userInfo;
		},
	},
	mutations: {
		login(state, userInfo) {
			state.userInfo = userInfo
			state.userInfo.loginTime = new Date().getTime()
			state.hasLogin = true
			// 本地存储用户信息
			uni.setStorage({
				key: 'userInfo',
				data: userInfo
			})
		},
		logout(state) {
			state.userInfo = {}
			state.hasLogin = false

			uni.removeStorage({
				key: 'userInfo'
			})
		},
		setToken(state, token) {
			state.token = token
		}
	}
})

export default store