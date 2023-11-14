import Vue, {createApp} from 'vue'
import {createStore} from 'vuex'
import router from "@/router";


const store = createStore({
    state:{
        currentUser:JSON.parse(localStorage.getItem('user'))
    },
    mutations:{
        INIT_USER(state,user){
            state.currentUser = user;
        }
    },
    actions:{

    },
    modules:{

    }
})



export default store