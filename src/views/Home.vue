<template>

  <div class="home">
    <a-layout>
      <a-layout-header class="header">
        <ul class="ul">
          <li class="li"><h4>欢迎来到乐享校园交易服务平台！希望您在这里找到心仪的商品！</h4></li>
          <li class="li" style="margin-right: 20%"></li>
          <li class="li" v-if="this.user == null"><router-link to="/" style="color: #333">登录</router-link></li>
          <li class="li" v-else>
            <a-popover width={1000}>
              <template #content>
                <a @click="userInfo">个人设置</a>
                <a-divider style="margin: 7px auto;"/>
                  <a-avatar
                      :size="60"
                      style="float:left;background-color: #eaeaea;margin-right: 10px"
                      :src="require('../../../school-shop/images/userFace/'+ this.user.userFace)" />
                <ul style="list-style: none">
                  <li>乐享账号：{{this.user.userId}}</li>
                  <li>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：{{this.user.userName}}</li>
                </ul>
              </template>
              <UserOutlined /><a style="color: black">&nbsp;&nbsp;{{this.user.userName}}</a>
            </a-popover>
          </li>
          <li class="li"> | </li>
          <li class="li" v-if="this.user == null"><router-link to="/register" style="color: red">注册</router-link></li>
          <li class="li" v-else><router-link to="/" style="color: black" @click="goLogin"><PoweroffOutlined />&nbsp;&nbsp;退出</router-link></li>
          <li class="li"> | </li>
          <li class="li"><a  @click="showDrawer" style="color: black"><ShoppingCartOutlined style="color: #fa8724" />&nbsp;&nbsp;我的购物车</a></li>
          <li class="li"> | </li>
          <li class="li"><a  @click="" style="color: red">我的订单</a></li>
          <li class="li"> | </li>
          <li class="li"><MessageOutlined />&nbsp;&nbsp;联系客服</li>
        </ul>
      </a-layout-header>

      <!--购物车抽屉-->
      <a-drawer
          v-model:open="this.$store.state.openDrawers"
          class="custom-class"
          root-class-name="root-class-name"
          title="购物车"
          :width="500"
          @after-open-change="afterOpenChange"
          @close="closeChange"
          placement="right">
       <shoppingCar ref="car"/>
      </a-drawer>

      <a-layout-content class="content">
        <div class="menu">
          <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed()">
            <MenuUnfoldOutlined v-if="this.state.collapsed" />
            <MenuFoldOutlined v-else />
          </a-button>
          <a-menu
              v-model:openKeys="state.openKeys"
              v-model:selectedKeys="state.selectedKeys"
              mode="inline"
              theme="dark"
              :inline-collapsed="state.collapsed"
              :items="items"
              @click="gomenu"
          ></a-menu>
        </div>
        <div  class="main">
          <!--搜索部分-->
          <div class="search">
            <a-affix :offset-top="top">
              <span class="logo"><h1>乐享校园二手服务平台</h1></span>
              <a-input-search
                  placeholder="请输入要查询的商品名称..."
                  enter-button
                  @search="onSearch"
                  @change="showMain"
              />
            </a-affix>

          </div>

          <!--商品主页-->
          <div v-if="this.$store.state.isMain == '1'">
            <!--轮播图部分-->
            <div class="carousel"  v-if="flag">
              <a-carousel autoplay>
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
              </a-carousel>
            </div>
            <!--商品展示部分-->
            <h1 style="text-align: center">商品展示</h1>
            <div class="shopping_show">
              <ByName :str="str" ref="child"/>
            </div>
          </div>
          <!--用户个人信息-->
          <div v-else-if="this.$store.state.isMain == '2'">
            <userInfo/>
          </div>
          <!--商品详情-->
          <div v-else-if="this.$store.state.isMain == '3'">
            <ProductDetail />
          </div>
          <!--订单详情-->
          <div v-else-if="this.$store.state.isMain == '4'">
            <GoodsOrder/>
          </div>
        </div>
      </a-layout-content>
<!--      <a-layout-footer class="footer">Lexiang Campus second-hand service platform @2023 Created by Wxp</a-layout-footer>-->
    </a-layout>
  </div>
</template>

