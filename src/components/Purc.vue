<template>
  <div id="cli-box">
    <el-row class="cli-row">
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">
          <el-container>
            <el-header>
              <span class="cli-title">采购管理</span>
              <div class="purc-new">
                <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">录入</el-button>
                <el-dialog title="录入采购信息" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="商品名称" :label-width="formLabelWidth">
                      <el-input v-model="form.name" autocomplete="off" style="width: 400px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品规格" :label-width="formLabelWidth">
                      <el-input v-model="form.size" autocomplete="off" style="width: 400px"></el-input>
                    </el-form-item>
                    <el-form-item label="进价" :label-width="formLabelWidth">
                      <el-input v-model="form.price" autocomplete="off" style="width: 400px"></el-input>
                    </el-form-item>

                    <el-form-item label="商品数量" :label-width="formLabelWidth">
                      <el-input v-model="form.num" autocomplete="off" style="width: 400px"></el-input>
                    </el-form-item>
                    <el-form-item label="总价" :label-width="formLabelWidth">
                      <el-input v-model="form.total" autocomplete="off" style="width: 400px"></el-input>
                    </el-form-item>
                    <el-form-item label="生产商" :label-width="formLabelWidth">
                      <el-input v-model="form.person" autocomplete="off" style="width: 400px"></el-input>
                    </el-form-item>
                    <el-form-item label="生产商联系电话" :label-width="formLabelWidth">
                      <el-input v-model="form.tel" autocomplete="off" style="width: 400px"></el-input>
                    </el-form-item>
                    <el-form-item label="采购时间" :label-width="formLabelWidth">
                      <el-col :span="11">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addPurc">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-header>
            <el-main id="purclist">
              <el-table
                :data="tableData5"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="序号">
                        <span>{{ props.row.purcNum }}</span>
                      </el-form-item>
                      <el-form-item label="商品名称">
                        <span>{{ props.row.purcName }}</span>
                      </el-form-item>
                      <el-form-item label="规格型号">
                        <span>{{ props.row.purcSize }}</span>
                      </el-form-item>
                      <el-form-item label="进价">
                        <span>{{ props.row.purcPraise }}</span>
                      </el-form-item>
                      <el-form-item label="采购数量">
                        <span>{{ props.row.purcTotal }}</span>
                      </el-form-item>
                      <el-form-item label="总价">
                        <span>{{ props.row.totalPraise}}</span>
                      </el-form-item>
                      <el-form-item label="采购时间">
                        <span>{{ props.row.purcTime }}</span>
                      </el-form-item>
                      <el-form-item label="生产商">
                        <span>{{ props.row.purcPerson }}</span>
                      </el-form-item>
                      <el-form-item label="生产商联系电话">
                        <span>{{ props.row.purcTel }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="序号"
                  prop="purcNum">
                </el-table-column>
                <el-table-column
                  label="商品名称"
                  prop="purcName">
                </el-table-column>
                <el-table-column
                  label="规格型号"
                  prop="purcSize">
                </el-table-column>
                <el-table-column
                  label="进价"
                  prop="purcPraise">
                </el-table-column>
                <el-table-column
                  label="采购数量"
                  prop="purcTotal">
                </el-table-column>
                <el-table-column
                  label="总价"
                  prop="totalPraise">
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
          .catch(_ => {});
      },
      addPurc(){
        this.$axios.get('http://localhost:1235/addPurc', {
          params: {
            name: this.form.name,
            size:this.form.size,
            price:this.form.price,
            num:this.form.num,
            total:this.form.total,
            time:''+this.form.time+'',
            person:this.form.person,
            tel:this.form.tel
          }

        }).then((res) => {
          this.$axios.get('http://localhost:1235/purcList',{
            params: {
              page: 1
            }
          })
            .then((res)=>{
              this.tableData5=res.data;
            })
            .catch((err)=>{
              console.log(err)
            });
          this.$axios.get('http://localhost:1235/getPpage')
            .then((res) => {
              this.page = Math.ceil(res.data[0].total / 6) * 10;
            })
            .catch((err) => {
              console.log(err)
            });
        })
          .catch((err) => {
            console.log(err)
          })
        this.dialogFormVisible = false;

      },
      show(i) {
        this.$axios.get('http://localhost:1235/purcList', {
          params: {
            page: i
          }

        }).then((res) => {
          this.tableData5 = res.data;

        })
          .catch((err) => {
            console.log(err)
          });
      }
    },

    data() {
      return {
        input3: '',
        input4: '',
        input5: '',
        select: '',
        num: '',
        page: '',
        dialogVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          size: '',
          price: '',
          num: '',
          total:'',
          time:'',
          person:'',
          tel:'',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        tableData5: []


      }
    },
    created() {

        this.$axios.get('http://localhost:1235/purcList', {
          params: {
            page: 1
          }

        }).then((res) => {
          this.tableData5 = res.data;
        })
          .catch((err) => {
            console.log(err)
          });
        this.$axios.get('http://localhost:1235/getPpage')
          .then((res) => {
            this.page = Math.ceil(res.data[0].total / 6) * 10;
          })
          .catch((err) => {
            console.log(err)
          });

      }
  }
</script>
<style scoped lang="less">

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
  .purc-new{
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
