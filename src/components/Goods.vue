<template>
	<div class="page" style="background:#fff">
		<h1 style="font-weight: bold;font-size: 20px;color:#666;padding: 20px 20px 0 20px;">商品管理</h1>
		<!-- 顶部 -->
		<div class="nav">
			<!-- <el-button type="primary" icon="el-icon-circle-plus-outline" class="add" @click="add">新增商品</el-button> -->
			<div class="search">
				<el-input placeholder="请输入商品名称" clearable class="search-box" v-model="keyWord"></el-input>
				<el-button type="primary" icon="el-icon-search" class="search-btn" @click="keyword">搜索</el-button>
			</div>
		</div>
		<!-- 表头 -->
		<el-table
			:data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
			border
			style="width: 100%"
		>
			<el-table-column prop="goods_id" label="商品编号"></el-table-column>
			<el-table-column prop="goods_name" label="商品名称"></el-table-column>
			<el-table-column prop="now_price" label="商品进价"></el-table-column>
			<el-table-column prop="pre_price" label="商品售价"></el-table-column>
			<el-table-column prop="goods_inv" label="商品库存"></el-table-column>
			<el-table-column prop="comComment" label="商品备注"></el-table-column>
			<el-table-column prop="opreation" label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small" @click="compile(scope.row)">编辑</el-button>
					<el-button type="text" size="small" @click="open2(scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页器 -->
		<el-pagination
			background
			layout="prev, pager, next"
			:total="num"
			:page-size="2"
			@current-change="current_change"
		></el-pagination>
		<!-- 查看详情 -->
		<div class="page1">
			<el-dialog title="商品详情" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
				<div class="con">
					<div class="left clearfix">
						<div class="id">
							<span>商品编号 :</span>
							<span>{{ data.goods_id }}</span>
						</div>
						<div class="name">
							<span>商品名称 :</span>
							<strong>{{ data.goods_name }}</strong>
						</div>
						<div class="fl">
							<span>商品分类 :</span>
							<strong>{{ data.class_name }}</strong>
						</div>
					</div>
					<div class="right clearfix">
						<div class="older">
							<span>商品进价 :</span>
							<strong>{{ data.now_price }}</strong>
						</div>
						<div class="now">
							<span>商品售价 :</span>
							<strong>{{ data.pre_price }}</strong>
						</div>
						<div class="num">
							<span>商品库存 :</span>
							<strong>{{ data.goods_inv }}</strong>
						</div>
						<div class="bz">
							<span>商品备注 :</span>
							<strong>sdfj lsdjf klsa jdfsa sad as das das</strong>
						</div>
					</div>
					<div class="img">
						<span>商品图片 :</span>
						<ul class="clearfix">
							<li>
								<img :src="data.pic1" alt>
							</li>
							<li>
								<img :src="data.pic2" alt>
							</li>
							<li>
								<img :src="data.pic3" alt>
							</li>
							<li>
								<img :src="data.pic4" alt>
							</li>
						</ul>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible1 = false">取 消</el-button>
					<el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
				</span>
			</el-dialog>
		</div>

		<div class="page2">
			<el-dialog title="商品编辑" :visible.sync="dialogVisible2" width="50%" :before-close="handleClose">
				<div class="con2 clearfix">
					<div class="left1">
						<div class="name1">
							<span>商品名称 :</span>
							<el-input placeholder="请输入内容" clearable width="30%" v-model="data.goods_id"></el-input>
						</div>
						<div class="name1">
							<span>商品原价 :</span>
							<el-input placeholder="请输入内容" clearable width="30%" v-model="data.now_price"></el-input>
						</div>
						<div class="name1">
							<span>商品售价 :</span>
							<el-input placeholder="请输入内容" clearable width="30%" v-model="data.pre_price"></el-input>
						</div>
						<div class="name1">
							<span>商品库存 :</span>
							<el-input-number
								controls-position="right"
								@change="handleChange"
								:min="1"
								:max="10"
								v-model="data.goods_inv"
							></el-input-number>
						</div>

						<div class="name1">
							<span>商品分类 :</span>
							<el-select v-model="value" placeholder="请选择">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</div>
					</div>
					<div class="right1">
						<div class="comment">
							<span>商品备注 :</span>
							<el-input type="textarea" :autosize="{minRows: 6}" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="img1">
					<span>商品预览图片 :</span>
					<div class="clearfix img-box">
						<el-upload
							action="https://jsonplaceholder.typicode.com/posts/"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove"
							:limit="4"
							:file-list="imgUrl"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancelX">取 消</el-button>
					<el-button type="primary" @click="okX">确 定</el-button>
				</span>
			</el-dialog>
		</div>

		<!-- <div class="page3">
			<el-dialog title="商品编辑" :visible.sync="dialogVisible3" width="50%" :before-close="handleClose">
				<div class="con3 clearfix">
					<div class="left2">
						<div class="name2">
							<span>商品名称 :</span>
							<el-input placeholder="请输入内容" clearable width="50%"></el-input>
						</div>
						<div class="name2">
							<span>商品原价 :</span>
							<el-input placeholder="请输入内容" clearable width="30%"></el-input>
						</div>
						<div class="name2">
							<span>商品售价 :</span>
							<el-input placeholder="请输入内容" clearable width="30%"></el-input>
						</div>
						<div class="name2">
							<span>商品库存 :</span>
							<el-input-number controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
						</div>

						<div class="name2">
							<span>商品分类 :</span>
							<el-select v-model="value" placeholder="请选择">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</div>
					</div>
					<div class="right2">
						<div class="comment">
							<span>商品备注 :</span>
							<el-input type="textarea" :autosize="{ minRows: 6}" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="img2">
					<span>商品预览图片 :</span>
					<div class="clearfix img-box">
						<el-upload
							action="http://localhost:8080/upLoad"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove"
                            :on-success="successImg"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible3 = false">取 消</el-button>
					<el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
				</span>
			</el-dialog>
		</div>-->
	</div>
