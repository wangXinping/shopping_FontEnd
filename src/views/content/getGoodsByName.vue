<template>
      <a-card class="card" v-for="(index,good) in goods" :key="index" hoverable>
        <template #cover>
          <img   v-if="index.goodsImage == null || index.goodsImage.imagesName == null" style="height: 300px"
                 src="../../../../school-shop/images/goodsimgs/1.jpg" alt="">
          <img
              v-else
              style="height: 300px"
              alt="example"
              :src="require('../../../../school-shop/images/goodsimgs/'+index.goodsImage.imagesName)"
          />
        </template>
        <template #actions>
          <setting-outlined key="setting" />
          <HeartOutlined v-if="index.shoppingCar == null" @click="addShoppingCar(index)" />
          <HeartFilled v-else @click="delShoppingCar(index)"/>
          <AccountBookOutlined key="ellipsis" />
        </template>
        <a-card-meta style="float:left;"
                     :title="index.goodsName.length>5?index.goodsName.substring(0,5)+'..':index.goodsName"
                     :description="index.present.substring(0,7) + '...'">
        </a-card-meta>
        <h2 style="float: right; color: red;">
          ￥{{index.price}}
        </h2>
      </a-card>
</template>

<script>
import {getRequest,postRequest,deleteRequest} from "@/utils/api.js";
import {watch} from "vue";

export default {
  name: "getGoodsByName",
  props:{
    str:{
      type:String,
      defalut:''
    }
  },
  data(){
    return{
      bname:this.str,
      goods:[
        {
          goodsId:'',
          goodsName: '',
          price: '',
          categoryId:'',
          present:'',
          createTime:'',
          goodsImage:{
            imagesId:'',
            imagesName:null
          },
          shoppingCar:{
            shoppingId:'',
            goodsId:'',
            userId:''
          }
        }
      ],
      sellGoods:{
        goodsId:null,
        goodsName: '',
        price: null,
        categoryId:null,
        present:'',
        createTime:'',
        goodsImage:{imagesId:null, imagesName:null}
      },
      shoppingCars:{
        goodsId:'',
        userId:''
      }
    };
  },

  mounted() {
    this.getSellGoodsByName('');
  },
  methods:{
    delShoppingCar(index){
      let userId = JSON.parse(localStorage.getItem('user')).userId;
      this.shoppingCars.goodsId = index.goodsId;
      this.shoppingCars.userId = userId;
      deleteRequest('/shoppingcar/',this.shoppingCars).then(resp =>{
        if (resp){
          index.shoppingCar=null;
        }
      })
    },
    addShoppingCar(index){
      let userId = JSON.parse(localStorage.getItem('user')).userId;
      this.shoppingCars.goodsId = index.goodsId;
      this.shoppingCars.userId = userId;
      postRequest('/shoppingcar/',this.shoppingCars).then(resp=>{
        if (resp){
          index.shoppingCar=this.shoppingCars;
        }
      })
    },
    getSellGoodsByName(value){
      getRequest('/goods/?goodsName='+value).then(resp=>{
        if (resp){
          this.goods = resp;
        }
      })
    }

  }
}

</script>

<style scoped>
.card{
  width: 230px;
  margin: 10px auto 10px auto;
}
</style>