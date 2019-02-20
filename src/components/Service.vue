<template>
	<div class="page">
		<h2>客服管理</h2>
		<div class="contair clearfix">
			<div class="user-list">
				<div class="header"></div>
				<div class="body">
					<ul>
						<li
							class="clearfix"
							v-for="(item, index) in newUserName"
							:key="index"
							@click="changeMsg(index)"
						>
							<div class="img"></div>
							<div class="user-msg">
								<p class="userName">
									<span>{{ newUserName[index] }}</span>
								</p>
								<p class="msg">{{ data1[data1.length-1].msg }}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
            <!-- 聊天区域 -->
			<div class="service">
				<div class="header">
					<h3>PUPPY 喂你副武</h3>
				</div>
				<div class="body" :style="{opacity:opc}" ref="body">
					<ul>
						<transition-group>
							<li v-for="(item, index) in data1" :key="data1[item]" class="clearfix">
								<div ref="dom" :class="pos" class="position clearfix">
									<p class="name">{{ data1[index].name }}</p>
									<p class="msg">{{ data1[index].msg }}</p>
								</div>
							</li>
						</transition-group>
					</ul>
				</div>
				<div class="footer clearfix">
					<div class="block"></div>
					<div class="msg">
						<textarea
							v-model="msgValue"
							class="msg-box"
							style="width: 100%;height: 100px;resize: none;border: none;"
							@keydown="send"
						></textarea>
					</div>
					<el-button type="primary" class="ok">发送</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import socket from "./../assets/common.js";

export default {
	name: "Service",
	data() {
		return {
			data: [], //所有消息
			data1: [], //存放与用户信息
			msgValue: "",
			userName: [], //存放临时用户name 左边列表name
			newUserName: [], //存放用户name  左边列表name
			opc: 0,
			pos: "left"
		};
	},
	methods: {
		send(e) {
			if (e.keyCode == 13 && e.ctrlKey) {
				// 这里实现换行
				document.getElementById("a").value += "\n";
			} else if (e.keyCode == 13) {
				// 避免回车键换行
				e.preventDefault();
				// 下面写你的发送消息的代码
				// console.log(this.newUserName);
				if (this.newUserName.length === 0) {
					console.log("别瞎搞");
					alert("现在没人,你别瞎搞!");
					this.msgValue = "";
				} else {
					// 发送消息
					let msg = { name: "客服", msg: this.msgValue };
					socket.send(JSON.stringify(msg));
					this.msgValue = "";
				}
			}
		},
		changeMsg(index) {
			this.opc = 1;
			socket.send(JSON.stringify(this.newUserName[index]));
			let newData = [];
			for (let i = 0; i < this.data.length; i++) {
				if (this.data[i].name == this.newUserName[index]) {
					newData.push(this.data[i]);
				}
			}
			this.data1 = newData;
		},
		scrollBottom() {
			let div = this.$refs.body;
			div.scrollTop = div.scrollHeight;
		}
	},
	created() {},
	mounted() {
		var _this = this;
		socket.onopen = function() {
			socket.onmessage = ev => {
				//传过来的数据其实在 ev.data
				var json = JSON.parse(ev.data);
				_this.data.push(json); //存放所有消息
				_this.data1.push(json); //存放当前用户聊天消息
				if (json.name != "客服") {
					_this.userName.push(json.name); // 存放用户name
				}
				//用户name去重
				for (let i = 0; i < _this.userName.length; i++) {
					if (_this.newUserName.indexOf(_this.userName[i]) == -1) {
						_this.newUserName.push(_this.userName[i]);
					}
				}
				// 我的消息在右

				let div = document.getElementsByClassName("position");
				setTimeout(() => {
					for (let i = 0; i < _this.data1.length; i++) {
						if (_this.data1[i].name == "客服") {
							_this.$refs.dom[i].classList.remove("left");
							_this.$refs.dom[i].classList.add("right");
						}
					}
				}, 0);
				//滚动条在底部
				_this.scrollBottom();
			};
		};
	},
	beforeUpdate() {},
	updated() {
		this.scrollBottom();
	}
};
</script>

<style scoped lang="less">
.v-enter,
.v-leave-to {
	opacity: 0;
	transform: translateX(-80px);
}
.v-enter-active,
.v-leave-active {
	transition: all 0.1s ease-out;
}
.page {
	.contair {
		width: 99%;
		background-color: #fff;
		border: 2px solid #001529;
		border-radius: 10px;
		.user-list {
			float: left;
			width: 30%;
			height: 689px;
			border-right: 2px solid #001529;
			// background-color: #999;
			box-sizing: border-box;
			.header {
				width: 100%;
				height: 30px;
				background-color: #001529;
				border-top-left-radius: 7px;
			}
			.body {
				ul {
					li {
						box-sizing: border-box;
						margin-bottom: 20px;
						.img {
							float: left;
							width: 70px;
							height: 70px;
							background-color: #888;
						}
						.user-msg {
							float: right;
							width: calc(100% - 70px);
							height: 30px;
							.userName {
								box-sizing: border-box;
								padding-left: 15px;
								width: 100%;
								height: 30px;
								font-size: 20px;
								font-weight: bold;
								background-color: blue;
							}
							.msg {
								width: 100%;
								height: 42px;
								line-height: 42px;
								box-sizing: border-box;
								padding: 0 10px;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}
					}
				}
			}
		}
		.service {
			width: 70%;
			height: 100%;
			float: right;
			.header {
				width: 100%;
				height: 30px;
				background-color: #001529;
				color: hsla(0, 0%, 100%, 0.65);
				h3 {
					width: 100%;
					text-align: center;
				}
			}
			.body {
				width: 100%;
				height: 500px;
				padding: 20px;
				box-sizing: border-box;
				overflow: auto;

				ul {
					li {
						width: 100%;
						margin-top: 10px;
						.left {
							float: left;
							.name {
								width: 50px;
								height: 50px;
								background-color: black;
								line-height: 50px;
								text-align: center;
								color: #fff;
								font-size: 16px;
								font-weight: bold;
							}
							.msg {
								display: inline-block;
								background-color: #2db7f5;
								margin-left: 60px;
								margin-top: -20px;
								padding: 10px;
								box-sizing: border-box;
								border-radius: 10px;
								font-weight: bold;
								color: #fff;
							}
						}
						.right {
							float: right;
							.name {
								float: right;
								width: 50px;
								height: 50px;
								background-color: blue;
								line-height: 50px;
                                text-align: center;
                                font-size: 16px;
                                font-weight: bold;
                                color: #fff;
							}
							.msg {
								display: inline-block;
								max-width: 890px;
								box-sizing: border-box;
								background-color: #2db7f5;
								margin-right: 10px;
								margin-top: 40px;
								padding: 10px;
								border-radius: 10px;
								word-wrap: break-word;
							}
						}
					}
				}
			}

			.footer {
				width: 100%;
				.block {
					width: 100%;
					height: 15px;
					background-color: #001529;
				}
				.msg {
					.msg-box {
						box-sizing: border-box;
						padding: 10px;
						outline: none;
						font-size: 20px;
					}
				}
				.ok {
					float: right;
					margin-right: 5px;
				}
			}
		}
	}
}
</style>
