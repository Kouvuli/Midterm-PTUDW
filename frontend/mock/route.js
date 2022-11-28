import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
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
    id: '2',
    breadcrumbParentId: '1',
    name: 'Users',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    icon: 'user',
    route: '/user',
  },
  {
    id: '21',
    menuParentId: '-1',
    breadcrumbParentId: '2',
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
    route: '/joined',
  },
  {
    id: '53',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: 'Group Detail',
    zh: {
      name: 'Group Detail'
    },
    'pt-br': {
      name: 'Group Detail'
    },
    route: '/group/:id',
  },
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
