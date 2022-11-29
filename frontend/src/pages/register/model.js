import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'

const { registerUser } = api

export default {
  namespace: 'register',

  state: {},
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (pathToRegexp('/register').exec(location.pathname)) {
  //       }
  //     })
  //   },
  // },
  effects: {
    *register({ payload }, { put, call, select }) {
      const data = yield call(registerUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathToRegexp('/register').exec(from)) {
          if (['', '/'].includes(from)) history.push('/dashboard')
          else history.push(from)
        } else {
          history.push('/dashboard')
        }
      } else {
        throw data
      }
    },
  },
}
