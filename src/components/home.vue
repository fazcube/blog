<template>
	<el-container>
		<el-header>
			<el-row>
				<el-col :span="1" :offset="4">
					<img src="../assets/掘银.png" alt="" style="height: 50px;margin-top: 5px;">
				</el-col>
				<el-col :span="3" :offset="8">
					<div class="demo-input-suffix">
						<el-input placeholder="请搜索内容..." suffix-icon="el-icon-search"></el-input>
					</div>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" icon="el-icon-edit" @click="write" round>写文章</el-button>
				</el-col>
				<el-col v-if="nologin" :span="2">
					<el-link type="primary" :underline="false" @click="dialogFormVisible = true" style="font-size: 18px;">登录 |&nbsp;</el-link>
					<el-link type="primary" :underline="false" @click="dialogFromRegister = true" style="font-size: 18px;">注册</el-link>
				</el-col>
				<el-col v-if="loginin" :span="3">
					<el-dropdown style="line-height: 0px;">
						<el-image style="width: 50px; height: 50px;border-radius: 50%;margin-top: 5px;" :src="url"></el-image>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item disabled>{{user.username}}</el-dropdown-item>
							<el-dropdown-item>我的主页</el-dropdown-item>
							<el-dropdown-item>退出账号</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>

			</el-row>
		</el-header>
		<el-row style="margin-top: 75px;">
			<el-col :span="16" :offset="4">
				<el-container>
					<!--左侧内容显示-->
					<el-aside width="75%">
						<!--子路由-->
						<router-view></router-view>
					</el-aside>
					<!--右侧内容显示-->
					<el-main style="height: 500px;margin-top: 55px;">
						<el-row>
							<el-col>
								<el-card shadow="hover">
									<div>
										<span>雨纷</span>
										<el-divider direction="vertical"></el-divider>
										<span>故里</span>
										<el-divider direction="vertical"></el-divider>
										<span>草木深</span>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</el-main>
				</el-container>
			</el-col>
		</el-row>
		<!-- Form -->
		<!-- 		<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

		<el-dialog title="登录" :visible.sync="dialogFormVisible" :width="dialogWidth" center>
			<el-form id="loginpage" :model="form">
				<el-form-item>
					<el-input v-model="form.username" autocomplete="off" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-input v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="login(form)" style="width: 95%;">登 录</el-button>
				<el-link type="primary" :underline="false" style="font-size: 12px;" @click="switchregister">注册账号</el-link>
			</div>
		</el-dialog>

		<el-dialog title="注册" :visible.sync="dialogFromRegister" :width="dialogWidth" center>
			<el-form :model="form">
				<el-form-item>
					<el-input v-model="form.name" autocomplete="off" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-input v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogFromRegister = false" style="width: 95%;">确 定</el-button>
				<el-link type="primary" :underline="false" style="font-size: 12px;" @click="switchlogin">已有帐号，去登陆</el-link>
			</div>
		</el-dialog>

	</el-container>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'home',
		data() {
			return {
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				dialogFormVisible: false,
				dialogFromRegister: false,
				user: JSON.parse(sessionStorage.getItem("login_user")),
				form: {
					username: '',
					password: ''
				},
				dialogWidth: '20%'
			};
		},
		computed: {
			nologin() {
				return this.user == null
			},
			loginin() {
				return this.user != null
			}
		},
		methods: {
			switchregister() {
				this.dialogFormVisible = false;
				this.dialogFromRegister = true;
			},
			switchlogin() {
				this.dialogFormVisible = true;
				this.dialogFromRegister = false;
			},
			write() {
				console.log("写文章");
				this.$router.push('/write');
			},
			login(values) {
				console.log(values.username);
				console.log(values.password);
				var that = this;
				let param = new URLSearchParams();
				param.append('username', values.username);
				param.append('password', values.password);

				that.$loading({
					target: "#loginpage",
					lock: true,
					background: 'rgba(255, 255, 255, 0.8)'
				});
				setTimeout(() => {
					axios({
						method: 'post',
						url: '/api/user/login',
						data: param
					}).then(function(result) {
						that.$loading().close();
						console.log(result.data);
						if (result.data.stateCode == '200') {
							that.$message({
								message: '登陆成功！',
								duration: '2000',
								type: 'success'
							});
							sessionStorage.setItem("login_user", JSON.stringify(result.data.data));
							sessionStorage.setItem("loginflag", true);
							location.reload();
						} else if (result.data.stateCode == '500') {
							that.$message.error({
								message: '账号或密码错误！',
								duration: '2000'
							});
							location.reload();
						}
					})
					this.dialogFormVisible = false;
				}, 1500);	
			}
		}
	}
</script>

<style>
	body {
		background-color: #F4F5F5;
		margin: 0px;
		padding-right: 0 !important;
		overflow: auto !important;
	}

	.el-header {
		background-color: white;
		color: #333;
		text-align: center;
		line-height: 60px;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1030;
	}

	.el-aside {
		margin-right: 10px;
	}

	.el-main {
		background-color: #FFFFFF;
		color: #333;
		text-align: center;
	}

	.card-top {
		font-size: 12px;
		color: #B2BAC2;
		margin: 0px;
	}

	.card-content {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.card-content a {
		font-size: 18px;
		font-weight: bold;
		color: #000000;
		text-decoration: none;
	}

	.card-content a:hover {
		text-decoration: underline;
	}

	.el-dropdown {
		vertical-align: top;
	}
</style>
