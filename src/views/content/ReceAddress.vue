<template>
  <div class="addressContent">
    <a-button style="font-weight: bold;border: 1px solid #4096ff;" @click="insertAddress()">添加收货地址</a-button>
    <span style="margin-left: 5px;font-family: fantasy;font-size: 12px;color: #878787;">已添加 ( {{this.address.length}} ) 条收货地址</span>
    <div v-for="(index) in this.address" :key="index" class="card">
      <table>
        <tr>
          <td>收货人姓名:</td>
          <td>{{index.receName}}<a-switch @change="change(index)" style="margin:auto auto 6px 15px" :checked="index.isDefault=='是'" checked-children="默认" un-checked-children="默认" size="small" /></td>
        </tr>
        <tr>
          <td>收 货 地 址：</td>
          <td>{{index.addressInfo}}</td>
        </tr>
        <tr>
          <td>收货人手机号：</td>
          <td>{{index.addressPhone}}</td>
        </tr>
      </table>
      <CloseOutlined @click="deleteAddress(index)" style="position: absolute;top: 17px;right: 40px;color: gray;font-size: 18px;"/>
      <EditOutlined @click="insertAddress(index)" style="position: absolute;bottom: 10px;right: 40px;font-size: 18px;color: #ff4900;"/>
    </div>

    <!--  添加收货地址弹框  -->
    <a-modal v-model:open="openInsert" title="收货地址>>>" footer="" :afterClose="afterClose">
      <a-divider style="margin: 8px auto"/>
      <a-form :model="this.addressOne" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="收货人姓名：">
          <a-input v-model:value="this.addressOne.receName" />
        </a-form-item>
        <a-form-item label="收货人地址：">
          <a-input v-model:value="this.addressOne.addressInfo" />
        </a-form-item>
        <a-form-item label="手 机 号：">
          <a-input v-model:value="this.addressOne.addressPhone" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 16, offset: 10 }">
          <a-button type="primary" @click="addressSubmit">确认提交</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {getRequest, putRequest,postRequest,deleteRequest} from "@/utils/api";
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
export default {
  name: "ReceAddress",
  data(){
    return{
      isAdd:true,
      openInsert:false,
      addressOne:{
        addressId:'',
        receName:'',
        addressPhone:'',
        addressInfo:'',
        isDefault:'',
        userId:''
      },
      addressOne1:{
        addressId:'',
        receName:'',
        addressPhone:'',
        addressInfo:'',
        isDefault:'',
        userId:''
      },
      address:[
        {
          addressId:'',
          receName:'',
          addressPhone:'',
          addressInfo:'',
          isDefault:'',
          userId:''
        }
      ],
      labelCol : {
        style: {
          width: '150px',
        },
      },
      wrapperCol :{
        span: 14,
      },
    }
  },
  mounted() {
    this.addressInit();
  },
  methods:{
    addressInit(){
      this.address.userId = Object.assign(this.$store.state.currentUser.userId);
      getRequest('/address/?userId='+this.address.userId).then(resp=>{
        if (resp){
          this.address = resp;
        }
      })
    },
    deleteAddress(value){
      Modal.confirm({
        title: '确认要删除该收货地址吗？',
        icon: createVNode(QuestionCircleOutlined),
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk:()=>{
          deleteRequest('/address/',value).then(resp=>{
            if (resp){
              this.addressInit();
            }
          })
        }
      })

    },
    addressSubmit(){
      this.addressOne.userId = Object.assign(this.$store.state.currentUser.userId)
      if (this.isAdd){//添加
        postRequest('/address/',this.addressOne).then(resp=>{
          if (resp){
            this.addressInit();
            this.openInsert = false;
          }
        })
      }else{//更新
        putRequest('/address/',this.addressOne).then(resp=>{
          if (resp){
            this.addressInit();
            this.openInsert = false;
          }
        })
      }
    },
    insertAddress(value){
      if (!value){//添加地址
        this.addressOne = JSON.parse(JSON.stringify(this.addressOne1));
        this.isAdd =true;
        this.openInsert = true;
      }else{//更新地址
        this.addressOne = JSON.parse(JSON.stringify(value));
        this.isAdd = false;
        this.openInsert = true;
      }


    },
    change(value){
      if (value.isDefault == '是'){
        value.isDefault = '否';
      }else{
        value.isDefault = '是';
      }
      putRequest('/address/default',value).then(resp=>{
        if (resp){
          this.addressInit();
        }
      })
    }

  }
}
</script>

<style scoped>
.card{
  position: relative;
  border: 2px solid #ebebeb;
  border-radius: 5px;
  padding: 10px 28px;
  margin-top: 10px;
}
 .addressContent{
   width: 800px;
   margin: 20px auto;
 }
</style>