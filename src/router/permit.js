import router from "@/router/index";
import {getRequest} from "@/utils/api";

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
        if (to.path == '/'){
            next();
        }else {
            next('?/redirect='+to.path);
        }
    }

})