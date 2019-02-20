<template>
  <div style="background: #f0f2f5;border-top: 3px solid #3c8dbc;margin-top: 20px">
    <div class="s_header" style="background: #fff;">
      <span>销售报表</span>
    </div>
    <div class="s_section" style="background: #fff;">
      <div class="s_list">
        <div>
          <span class="s_snumber">订单编号:</span>
          <span class="s_input">
            <el-input
              placeholder="请输入内容"
              v-model="search"
              clearable>
            </el-input>
          </span>
        </div>
        <div class="s_query">
          <span style="display:inline-block;">
          <span style="display: inline-block;color: #606266">日期时间:</span>
             <div class="block" style="display: inline-block">
                <el-date-picker
                  v-model="value7"
                  type="daterange"

                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['23:59:59', '23:59:59']">>
                </el-date-picker>
             </div>
          </span>
          <el-button @click="show" type="primary" icon="el-icon-search">搜索</el-button>

        </div>
      </div>

      <div class="s_table_sell">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
          show-summary>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 ID:">
                  <span>{{ props.row.goods_id }}</span>
                </el-form-item>
                <el-form-item label="商品名称:">
                  <span>{{ props.row.goods_name }}</span>
                </el-form-item>
                <el-form-item label="所属店铺:">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>

                <el-form-item label="店铺 ID:">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类:">
                  <span>{{ props.row.class_name }}</span>
                </el-form-item>
                <el-form-item label="店铺地址:">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述:">
                  <span>{{ props.row.goods_name}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="order_day"
            label="日期"
            width="200"
            sortable>
          </el-table-column>
          <el-table-column
            prop="goods_id"
            label="商品编号"
            width="150"
            sortable>
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            width="180"
            sortable>
          </el-table-column>
          <el-table-column
            prop="spe1_val"
            label="商品规格"
            sortable>
          </el-table-column>
          <el-table-column
            prop="order_buynum"
            label="数量"
            sortable>
          </el-table-column>
          <el-table-column
            prop="pre_price"
            label="单价"
            sortable>
          </el-table-column>
          <el-table-column
            prop="Price"
            label="销售金额"
            sortable>
          </el-table-column>
          <el-table-column
            prop="addres"
            label="销售利润"
            sortable>
          </el-table-column>
        </el-table>
      </div>
      <div class="s_paging">
        <div >
          <el-pagination
            background
            layout="prev, pager, next"
            :total="num"
            :page-size="4"
            @current-change="current_change">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        search: '',
        dialogVisible: false,
        tableData: [],
        filters:[],
        value6: '',
        value7: '',
        num:0,//总条数
        pagesize:5,//煤业条数
        currentPage:1//默认第一页
      }
    },
    created(){

      this.$axios.get('http://localhost:1235/S_list').then((res)=>{
        for(var i = 0;i<res.data.data.length;i++){
          res.data.data[i].order_day = new Date(res.data.data[i].order_day)
          res.data.data[i].order_day = res.data.data[i].order_day.toLocaleString()
          // res.data.data[i].order_day = res.data.data[i].order_day.substring(0,11)
          res.data.data[i].goods_id = res.data.data[i].goods_id.toString();
          res.data.data[i].goods_name = res.data.data[i].goods_name.substr(0,11);
          res.data.data[i].spe1_val = res.data.data[i].spe1_val +" "+res.data.data[i].spe2_val
          // this.filters.push(res.data[i].order_day)
        }

        this.tableData = res.data.data;
        // console.log(res.data.data)
        this.num = res.data.data.length;
      })
    },
    methods:{
      current_change(currentPage){
        this.currentPage = currentPage;
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      show(){
        var strArr = [];
        for(var i = 0;i<this.value7.length;i++){
          strArr.push(JSON.stringify(this.value7[i]).substring(1,11))
        }
        this.$axios.get('http://localhost:1235/x_list',{
          params: {
            oSearch:this.search,
            oDate:strArr
          }
        }).then((res)=>{
            for(var i = 0;i<res.data.data.length;i++){
              res.data.data[i].order_day = new Date(res.data.data[i].order_day)
              res.data.data[i].order_day = JSON.stringify(res.data.data[i].order_day).substring(3,13)
              res.data.data[i].goods_id = res.data.data[i].goods_id.toString();
              res.data.data[i].goods_name = res.data.data[i].goods_name.substr(0,11);
              res.data.data[i].spe1_val = res.data.data[i].spe1_val +" "+res.data.data[i].spe2_val
            }
          this.tableData = res.data.data
          this.num = res.data.data.length;
          // console.log(res.data.data)

        }).catch((err)=> {
          console.log(err);
        });
      }

    },
    computed: {
    },
  }
</script>

<style scoped lang="less">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .s_header{
    color:#666;
    padding: 20px 0 0 20px;
    font-size: 20px;
    font-weight: bold;
    /*margin-top: 20px;*/
  }
  .s_section{
    padding: 20px 20px 0 20px;
    margin: 0 0 20px 0;

    /*background: #f0f2f5;*/

  }
  .s_list{
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 5px;

    .s_snumber{
      color: #606266;;
    }
    .s_input{

      display: inline-block;
      margin-left: 10px;
      input{
        width: 278px;
        border: none;
        outline: none;
      }
    }

  }
  .s_category{
    display: inline-block;

  }
  .s_query{
    margin-right: 10px;
    margin-left: 10px;
    span{
      display: inline-block;
      padding: 8px 10px;
      border-radius: 5px;
      /*letter-spacing: 10px;*/
      cursor: pointer;
    }

    input{
      /*padding: 6px 15px;*/
      border: none;
      background: #409eff;
      color: #fff;
      letter-spacing: 2px;
      outline: none;
      cursor: pointer;
    }
  }
  .s_table_sell{
    /*padding: 10px;*/
    margin-top: 10px;
  }
  .s_paging{

    text-align: center;
    margin-top: 20px;
    padding: 20px;

    div{
      display: inline-block;
    }
  }
  .el-input__inner{
    width: 320px;
    margin-left: 10px;
  }

</style>
