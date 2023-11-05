import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import axios from "axios";

import './router/permit'
import router from "./router";
import App from './App.vue'

const app = createApp(App);
app.provide('$axios',axios)
app.use(router)
app.use(Antd)
app.mount('#app')

