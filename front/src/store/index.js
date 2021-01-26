import Vue from 'vue'
import Vuex from 'vuex'
import { getHome } from "@/service/api/home";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    themeMode: 'light',
    homeInfo: {},
    userInfo: {}
  },
  mutations: {
    changeThemeMode(state, mode) {
      if (mode && ['dark', 'light'].includes(mode)) {
        state.themeMode = mode;
        return
      }
      if (state.themeMode === "light") {
        state.themeMode = "dark";
      } else {
        state.themeMode = "light";
      }
    },
    setHomeInfo(state, data) {
      state.homeInfo = data
    },
    setUserInfo(state, data) {
      state.userInfo = {
        ...state.userInfo,
        ...data
      }
    }
  },
  actions: {
    async fetchGetHomeInfo({ commit }) {
      const res = await getHome()
      if (res.code === 0) {
        commit('setHomeInfo', res.data)
      }
      return res
    },
    getUserInfoAction({ commit }) {
      const res = window.localStorage.getItem('userInfo');
      if (res) {
        commit('setUserInfo', JSON.parse(res))
      }
    },
    setUserInfoAction({ commit, state }, data = {}) {
      window.localStorage.setItem('userInfo', JSON.stringify({
        ...state.userInfo,
        ...data
      }));
      commit('setUserInfo', data)
    }
  },

})
