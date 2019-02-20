<template>
  <div>

    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <div>
            <div class="s_sidebar">
              <router-link to="/Home2" tag="div">
                <div class="s_title">
                  <div>
                    <!--<img src="../assets/logo.png" alt="">-->
                    <h1>PUPPY CMS</h1>
                  </div>
                </div>
              </router-link>
              <ul>
                <router-link to="/Goods" tag="li">
                  <div class="s_menu_title">
                      <span>
                        <!--<i class="el-icon-goods"> </i>-->
                        <span class="el-icon-goods"></span>
                        <span>商品管理</span>
                      </span>
                    <i class="el-icon-arrow-right s_menu_right"></i>
                  </div>
                </router-link>
                <router-link to="/Client" tag="li">
                    <div class="s_menu_title">
                      <span>
                        <!--<i class="el-icon-goods"> </i>-->
                        <span class="el-icon-service"></span>
                        <span>客户管理</span>
                      </span>
                      <i class="el-icon-arrow-right s_menu_right"></i>
                    </div>
                </router-link>

                <router-link to="/Order" tag="li">
                    <div class="s_menu_title">
                      <span>
                        <!--<i class="el-icon-goods"> </i>-->
                        <span class="el-icon-edit-outline"></span>
                        <span>订单管理</span>
                      </span>
                      <i class="el-icon-arrow-right s_menu_right"></i>
                    </div>
                </router-link>

                <router-link to="/Return" tag="li">
                    <div class="s_menu_title">
                      <span>
                        <!--<i class="el-icon-goods"> </i>-->
                        <span class="el-icon-time"></span>
                        <span>退货管理</span>
                      </span>
                      <i class="el-icon-arrow-right s_menu_right"></i>
                    </div>
                </router-link>

                <router-link to="/Service" tag="li">
                    <div class="s_menu_title">
                      <span>
                        <i class="el-icon-phone"> </i>
                        <span>客服管理</span>
                      </span>
                      <i class="el-icon-arrow-right s_menu_right"></i>
                    </div>
                </router-link>
                <router-link to="/Purc" tag="li">
                    <div class="s_menu_title">
                      <span>
                        <i class="el-icon-sold-out"> </i>
                        <span>采购管理</span>
                      </span>
                      <i class="el-icon-arrow-right s_menu_right"></i>
                    </div>
                </router-link>
                <router-link to="/Sell" tag="li">
                  <div class="s_menu_title">
                      <span>
                        <i class="el-icon-sold-out"> </i>
                        <span>销售管理</span>
                      </span>
                    <i class="el-icon-arrow-right s_menu_right"></i>
                  </div>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content bg-purple-light">
          <div class="s_right_box">
            <div class="s_content_right">
              <div class="s_trigger">
                <span class="fa fa-home"></span>
                <span>仪表板</span>
              </div>
              <div class="s_personal">
                <div class="s_personal_box">
                  <div class="s_user">
                    <span class="s_name">当前登录：</span>
                    <span class="s_name">{{u_user}}</span>
                  </div>
                  <ol class="s_personal_list">
                    <li><span class="fa fa-user"></span> &nbsp;<span>个人中心</span></li>
                    <li style="border-bottom: 1px solid #d9d9d9"><span class="fa fa-cog"></span> &nbsp;<span>个人设置</span></li>
                    <li @click="open2"><span class="fa fa-circle-o-notch"></span> &nbsp;<span><el-button type="text" @click="open2">退出登录</el-button></span></li>
                  </ol>
                </div>
              </div>
              <!--<div class="s_msg">-->
                <!--<el-badge :value="12" class="item">-->
                  <!--<span size="small" class="el-icon-bell"></span>-->
                  <!--<div class="s_list_msg">-->
                    <!--<div class="s_portrait">-->
                      <!--<span>-->
                        <!--<img src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" alt="">-->
                      <!--</span>-->
                      <!--<span>-->
                        <!--<p>你收到了14份新周报</p>-->
                        <!--<p style="font-size: 12px;">1年前</p>-->
                      <!--</span>-->
                    <!--</div>-->
                    <!--<div class="s_portrait">-->
                      <!--<span>-->
                        <!--<img src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" alt="">-->
                      <!--</span>-->
                      <!--<span>-->
                        <!--<p>你收到了14份新周报</p>-->
                        <!--<p style="font-size: 12px;">1年前</p>-->
                      <!--</span>-->
                    <!--</div>-->
                    <!--<div class="s_portrait">-->
                      <!--<span>-->
                        <!--<img src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" alt="">-->
                      <!--</span>-->
                      <!--<span>-->
                        <!--<p>你收到了14份新周报</p>-->
                        <!--<p style="font-size: 12px;">1年前</p>-->
                      <!--</span>-->
                    <!--</div>-->
                    <!--<div class="s_portrait">-->
                      <!--<span>-->
                        <!--<img src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" alt="">-->
                      <!--</span>-->
                      <!--<span>-->
                        <!--<p>你收到了14份新周报</p>-->
                        <!--<p style="font-size: 12px;">1年前</p>-->
                      <!--</span>-->
                    <!--</div>-->
                    <!--<div class="s_portrait">-->
                      <!--<span>-->
                        <!--<img src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" alt="">-->
                      <!--</span>-->
                      <!--<span>-->
                        <!--<p>你收到了14份新周报</p>-->
                        <!--<p style="font-size: 12px;">1年前</p>-->
                      <!--</span>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</el-badge>-->

              <!--</div>-->
            </div>

            <router-view></router-view>


          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>


  document.onscroll = ()=>{
    let x = document.documentElement.offsetHeight

    document.getElementsByClassName('s_sidebar')[0].style.height=x + 'px';

  }
  import Goods from './../components/Goods'
  import Client from './../components/Client'
  import Order from './../components/Order'
  import Return from  './../components/Return'
  import Service from  './../components/Service'
  import Sell from  './../components/Sell'
  import Purc from  './../components/Purc'
  import Home2 from  './../components/Home2'


    export default {
        name: "Home",
      data :function() {
        return {
          search: '',
          tableData:[],
          u_user:'',

        }
      },
      methods:{
        open2(){
          this.$confirm('此操作将退出管理系统, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '已退出'
            });
            this.$router.replace('/Login');
            this.$axios.get('http://localhost:1235/clear_session').then(res=>{
                console.log(res)
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      },
      created(){
          this.$axios.get('http://localhost:1235/a',{emulateJSON:true,withCredentials: true})
            .then((res)=> {
              // console.log(res)
            this.u_user = res.data.user
            localStorage.setItem('user',res.data.user)
          }).catch((err)=> {

          });
      },
      computed: {

      },

      components: {
        Goods,
        Client,
        Order,
        Return,
        Service,
        Sell,
        Purc,
        Home2
      },
    }
</script>

<style scoped lang="less">
  *{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .el-col-19{
    overflow: hidden;
  }

  .s_right_box{
    background: #f0f2f5;
  }
  .s_sidebar{
    overflow: hidden;
    width: 100%;
    height: 1000px;
   background: #272f3a;
    .s_title{
      height: 64px;
      line-height: 64px;
      background: #1d385c;
      padding-left: 30px;
      padding-right: 35px;
      white-space : nowrap;//强制不换行
      cursor: pointer;
      img{
        display: inline-block;
        width: 32px;
        height: 32px;
        vertical-align: middle;
      }
      h1{
        letter-spacing: 5px;
        overflow: hidden;
        margin-left: 5px;
        display: inline-block;
        font-weight: normal;//强制不换行
        font-size: 20px;
        color: #fff;
        height: 32px;
        line-height: 32px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        vertical-align: middle;
      }
    }
    ul{
      li{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        color: hsla(0,0%,100%,.65);
        font-size: 16px;
        cursor: pointer;
        white-space : nowrap;
        margin: 5px 0;
        position: relative;
        transition: all .5s;
        &:hover{
          background: #409EFF;
          color:#fff
        }
        .s_menu_title{
          height: 50px;
          line-height: 50px;
          padding-left: 30px;
          &:hover .s_menu_right{
            transform: rotate(90deg);

            transition: all .1s;
          }
          .s_menu_right{
            transform-origin:65% 20%;
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
          }
        }
      }
    }
    .s_transform{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #002140;
      color: #fff;
      cursor:pointer;
     }
  }
  .s_content_right{
    width: 100%;
    height: 64px;
    background: #fff;
    box-shadow:  0 2px 6px rgba(0,21,41,.35);


    .s_trigger{
      float: left;
      font-size: 20px;
      text-align: center;
      width: 100px;
      height: 64px;
      line-height: 64px;
      color: #333;
      cursor: pointer;
    }
    /*.s_msg{*/
      /*height: 64px;*/
      /*color: #909090;*/
      /*line-height: 64px;*/
      /*text-align: center;*/
      /*float: right;*/
      /*margin-right: 20px;*/
      /*padding: 0 10px;*/
      /*&:hover .s_list_msg{*/
        /*height: 343px;*/
      /*}*/

      /*.el-badge__content.is-fixed {*/
        /*top: 15px;*/
      /*}*/
      /*.s_list_msg{*/
        /*width: 300px;*/
        /*!*padding: 10px;*!*/
        /*border-radius: 4px;*/
        /*background: #f9f9f9;*/
        /*position: absolute;*/
        /*top: 65px;*/
        /*right: -155px;*/
        /*z-index: 999;*/
        /*transition: all .3s;*/
        /*height: 0;*/
        /*overflow: hidden;*/
        /*.s_portrait{*/
          /*text-align: left;*/
          /*padding: 15px 10px;*/
          /*line-height: normal;*/
          /*border-bottom: 1px solid #e8e8e8;*/
          /*cursor: pointer;*/
          /*&:hover{*/
            /*background: #e6f7ff;*/
          /*}*/
          /*span{*/
            /*display: inline-block;*/
            /*img{*/
              /*width: 32px;*/
              /*height: 32px;*/
              /*border-radius: 100%;*/
              /*margin-right: 10px;*/
            /*}*/
          /*}*/
        /*}*/
      /*}*/
    /*}*/
    .s_personal{
      float: right;
      margin-right: 10px;
      width: 180px;
      height: 64px;
      &:hover .s_personal_list{
        height: 117px;
      }
      &:hover .s_menu{
        transform: rotate(90deg);
      }
      .s_personal_box{
        cursor: pointer;
        text-align: right;
        .s_user{
          margin-top: 16px;
          .s_menu{
            display: inline-block;
            transform-origin: 50%;
            transition: .5s;
          }
        }


      }
      img{
        width: 24px;
        height: 24px;
        vertical-align: middle;
      }
      .s_name{
        color: #333;
        height: 24px;
        vertical-align: middle;
      }
      .s_personal_list{
        z-index: 99;
        margin-top: 28px;
        /*width: 160px;*/
        height: 0;
        position: absolute;
        right: 20px;
        overflow: hidden;
        white-space : nowrap;//强制不换行
        background: #fff;
        border-radius: 3px;
        box-shadow:  0 2px 6px rgba(0,21,41,.35);
        transition: all .3s;
        font-size: 15px;
        li{
          padding: 6px 40px;
          margin: 5px 0;
          cursor: pointer;
          color: #333;
          &:hover{
            background: #E6F7FF;
            color: #333;
            transition: all .2s;
          }
        }
      }
    }
  }
  .s_content_box{
    margin-top: 25px;
    margin-left: 25px;
    margin-right: 25px;
    .s_content_two{
      width: 100%;
      background: #fff;
      .s_tabs_bar{
        padding: 0 16px;
        position: relative;
        border-bottom: 1px solid #e8e8e8;

        .s_tabs_title{
          display: inline-block;
          line-height: 24px;
          padding: 16px;
          color: #1d385c;
          border-bottom: 2px solid #1890ff;
        }
        .s_tabs_time{
          display: inline-block;
          position: absolute;
          right: 25px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .s_table{
        margin-top:20px;
        display: flex;
        justify-content: space-between;
        .s_chart{
          width: 900px;
          height: auto;
          padding: 0 0 32px 32px;
        }
        .s_table_msg{
          padding: 0 25px 32px 72px;
          li{
            margin-top: 16px;
            white-space: pre;
          }
          h1{
            font-weight: normal;
            font-size: 14px;
            margin-bottom: 25px;
          }
          .s_number{
            display: inline-block;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border-radius: 50%;
            background: #314659;
            margin-right: 16px;
            color: white;
            font-size: 12px;
          }
          .s_text{
            display: inline-block;
            width: 210px;
            white-space: nowrap;
            margin-right: 8px;
            color:rgba(0,0,0,.65);
          }
          .s_hotNumber{
            color:rgba(0,0,0,.65);
            display: inline-block;
          }

        }

      }
    }
    .s_three{
      background: #fff;
      margin-top: 20px;
      background: #f0f2f5;
      .s_left{
        padding: 10px;
        margin-right: 10px;
        background: #fff;
        .s_panel-heading{
          padding: 15px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e8e8e8;
          h3{
            font-weight: normal;
            font-family: "Source Sans Pro", sans-serif;
            font-size: 16px;
            color: #676a6d;;
          }
        }
        .s_table_striped{
          padding-left:10px;
        }
      }
      .s_right{
        padding: 10px;
        background: #fff;
        margin-left: 10px;
        .s_panel-heading{
          padding: 15px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e8e8e8;
          h3{
            font-weight: normal;
            font-family: "Source Sans Pro", sans-serif;
            font-size: 16px;
            color: #676a6d;;
          }
        }
        .s_table_char{
          margin-top: 12px;
        }
      }
    }
  }

  .active{//点击改变样式
    width: 80px;
  }
  .el-range-editor.el-input__inner{
    width: 320px;
  }



</style>

