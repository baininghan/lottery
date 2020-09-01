// 获取奖品列表
let getPrizeList = (params = {}) => vm.$u.post(url, params);

// 抽奖
let lottery = (params = {}) => vm.$u.post(url, params);

// 查询当前客户经理的历史抽奖记录
let lotteryHistory = (params = {}) => vm.$u.post(url, params);

export default {
	getPrizeList, lottery, lotteryHistory
}
