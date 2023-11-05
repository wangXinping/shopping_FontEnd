import {createApp} from "vue"
import LoginUser from "@/views/login/LoginUser";
import {createRouter,createWebHashHistory}from 'vue-router'
import Home from "@/views/Home";


//定义路由
const routes = [
    {
        path: '/',
        name: 'LoginUser',
        component: LoginUser,
        hidden: true
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        hidden: true
    }
]

const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes
})

const app = createApp({})
app.use(router)
app.mount('#app')

export default router