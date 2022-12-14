const { pathToRegexp } = require('path-to-regexp')
import api from 'api'

const { queryGroup, queryUserList, removeUser, updateUser, removeUserList } =
  api

export default {
  namespace: 'presentationDetail',

  state: {
    data: {},
    currentItem: {},
    modalOpen: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/group/:id').exec(pathname)
        if (match) {
          const payload = query || { page: 1, pageSize: 10 }
          dispatch({ type: 'query', payload: { id: match[1] } })
          dispatch({
            type: 'queryUserList',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({
        type: 'querySuccess',
        payload: {
          data: {},
        },
      })
    },
    *queryUserList({ payload = {} }, { call, put }) {
      const data = yield call(queryUserList, payload)
      if (data) {
        yield put({
          type: 'queryUserSuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeUser, { id: payload })
      const { selectedRowKeys } = yield select((_) => _.user)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter((_) => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(updateUser, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
    queryUserSuccess(state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination,
      }
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalOpen: true }
    },

    hideModal(state) {
      return { ...state, modalOpen: false }
    },
  },
}