<script>
import GoodsOrder from "@/views/content/GoodsOrder";
import ProductDetail from "@/views/content/productDetail";
import userInfo from "@/views/content/UserInfo";
import shoppingCar from "@/views/content/shoppingCar";
import ByName from "@/views/content/getGoodsByName.vue"
import router from "@/router";
import {ref, reactive, watch, h, defineComponent} from 'vue'
import {message} from 'antd'
import {
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  components:{
    shoppingCar,
    ByName,
    userInfo,
    ProductDetail,
    GoodsOrder
  },
  name: "Home",
  data(){
    return{
      open : ref(false),
      flag:true,
      str:'',
      state:reactive({
        collapsed: true,
        selectedKeys: ['1'],
        openKeys: ['sub1'],
        preOpenKeys: ['sub1'],
      }),
      items : reactive([
        {
          key: 'home',
          icon: () => h(HomeOutlined),
          label: '首页',
          title: '首页',
        },
        {
          key: 'publish',
          icon: () => h(LogoutOutlined),
          label: '发布旧物',
          title: '发布旧物',
        },
        {
          key: '',
          icon: () => h(LoginOutlined),
          label: '收购旧物',
          title: '收购旧物',
        }
      ])
    }

  },
  computed:{
    user(){
      return this.$store.state.currentUser;
    }
  },
  watch(){
        () => this.state.openKeys,
        (_val, oldVal) => {
          this.state.preOpenKeys = oldVal;
        }
   },
  methods:{
    userInfo(){
      this.$store.state.isMain='2';
    },
    showDrawer(){
      this.isExistUser();
      this.$store.state.openDrawers = true;
    },
    afterOpenChange(){
      this.$refs.car.ShoppingCarInfo();
    },
    closeChange(){
      if (this.$store.state.isMain == '1'){
        this.$refs.child.getSellGoodsByName('');
      }

    },
    goLogin(){
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    /*判断用户是否登录*/
    isExistUser(){
      if (!localStorage.getItem('user')){
        message.warning('用户未登录，请先登录！');
        router.replace('/');
      }
    },
    showMain(){
      this.$store.state.isMain='1';
    },
    onSearch(searchValue){
      this.isExistUser();
      this.str = searchValue;
      if (searchValue != undefined && searchValue != ''){
          this.flag = false;
          this.$refs.child.getSellGoodsByName(searchValue);
      }else {
        message.error('搜索框不允许为空！')
      }
    },
    toggleCollapsed() {
      this.state.collapsed = !this.state.collapsed;
      this.state.openKeys = this.state.collapsed ? [] : this.state.preOpenKeys;
    },
    gomenu(info){
      if (info.key =='home'){
        if (this.$store.state.isMain == '1'){
          this.flag= true;
          this.$refs.child.getSellGoodsByName('');
        }
        this.$store.state.isMain='1';
      }
    }
  }
})
</script>

<style scoped>
.ul{
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: row;
  list-style: none;
}
.li{
  display: inline-block;
  margin-right: 10px;
  padding: 5px;
  color: #333;
  float: right;
}
.logo{
  width: 50%;
  float: left;
}
.ant-input-group-wrapper{
  width: 50%;
  float: right;
}
.home{
  width: 100%;
  height: auto;
}
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 400px;
  line-height: 400px;
  border-radius: 20px;
  background: rgba(64, 131, 250, 0.65);
  overflow: hidden;
}
:deep(.slick-slide h3) {
  color: #fff;
}
.ant-layout{
  background: linear-gradient(to bottom,#f3f3f3, #c3ecf5d9,#bebef7c7);
  width: 100%;
  height: 100%;
}
.header{
  height: 40px;
  line-height: 40px;
  color: #281c1c;
  border-bottom: 1px solid #eaeaea;
  background-color: #f3f3f3;
}
.content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow: hidden;
}
.main{
  width: 65%;
  margin: 0 auto 0 5%;
  height: auto;
}
.menu{
  width: 15%;
  flex-shrink: 0;
  margin-top: 45px;
}
.carousel{
  height: 400px;
  margin-bottom: 20px;
  border-radius: 20px;
}
.search{
  height: 70px;
  width: 65%;
  margin:20px auto 0 auto;
}
.shopping_show{
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;/*挤不下就换行*/
  justify-content: space-around;
}
.card{
  width: 230px;
  margin: 10px auto 10px auto;
}
.footer{
  width: 65%;
  margin: 0 auto;
  padding: 0;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #281c1c;
  background-color: #bebef7c7;
}
</style>