import Vue from 'vue'
import Vuex from 'vuex'

import userList from './userList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userList,
  },
})
