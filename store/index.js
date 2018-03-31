
import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import md5 from 'md5'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER: function (state, user) {
      state.user = user
    }
  },
  actions: {
    LOGIN: async function (context, { no, password }) {
      const { success, data } = await this.$axios.$post('/login', {no, password: md5(password)})
      // console.log(`store action LOGIN\s result: {success: ${success}, data: ${data} }`)
      if (success) {
        context.commit('SET_USER', data.user)
        Cookies.set('http://127.0.0.1:3001/', data.token)
      }
    },
    LOGOUT: function (context) {
      context.commit('SET_USER', null)
      Cookies.remove('http://127.0.0.1:3001/')
    }
  }
})

export default store
