<template>
  <div class="loginPage">
    <div class="login-form">
      <a-form
          :model="RegisterForm"
          name="normal_login"
          @finish="RegisterUser"
          class="">
        <h3 class="loginTitle">个人账号注册</h3>
        <hr>
        <a-form-item
            label="用户昵称"
            name="userName"
            :rules="[{ required: true, message: '请输入昵称' }]">
          <a-input v-model:value="RegisterForm.userName">
            <template #prefix>
              <UserOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
            label="手 机 号"
            name="userPhone"
            :rules="[{ required: true, message: '请输入手机号' }]">
          <a-input v-model:value="RegisterForm.userPhone" style="margin-left: 8px;width: 247.95px">
            <template #prefix>
              <PhoneOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
            label="用户密码"
            name="passWord"
            :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="RegisterForm.passWord">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item
            label="确认密码"
            name="confirmPwd"
            :rules="[{ required: true, message: '请输入验证码' }]">
          <a-input-password v-model:value="RegisterForm.confirmPwd">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            注  册
          </a-button>
          <a @click="goLogin()" style="color: red;">已有账号？立即登录</a>
        </a-form-item>
      </a-form>
    </div>
  </div>

</template>

<script>
  import {
    LockOutlined,
    UserOutlined,
    PhoneOutlined
  } from '@ant-design/icons-vue'
  import router from "@/router";
  import {postRequest} from "@/utils/api.js";
export default {
  components:{
    LockOutlined,
    UserOutlined,
    PhoneOutlined
  },
  name: "Register",
  data() {
    return {
      RegisterForm: {
        userName: '',
        userPhone: '',
        passWord: '',
        confirmPwd: '',
        remember: true
      }
    }
  },
  methods: {
    RegisterUser(){
      return postRequest("/register/",this.RegisterForm).then(resp => {
        if (resp){
            router.replace('/');
        }
      })
    },
    goLogin(){
      router.replace('/');
    }

  }
}

</script>

<style>
#app, .loginPage{
  height: 100%;
}
.loginPage{
  position: relative;
  background: url("../../assets/login.jpg") no-repeat;
  background-size: 100% 100%;
  padding: 0;
}
.login-form{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 15px;
  background-clip: padding-box;
  margin: auto;
  width: 400px;
  height: 470px;
  padding: 15px 35px 15px 35px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle{
  text-align: center;
  font-size: x-large;
  margin: 30px auto 30px auto;
}
.ant-form-item{
  margin: 28px auto;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
:where(.css-dev-only-do-not-override-qgg3xn).ant-message .ant-message-notice-wrapper .ant-message-notice-content{
  background-color: #f0f9eb; /* 自定义背景色 */
  color: #1c5a02;/* 自定义文字颜色 */
  border: 1px solid #beefbe;
}
:where(.css-dev-only-do-not-override-qgg3xn).ant-message .ant-message-notice-wrapper .ant-message-notice-content{
  width: 350px;
  height: 40px;
  line-height: 40px;
  padding: 0px;

}
.ant-message-error{
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  background-color: #f5e8e8;
  color: #440101;
  border-radius: 8px;
  border: 1px solid #fabfbd;
}
.ant-message-warning{
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  background-color: #fffbde;
  color: #635600;
  border-radius: 8px;
  border: 1px solid #fff18c;
}
</style>