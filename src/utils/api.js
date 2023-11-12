import axios from "axios";
import router from "../router"
import { message } from 'antd'

//请求拦截器
axios.interceptors.request.use(config =>{
    if (localStorage.getItem('token')){
        config.headers['Authorization'] =localStorage.getItem('token');
    }
    return config;
},error => {
    console.log(error);
})

//响应拦截器
axios.interceptors.response.use(success => {
    if (success.status && success.status == 200){
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403){
            message.error(success.data.msg + "");
            return;
        }
        if (success.data.msg){
            message.success(success.data.msg + "");
        }
    }
    return success.data;
},error => {
    if (error.response.code == 504 || error.response.code ==404){
        message.error('找不到服务器');
    }else if (error.response.config == 403){
        message.error('权限不足，请联系管理员');
    }else if (error.response.code == 401){
        message.error( '尚未登录，请登录！');
        router.replace('/'); //去登录页
    }else {
        message.error( error.response.data.msg + "");
    }
    return;
})

let base = '';

//使用JSON格式的post请求
export const postRequest = (url,params) => {
    return axios({
        method: 'post',
        url:`${base}${url}`,
        data:params
    })
}

//使用JSON格式的put请求
export const putRequest = (url,params) => {
    return axios({
        method: 'put',
        url:`${base}${url}`,
        data:params
    })
}

//使用JSON格式的delete请求
export const deleteRequest = (url,params) => {
    return axios({
        method: 'delete',
        url:`${base}${url}`,
        data:params
    })
}

//使用JSON格式的post请求
export const getRequest = (url,params) => {
    return axios({
        method: 'get',
        url:`${base}${url}`,
        data:params
    })
}