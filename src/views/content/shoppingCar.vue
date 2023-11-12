<template>

  <h4 style="color: #ce1313;font-weight: bold"><SendOutlined />  开启新的购物之旅，让购物车带您畅游购物世界!</h4><br>

  <a-card v-for="(index,good) in shoppingCar">
    <a-checkbox-group style="display: grid;" v-model:value="index.shoppingId" >
    <a-card-meta :title="index.sellGoods.goodsName" :description="index.sellGoods.present.substring(0,10) + '...'">
      <template #avatar>
        <a-checkbox :options="index.shoppingId" >
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
    </a-checkbox-group>
    <h3 style="color: red;margin-left: 86px">
      ￥{{index.sellGoods.price}}
    </h3>
  </a-card>


  <a-affix :offset-bottom="bottom" >
    <div style="background-color: #eaeaea">
      <a-checkbox
          v-model:checked="state.checkAll"
          :indeterminate="state.indeterminate"
          @change="onCheckAllChange"
      >
        Check all
      </a-checkbox>
      <h2>￥78.00</h2>
      <a-button style="background-color: red;color: white">立即支付</a-button>
    </div>
  </a-affix>
</template>

<script>
import { watch,reactive,ref } from 'vue';
import {getRequest} from "@/utils/api";
export default {
  name: "shoppingCar",
  data(){
    return{
      state :(reactive)({
      indeterminate: true,
      checkAll: false,
      checkedList: [],
      }),
      plainOptions : ['1','2'],
      bottom : ref(10),
      shoppingCar:[
        {
          shoppingId: '',
          sellGoods:{
            goodsId:'',
            goodsName: '',
            price: '',
            categoryId:'',
            present:'',
            createTime:'',
            goodsImage:{
              imagesId:'',
              imagesName:null
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
      ]
    }

  },

  mounted() {
    this.ShoppingCarInfo();
  },
  watch(){
     ()=> this.shoppingCar,
     val => {
          this.state.indeterminate = !!val.length && val.length < this.shoppingCar.length;
          this.state.checkAll = val.length === this.shoppingCar.length;
        }
    },
  methods:{
    onCheckAllChange (e){
      console.log(e);
      Object.assign(this.state, {
        checkedList: e.target.checked ? this.shoppingCar : [],
        indeterminate: false
      })
    },
    ShoppingCarInfo(){
      let userId = JSON.parse(localStorage.getItem('user')).userId;
      getRequest('/shoppingcar/?userId='+userId).then(resp=>{
        if (resp){
          this.shoppingCar = resp;
          console.log(this.shoppingCar[0].sellGoods.goodsImage.imagesName)
        }
      })
    }

  }
}
</script>

<style scoped>

</style>