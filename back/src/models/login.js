import { loginReq, whoamiReq, updataInfoReq, updatePwdReq } from '@/service/api/admin'



export default {
  state: {
    isLogined: false,
    info: {}
  },
  reducers: {
    setUserInfo(state, { payload }) {
      return {
        ...state,
        info: payload
      }
    },
    setLoginedState(state, { payload }) {
      return {
        ...state,
        isLogined: payload
      }
    }
  },
  effects: {
    *fetchLogin({ payload: { username, password } }, { put, call }) {
      const res = yield call(loginReq, username, password)
      if (res.code === 0) {
        yield put({ type: 'setUserInfo', payload: res.data })
        yield put({ type: 'setLoginedState', payload: true })
        return true
      } else {
        return false
      }
    },
    *whoami(action, { put, call }) {
      const res = yield call(whoamiReq);
      if (res.code === 0) {
        yield put({ type: 'setUserInfo', payload: res.data })
        yield put({ type: 'setLoginedState', payload: true })
      }
    },
    *updateInfo({ payload }, { call, put }) {
      const res = yield call(updataInfoReq, payload)
      if (res.code === 0) {
        yield put({ type: 'whoami' })
        return true
      } else {
        return false
      }
    },
    *updatePwd({ payload: { oldPwd, newPwd } }, { call }) {
      const res = yield call(updatePwdReq, oldPwd, newPwd)
      if (res.code === 0) {
        return true
      }
      return false
    }
  },
  subscriptions: {
    initUserInfo: async ({ dispatch, history }) => {
      if (history.location.pathname !== '/login') {
        dispatch({ type: 'whoami' })
      }
    }
  }
}


