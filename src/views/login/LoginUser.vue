<template>
  <div class="loginPage">
    <div>
      <a-form
          :model="LoginForm"
          name="normal_login"
          @finish="submitLogin"
          class="login-form">
        <h3 class="loginTitle">乐享校园二手服务平台</h3>
        <hr>
        <a-form-item
            label="手机号"
            name="userPhone"
            :rules="[{ required: true, message: '请输入手机号' }]">
          <a-input v-model:value="LoginForm.userPhone">
            <template #prefix>
              <PhoneOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
            label="密 码"
            name="passWord"
            :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="LoginForm.passWord" style="margin-left: 10px;width: 261.95px">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item
            label="验证码"
            name="code"
            :rules="[{ required: true, message: '请输入验证码' }]">
          <a-input v-model:value="LoginForm.code" style="width: 120px;height: 35px;line-height:35px;margin-right: 5px">
            <template #prefix>
            </template>
          </a-input>
          <img :src="captchaUrl" @click="checkCaptcha()" style="height: 38px;" align="absmiddle"/>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="LoginForm.remember">记住密码</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">忘记密码</a>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登 录
          </a-button>
          <a style="color: red;" @click="goRegister()">没有账号？立即注册！</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>

import {
  PhoneOutlined,
  LockOutlined
} from '@ant-design/icons-vue';
import {postRequest,getRequest} from "@/utils/api.js";
import router from "@/router";


export default {
  components:{
    PhoneOutlined,
    LockOutlined
  },
  name: "LoginUser",
  data() {
    return {
      captchaUrl: '/code/generateCode?time='+new Date(),
      LoginForm: {
        userPhone: '',
        passWord: '',
        code: '',
        remember: true
      }

    }
  },
  methods: {
    /*登录到首页*/
    submitLogin(){
      return postRequest('/system/login',this.LoginForm).then(resp => {
        if (resp){
          const tokenStr = resp.data;
          localStorage.setItem('token',tokenStr);
          //页面跳转
          //let path = this.$route.query.redirect;
          router.replace('/home');
        }
      })
    },
    goRegister(){
      router.replace('/register');
    },
    checkCaptcha(){
      this.captchaUrl = '/code/generateCode?time='+new Date();
    }

  },

}


</script>

<style>
.loginPage{
  background: url("../../assets/login.jpg") no-repeat;
  background-size: 100% 100%;
}
.login-form{
  opacity: 0.9;
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
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
</style>