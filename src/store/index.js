import Vue from 'vue'
import Vuex from 'vuex'

// 导入本地储存中的方法
import { setItem, getItem, removeItem } from '@/utils/storage.js'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 储存 token 值
    tokenKey: getItem(TOKEN_KEY)
    // tokenKey: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
  },
  mutations: {
    // 存储 token 值
    setTokenKey (state, data) {
      state.tokenKey = data
      // 存入本地存储中
      setItem(TOKEN_KEY, state.tokenKey)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.tokenKey))
    },
    // 删除 token 值
    removeTokenKey (state, data) {
      removeItem(TOKEN_KEY)
      // window.localStorage.removeItem(TOKEN_KEY)
      state.tokenKey = data
    }
  },
  actions: {
  },
  modules: {
  }
})
