<template>
	<view class="home">
		<view class="home-title">
			<text class="home-title__text">泗洪农商银行</text>
		</view>
		<view class="home-wheel">
			<almost-lottery :prize-list="prizeList" :ring-count="2" :duration="1" :canvas-width="canvasData.width"
			 :canvas-height="canvasData.height" :prize-index="prizeIndex" strKey="itemName"
			 @reset-index="prizeIndex = -1" @draw-start="handleDrawStart"
			 @draw-end="handleDrawEnd" @finish="handleDrawFinish" v-if="prizeList.length" />
			<text class="almost-lottery__tip" v-else>奖品准备中...</text>
		</view>
		<view class="home-result">
			<text class="home-result__text">{{ targetName }}</text>
		</view>
		<!-- <view class="home-action" @tap="handleInitCanvas">
			<text class="home-action__text">重新生成-测试用</text>
		</view> -->

		<view class="u-padding-30">
			<u-table border-color="#fff591" color="#fff591" bg-color="red" :th-style="thStyle">
				<u-tr>
					<u-th>奖项</u-th>
					<u-th>奖品</u-th>
				</u-tr>
				<u-tr v-for="(item, index) in prizeList" :key="index">
					<u-td>{{formatStr(item.id)}}</u-td>
					<u-td>{{item.itemName}}</u-td>
				</u-tr>
			</u-table>
		</view>
		<view style="padding: 0 30rpx;">
			<text style="font-size: 12px;color: #FFFFFF;">奖品以实物为准、最终解释权归泗洪农村商业银行</text>
		</view>
	</view>
</template>

<script>
	import AlmostLottery from '@/components/almost-lottery/almost-lottery.vue'
	import {mapState, mapMutations} from 'vuex'

	export default {
		name: 'Home',
		components: {
			AlmostLottery
		},
		data() {
			return {
				// canvas 宽高
				canvasData: {
					width: 240,
					height: 240
				},
				// 奖品数据
				prizeList: [],
				// 中奖下标
				prizeIndex: -1,
				// 中奖类目名称
				targetName: '',
				// 是否由前端控制概率
				isFrontend: false,
				// 权重随机数的最大值
				weightTotal: 0,
				// 权重数组
				weightArr: [],

				// 是否已登录
				hasLogin: false,
				thStyle: {
					"bg-color": "#f56726"
				},
				
				
				// 抽奖条件
				params: {
					certNo: '',
					playerIdentityNo: '',
					playerTel: '',
					bizType: '0',
					bizType2: '0',
					money: '10000',
					playerName: '4001',
					playerIdentityNo: ''
				},
				prizeName: ''
			}
		},
		onLoad(params) {
			if(params.user) {
				let user = JSON.parse(decodeURIComponent(params.user))
				
				this.params.playerName = user.playerName
				this.params.playerTel = user.playerTel
			} else {
				if(this.$store.state.hasLogin) {
					uni.navigateTo({
						url: '../form/form'
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			}
			
			
			this.getPrizeList()
		},
		onUnload() {
			uni.hideLoading()
		},
		methods: {
			formatStr(str) {
				if(str == '1') {
					return '一等奖'
				} else if(str == '2') {
					return  '二等奖'
				} else if(str == '3') {
					return '三等奖'
				} else {
					return '纪念奖'
				}
			},
			// 重新生成
			handleInitCanvas() {
				this.prizeList = []
				this.getPrizeList()
			},
			// 获取奖品列表
			getPrizeList() {
				this.$u.api.getPrizeList().then(res => {
					this.prizeList = res;
					
					this.prizeList.map(item => {
						if(item.id != 4) {
							item.imgSrc = '/static/lottery-prize/prize.jpg'
						}
					})
				}).catch(err => {
					console.log(err);
				})
			},
			// 本次抽奖开始
			handleDrawStart() {
				this.targetName = ''

				// let list = [...this.prizeList]
				// this.mockLottery(list)
				
				this.$u.api.lottery(this.params).then(res => {
					this.prizeIndex = res.awardItemId - 1
					this.prizeName = res.awardItemName
				}).catch(res => {
					console.log(res);
					this.prizeIndex = -1
				})
			},
			// 本次抽奖结束
			handleDrawEnd() {
				this.prizeIndex = -1
				uni.showModal({
					content: '恭喜获得奖品【' + this.prizeName + '】',
					success: (e) => {
						uni.reLaunch({
							url: '../form/form'
						})
					}
				})
				this.targetName = '恭喜获得奖品' + this.prizeName
			},
			// 抽奖转盘绘制完成
			handleDrawFinish() {
				console.log('抽奖转盘绘制完成')
				uni.hideLoading()
				this.$u.toast('奖品准备就绪')
			},
		},
	}
</script>

<style lang="scss" scoped>
	$wheelBgUrl: '~static/almost-lottery/almost-lottery__bg';

	.home {
		padding: 15px 0;
		// background-color: red;
		background-image: url(../../static/luckywheel.png);
		// background-repeat: repeat;
		// background-size: 100% 100%;
	}

	.home-title {
		text-align: center;
		margin-bottom: 50px;
	}

	.home-title__text {
		color: #FFFFFF;
		font-size: 30px;
		font-weight: bold;
	}

	.home-result {
		text-align: center;
		margin-top: 50px;
		height: 20rpx;
	}

	.home-result__text {
		color: #000;
		font-size: 20px;
		font-weight: bold;
	}

	.home-wheel {
		text-align: center;
	}

	.almost-lottery__tip {
		font-size: 24rpx;
	}

	.home-action {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 40rpx;
		width: 260rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		text-align: center;
		background-color: red;
		margin: 0 auto;
	}

	.home-action__text {
		color: #FFFFFF;
		font-size: 24rpx;
	}

	// 
	.u-padding-30 {
		padding: 30rpx;
	}
</style>
