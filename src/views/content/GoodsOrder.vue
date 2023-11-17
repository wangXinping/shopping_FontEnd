<template>
    <div class="order">
      <div class="orderCenter">
        <h2 style="margin-left:20px;padding-top: 15px">确认商品订单>>></h2>
        <div v-if="this.address.length == 0"></div>
        <div v-else class="orderAddress">
          <span style="font-weight: bold">确认收货地址</span>
          <a style="float: right" @click="changeAddress">更换收货地址</a>
          <a-divider style="margin: 8px 0 20px 0"/>
          <table>
            <tr>
              <td rowspan="2"><CompassOutlined style="font-size: 45px;color: #ff6f00"/></td>
              <td style="font-size: 20px;font-weight: bold;padding:0 0 15px 30px">{{this.selectAddress.addressInfo}}&nbsp;<a-tag v-if="this.selectAddress.isDefault == '是'" color="warning">默认地址</a-tag></td>
            </tr>
            <tr>
              <td style="font-size: 16px;color: #444444;padding-left: 30px">{{this.selectAddress.receName}}&nbsp;&nbsp;&nbsp;&nbsp;{{this.selectAddress.addressPhone}}</td>
            </tr>
          </table>
          <a-button style="float: right;margin: -37px 55px;" @click="editAddress">编辑</a-button>
        </div>
        <div class="payPal">
          <span style="font-weight: bold">支付方式</span>
          <a-divider style="margin: 8px 0 20px 0"/>
          <a-radio-group v-model:value="value1" button-style="solid" style="margin-left: 20px">
            <a-radio-button value="face">面对面付款</a-radio-button>
            <a-radio-button value="online">线上支付</a-radio-button>
          </a-radio-group>
        </div>
        <div class="orderGoods">
          <span style="font-weight: bold">确认订单信息</span>
          <div class="goods">
            <table v-for="(index) in this.ordersDetail" style="width: 100%">
              <tr>
                <td rowspan="2" width="100px">
                  <a-image
                      :width="80"
                      :height="85"
                      style="margin: 0 auto"
                      :src="require('../../../../school-shop/images/goodsimgs/'+index.sellGoods.goodsImage.imagesName)"
                  />
                </td>
                <td style="font-size: 18px;padding-left: 20px;width: 300px">{{index.sellGoods.goodsName}}</td>
                <td style="width: 400px;color: red;font-size: 18px">￥{{index.sellGoods.price}}</td>
                <td style="font-size: 14px;color: #959595"><CloseOutlined />{{index.selectNumber}}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding-left: 20px;">{{index.sellGoods.present}}</td>
              </tr>
              <tr>
                <td colspan="4"><a-divider style="margin: 10px auto"/></td>
              </tr>
            </table>

          </div>
        </div>
        <div class="orderSubmit">
          <span style="font-size: 22px;color: red;font-weight: bold">总价：￥{{ this.$store.state.priceTotal }}</span>
          <a-button v-if="this.value1 == 'online'" danger type="primary" size="large" style="float: right;width: 150px">去支付</a-button>
          <a-button v-else type="primary" size="large" style="float: right;width: 150px" @click="submitOrder">提交订单</a-button>
        </div>
      </div>
    </div>

    <!--选择地址-->
    <div>
    <a-modal v-model:open="turnAddress" title="收货地址>>>" footer="">
      <div style="width: 520px;height: 300px;overflow:auto; scrollbar-width: none; ">
        <div v-for="(index) in this.address" :key="index">
          <table class="addressTable">
            <tr>
              <td>收货人姓名:</td>
              <td>{{index.receName}}</td>
              <td><a-button size="small" style="color: gray" @click="useAddress(index)">使用</a-button></td>
            </tr>
            <tr>
              <td>收 货 地 址：</td>
              <td colspan="2">{{index.addressInfo}}&nbsp;<a-tag v-if="index.isDefault == '是'" color="warning">默认地址</a-tag></td>
            </tr>
            <tr>
              <td>收货人手机号：</td>
              <td colspan="2">{{index.addressPhone}}</td>
            </tr>
          </table>
        </div>
      </div>
      
    </a-modal>
  </div>

    <!--编辑地址-->
    <a-modal v-model:open="editOpen" title="编辑地址>>>" footer="">
    <a-divider style="margin: 8px auto"/>
    <a-form :model="this.selectAddress1" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="收货人姓名：">
        <a-input v-model:value="this.selectAddress1.receName" />
      </a-form-item>
      <a-form-item label="收货人地址：">
        <a-input v-model:value="this.selectAddress1.addressInfo" />
      </a-form-item>
      <a-form-item label="手 机 号：">
        <a-input v-model:value="this.selectAddress1.addressPhone" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 16, offset: 10 }">
        <a-button type="primary" @click="editSumbit">确认</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import {getRequest, putRequest} from "@/utils/api";
import {ref} from 'vue'
export default {
  name: "GoodsOrder",
  data(){
    return{
      value1:ref('online'),
      address:[],
      selectAddress:[],
      selectAddress1:[],
      turnAddress:false,
      editOpen:false,
      orders:[],
      labelCol : {
        style: {
          width: '150px',
        },
      },
      wrapperCol :{
        span: 14,
      }
    }
  },
  computed:{
    ordersDetail(){
      return this.$store.state.orderDetail
    },
    users(){
      return this.$store.state.currentUser;
    }
  },
  mounted() {
    this.addressInit();
  },
  methods:{
    submitOrder(){
      console.log(this.value1)
    },
    editSumbit(){
      putRequest('/address/',this.selectAddress1).then(resp=>{
        if (resp){
          this.selectAddress = JSON.parse(JSON.stringify(this.selectAddress1));
          this.editOpen = false;
        }
      })
    },
    editAddress(){
      this.selectAddress1 = JSON.parse(JSON.stringify(this.selectAddress));
      this.editOpen = true;
    },
    useAddress(value){
      this.selectAddress = value;
      this.turnAddress = false;
    },
    changeAddress(){
      this.turnAddress =true;
      console.log(this.address)
    },
  /*  ordersInit(){
      getRequest('')
    },*/
    addressInit(){
      getRequest('/address/?userId='+this.users.userId).then(resp=>{
        if (resp){
          console.log(resp)
          this.address = resp;
          this.selectAddress = resp[0];
        }
      })
    },

  }
}
</script>

<style scoped>
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Edge */
    }
    .addressTable{
      width: 466px;
      height: 100px;
      border: 1px solid #dddddd;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .addressTable td{
      padding-left: 10px;
      width: 200px;
    }
    .addressTable:hover{
      border:1px solid #acdffc;
      background-color: #ebffff
    }
    .orderSubmit{
      width: 95%;
      height: 20%;
      margin: 20px auto;
    }
    .goods{
      font-weight: bold;
      color: #444444;
      padding: 15px;
      margin-top: 10px;
      width: 100%;
      height: 90%;
      border: 1px solid #e8e8e8;
      background-color: #f7ffff;
      border-radius: 5px;
      overflow: auto;
    }
    .payPal{
      width: 95%;
      height: 10%;
      margin: 20px auto;
    }
    .orderGoods{
      width: 95%;
      height: 46%;
      margin: 20px auto;
    }
    .orderAddress{
      width: 95%;
      height: 18%;
      margin: 20px auto;
      /*border: 1px solid #b6b6b6;*/
      /*border-radius: 5px;*/
    }
    .orderCenter{
      position: relative;
      width: 100%;
      height: 90%;
      margin: 0 auto;
      background-color: white;
      border-radius: 5px;
    }
    .order{
      width: 100%;
      height: 87vh;
    }
</style>