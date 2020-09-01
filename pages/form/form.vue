<!-- 抽奖前提基本信息录入表单 -->
<template>
	<view class="u-padding-40">
		<u-form :model="user" ref="uForm" label-position="top">
			<u-form-item left-icon="account" label="姓名" prop="account" label-width="150" :left-icon-style="leftIconStyle" required>
				<u-input v-model="user.name" placeholder="请填写姓名" />
			</u-form-item>
			<u-form-item left-icon="phone" label="电话" prop="tel" label-width="150" :left-icon-style="leftIconStyle" required>
				<u-input v-model="user.tel" placeholder="请填写手机号码" />
			</u-form-item>
			<u-form-item left-icon="man" label="性别" label-width="150" :left-icon-style="leftIconStyle">
				<u-input v-model="user.sex" type="select" @tap="openSexSelect" placeholder="请选择性别" />
			</u-form-item>
			<u-form-item left-icon="order" label="身份证" prop="idNo" label-width="150" :left-icon-style="leftIconStyle">
				<u-input v-model="user.idNo" placeholder="请填写身份证号码" />
			</u-form-item>
		</u-form>

		<u-picker mode="selector" v-model="sexShow" :range="sexList" range-key="name" @confirm="confirmSex"></u-picker>

		<u-button type="error" @click="tapSaveCustInfo">下一步</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leftIconStyle: {
					color: 'red'
				},
				user: {
					name: '',
					tel: '',
					sex: '',
					idNo: ''
				},
				sexShow: false,
				sexList: [{
						code: 0,
						'name': '女'
					},
					{
						code: 1,
						'name': '男'
					},
				],
				rules: {
					account: [{
						required: true,
						message: '请填写姓名',
						min: 5,
						trigger: ['change', 'blur'],
						validator: (rule, value, callback) => {
							return this.$u.test.chinese(value)
						}
					}],
					tel: [{
						required: true,
						message: '请填写手机号码',
						type: 'number',
						len: 11,
						trigger: ['change', 'blur'],
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
					}],
					idNo: [{
						message: '请输入正确的身份证号码',
						type: 'number',
						len: 11,
						trigger: ['change', 'blur'],
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						}
					}]
				}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			openSexSelect() {
				this.sexShow = true;
			},
			confirmSex(index) {
				console.log(index);
				this.user.sex = this.sexList[index].code
			},
			tapSaveCustInfo() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// this.$u.toast('验证通过')
						
						this.$u.saveUser('', this.user).then(res => {
							uni.navigateTo({
								url: '../index/index'
							})
						})
					} else {
						this.$u.toast('验证失败')
					}
				})
			}
		}
	};
</script>

<style scoped="scss">
	.u-padding-40 {
		padding: 10rpx 32rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #FFFFFF;
	}
</style>
