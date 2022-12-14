import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
const { pathToRegexp } = require("path-to-regexp")
import { model } from 'utils/model'

const { queryDashboard, queryWeather } = api
const avatar = 'https://picsum.photos/200/200'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    weather: {
      city: '深圳',
      temperature: '30',
      name: '晴',
    },
    sales: [],
    quote: {
      avatar,
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryDashboard, parse(payload))
      yield put({
        type: 'updateState',
        payload: data,
      })
    },
    *queryWeather({ payload = {} }, { call, put }) {
      payload.location = 'shenzhen'
      const result = yield call(queryWeather, payload)
      const { success } = result
      if (success) {
        const data = result.results[0]
        const weather = {
          city: data.location.name,
          temperature: data.now.temperature,
          name: data.now.text,
        }
        yield put({
          type: 'updateState',
          payload: {
            weather,
          },
        })
      }
    },
  },
})
