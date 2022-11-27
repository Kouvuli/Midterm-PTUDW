export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryGroupInfo: '/group',
  queryGroup: '/group/:id',
  queryGroupList: '/groups',
  updateGroup: 'Patch /group/:id',
  createGroup: 'POST /group',
  removeGroup: 'DELETE /group/:id',
  removeGroupList: 'POST /groups/delete',

  queryDashboard: '/dashboard',
}
