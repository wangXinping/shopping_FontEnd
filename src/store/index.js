import Vue, {createApp, reactive} from 'vue'
import {createStore} from 'vuex'
import router from "@/router";


const store = createStore({
    state:{
        currentUser:JSON.parse(localStorage.getItem('user')),
        goods:[],
        isMain:'1',
        openDrawers:false,
        goodDetail:[],
        orderDetail:[],
        totalPrice:0
    },
    mutations:{
        INIT_USER(state,user){
            state.currentUser = user;
        },
        GET_GOODS(state,goods){
            state.goods = goods;
        }
    },
    actions:{

    },
    modules:{

    }
})



export default store