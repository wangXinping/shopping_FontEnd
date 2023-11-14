<template>
  <div class="components-page-header-demo-responsive">
    <a-page-header title="个人设置">
      <a-divider style="margin: 8px auto"/>
      <template #extra>
        <a-button key="3">地址管理</a-button>
        <a-button key="2" @click="updatePwd">修改密码</a-button>
        <a-popconfirm
          ok-text="确认"
          cancel-text="取消"
          @confirm="deleteUser"
        >
          <template #title>你确定要注销此账号吗？<br>(<span style="color: red">账号注销后则无法登录</span>)</template>
          <template #icon><question-circle-outlined style="color: red" /></template>
          <a-button key="1" danger>注销账号</a-button>
        </a-popconfirm>
      </template>
      <template #footer>
      </template>
      <div class="content" style="background-color: white;margin: 0 auto">

        <div  class="userInfo">
          <a-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold">您的个人资料</span>
              <a style="float: right; " type="text" @click="updateUser">修改个人资料</a>
            </div>
            <a-divider style="margin: 8px auto"/>
            <div class="text item">
              <table class="userTable">
                <tr>
                  <td>个人头像:</td>
                  <td>
                    <a-upload
                        action="/userInfo/updataByFace"
                        :data="currentUser"
                        :show-upload-list="false"
                        :headers="headers"
                        :on-success="onSuccess"
                    >
                      <a-avatar
                          title="点击修改头像"
                          style="border: 1px solid lightgray"
                          shape="square"
                          :size="100"
                          size="large"
                          :src="require('../../../../school-shop/images/userFace/'+ this.currentUser.userFace)" />
                    </a-upload>
                  </td>
                </tr>
                <tr>
                  <td>昵称:</td>
                  <td>{{this.currentUser.userName}}</td>
                </tr>
                <tr>
                  <td>乐享账号:</td>
                  <td>{{this.currentUser.userId}}</td>
                </tr>
                <tr>
                  <td>性别:</td>
                  <td>{{this.currentUser.sex}}</td>
                </tr>
                <tr>
                  <td>绑定手机号:</td>
                  <td>{{this.currentUser.phone}}</td>
                </tr>
                <tr>
                  <td>个人介绍:</td>
                  <td>{{this.currentUser.introduce}}</td>
                </tr>
              </table>
            </div>
          </a-card>
        </div>
      </div>
    </a-page-header>
  </div>

<!--修改密码弹框-->
  <a-modal v-model:open="openPwd" title="修改密码" footer="" :afterClose="afterClose">
    <a-divider style="margin: 8px auto"/>
    <a-form :model="this.userByPwd" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item
          label="旧 密 码："
          name="password"
          :rules="[{ required: true, message: '旧密码不能为空' }]">
        <a-input-password v-model:value="this.userByPwd.password" />
      </a-form-item>
      <a-form-item
          label="新 密 码："
          name="newpassword"
          :rules="[{ required: true, message: '新密码不能为空' }]">
        <a-input-password v-model:value="this.userByPwd.newpassword" />
      </a-form-item>
      <a-form-item
          label="确认密码："
          name="repassword"
          :rules="[{ required: true, message: '确认密码不能为空' }]">
        <a-input-password v-model:value="this.userByPwd.repassword" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 16, offset: 10 }">
        <a-button type="primary" html-type="submit" @click="updatePassword">确认修改</a-button>
      </a-form-item>
    </a-form>
  </a-modal>

<!--  修改个人资料弹框-->
  <a-modal v-model:open="open" title="修改个人资料>>>" footer="" :afterClose="afterClose">
    <a-divider style="margin: 8px auto"/>
    <a-form :model="this.currentUser2" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="乐享账号：">
        <a-input  :disabled="true" v-model:value="this.currentUser2.userId" />
      </a-form-item>
      <a-form-item label="昵 称：">
        <a-input v-model:value="this.currentUser2.userName" />
      </a-form-item>
      <a-form-item label="性 别：">
        <a-radio-group v-model:value="this.currentUser2.sex">
          <a-radio value="男" name="sex">男</a-radio>
          <a-radio value="女" name="sex">女</a-radio>
          <a-radio value="保密" name="sex">保密</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="绑定手机号">
        <a-input v-model:value="this.currentUser2.phone"/>
      </a-form-item>
      <a-form-item label="个人介绍">
        <a-textarea v-model:value="this.currentUser2.introduce"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 16, offset: 10 }">
        <a-button type="primary" @click="updateUserInfo">确认修改</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import {putRequest,getRequest,deleteRequest} from "@/utils/api";
import router from "@/router";

export default {
  name: "userInfo",
  data(){
    return{
      headers:{
        Authorization:localStorage.getItem('token')
      },
      labelCol : {
        style: {
          width: '150px',
        },
      },
      wrapperCol :{
        span: 14,
      },
      openPwd:false,
      open:false,
      currentUser:this.$store.state.currentUser,
      currentUser2:JSON.parse(localStorage.getItem('user')),
      userByPwd:{
        userId:'',
        password:'',
        newpassword:'',
        repassword:''
      }
    }
  },
  methods:{
    deleteUser(){
      return new Promise(resolve => {
        setTimeout(() => resolve(true), 2000);
        deleteRequest('/userInfo/?userId='+this.currentUser.userId).then(resp=>{
          if (resp){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.replace('/');
            this.$store.state.currentUser = [];
          }
        })
      });

    },
    updatePwd(){
      this.openPwd = !this.openPwd;
    },
    updatePassword(){
      let url = '/userInfo/updateBypassword?userId='+this.currentUser.userId
                +'&password='+this.userByPwd.password+'&newpassword='+this.userByPwd.newpassword+'&repassword='+this.userByPwd.repassword
      putRequest(url).then(resp=>{
        if (resp){
          this.openPwd = !this.openPwd;
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.replace('/');
        }
      })
    },
    onSuccess(){
      this.initUser();
    },
    initUser(){
      getRequest('/userInfo/').then(resp=>{
        if (resp){
          this.currentUser=resp;
          this.currentUser2 = Object.assign({},this.currentUser);
          localStorage.setItem('user',JSON.stringify(resp));
          this.$store.commit('INIT_USER',resp.data)
        }
      })
    },
    updateUserInfo(){
      putRequest('/userInfo/updateByuserInfo',this.currentUser2).then(resp => {
        if (resp){
          this.currentUser = resp.data;
          this.currentUser2 = Object.assign({},this.currentUser)
          localStorage.setItem('user',JSON.stringify(this.currentUser2));
          this.$store.commit('INIT_USER',resp.data);
          this.open=!this.open;
          // this.currentUser = JSON.parse(localStorage.getItem('user'));
        }
      })
    },
    afterClose(){
      this.currentUser2=JSON.parse(localStorage.getItem('user'))
    },
    updateUser(){
      this.open=!this.open;
    }
  }
}
</script>

<style scoped>
.userInfo{
  position: absolute;
  left: 25%;
  top: 15%;
}
.userTable{
  margin: 30px auto 0 auto;
  font-size: 16px;
  font-weight: bold;
}
.userTable tr {
  height: 40px;
}
.userTable tr td{
  width: 125px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 540px;
  height: 480px;

}
.components-page-header-demo-responsive {
  padding-bottom: 20px;
}
.ant-page-header.has-footer.ant-page-header-ghost.css-dev-only-do-not-override-185kyl0{
  background-color: #f3f3f3;
  border-radius: 8px;
  height: 780px;
}



</style>