<template>
  <div class="product">
      <div class="productCenter">
        <h2 style="margin-left:20px;padding-top: 15px">商品详情>>></h2>
        <a-divider/>
        <div style="width: 405px;height: 450px;border: 1px solid #e0dfdf;margin-left: 20px">
          <a-image
              :width="400"
              :height="445"
              style="margin: 0 auto"
              :src="require('../../../../school-shop/images/goodsimgs/'+this.goodDetail.goodsImage.imagesName)"
          />
        </div>
        <div class="dataDetail">
          <span style="font-size: 16px;color: rgb(111 111 111);">
            <a-avatar shape="square"
                      style="border: 1px solid #bababa"
                      :src="require('../../../../school-shop/images/userFace/'+ this.goodDetail.user.userFace)">
            </a-avatar>
            {{this.goodDetail.user.userName}}<RightOutlined />
          </span>
          <a-descriptions size="small" :column="1" style="margin-top: 18px;">
            <a-descriptions-item><span style="font-size: 26px;font-weight: bold">{{ this.goodDetail.goodsName }}</span></a-descriptions-item>
            <a-descriptions-item><span style="font-size:16px;color: gray">{{ this.goodDetail.present }}</span></a-descriptions-item>
            <a-form-item name="input-number">
                <span style="font-size: 16px;margin-top: 30px">商品个数：</span>
                <a-input-number v-model:value="this.formState['input-number']" :min="1" :max="this.goodDetail.goodsNumber" />
            </a-form-item>
            <a-descriptions-item><span style="color: #bababa"><ExclamationCircleOutlined /> 剩余{{this.goodDetail.goodsNumber}}件物品</span></a-descriptions-item>
            <a-descriptions-item><h1 style="color: red;font-size: 40px;margin-top: 20px">￥{{ this.goodDetail.price }}</h1></a-descriptions-item>
          </a-descriptions>
          <div style="margin-top: 10px;">
            <a-button type="primary" size="large" style="background-color: #fda000;" @click="addShoppingCar">加入购物车</a-button>
            <a-button type="primary" size="large" danger style="float: right;margin-right: 20px;width: 150px" @click="goOrderDetail">立即购买</a-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import {postRequest} from "@/utils/api";
export default {
  name: "OrderDetails",
  data(){
    return{
      formState : reactive({
        'input-number': 1
      }),
      shoppingCars:{
        shoppingId: '',
        goodsId:'',
        userId:'',
      },
      goodOrder:{
        orderId:'',
        sellGoods:[],
        user:[],
        selectNumber:''
      }
    }
  },
  computed:{
    goodDetail(){
      return this.$store.state.goodDetail;
    },
    users(){
      return this.$store.state.currentUser;
    }
  },
  mounted() {
    console.log(this.goodDetail)
  },
  methods:{
    goOrderDetail(){
      //TODO 商品件数未传入订单模块中
      /*this.goodOrder.sellGoods = this.goodDetail;
      this.goodOrder.user = this.users;
      this.goodOrder.selectNumber = this.formState['input-number'];*/
      this.$store.state.orderDetail=[];
      this.$store.state.orderDetail[0]=JSON.parse(JSON.stringify(this.goodDetail))
      //this.$store.state.orderDetail[0] = JSON.parse(JSON.stringify(this.goodOrder));
      this.$store.state.isMain = '4'
    },
    addShoppingCar(){
      let userId = this.$store.state.currentUser.userId;
      this.shoppingCars.goodsId = this.goodDetail.goodsId;
      this.shoppingCars.userId = userId;
      postRequest('/shoppingcar/',this.shoppingCars).then(resp=>{
        if (resp){
          this.$store.commit('INPUT_NUMBER',this.formState['input-number'])
        }
      })
    }
  }
}
</script>

<style scoped>
    .dataDetail{
      width: 40%;
      position: absolute;
      left: 470px;
      top: 95px;
    }
    .productCenter{
      position: relative;
      width: 85%;
      height: 80%;
      margin: 0 auto;
      background-color: white;
      border-radius: 5px;
    }
    .product{
      width: 100%;
      height: 87vh;
    }
</style>