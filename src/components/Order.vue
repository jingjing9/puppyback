<template>
  <el-row class="hj-box">
    <el-col :span="1">&nbsp;</el-col>
    <el-col :span="22" class="hj-big">
      <p class="hj-title2">订单管理</p>
      <el-input placeholder="请输入内容" v-model="input5" class="input-with-select hj-search">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="订单号" value="1"></el-option>
          <el-option label="发货状态" value="2"></el-option>
          <el-option label="订单状态" value="3"></el-option>
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
          prop="state"
          label="状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="time"
          label="支付时间"
          width="190">
          <template slot-scope="scope">
            <i class="el-icon-time hj-leftico"></i>
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
          <el-table-column
            prop="move_state"
            label="发货状态"
            width="124">
            <template slot-scope="scope">
              <span>{{ scope.row.move_state }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="move_state"
            label="编辑物流信息"
            width="200">
            <template slot-scope="scope">
             <span v-if="scope.row.order_num==null">
                <el-button
                  size="mini"
                  class="hj_btn" @click="editMoveModel(scope.row.order_id)">编辑</el-button>
                   <i class="el-icon-edit-outline hj-righticon"></i>
             </span>
              <span v-else>
                <el-button
                  size="mini"
                  class="hj_dis" @click="showMove(scope.row.order_num,scope.row.order_com)">查看</el-button>
             </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="move_state"
            label="编辑收货信息"
            width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.order_num==null">
              <el-button
                size="mini"
                class="hj_btn" @click="showAddress(scope.row.order_id)">编辑</el-button>
              <i class="el-icon-edit-outline hj-righticon"></i>
              </span>
              <span v-else>
                <el-button
                  size="mini"
                  class="hj_dis" disabled="disabled">编辑</el-button>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="move_state"
            label="查看详情"
            width="200">
            <template slot-scope="scope">
              <i class="el-icon-view hj-righticon"  @click="showdetail(scope.row.goodsArr2,scope.row.order_say,scope.row.add_person,scope.row.add_tel,scope.row.a_address)"></i>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page.sync="nowPage2"
        layout="prev, pager, next"
        :total="page2" class="hj-page" @current-change="getCtext2()">
      </el-pagination>
      <!--  //物流信息模态框-->
      <el-dialog title="物流信息编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form4">
          <el-form-item label="快递单号" :label-width="formLabelWidth">
            <el-input v-model="form4.num" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="物流公司" :label-width="formLabelWidth">
            <el-select v-model="form4.com" placeholder="请选择快递公司">
              <el-option label="申通快递" value="申通快递"></el-option>
              <el-option label="圆通快递" value="圆通快递"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editMove()">确 定</el-button>
        </div>
      </el-dialog>
      <!--      查看物流单号的模态框-->
      <el-dialog title="查看物流信息" :visible.sync="dialogForm3Visible">
        <el-form :model="form5">
          <el-form-item label="快递单号" :label-width="formLabelWidth">
           <p>{{form5.num}}</p>
          </el-form-item>
          <el-form-item label="物流公司" :label-width="formLabelWidth">
          <p>{{form5.com}}</p>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm3Visible = false">取 消</el-button>
          <el-button type="primary" @click="dialogForm3Visible = false">确 定</el-button>
        </div>
      </el-dialog>
    <!--  //收货信息模态框-->
      <el-dialog title="收货信息编辑" :visible.sync="dialogForm2Visible">
        <el-form :model="form2">
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form2.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form2.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form2.addr" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm2Visible = false">取 消</el-button>
          <el-button type="primary" @click="editAddr()">确 定</el-button>
        </div>
      </el-dialog>
      <!--  订单详情模态框-->
      <el-dialog title="订单详情" :visible.sync="dialogFormVisible2">
        <el-row>
          <el-col :span="24">
           <div class="goods_inform">
             <p class="hj-title3">商品信息</p>
             <el-table
               :data="tableData4"
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
               <el-table-column
                 prop="goods_name"
                 label="商品名称">
               </el-table-column>
             </el-table>
           </div>
            <div class="goods_inform">
              <p class="hj-title3">收货信息</p>
              <p class="hj-ite"><span class="hj-lable">收货人：</span>{{add_person}}</p>
              <p class="hj-ite"><span class="hj-lable">联系电话：</span>{{add_tel}}</p>
              <p class="hj-ite"><span class="hj-lable">收货地址：</span>{{a_address}}</p>
            </div>
            <div class="goods_inform">
              <p><span class="hj-lable">买家留言：</span>{{order_say}}</p>
            </div>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-col>
    <el-col :span="1">&nbsp;</el-col>

  </el-row>
</template>

<script>
    export default {
        name: "Order",
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
          for(var i=0;i<arr.length;i++){
            var order_id = '';
            var state = '';
            var time = '';
            var move_state = '';
            var order_num = '';
            var goodsArr2 = [];
            var order_num = '';
            var order_com = '';
            var order_say = '';
            var add_person = '';
            var add_tel = '';
            var a_address = '';
            for(var j=0;j<arr[i].length;j++){
              var goods_id = arr[i][j].goods_id;
              var goods_price = arr[i][j].now_price;
              var buy_num = arr[i][j].order_buynum;
              var goods_name= arr[i][j].goods_name;
              var goodJson = {
                goods_id:goods_id,
                goods_price:'￥'+goods_price+'.00',
                buy_num:buy_num,
                goods_name:goods_name
              };
              goodsArr2.push(goodJson);
            }
            //订单状态
            switch (arr[i][0].order_state) {
              case 1: state = '待付款';
                break;
              case 2: state = '退货退款';
                break;
              case 3: state = '仅退款';
                break;
              case 4: state = '已支付';
                break;
              case 5: state = '已确认收货';
                break;
            };
            //时间
            var order_day;
            var order_time;
            order_id = arr[i][0].order_id;
            var datastring = arr[i][0].order_day;
            var oDate = new Date(datastring);
            order_day = oDate.toLocaleString().substr(0,9);

            order_time = arr[i][0].order_time;
            time = order_day + ' '+ order_time;
            //发货状态
            if(arr[i][0].order_num==null){
              move_state = '未发货'
            }else {
              move_state = '已发货';
            }
            //发货物流
            order_num = arr[i][0].order_num;
            order_com = arr[i][0].order_com;
            order_say = arr[i][0].order_say;
            add_person = arr[i][0].add_person;
            add_tel = arr[i][0].add_tel;
            a_address = arr[i][0].a_address;
            var orderJson2 = {
              order_id: order_id,
              state: state,
              time: time,
              move_state:move_state,
              order_num:order_num,
              order_com:order_com,
              order_say:order_say,
              goodsArr2:goodsArr2,
              add_person:add_person,
              add_tel:add_tel,
              a_address:a_address
            };
            arr1.push(orderJson2);
            this.tableData2 = arr1;
          }
        },
        getCtext1(url,jsondata){
          this.$axios.get(url,{
            params:jsondata
          }).then((res)=>{
           if(res.data.error==0){
             var arr1 = [];
             var arr = res.data.data;
             this.reList(arr,arr1);
             this.page2=res.data.page1*10;
           }else {
             this.tableData2=[]
           }
          })
        },
        search(){
          this.getCtext2()
        },
        getCtext2(){
          if(this.input5==''){
            let jsondata={
              nowPage:this.nowPage2
            };
            this.getCtext1(this.delurl,jsondata)
          }else {
            if(this.select==''){
              alert('请选择搜索规则！')
            }else{
              let jsondata2 = {
                searchType:this.select,
                str:this.input5,
                nowPage:this.nowPage2
              };
              let serurl = 'http://localhost:1235/searchOrder';
              this.getCtext1(serurl,jsondata2);
            }

          }
        },
        showdetail(goodsArr2,order_say,add_person,add_tel,a_address){
          this.dialogFormVisible2 = true;
          this.tableData4 = goodsArr2;
          this.a_address = a_address;
          this.add_person = add_person;
          this.order_say = order_say;
          this.add_tel = add_tel;
        },
        showMove(order_num,order_com){
          this.dialogForm3Visible = true;
          this.form5.com = order_com;
          this.form5.num = order_num;
        },
        editMoveModel(order_id){
          this.dialogFormVisible = true;
          this.form4.order_id = order_id;
        },
        editMove(){
          this.dialogFormVisible = false;
          let order_num = this.form4.num;
          let order_com = this.form4.com;
          if(order_num==''||order_com==''){
            alert('请输入正确的快递信息！')
          }else {
            this.$axios.get('http://localhost:1235/editAddress',{
              params:{
                order_com:order_com,
                order_num:order_num,
                order_id:this.form4.order_id
              }
            }).then((res)=>{
              for(let m = 0;m<this.tableData2.length;m++){
                  if(this.tableData2[m].order_id==this.form4.order_id){
                      this.tableData2[m].order_num=this.form4.num;
                      this.tableData2[m].order_com=this.form4.com;
                      this.form4.num='';
                      this.form4.com='';
                  }
              }
            })
          }
        },
        showAddress(order_id){
          this.dialogForm2Visible = true;
          this.form2.order_id = order_id;
        },
        editAddr(){
          this.dialogForm2Visible = false;
          if(this.form2.name==''||this.form2.tel==''||this.form2.addr==''){
            alert('请输入正确的收货信息！')
          }else {
            let postData1 = this.$qs.stringify({
              order_id: this.form2.order_id
            });

            this.$axios({
              method:'post',
              url:'http://localhost:1235/editAddr1',
              data:postData1
            }).then((res)=>{
              this.form2.user_id = res.data.data[0].user_id;
              let postData2 = this.$qs.stringify({
                user_id:res.data.data[0].user_id,
                add_person:this.form2.name,
                add_tel:this.form2.tel,
                a_address:this.form2.addr
              });

                this.$axios({
                  method:'post',
                  url:'http://localhost:1235/editAddr2',
                  data:postData2
                }).then((res)=>{
                  console.log(res.data.data)
                  if(res.data.data.length==0){
                    let postData3 = this.$qs.stringify({
                      user_id: this.form2.user_id,
                      add_person:this.form2.name,
                      add_tel:this.form2.tel,
                      a_address:this.form2.addr
                    });
                    this.$axios({  //插入t_address表
                      method:'post',
                      url:'http://localhost:1235/editAddr3',
                      data:postData3
                    }).then((res)=>{
                      this.$axios({//查询add_id
                        method:'post',
                        url:'http://localhost:1235/editAddr5'
                      }).then((res)=>{
                        let postData6 = this.$qs.stringify({
                          add_id:res.data.data[0].add_id,
                          order_id:this.form2.order_id
                        });
                        this.$axios({ //更改t_order表的add_id
                          method:'post',
                          url:'http://localhost:1235/editAddr4',
                          data:postData6
                        }).then((res)=>{
                          this.changgeAddre()
                        })
                      })
                    })
                  }else {
                    let postData4 = this.$qs.stringify({
                      add_id: res.data.data[0].add_id,
                      order_id:this.form2.order_id
                    });
                    this.$axios({
                      method:'post',
                      url:'http://localhost:1235/editAddr4',
                      data:postData4
                    }).then((res)=>{
                      this.changgeAddre()
                    })
                  }
                })
            })
          }
        },
        changgeAddre(){
          for(let k=0;k<this.tableData2.length;k++){
            if(this.tableData2[k].order_id==this.form2.order_id){
              this.tableData2[k].add_person=this.form2.name;
              this.tableData2[k].add_tel=this.form2.tel;
              this.tableData2[k].a_address = this.form2.addr;
            }
          }
          this.form2.order_id='';
          this.form2.tel='';
          this.form2.addr='';
          this.form2.name='';
        }
      },
      data() {
        return {
          tableData2: [],
          dialogFormVisible: false,
          form4:{
            num:'',
            com:'',
            order_id:'',
          },
          form5:{
            num:'',
            com:'',
          },
          edit:true,
          dialogForm2Visible:false,
          dialogFormVisible2:false,
          dialogForm3Visible:false,
          formLabelWidth: '120px',
          input5:'',
          select:'',
          form2: {
            name: '',
            tel:'',
            addr:'',
            order_id:'',
            user_id:'',
          },
          tableData4: [],
          nowPage2:1,
          page2:1,
          order_say:'',
          add_person:'',
          add_tel:'',
          a_address:'',
          delurl:'http://localhost:1235/order'
        }
      },
      created(){
        this.$axios.get('http://localhost:1235/orderGetPage',{

        }).then((res)=>{
          this.page2 = res.data.page2*10;
          let jsondata={
            nowPage:this.nowPage2
          };
          this.getCtext1(this.delurl,jsondata);
        })
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
  .hj-search{
    margin: 15px 0;
  }
  .goods_inform .hj-title3{
    font: bold 16px/30px Microsoft YaHei;
    color: rgba(0,0,0,.85);
  }

  .hj_dis{
    background-color: rgb(240,242,245);
  }
  .goods_inform{
    margin-bottom: 20px;
    border-bottom: 1px #f1f3f4 solid;
  }
  .hj-lable{
    font: bold 14px/30px Microsoft YaHei;
    color: rgba(0,0,0,.65);
  }
  .hj-ite{
    font:  14px/30px Microsoft YaHei;
    text-indent: 5em;
  }
</style>
