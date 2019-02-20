<template >
  <div id="cli-box">
    <el-row class="cli-row">
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">
          <el-container>
            <el-header>
              <span class="cli-title">客户管理</span>
              <div class="cli-search">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="showcheck"></el-button>
                </el-input>
              </div>
            </el-header>
            <el-main>
              <el-table
                :data="tableData2"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                  prop="cliId"
                  label="用户ID"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="cliName"
                  label="用户昵称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="cliTel"
                  label="联系电话">
                </el-table-column>
                <el-table-column
                  prop="cliPurc"
                  label="购买记录">
                  <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-search" size="mini" class="cli-btn" @click="checkPurc(scope.row.cliId)">查看</el-button>
                    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
                      <el-table :data="purclist">
                        <el-table-column property="order_num" label="订单号" width="150"></el-table-column>
                        <el-table-column property="goods_name" label="商品名" width="200"></el-table-column>
                        <el-table-column property="order_day" label="购买时间" width="200"></el-table-column>
                        <el-table-column property="now_price" label="合计"></el-table-column>
                      </el-table>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cliTotal"
                  label="总消费额">
                  <template slot-scope="scope">
                    <span class="buyTotal">￥</span><span class="cli-font1">{{scope.row.cliTotal}}</span><span class="buyTotal">.00</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
            <el-footer>
              <div class="cli-foot">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="page" :current-page.sync="num" @current-change="show(num)">
                </el-pagination>
              </div>
            </el-footer>
          </el-container>
        </div>
      </el-col>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>


</template>

<script>
  export default {
    name: "Client",

    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      checkPurc(i) {
        this.dialogTableVisible = true;
        this.$axios.get('http://localhost:1235/checkPurc', {
          params: {
            id: i
          }

        }).then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            let arr = res.data[i].order_day.split('T');
            res.data[i].order_day = arr[0];
          }
          this.purclist = res.data;
        })
          .catch((err) => {
            console.log(err)
          })

      },
      show(i) {
        if(this.input5==''){
          this.$axios.get('http://localhost:1235/clientList', {
            params: {
              page: i
            }

          }).then((res) => {
            this.tableData2 = res.data;
          })
            .catch((err) => {
              console.log(err)
            })
        }else{
          this.$axios.get('http://localhost:1235/checkList', {
            params: {
              str:this.input5
            }

          }).then((res) => {
            this.tableData2 =res.data.slice((i-1)*6,6*i);
          })
            .catch((err) => {
              console.log(err)
            });

        }

      },
      showcheck(){
        this.$axios.get('http://localhost:1235/checkList', {
          params: {
            str:this.input5
          }

        }).then((res) => {
          this.tableData2 = res.data.slice(0,6);
          this.page = Math.ceil(res.data.length/6) * 10;
        })
          .catch((err) => {
            console.log(err)
          });
      },
      change(){
        this.checkstr='';
      }
    },

    data() {
      return {
        input3: '',
        input4: '',
        input5: '',
        select: '',
        dialogTableVisible: false,
        tableData2: [],
        purclist: [],
        num: '',
        page: '',
        checkstr:''
      }
    },
    created() {
      this.$axios.get('http://localhost:1235/clientList', {
        params: {
          page: 1
        }

      }).then((res) => {
        this.tableData2 = res.data;

      })
        .catch((err) => {
          console.log(err)
        });
      this.$axios.get('http://localhost:1235/getcpage')
        .then((res) => {
          this.page = Math.ceil(res.data[0].total / 6) * 10;
        })
        .catch((err) => {
          console.log(err)
        });

    },
      watch:{
      input5: function (val) {
     if(val==''){
       this.$axios.get('http://localhost:1235/clientList', {
         params: {
           page: 1
         }

       }).then((res) => {
         this.tableData2 = res.data;
        this.num=1;
       })
         .catch((err) => {
           console.log(err)
         });
       this.$axios.get('http://localhost:1235/getcpage')
         .then((res) => {
           this.page = Math.ceil(res.data[0].total / 6) * 10;
         })
         .catch((err) => {
           console.log(err)
         });
     }
      }
      }

  }
</script>

<style scoped lang="less">
  @cli-color:#1890ff;
  .buyTime,.buyName,.buyTotal{
    margin-right: 20px;
  }
  .buyTotal{
    color: rgb(245,34,45);
  }
  .cli-title2{
    font-size: 16px;
  }
  .cli-title{
    font-size: 16px;
    color: rgba(0,0,0,0.85);
  }
  .el-header{
    margin-bottom: 4px;
  }
  .el-footer{
    margin-top: 4px;
  }
  .el-header, .el-footer {
    background-color: white;
    color: #333;
    line-height: 60px;
  }
  .el-main {
    color: #333;
    background-color: white;
  }
  .cli-row{
    background-color: rgb(240,242,245);
    padding: 15px 0;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .cli-search{
    width: 50%;
    float: right;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .cli-foot{
    float: right;
    margin-top: 15px;
  }
  .cli-font1{
    color: rgb(245,34,45);
  }
  .cli-btn{
    background-color: #1890ff;
  }
</style>