</template>

<script>
export default {
	data() {
		return {
			// 商品数据
			tableData: [],
			data: [],
			// 分页
			num: 0, //数据数组长度
			pagesize: 2,
			currentPage: 1,
			// 搜索关键字
			keyWord: "",
			dialogVisible: false,
			dialogVisible1: false,
			dialogVisible2: false,
			dialogVisible3: false,
			options: [
				{
					value: "选项1",
					label: "生活用品"
				},
				{
					value: "选项2",
					label: "食品"
				}
			],
			value: "",
			previewVisible: false,
			previewImage: "",
			dialogImageUrl: "",
			imgUrl: [],
			msg: "66"
		};
	},
	methods: {
		handleClick(row) {
			this.dialogVisible1 = true;
			row.pic1 = "../../static" + row.pic1;
			row.pic2 = "../../static" + row.pic2;
			row.pic3 = "../../static" + row.pic3;
			row.pic4 = "../../static" + row.pic4;
			this.data = row;
		},
		open2(index) {
			this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.$message({
						type: "success",
						message: "删除成功!"
					});
					this.tableData.splice(index, 1);
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除"
					});
				});
		},
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		cancelX() {
			this.dialogVisible2 = false;
			this.imgUrl = [];
		},
		okX() {
			this.dialogVisible2 = false;
			this.imgUrl = [];
		},
		compile(row) {
			this.dialogVisible2 = true;
			this.data = row;
			this.imgUrl = [
				{
					name: "pic1",
					url: "../../static" + row.pic1
				},
				{
					name: "pic2",
					url: "../../static" + row.pic2
				},
				{
					name: "pic3",
					url: "../../static" + row.pic3
				},
				{
					name: "pic4",
					url: "../../static" + row.pic4
				}
			];
		},
		add() {
			this.dialogVisible3 = true;
		},
		handleCancel() {
			this.previewVisible = false;
		},
		handlePreview(file) {
			this.previewImage = file.url || file.thumbUrl;
			this.previewVisible = true;
		},
		handleChange({ fileList }) {
			this.fileList = fileList;
		},
		onChange(value) {
			console.log("changed", value);
		},

		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		current_change(currentPage) {
			this.currentPage = currentPage;
		},
		keyword() {
			this.$axios
				.get("http://localhost:1235/keyword", {
					params: {
						key: this.keyWord
					}
				})
				.then(res => {
					this.tableData = res.data;
					this.num = res.data.length;
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	created() {
		this.$axios
			.get("http://localhost:1235/ProductDetails")
			.then(res => {
				this.tableData = res.data;
				this.num = res.data.length;
			})
			.catch(err => {
				console.log(err);
			});
	},
	updated() {}
};
</script>

<style scoped lang="less">
* {
	font-weight: bold;
}
.clearfix::after {
	content: "";
	display: block;
	clear: both;
}
.ant-upload-select-picture-card i {
	font-size: 32px;
	color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
	margin-top: 8px;
	color: #666;
}
.ant-modal-mask {
	z-index: 3000;
}
.ant-modal-wrap {
	z-index: 3001;
}
.nav {
	.add {
		margin: 20px 0;
		float: left;
	}
	.search {
		float: right;
		margin: 20px 0;
		.search-box {
			width: 60%;
		}
		.search-btn {
		}
	}
}
.el-pagination {
	width: 50%;
	margin: 20px auto;
}
.page {
	margin-top: 20px;
}
.page1 {
	.con {
		.left {
			margin-top: 20px;
			div {
				float: left;
				width: 26%;
				margin-right: 30px;
			}
		}
		.right {
			margin-top: 20px;

			div {
				float: left;
				width: 26%;

				margin-right: 30px;
			}
			.bz {
				width: 100%;
				margin-top: 20px;
			}
		}
		.img {
			margin-top: 20px;

			ul {
				margin-top: 20px;

				li {
					float: left;
					margin-right: 10px;
					img {
						width: 60px;
					}
				}
			}
		}
	}
}

.page2 {
	.name1 {
		margin-top: 20px;
		.el-input {
			width: 180px;
			input {
				width: 100%;
			}
		}
	}
	.left1 {
		float: left;
		margin-left: 40px;
	}
	.right1 {
		float: right;
		margin-right: 40px;
		.comment {
			margin-top: 20px;
			div {
				margin-top: 20px;
			}
		}

		.img-box {
			width: 260px;
		}
	}
	.img1 {
		margin-top: 20px;
		margin-left: 40px;
	}
}

.page3 {
	.left2 {
		float: left;
		margin-left: 50px;
		.name2 {
			div {
				margin-top: 20px;
			}
			.el-input {
				width: 180px;
			}
		}
	}
	.right2 {
		float: right;
		margin-right: 50px;
	}
	.img2 {
		margin-left: 50px;
		margin-top: 20px;
	}
}
</style>
