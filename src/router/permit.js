import router from "@/router/index.js";
import {getRequest} from "@/utils/api.js";

router.beforeEach((to,from,next) =>{
    if (localStorage.getItem('token')){
        //判断用户是否存在
        if (!localStorage.getItem('user')){
            return getRequest('/userInfo/').then(resp => {
                if (resp){
                    //将用户信息存入localstorage中
                    localStorage.setItem('user',JSON.stringify(resp));
                    next();
                }
            })
        }
        next();
    }else {
       if (to.path == '/' || to.path == '/register' || to.path == '/home'){
            next();
        }else {
            next('?/redirect='+to.path);
        }
    }

})