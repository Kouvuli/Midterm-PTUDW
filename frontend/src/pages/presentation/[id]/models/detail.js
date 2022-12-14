import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'

const { registerUser } = api

export default {
  namespace: 'presentationDetail',

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
      try {
        const data = yield call(registerUser, payload)
        const { locationQuery } = yield select(_ => _.app)
        if (data.success) {
          const { from } = locationQuery
          history.push('/login?success=true')
        } else {
          throw data
        }
      } catch (err) {
        window.alert(err.message || "Unknown Error")
      }
    },
  },
}
