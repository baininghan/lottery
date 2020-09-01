<template>
	<view class="login">
		<view class="login-top bg-active">
			<view class="desc">
				<view class="title">Hi~</view>
				<text>{{ appName }}欢迎您</text>
			</view>
			<image class="login-pic" src="/static/login-pic.png"></image>
		</view>
		<view class="login-type-content">
			<image class="login-bg" src="/static/login-bg.png"></image>
			<view class="main">
				<block>
					<view class="login-type-form">
						<view class="input-item">
							<text class="iconfont iconzhanghuffffffpx"></text>
							<input class="login-type-input" name="userName" v-model="loginParams.userName" placeholder="请输入账号" maxlength="11" />
						</view>
						<view class="input-item">
							<text class="iconfont iconmimaffffffpx"></text>
							<input class="login-type-input" type="password" v-model="loginParams.password" placeholder="请输入密码" maxlength="20" />
						</view>
					</view>
					<button class="confirm-btn bg-active" :disabled="btnLoading" :loading="btnLoading" @tap="toLogin">
						登录
					</button>
				</block>
			</view>
		</view>
		<view class="login-type-bottom text-active">
			{{ appName }} 版权所有
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import md5Libs from '../../uview-ui/libs/function/md5.js'

	export default {
		data() {
			return {
				loginParams: {
					userName: '',
					password: ''
				},
				btnLoading: false,
				smsCodeBtnDisabled: true,
				userInfo: null,
				appName: '泗洪农商银行',
			};
		},
		onLoad(options) {
			this.tabCurrentIndex = parseInt(options.type || 0, 10);
		},
		methods: {
			...mapMutations(['login', 'setToken']),
			toLogin() {
				if (this.$u.test.isEmpty(this.loginParams.userName)) {
					this.$u.toast('请输入账号')
					return false;
				}
				if (this.$u.test.isEmpty(this.loginParams.password)) {
					this.$u.toast('请输入密码')
					return false;
				}

				let userName = this.loginParams.userName;
				let password = this.loginParams.password;
				let params = {'userName': userName}
				let c = md5Libs.md5(userName + md5Libs.md5(password));
				this.setToken(c)
				
				this.$u.api.login(this.loginParams).then(res => {
					this.$u.toast('登录成功')
					this.login(res)
					uni.navigateTo({
						url: '../form/form'
					})
				}).catch(res => {
					console.log(res);
				})

				
				
				// this.$u.post('/business/m/login?userName=' + userName, params).then(res => {
				// 	console.log(res);
				// });
			}
		}
	};
</script>
<style lang="scss">
	page {
		background: #fff;
	}

	.login {
		width: 100%;
		position: relative;

		.bg-active {
			background-color: #fa3534;
			color: #fff;
		}

		.text-active,
		.iconfont {
			color: #fa3534;
		}

		.back-btn {
			position: absolute;
			left: 40rpx;
			z-index: 9999;
			padding-top: var(--status-bar-height);
			top: 40rpx;
			font-size: 48rpx;
			color: #fff;
		}

		.login-top {
			height: 460rpx;
			position: relative;

			.desc {
				color: #fff;
				position: absolute;
				top: 200rpx;
				left: 40rpx;
				font-size: 48rpx;

				.title {
					font-size: 48rpx;
				}
			}

			.login-pic {
				position: absolute;
				width: 220rpx;
				height: 270rpx;
				right: 30rpx;
				top: 100rpx;
			}
		}

		.login-type-content {
			position: relative;
			top: -72rpx;

			.login-bg {
				width: 94vw;
				height: 94vw;
				margin: 0 3vw;
			}

			.main {
				width: 94vw;
				position: absolute;
				top: 0;
				left: 3vw;

				.nav-bar {
					display: flex;
					height: 100rpx;
					justify-content: center;
					align-items: center;
					position: relative;
					z-index: 10;

					.nav-bar-item {
						flex: 1;
						display: flex;
						height: 100%;
						line-height: 96rpx;
						font-size: 32rpx;
						display: flex;
						margin: 0 120rpx;
						justify-content: center;
					}

					.nav-bar-item-active {
						border-bottom: 5rpx solid;
					}
				}

				.login-type-form {
					width: 80%;
					margin: 50rpx auto;

					.input-item {
						position: relative;
						height: 90rpx;
						line-height: 90rpx;
						margin-bottom: 30rpx;

						.iconfont {
							font-size: 50rpx;
							position: absolute;
							left: 0;
						}

						.login-type-input {
							height: 90rpx;
							padding-left: 80rpx;
							border-bottom: 1rpx solid rgba(0, 0, 0, .1);
						}

						.sms-code-btn,
						sms-code-resend {
							width: 240rpx;
							font-size: 26rpx;
						}
					}
				}

				.login-type-tips {
					padding: 0 50rpx;
					display: flex;
					justify-content: space-between;
					font-size: 28upx;
					color: #666;
				}

				.confirm-btn {
					margin-top: 60upx;
					width: 80%;
					height: 80rpx;
					line-height: 80rpx;
				}
			}
		}

		.login-type-bottom {
			width: 100%;
			padding-bottom: 30rpx;
			text-align: center;
			font-size: 32rpx;
		}

		// 发送验证码样式
		.input-item-sms-code {
			.input-wrapper {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.sms-code-btn {
				width: 200upx;
				background-color: #fff;
				display: flex;
				padding: 15upx 0;
				justify-content: center;
				align-items: center;
				border-radius: 12upx;
			}

			.sms-code-resend {
				color: #666;
			}
		}
	}
</style>
