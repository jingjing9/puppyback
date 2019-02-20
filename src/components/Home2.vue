<template>
    <section class="s_content_box">
      <ul class="s_content_list">
        <li class="s_content_chart">
          <div class="s_content_msg">
            <div class="s_panel_left">
              <p class="s_p1"><span>月销售额</span><i class="el-icon-info" style="color: #ccc;float: right"></i></p>
              <h1>¥{{con}}</h1>
              <p class="s_p2"><span>周同比</span> <span>12%</span> <span style="color: red;font-size: 8px" class="el-icon-caret-top"></span>  <span>周同比</span> <span>12%</span><span style="color: green;font-size: 8px" class="el-icon-caret-bottom"></span> </p>
              <p class="s_p3"><el-progress :percentage="50"></el-progress></p>
            </div>
          </div>
        </li>
        <li class="s_content_chart">
          <div class="s_content_msg">
            <div class="s_panel_left">
              <p class="s_p1"><span>月订单量</span><i class="el-icon-info" style="color: #ccc;float: right"></i></p>
              <h1>¥{{con2}}</h1>
              <p class="s_p2"><span>周同比</span> <span>12%</span> <span style="color: red;font-size: 8px" class="el-icon-caret-top"></span>  <span>周同比</span> <span>12%</span><span style="color: green;font-size: 8px" class="el-icon-caret-bottom"></span> </p>
              <p class="s_p3"><el-progress :percentage="50"></el-progress></p>
            </div>
          </div>
        </li>
        <li class="s_content_chart">
          <div class="s_content_msg">
            <div class="s_panel_left">
              <p class="s_p1"><span>用户量</span><i class="el-icon-info" style="color: #ccc;float: right"></i></p>
              <h1>{{arr2}}</h1>
              <p class="s_p2"><span>周同比</span> <span>12%</span> <span style="color: red;font-size: 8px" class="el-icon-caret-top"></span>  <span>周同比</span> <span>12%</span><span style="color: green;font-size: 8px" class="el-icon-caret-bottom"></span> </p>
              <p class="s_p3"><el-progress :percentage="50"></el-progress></p>
            </div>
          </div>
        </li>
        <li class="s_content_chart">
          <div class="s_content_msg">
            <div class="s_panel_left">
              <p class="s_p1"><span>月采购量</span><i class="el-icon-info" style="color: #ccc;float: right"></i></p>
              <h1>¥{{str3}}</h1>
              <p class="s_p2"><span>周同比</span> <span>12%</span> <span style="color: red;font-size: 8px" class="el-icon-caret-top"></span>  <span>周同比</span> <span>12%</span><span style="color: green;font-size: 8px" class="el-icon-caret-bottom"></span> </p>
              <p class="s_p3"><el-progress :percentage="70"></el-progress></p>
            </div>
          </div>
        </li>
      </ul>
      <div class="s_content_two">
        <div class="s_tabs_bar">
          <div class="s_tabs_title">
            <span>销售额</span>
          </div>
          <!--<div class="s_tabs_time">-->
            <!--<div class="block">-->
              <!--<el-date-picker-->
                <!--v-model="value7"-->
                <!--type="datetimerange"-->
                <!--align="right"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期"-->
                <!--:default-time="['12:00:00', '08:00:00']">-->
              <!--</el-date-picker>-->
            <!--</div>-->
          <!--</div>-->
        </div>
        <div class="s_table">
          <div class="s_chart">
            <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
          </div>
          <div class="s_table_msg">
            <h1>商品销售排名</h1>
            <ul>
              <li v-for="(v,i) in arr"><span class="s_number">{{i+1}}</span> <span class="s_text">{{v.goods_name}}</span> <span class="s_hotNumber">{{v.order_buynum}}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="s_three">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div class="s_left">
                <div class="s_panel-heading">
                  <h3>最近购买</h3>
                  <div> <span class="el-icon-arrow-up"></span></div>
                </div>
                <div class="s_table_striped">
                  <el-table
                    :data="sum"
                    border
                    style="width: 100%">
                    <el-table-column
                      fixed
                      prop="order_day"
                      label="日期"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="goods_id"
                      label="商品编号"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="add_person"
                      label="姓名"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="a_address"
                      label="地址"
                      width="300">
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      prop="add_tel"
                      label="联系电话"
                      width="120">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <div class="s_right">
                <div class="s_panel-heading">
                  <h3>销售额占比</h3>
                  <div> <span class="el-icon-arrow-up"></span></div>
                </div>
                <div class="s_table_char">
                  <ve-ring :data="chartData"></ve-ring>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
