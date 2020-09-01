// 登录接口
let login = (params = {}) => vm.$u.post(url, params);

// 表单提交接口
let getInfo = (params = {}) => vm.$u.post(url, params);

export default {
	getInfo, login
}
