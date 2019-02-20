<template>
  <div>
    <div class="antd-pro">
      <div class="antd-title">
      </div>
      <div class="antd-content">
        <div class="antd-content-img">
          <a href="">
            <img src="../assets/logo.png" alt="">&nbsp;&nbsp;
            <img class="welcome" src="../assets/l-icon.png" alt="">
          </a>
        </div>
        <div class="antd-content-text">
          <span>宠物提供宠物用品零售、宠物美容、宠物寄养、宠物活体销售的场所。</span>
        </div>
      </div>
      <div class="login-name">
        <span class="logo_content l_color" id="login">账户登录</span>
        <span class="logo_content " id="register">手机号登录</span>
      </div>
      <div class="login_form">
        <div class="login_user">
            <span class="login_icon user_name_text">
                <i class="el-icon-phone"><input v-model="s_user" type="text" placeholder="请输入用户名 " id="luser"> </i>
            </span>
        </div>
        <div class="login_user">
            <span class="login_icon user_pass_text">
                <i class="el-icon-goods"><input @keydown.enter="s_login" v-model="s_pass" type="password" placeholder="密码" id="lpass"> </i>
            </span>
        </div>

        <div class="login_user">
            <template>
              <el-button :plain="true" @click="s_login" >登 录</el-button>
            </template>
        </div>
      </div>
      <footer class="login_footer">
        <div>
          <a href="">条款</a>
          <a href="">隐私</a>
          <a href="">条款</a>
        </div>
        <div>
          <span>Copyright &copy 2018 Webstorm团队出品</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        s_user:'',
        s_pass:''

      }
    },
    methods:{
      s_login(){
        let _this=this
        if(this.s_user==''||this.s_pass==''){
          this.$message({
            showClose: true,
            message: '兄弟，账号密码不能为空！',
            type: 'error',
            center:true
          });
        }else {
          this.$axios.get('http://localhost:1235/login', {
            params: {
              luser:this.s_user,
              lpass:this.s_pass,
            }
          }).then((res)=> {

            if(res.data.state){
              this.$message.error('兄弟，账号密码怕是有点问题！');
            }else {
              this.$message({
                showClose: true,
                message: 'Welcome To PUPPY CMS',
                type: 'success',
                center:true
              });

            localStorage.setItem('token',res.data.token)

              _this.$router.replace('Home');
                // window.location.href="http://localhost:8080/#/Home?uid='"+res.data.data[0].user_id+"'"
            }
          }).catch((err)=> {
            console.log(err);
          });

        }
      }
    },
  }
</script>

<style scoped lang="less">
  .antd-pro {
    width: 100%;
    background: url('../assets/bg.svg') no-repeat;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
  }
  .antd-pro .antd-title {
    text-align: right;
    width: 100%;
    height: 40px;
    line-height: 44px;
    background: none;
  }
  .antd-pro .antd-title .antd-language {
    margin-right: 24px;
    display: inline-block;
    cursor: pointer;
    vertical-align: top;
    line-height: 64px;
  }
  .antd-pro .antd-content {
    padding: 32px 0 24px;
  }
  .antd-pro .antd-content .antd-content-img {
    position: relative;
    text-align: center;
  }
  .antd-pro .antd-content .antd-content-img a {
    display: inline-block;
    height: 44px;
    line-height: 44px;
  }
  .antd-pro .antd-content .antd-content-img a img:nth-child(1) {
    width: 44px;
    height: 44px;
  }
  .antd-pro .antd-content .antd-content-img a img:nth-child(2) {
    width: 60%;
    height: 60%;
    position: relative;
    top: -50%;
    transform: translateY(50%);
  }
  .antd-pro .antd-content .antd-content-text {
    text-align: center;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }
  .antd-pro .login-name {
    text-align: center;
  }
  .antd-pro .login-name .logo_content {
    display: inline-block;
    padding: 12px 16px;
    font-size: 18px;
    margin: 0 30px;
  }
  .antd-pro .login-name .logo_content:hover {
    cursor: pointer;
  }
  .antd-pro .login-name .l_color {
    color: #40a9ff;
    border-bottom: 3px solid #40a9ff;
  }
  .antd-pro .login-name .login_color {
    color: #333;
    border: none;
  }
  .antd-pro .login-name .login_color:hover {
    cursor: pointer;
  }
  .antd-pro .login_form {
    width: 368px;
    margin: 0 auto;
    padding-bottom: 20px;
  }
  .antd-pro .login_form .login_user {
    width: 100%;
    margin: 35px 0;
  }
  .antd-pro .login_form .login_user i {
    color: #d9d9d9;
  }
  .antd-pro .login_form .login_user .color_pass {
    float: right;
  }
  .antd-pro .login_form .login_user a {
    color: #33CCff;
  }
  .antd-pro .login_form .login_user label {
    cursor: pointer;
  }
  .antd-pro .login_form .login_user button {
    height: 43px;
    /*line-height: 40px;*/
    border-radius: 4px;
    width: 100%;
    color: #fff;
    background: #1890ff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.5s;
    &:hover{
      background-color: #40a9ff;
    }
  }
  .antd-pro .login_form .login_icon {
    display: block;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }
  .antd-pro .login_form .login_icon:hover {
    border-color: #40a9ff;
  }
  .antd-pro .login_form .login_icon i {
    padding: 5px 10px;
  }
  .antd-pro .login_form .login_icon input {
    width: 310px ;
    height: 33px;
    border: none;
    padding-left: 20px;
    outline: none;
    color: #b0b0b0;
  }
  .antd-pro .login_form .login_icon input[name="color"]::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #c0c2c4;
  }
  .antd-pro .login_footer {
    padding: 0 16px;
    text-align: center;
    margin-top: 150px;
  }
  .antd-pro .login_footer div {
    margin: 10px 0;
  }
  .antd-pro .login_footer a {
    background-color: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    padding: 0 20px;
    color: #b0b0b0;
    font-size: 14px;
    font-family: 微软雅黑;
  }
  .antd-pro .login_footer a:hover {
    color: #333;
  }
  .antd-pro .login_footer span {
    color: #b0b0b0;
    font-size: 14px;
    font-family: 微软雅黑;
  }
</style>
