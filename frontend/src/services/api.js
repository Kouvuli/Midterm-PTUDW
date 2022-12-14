export default {
  loginUser: 'POST /auth/signin',
  registerUser: 'POST /auth/signup',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryGroup: '/group/:id',
  queryGroupList: '/groups',
  updateGroup: 'Patch /group/:id',
  createGroup: 'POST /group',
  removeGroup: 'DELETE /group/:id',
  removeGroupList: 'POST /groups/delete',

  queryJoinedGroup: '/group/:id',
  queryJoinedGroupList: '/groups',
  updateJoinedGroup: 'Patch /group/:id',
  createJoinedGroup: 'POST /group',
  removeJoinedGroup: 'DELETE /group/:id',
  removeJoinedGroupList: 'POST /groups/delete',

  queryDashboard: '/dashboard',
}
