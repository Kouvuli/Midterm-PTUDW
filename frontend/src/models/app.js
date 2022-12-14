/* global window */

import { history } from 'umi'
import { stringify } from 'qs'
import store from 'store'
const { pathToRegexp } = require("path-to-regexp")
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout, isEmpty, isExpired } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import config from 'config'

const goDashboard = () => {
  if (pathToRegexp(['/', '/login']).exec(window.location.pathname)) {
    history.push({
      pathname: '/dashboard',
    })
  }
}

export default {
  namespace: 'app',
  state: {
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Dashboard',
        zhName: '仪表盘',
        router: '/dashboard',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      // store isInit to prevent query trigger by refresh
      const isInit = store.get('isInit')
      if (isInit) {
        goDashboard()
        return
      }
      const { locationPathname } = yield select(_ => _.app)
      const auth = store.get('auth')
      if (auth && !isEmpty(auth)) {
        const { expired_date } = auth
        if (isExpired(expired_date)) {
          yield put({ type: 'signOut' })
        }
        const list = [
          {
            id: '1',
            icon: 'dashboard',
            name: 'Dashboard',
            zh: {
              name: '仪表盘'
            },
            'pt-br': {
              name: 'Dashboard'
            },
            route: '/dashboard',
          },
          {
            id: '21',
            menuParentId: '-1',
            breadcrumbParentId: '1',
            name: 'User Detail',
            zh: {
              name: '用户详情'
            },
            'pt-br': {
              name: 'Detalhes do usuário'
            },
            route: '/user/:id',
          },
          {
            id: '5',
            breadcrumbParentId: '1',
            name: 'Groups',
            zh: {
              name: 'Groups'
            },
            'pt-br': {
              name: 'Groups'
            },
            icon: 'code-o',
          },
          {
            id: '51',
            breadcrumbParentId: '5',
            menuParentId: '5',
            name: 'My Groups',
            zh: {
              name: 'My Groups'
            },
            'pt-br': {
              name: 'My Groups'
            },
            icon: 'line-chart',
            route: '/group',
          },
          {
            id: '52',
            breadcrumbParentId: '5',
            menuParentId: '5',
            name: 'Joined Groups',
            zh: {
              name: 'Joined Groups'
            },
            'pt-br': {
              name: 'Joined Groups'
            },
            icon: 'bar-chart',
            route: '/joinedgroup',
          },
          {
            id: '53',
            menuParentId: '-1',
            breadcrumbParentId: '1',
            name: 'Group Detail',
            zh: {
              name: 'Group Detail'
            },
            'pt-br': {
              name: 'Group Detail'
            },
            route: '/group/:id',
          },
          {
            id: '54',
            menuParentId: '-1',
            breadcrumbParentId: '1',
            name: 'Joined Group Detail',
            zh: {
              name: 'Joined Group Detail'
            },
            'pt-br': {
              name: 'Joined Group Detail'
            },
            route: '/joinedgroup/:id',
          },
        ]
        const permissions = { role: ROLE_TYPE.ADMIN} 
        let routeList = list
        if (
          permissions.role === ROLE_TYPE.ADMIN ||
          permissions.role === ROLE_TYPE.DEVELOPER
        ) {
          permissions.visit = list.map(item => item.id)
        } else {
          routeList = list.filter(item => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid
                ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
                : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        }
        store.set('routeList', routeList)
        store.set('permissions', permissions)
        store.set('isInit', true)
        goDashboard()
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        history.push({
          pathname: '/login',
        }) 
      }
    },

    // eslint-disable-next-line require-yield
    *signOut({ payload }, { call, put }) {
      store.set('isInit', false)
      store.set('routeList', [])
      store.set('permissions', { visit: [] })
      store.set('user', {})
      store.set('auth', null)
      setTimeout(() => {
        history.push({
            pathname: '/login'
        }) 
      }, 100)
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
