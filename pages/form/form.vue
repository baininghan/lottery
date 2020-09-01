<!-- 抽奖前提基本信息录入表单 -->
<template>
	<view class="u-padding-30">
		<u-form :model="user" ref="uForm">
			<u-form-item label="姓名">
				<u-input v-model="user.name" />
			</u-form-item>
			<u-form-item label="电话" prop="tel">
				<u-input v-model="user.tel" />
			</u-form-item>
			<u-form-item label="性别">
				<u-input v-model="user.sex" type="select" @tap="openSexSelect" />
			</u-form-item>
			<u-form-item label="身份证" prop="idNo">
				<u-input v-model="user.idNo" />
			</u-form-item>
		</u-form>

		<u-picker mode="selector" v-model="sexShow" :range="sexList" range-key="name" @confirm="confirmSex"></u-picker>

		<u-button type="success">下一步</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: '',
					tel: '',
					sex: '',
					idNo: ''
				},
				checkboxList: [{
						name: '苹果',
						checked: false,
						disabled: false
					},
					{
						name: '雪梨',
						checked: false,
						disabled: false
					},
					{
						name: '柠檬',
						checked: false,
						disabled: false
					}
				],
				radioList: [{
						name: '鲜甜',
						disabled: false
					},
					{
						name: '麻辣',
						disabled: false
					}
				],
				radio: '',
				switchVal: false,



				// =============
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
					name: [{
						required: true,
						message: '请输入姓名',
						min: 5,
						trigger: ['change', 'blur'],
						// validator: (rule, value, callback) => {
							// return this.$u.test.chinese('121323')
						// }
					}],
					tel: [{
						required: true,
						message: '请输入电话',
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
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$u.toast('验证通过')
					} else {
						this.$u.toast('验证失败')
					}
				})
			}
		}
	};
</script>

<style scoped="scss">
	.u-padding-30 {
		padding: 30rpx;
	}
</style>
