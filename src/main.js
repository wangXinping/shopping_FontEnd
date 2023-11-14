import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import axios from "axios";
import store from './store'

import './router/permit.js'
import 'antd/dist/reset.css'
import 'ant-design-vue/dist/reset.css'
import router from "./router";
import App from './App.vue'

//导入所有图标库
import * as Icons from "@ant-design/icons-vue";



const app = createApp(App);
app.use(store)
app.provide('$axios',axios)
app.use(router)
app.use(Antd)
for(const i in Icons){
    app.component(i, Icons[i]);
}
app.mount('#app')

