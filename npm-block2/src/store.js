import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";


const store = createStore({
    plugins: [createPersistedState()],
    state: {
       count: 0,
       user: null
     },
     mutations: {
         setCount: (state, count) => state.count = count,
         setUser: (state, user) => state.user = user,
     },
     getters: {
         getCount: (state) =>
         {
             return state.count
         },
         getUser: (state) =>
         {
             return state.user
         }
     }  
 })
export default store;
