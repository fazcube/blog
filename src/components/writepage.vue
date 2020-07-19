<template>
	<div class="mavonEditor">
		<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
		 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">
				<el-input placeholder="请输入标题" v-model="title" maxlength="50" show-word-limit clearable style="width: 500px;"></el-input>
			</el-menu-item>
			<el-menu-item index="2" style="float: right;" @click="centerDialogVisible = true">取消</el-menu-item>
			<el-menu-item index="3" style="float: right;" @click="submitDialogVisible = true">确认提交</el-menu-item>
		</el-menu>
		<!--markdown-->
		<mavon-editor :toolbars="markdownOption" v-model="handbook" style="height:690px;" />

		<el-dialog title="提示" :visible.sync="centerDialogVisible" width="20%" center>
			<span>确定退出编辑文章吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="submitDialogVisible" width="20%" center>
			<span>确定提交文章吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="submitDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: '',
				activeIndex: '1',
				activeIndex2: '1',
				submitDialogVisible: false,
				centerDialogVisible: false,
				toolbars: {
					bold: true, // 粗体
					italic: true, // 斜体
					header: true, // 标题
					underline: true, // 下划线
					strikethrough: true, // 中划线
					mark: true, // 标记
					superscript: true, // 上角标
					subscript: true, // 下角标
					quote: true, // 引用
					ol: true, // 有序列表
					ul: true, // 无序列表
					link: true, // 链接
					imagelink: true, // 图片链接
					code: true, // code
					table: true, // 表格
					fullscreen: true, // 全屏编辑
					readmodel: true, // 沉浸式阅读
					htmlcode: true, // 展示html源码
					help: true, // 帮助
					/* 1.3.5 */
					undo: true, // 上一步
					redo: true, // 下一步
					trash: true, // 清空
					save: true, // 保存（触发events中的save事件）
					/* 1.4.2 */
					navigation: true, // 导航目录
					/* 2.1.8 */
					alignleft: true, // 左对齐
					aligncenter: true, // 居中
					alignright: true, // 右对齐
					/* 2.2.1 */
					subfield: true, // 单双栏模式
					preview: true, // 预览
				},
				markdownOption: {
					bold: true, // 粗体
					italic: true, // 斜体
					header: true, // 标题
					underline: true, // 下划线
					strikethrough: true, // 中划线
					mark: true, // 标记
					superscript: true, // 上角标
					subscript: true, // 下角标
					quote: true, // 引用
					ol: true, // 有序列表
					ul: true, // 无序列表
					link: true, // 链接
					imagelink: true, // 图片链接
					code: true, // code
					table: true, // 表格
					fullscreen: true, // 全屏编辑
					readmodel: true, // 沉浸式阅读
					htmlcode: true, // 展示html源码
					help: true, // 帮助
					/* 1.3.5 */
					undo: true, // 上一步
					redo: true, // 下一步
					trash: true, // 清空
					save: true, // 保存（触发events中的save事件）
					/* 1.4.2 */
					navigation: true, // 导航目录
					/* 2.1.8 */
					alignleft: true, // 左对齐
					aligncenter: true, // 居中
					alignright: true, // 右对齐
					/* 2.2.1 */
					subfield: true, // 单双栏模式
					preview: true, // 预览
				},
				handbook: "## 在此输入你的文章内容..."
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	};
</script>

<style scoped>
	.mavonEditor {
		width: 100%;
		height: 100%;
	}
</style>
