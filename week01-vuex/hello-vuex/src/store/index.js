import Vue from 'vue'
import Vuex from '../j-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter:0  
  },
  mutations: {
    add(state){
      state.counter++
    }
  },
  actions: {
    add({commit}){
      setTimeout(()=>{
        commit('add')
      },500)
    }
  },
  modules: {
  }
})
