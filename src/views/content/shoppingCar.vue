<template>
{{this.$store.state.input_number}}
  <h4 style="color: #ce1313;font-weight: bold"><SendOutlined />  开启新的购物之旅，让购物车带您畅游购物世界!</h4><br>

  <a-checkbox-group v-model:value="state.checkedList">
  <a-card v-for="(index,good) in shoppingCar" :key="index">
    <div style=" margin-top: -10px;">
      <ShopOutlined style="color: #ff6600;margin-right: 5px"/>
      <span style="color: #343434"> {{index.sellGoods.user.userName}}<RightOutlined /></span>
    </div>
    <a-divider style="margin: 7px auto auto auto"/>
    <a-card-meta
        style="float: left; "
        :title="index.sellGoods.goodsName"
        :description="index.sellGoods.present.substring(0,10) + '...'">
      <template #avatar>
        <a-checkbox :value="index">
        </a-checkbox>
        <a-avatar shape="square"
                  v-if="index.sellGoods.goodsImage.imagesName == null"
                  :size="70"
                  :src="require('../../../../school-shop/images/goodsimgs/1.jpg')" />
        <a-avatar shape="square"
                  v-else
                  :size="70"
                  :src="require('../../../../school-shop/images/goodsimgs/' + index.sellGoods.goodsImage.imagesName)" />
      </template>
    </a-card-meta>
    <a-input-number style="width: 50px;position: absolute;right: 50px;top:45%" v-model:value="index.selectNumber" :min="1" :max="index.sellGoods.goodsNumber" />
    <a-popconfirm title="确定将该商品移除购物车吗？"
                  ok-text="确认"
                  cancel-text="取消"
                  @confirm="confirm(index)">
      <template #icon><question-circle-outlined style="color: red" /></template>
      <a href="" style=" position: absolute;top: 14px;right: 30px;">删除</a>
    </a-popconfirm>
    <span style="color: red;font-weight:bold; font-size:18px;position: absolute;left: 32%;bottom: 20%">
          ￥{{index.sellGoods.price}}
    </span>
  </a-card>
  </a-checkbox-group>


  <a-affix :offset-bottom="bottom" style="height: 100px" >
    <div class="submit">
      <a-checkbox
          v-model:checked="state.checkAll"
          :indeterminate="state.indeterminate"
          style="float: left;margin-left: 25px;font-size: 17px;"
          @change="onCheckAllChange"
      >
        全选
      </a-checkbox>
      <div class="prices">
        <h1 style="color: red;display: inline-flex;margin-right: 20px">￥{{allprices}}</h1>
        <a-button style="background-color: red;color: white" @click="payment">提交订单</a-button>
      </div>
    </div>
  </a-affix>
</template>

<script>
import { watch,reactive,ref } from 'vue';
import {getRequest,postRequest,deleteRequest} from "@/utils/api";
import { message } from 'antd'
import 'antd/dist/reset.css'
export default {
  name: "shoppingCar",
  data(){
    return{
      formState : reactive({
        'input-number': 1
      }),
      allprices:0,
      state :(reactive)({
      indeterminate: true,
      checkAll: false,
      checkedList: [],
      }),
      bottom : ref(0),
      shoppingCar:[
        {
          shoppingId: '',
          selectNumber:1,
          sellGoods:{
            goodsId:'',
            goodsName: '',
            price: '',
            categoryId:'',
            goodsNumber:0,
            present:'',
            createTime:'',
            goodsImage:{
              imagesId:'',
              imagesName:null
            },
            user:{
            introduce:'',
            phone: '',
            userFace: '',
            userId: '',
            userName: '',
          }
          },
          user:{
            userId:'',
            userName:'',
            phone:'',
            sex:'',
            userFace:'',
            isVip:''
          }
        }
      ],
      goodOrder: []
    }

  },
  mounted() {
    this.ShoppingCarInfo();
  },
  watch:{
    'state.checkedList'(val){
      this.allprices = 0;
        val.forEach(e=>{
          let prices = e.selectNumber * e.sellGoods.price;
          this.allprices += prices;
        })
      this.state.indeterminate = !!val.length && val.length < this.shoppingCar.length;
      this.state.checkAll = val.length === this.shoppingCar.length;

    }
  },

  methods:{
    payment(){
      if (this.state.checkedList.length != 0){
        let i = 0;
        this.state.checkedList.forEach(obj=>{
          postRequest('/order/',obj).then(resp=>{
            if(resp){
              this.goodOrder[i] = resp.data;
              i++;
              obj.goodsId = obj.sellGoods.goodsId;
              deleteRequest('/shoppingcar/',obj);
              if (this.state.checkedList.length == i){
                this.$store.state.orderDetail = Object.assign(this.goodOrder);
                this.$store.state.priceTotal = Object.assign(this.allprices);
                this.$store.state.isMain = '4';
                this.$store.state.openDrawers = false;
              }
            }
          })
        })

      }else{
        message.error("您还没有选中商品！");
      }

    },
    confirm(value){
      deleteRequest('/shoppingcar/',value).then(resp=>{
        if (resp){
          this.ShoppingCarInfo();
        }
      })
    },
    onCheckAllChange (e){
      let arr = [];
      /*this.shoppingCar.forEach(e=>{
          arr.push(e.sellGoods.goodsId);
      })*/

      this.shoppingCar.forEach(e=>{
          arr.push(e);
      })
      this.state.checkedList = e.target.checked ? arr :[];

    },
    ShoppingCarInfo(){
      if (!localStorage.getItem('user')){
        return;
      }
      let userId = JSON.parse(localStorage.getItem('user')).userId;
      getRequest('/shoppingcar/?userId='+userId).then(resp=>{
        if (resp){
          this.shoppingCar = resp;
        }
      })
    }

  }
}
</script>

<style scoped>
.ant-checkbox-group.css-dev-only-do-not-override-185kyl0 {
  display: block;
}

label.ant-checkbox-wrapper.css-dev-only-do-not-override-185kyl0 {
  margin-right: 17px;
}
.ant-card.css-dev-only-do-not-override-185kyl0.ant-card-bordered {
  margin-bottom: 8px;
}
.submit{
  background-color: #ffffff;
  border-top: 1px solid #efeeee;
  width: 453px;
  height: 100px;
  line-height: 100px;
  position: fixed;
  bottom: 0;
}
.prices{
  float: right;
  margin-right: 22px;
}
label.ant-checkbox-wrapper.css-dev-only-do-not-override-185kyl0 {
  line-height: 100px;
}

</style>