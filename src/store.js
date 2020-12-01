import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
        status: 'guest',
        token: undefined,
        data: {}
    }
  },
  mutations: {
    setUserStatus (state, newStatus) {
      state.user.status = newStatus
    },
    setUser(state, data){
      state.user.data = data
    },
    setToken(state, token){
      state.user.token = token
    },
    userLogout(state){
      state.user = {
        data: {},
        token: undefined,
        status: 'guest'
      }
    }
  },
  actions: {
      login(store, data){
        store.commit('setUserStatus', 'logged')
        store.commit('setUser', data.user)
        store.commit('setToken', data.token)
      },
      logout(store){
        store.commit('userLogout')
      },
      register(store){
        store.commit('setUserStatus', 'register')
      }
  }
})