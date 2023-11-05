<template>
  <div>
    <a-form
        :model="LoginForm"
        name="normal_login"
        class="login-form"
        @finish="onFinish">
      <h3 class="loginTitle">乐享校园二手服务平台</h3>
      <hr>
      <a-form-item
          label="手机号"
          name="userPhone"
          :rules="[{ required: true, message: '请输入手机号' }]">
        <a-input v-model:value="LoginForm.userPhone">
          <template #prefix>
            <UserOutlined class="site-form-item-icon"/>
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
          style="align-items: center;display: flex"
          :rules="[{ required: true, message: '请输入验证码' }]">
        <a-input v-model:value="LoginForm.code" style="width: 120px;height: 35px;margin-right: 5px">
          <template #prefix>
          </template>
        </a-input>
        <img :src="captchaUrl" @click="checkCaptcha()" style="height: 38px" align="absmiddle"/>
      </a-form-item>

      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="LoginForm.remember">记住密码</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="">忘记密码</a>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button" @click="submitLogin()">
          登 录
        </a-button>
        <a href="" style="color: red;">没有账号？立即注册！</a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons-vue';
import {postRequest} from "@/utils/api";
import router from "@/router";

export default {
  components:{
    UserOutlined,
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
    submitLogin(){
      postRequest('/system/login',this.LoginForm).then(resp => {
        if (resp){
          const tokenStr = resp.data;
          localStorage.setItem('token',tokenStr);
          //页面跳转
          //let path = this.$route.query.redirect;
          router.replace('/home');
        }
      })
    },
    checkCaptcha(){
      this.captchaUrl = '/code/generateCode?time='+new Date();
    },
    onFinish(values) {
      console.log('Success:', values);
    }

  }
}

</script>

<style>

.login-form{
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