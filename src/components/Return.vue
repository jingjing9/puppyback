<template>
  <el-row class="hj-box">
    <el-col :span="1">&nbsp;</el-col>
    <el-col :span="22" class="hj-big">
    <p class="hj-title2">退货管理</p>
      <el-input placeholder="请输入内容" v-model="input6" class="input-with-select hj-search">
        <el-select v-model="select2" slot="prepend" placeholder="请选择">
          <el-option label="订单号" value="1"></el-option>
          <el-option label="退货状态" value="2"></el-option>
          <el-option label="审核状态" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
      <el-table
        :data="tableData2"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="order_id"
          label="订单号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="auditing"
          label="审核处理"
          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.auditing }}</span>
            <span v-if="scope.row.auditing_ico==1"><i class="el-icon-success"></i></span>
            <span v-else><i class="el-icon-question" @click="showAuditModel(scope.row.order_id)"></i></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="退货状态"
          width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="实付款"
          width="100">
          <template slot-scope="scope">
            <span class="hj-money">￥{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="return_type"
          label="退款类型"
          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.return_type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="move_state"
          label="商品信息"
          width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="hj_btn" @click="showReturngoods(scope.row.gooodsArr2)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="return_state"
          label="退货物流"
          width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="hj_btn" @click="showRturnMove(scope.row.order_rnum,scope.row.order_rcom)" :disabled="scope.row.dis_move" :class="{hj_dis:scope.row.dis_move==true}">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="move_state"
          label="退款理由"
          width="150">
          <template slot-scope="scope">
            <span class="hj-reason">{{scope.row.reason}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="move_state"
          label="是否立即退款"
          width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="hj_btnreturn" :disabled="!scope.row.dis_return" :class="{hj_dis:scope.row.dis_return==false}" @click="returnImedmodel(scope.row.order_id)">是</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        :current-page.sync="nowPage"
        background
        layout="prev, pager, next"
        :total="page1"
        class="hj-page" @current-change="getCtext2()">
      </el-pagination>
      <!--  退货退款物流信息模态框-->
      <el-dialog title="物流信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">

          <el-form-item label="快递单号" :label-width="formLabelWidth" class="move_item">
            <p>{{form.order_rnum}}</p>
          </el-form-item>
          <el-form-item label="物流公司" :label-width="formLabelWidth" class="move_item">
            <p>{{form.order_rcom}}</p>
            <ul class="hj-removeul">
              <li><span class="hj_time1">2018/1/2 10:00</span><span>快递员已揽件</span></li>
              <li><span class="hj_time1">2018/1/2 10:00</span><span>快递员已揽件</span></li>
              <li><span class="hj_time1">2018/1/2 10:00</span><span>快递员已揽件</span></li>
            </ul>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!--  商品信息模态框-->
      <el-dialog title="商品信息" :visible.sync="dialogForm2Visible">
        <el-table
          :data="tableData3"
          style="width: 100%">
          <el-table-column
            prop="goods_id"
            label="商品编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品单价">
          </el-table-column>
          <el-table-column
            prop="buy_num"
            label="商品数量">
          </el-table-column>
        </el-table>
      </el-dialog>
      <!--  确认立即退款模态框-->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>你确定立即退款吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="returnIme()">确 定</el-button>
       </span>
      </el-dialog>
      <!--  审核是否通过-->
      <el-dialog
        title="提示"
        :visible.sync="centerDialog2Visible"
        width="30%"
        center>
        <span>是否同意该用户退款申请？</span>
        <el-select v-model="form3.yesorno" placeholder="请选择">
          <el-option label="同意" value="hj-yes"></el-option>
          <el-option label="不同意" value="hj-no"></el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialog2Visible = false">取 消</el-button>
          <el-button type="primary" @click="audit()">确 定</el-button>
       </span>
      </el-dialog>
    </el-col>
    <el-col :span="1">&nbsp;</el-col>

  </el-row>
</template>

<script>
  export default {
    name: "Return",
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      reList(arr,arr1){
        for(let i=0;i<arr.length;i++){
          let totalprice =  0;
          let state = '';
          let auditing = '';
          let return_type = '';
          let price = '';
          let auditing_ico = '1';
          let dis_return = false;
          let order_rnum = '';
          let order_rcom = '';
          let gooodsArr2 = [];//每个订单的商品数组
          for(let j=0;j<arr[i].length;j++){
            totalprice += arr[i][j].order_buynum * arr[i][j].now_price;
            let goods_id = arr[i][j].goods_id;
            let goods_price = arr[i][j].now_price;
            let buy_num = arr[i][j].order_buynum;
            let goodJson = {
              goods_id:goods_id,
              goods_price:'￥'+goods_price + '.00',
              buy_num:buy_num
            };
            gooodsArr2.push(goodJson);
          }
          //退货状态
          switch (arr[i][0].order_return) {
            case 1: state = '待审核';
              break;
            case 2: state = '同意买家寄回退货';
              break;
            case 3: state = '买家已提交退货物流';
              break;
            case 4: state = '等待退款';
              break;
            case 5: state = '退款成功'
          }
          //订单价格
          price = totalprice + '.00';
          //审核状态
          if(arr[i][0].order_return==1){
            auditing = '待审核';
            auditing_ico = '2'
          }else {
            auditing = '审核通过';
            auditing_ico = '1'
          }
          //退款类型
          if(arr[i][0].order_state==2){
            return_type = '退货退款'
          }else {
            return_type = '仅退款'
          }
          //退款理由
          let reason = arr[i][0].order_reson;
          //能否查看退货物流信息
          let dis_move = true;
          if(arr[i][0].order_return>=3){
            dis_move = false//能看
          }else {
            dis_move = true//不能
          }
          //能否操作立即退款
          if(arr[i][0].order_return==5){
            dis_return = false//不能
          }else {
            dis_return = true
          }
          //物流信息
          order_rnum = arr[i][0].order_rnum;
          order_rcom = arr[i][0].order_rcom;
          let orderJson = {
            order_id:arr[i][0].order_id,
            state:state,
            price:price,
            return_type:return_type,
            auditing:auditing,
            auditing_ico:auditing_ico,
            reason:reason,
            dis_move:dis_move,
            dis_return:dis_return,
            gooodsArr2:gooodsArr2,
            order_rcom:order_rcom,
            order_rnum:order_rnum
          };
          arr1.push(orderJson);
        }
        this.tableData2 = arr1;
      },//重新编写数组
      getCtext1(url,jsondata){
        this.$axios.get(url,{
          params:jsondata
        }).then((res)=>{
          if(res.data.error==0){
            let arr1 = [];//保存要展示的列表
            let arr = res.data.data;
            this.reList(arr,arr1);
            this.page1=res.data.page1*10;
          }else {
            this.tableData2=[];
          }
        })
      } , //获取页面数据
      getCtext2(){
        if(this.input6==''){
          let jsondata = {
            nowPage:this.nowPage
          };
          this.getCtext1(this.delurl,jsondata);
        }else {
          if(this.select2==''){
            alert('请选择搜索规则！')
          }else {
            let jsondata2 = {
              searchType:this.select2,
              str:this.input6,
              nowPage:this.nowPage
            };
            let serurl = 'http://localhost:1235/searchReturn';
            this.getCtext1(serurl,jsondata2);

          }

        }

      },//点击页码改变页面
      showReturngoods(gooodsArr2){
        this.dialogForm2Visible = true;
        this.tableData3 = gooodsArr2
      },
      showRturnMove(order_rnum,order_rcom){
        this.dialogFormVisible = true;
        this.form.order_rcom = order_rcom;
        this.form.order_rnum = order_rnum;
      },
      showAuditModel(order_id){
        this.centerDialog2Visible=true;
        this.form3.order_id = order_id;
      },
      audit(){
        this.centerDialog2Visible = false;
        if(this.form3.yesorno=='hj-yes'){
          this.$axios.get('http://localhost:1235/auditing',{
              params:{
                order_return:2 ,//审核通过
                order_id:this.form3.order_id
              }
          }).then((res)=>{
              for(let i=0;i<this.tableData2.length;i++){
                if(this.tableData2[i].order_id==this.form3.order_id){
                  this.tableData2[i].auditing = '审核通过';
                  this.tableData2[i].auditing_ico = '1';
                }
              }
          })
        }
      },//同意审核
      returnImedmodel(order_id){
        this.centerDialogVisible = true;
        this.now_order = order_id;
      },//立即退款模态框显示
      returnIme(){
        this.centerDialogVisible = false;
        let postDate = this.$qs.stringify({
          order_id:this.now_order
        });
        this.$axios({
          method:'post',
          url:'http://localhost:1235/returnSuccess',
          data:postDate
        }).then((res)=>{
          for(let i=0;i<this.tableData2.length;i++){
            if(this.tableData2[i].order_id==this.now_order){
              this.tableData2[i].dis_return = false;
              this.tableData2[i].auditing = '审核通过';
              this.tableData2[i].auditing_ico = '1';
            }
          }

        });
  },
      search(){
        this.getCtext2()
      },


    },
    data() {
      return {
        tableData2: [],
        tableData3: [],
        input6:'',
        select2:'',
        dialogFormVisible: false,
        centerDialogVisible:false,
        centerDialog2Visible:false,
        form: {
         order_rcom: '',
          order_rnum: ''
        },
        dialogForm2Visible:false,
        formLabelWidth: '120px',
        form2: {
          reason: ''
        },
        form3: {
          yesorno: '',
          auditing: '',
          auditing_ico:'',
          order_id:''
        },
        now_order: '',
        dialogForm3Visible:false,
        dialogForm4Visible:false,
        page1:1,
        nowPage:1,
        delurl:'http://localhost:1235/returner'
      }
    },
    created(){
      this.$axios.get('http://localhost:1235/returnGetPage',{
      }).then((res)=>{
        this.page1 = res.data.page1*10;
      });
      let jsondata = {
        nowPage:this.nowPage
      };
      this.getCtext1(this.delurl,jsondata);

    },

  }

</script>

<style scoped lang="less">
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .hj-box{
    background-color: rgba(240,242,245);
    padding: 15px 0;
  }
  .hj-big{
    height: 600px;
    position: relative;
  }
  .hj-leftico{
    color: #1890ff;
    margin-right: 10px;
  }
  .hj-righticon{
    color: rgba(245,34,45);
    margin-left: 10px;
  }
  .hj_btn{
    background-color: #1890ff;
    color: #ffff;
  }
  .hj-page{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .hj-title2{
    font: bold 20px/45px Microsoft YaHei;
    color: rgba(0,0,0,.85);
    background-color: #fff;
    margin-bottom: 15px;
    text-indent: 1em;
  }
  .hj_time1{
    margin-right: 20px;
  }
  .el-icon-success{
    color: aquamarine;
  }
  .el-icon-question{
    color: rgb(245,34,45);
  }
  .hj-money{
    color: rgb(245,34,45);
  }
  .hj-removeul li:last-child{
    color: rgb(245,34,45);
  }
  .hj-search{
    margin: 15px 0;
  }
  .move_item{
    border-bottom: 1px solid #f1f3f4;
  }
  .hj_btnreturn{
    background-color: rgb(245,34,45);
    color: #fff;
  }
  .hj-reason{
    font: 12px/30px Microsoft YaHei;
  }


  .hj_dis{
    background-color: rgb(240,242,245);
  }
</style>
