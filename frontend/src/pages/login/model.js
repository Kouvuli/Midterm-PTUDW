import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import store from 'store'
import { API_STATUS } from 'utils/constant'
const { loginUser } = api

export default {
  namespace: 'login',

  state: {},
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (pathToRegexp('/login').exec(location.pathname)) {
  //       }
  //     })
  //   },
  // },
  effects: {
    *login({ payload }, { put, call, select }) {
      try {
        const data = yield call(loginUser, payload)
        const { locationQuery } = yield select(_ => _.app)
        if (data.success && data.status === API_STATUS.OK) {
          const { from } = locationQuery
          store.set('auth', data.data)
          yield put({ type: 'app/query' })
          if (!pathToRegexp('/login').exec(from)) {
            if (['', '/'].includes(from)) history.push('/dashboard')
            else history.push(from)
          } else {
            history.push('/dashboard')
          }
        } else {
          throw data
        }
      } catch (err) {
        window.alert(err.message || "Unknown Error")
      }
    },
  },
}
