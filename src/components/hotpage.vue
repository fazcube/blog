<template>
	<div>
		<el-row>
			<el-col>
				<el-tabs v-model="activeName" @tab-click="tabswitch">
					<el-tab-pane label="首页" name="first"></el-tab-pane>
					<el-tab-pane label="热门" name="second"></el-tab-pane>
					<el-tab-pane label="最新" name="third"></el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>
		<div :class="{showloadpage:displayload}" style="height: 1000px;">
			<el-row id="loadingpage" style="margin-bottom: 5px;">
				<el-col>
					<el-card shadow="hover">
						<p class="card-top">
							▇▇▇▇▇▇ ▇▇ ▇▇▇▇▇▇▇▇▇ ▇▇▇▇▇▇▇▇ ▇▇▇▇▇▇▇▇▇▇▇▇
						</p>
						<p class="card-content">
							<a href="javascript:;">▇▇▇ ▇▇▇ ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ ▇▇▇▇▇▇▇▇▇▇▇ ▇▇▇▇▇▇</a>
						</p>
						<el-button-group>
							<el-button icon="el-icon-caret-top" size="mini" plain style="padding: 5px;color:#B2BAC2;">▇▇▇▇</el-button>
							<el-button icon="el-icon-chat-line-square" size="mini" plain style="padding: 5px;color:#B2BAC2;">▇▇▇▇</el-button>
						</el-button-group>
					</el-card>
				</el-col>
			</el-row>
		</div>

		<div class="infinite-list-wrapper" style="overflow:auto;">
			<ul class="list" infinite-scroll-disabled="disabled">
				<li v-for="item,index in post" class="list-item">
					<el-row :class="{showpostpage:displaypost}" style="margin-bottom: 5px;">
						<el-col>
							<el-card shadow="hover" class="bgc">
								<p class="card-top">
									{{item.username}} · {{item.acreatedate.slice(0,16).replace('T',' ')}}
								</p>
								<p class="card-content">
									<a href="javascript:;">{{item.atitle}}</a>
								</p>
								<el-button-group>
									<el-button icon="el-icon-caret-top" size="mini" plain style="padding: 5px;color:#B2BAC2;">103</el-button>
									<el-button icon="el-icon-chat-line-square" size="mini" plain style="padding: 5px;color:#B2BAC2;">24</el-button>
								</el-button-group>
							</el-card>
						</el-col>
					</el-row>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		created() {
			let tab = {
				name: 'first'
			};
			this.handleClick(tab);
		},
		name: 'hotpage',
		data() {
			return {
				displayload: true,
				displaypost: false,
				activeName: 'first',
				post: [],
				loading: false
			}
		},
		methods: {
			handleClick(tab) {
				var that = this;
				if (tab.name == "first") {
					console.log("首页");
					let param = new URLSearchParams();
					param.append('offset', '1');
					param.append('limit', '10');

					axios({
						method: 'post',
						url: '/api/article/selectAll',
						data: param
					}).then(function(result) {
						console.log(result.data);
						console.log(result.data.data.length);
						if (result.data.stateCode == '200') {
							that.post = result.data.data;
						} else if (result.data.data.length == 0) {
							that.$message.error({
								message: '系统错误！',
								duration: '2000'
							});
						}
					})
				} else if (tab.name == "second") {
					console.log("热门");
				} else if (tab.name == "third") {
					console.log("最新");
				}
			},
			openFullScreen2() {
				let dom = document.querySelector("#loadingpage");
				const loading = this.$loading({
					target: dom,
					lock: true,
					text: 'Loading',
					background: 'rgba(255, 255, 255, 0.8)'
				});
				setTimeout(() => {
					this.displayload = true;
					this.displaypost = false;
					loading.close();
				}, 1000);
			},
			tabswitch(tab, event) {
				this.displaypost = true;
				this.displayload = false;
				this.handleClick(tab, event);
				this.openFullScreen2();
			}
		}
	}
</script>

<style>
	.bgc:hover {
		background-color: #f9f9f9;
	}

	.showpostpage {
		display: none;
	}

	.showloadpage {
		display: none;
	}

	.list {
		list-style: none;
		padding: 0px;
		margin-top: 0px;
	}
</style>