</template>
<script>
  export default {
    name: "home2",
    data() {
      this.chartSettings = {
        showLine: ['下单用户'],
        color: ['red'],
      }

      return {
        arr: [],
        arr2: 0,
        sum: [],
        str3:0,
        con: 0,
        con2: 0,
        value6: '',
        value7: '',
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
      }
    },
    created() {
      this.$axios.get('http://localhost:1235/S_list').then((res) => {
        console.log(res.data.data)
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].order_day = new Date(res.data.data[i].order_day)
          res.data.data[i].order_day = res.data.data[i].order_day.toLocaleString()
          res.data.data[i].order_day = res.data.data[i].order_day.substring(0, 10)
          res.data.data[i].goods_id = res.data.data[i].goods_id.toString();
          res.data.data[i].goods_name = res.data.data[i].goods_name.substr(0, 5);
          res.data.data[i].spe1_val = res.data.data[i].spe1_val + " " + res.data.data[i].spe2_val
          this.con += res.data.data[i].Price
          this.con2 += res.data.data[i].order_buynum
        }
        console.log(this.con);

        this.arr = res.data.data;
        console.log(this.arr, 13123123123)
        this.arr.length = 8;
      });
      this.$axios.get('http://localhost:1235/b').then(res => {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].order_day = new Date(res.data.data[i].order_day)
          res.data.data[i].order_day = res.data.data[i].order_day.toLocaleString()
          res.data.data[i].order_day = res.data.data[i].order_day.substring(0, 10)
        }
        res.data.data.length = 8
        this.sum = res.data.data
        console.log(this.sum)
      }),
        this.$axios.get('http://localhost:1235/c').then(res => {
          console.log(res.data.data)
          this.arr2 = res.data.data[0].num
        })
        this.$axios.get('http://localhost:1235/d').then(res => {
          for(var i = 0;i<res.data.data.length;i++){
            this.str3 += res.data.data[i].purcTotal
          }
          console.log(res.data.data)
          console.log(this.str3)
        // this.str3 = res.data.data[0].num
        })

    },
  }
</script>

<style scoped lang="less">
  .s_content_box{
    margin: 25px 0 0 0;
    .s_content_list{
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .s_content_chart{

        .s_content_msg{
          background: #fff;
          padding: 15px;
          width: 260px;
          .s_panel_left{

            .s_p1{
              color:rgba(0,0,0,.45);;
              margin-bottom: 10px;
            }
            h1{
              font-weight: normal;
              margin-bottom: 20px;
              font-size: 30px;
            }
            .s_p2{
              color: rgba(0,0,0,.65);
              margin-bottom: 20px;
              border-bottom: 1px solid #e8e8e8;
              padding-bottom: 10px;
            }
            .s_p3{
              color:rgba(0,0,0,.65);
            }



          }
          .s_panel_right{
            width: 100px;
            height: 100px;
            background-color: #000;
          }
          /*.s_p1{*/
            /*color:rgba(0,0,0,.45);;*/
            /*margin-bottom: 10px;*/
          /*}*/
          /*h1{*/
            /*font-weight: normal;*/
            /*margin-bottom: 20px;*/
            /*font-size: 30px;*/
          /*}*/
          /*.s_p2{*/
            /*color: rgba(0,0,0,.65);*/
            /*margin-bottom: 20px;*/
            /*border-bottom: 1px solid #e8e8e8;*/
            /*padding-bottom: 10px;*/
          /*}*/
          /*.s_p3{*/
            /*color:rgba(0,0,0,.65);*/
          /*}*/
        }
      }
    }
    .s_content_two{
      width: 100%;
      /*height: 400px;*/
      background: #fff;
      .s_tabs_bar{
        padding: 0 16px;
        position: relative;
        border-bottom: 1px solid #e8e8e8;

        .s_tabs_title{
          display: inline-block;
          line-height: 24px;
          padding: 16px;
          color: #1890ff;
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
          padding: 0 40px 10px 10px;
          li{
            margin-top: 16px;
            /*white-space: pre;*/
            white-space : nowrap;
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
            width: 110px;
            white-space: nowrap;
            margin-right: 8px;
            color: rgba(0, 0, 0, 0.65);
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

