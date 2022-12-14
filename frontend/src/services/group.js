import axios from 'axios'
import baseConfig from './config'
const { token, baseUrl } = baseConfig

const getOwnedGroupByUserId = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/users/${id}/ownGroups`)
  return response.data
}

const getJoinedGroupByUserId = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/users/${id}/groups`)
  return response.data
}

const getUserByGroupId = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/groups/${id}/members`)
  return response.data
}

const getGroupByGroupId = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/groups/${id}`)
  return response.data
}
const updateMemberRoleInGroup = async (id, roleId, groupId) => {
  const response = await axios.put(
    `${baseUrl}/api/v1/groups/${groupId}/members`,
    { user_id: id, role_id: roleId }
  )
  return response.data
}
const createGroup = async (ownerId, groupData) => {
  const body = {
    name: groupData.name,
    admin: {
      id: ownerId,
    },
  }
  const response = await axios.post(`${baseUrl}/api/v1/groups`, body)
  return response.data
}
const updateGroup = async (groupData) => {
  const body = {
    name: groupData.name,
  }
  const response = await axios.put(`${baseUrl}/api/v1/groups/${groupData.id}`, body)
  return response.data
}

const deleteGroup = async (groupData) => {
  const response = await axios.delete(`${baseUrl}/api/v1/groups/${groupData.id}`)
  return response.data
}

const getInvitationLink = async (groupId) => {
  const response = await axios.get(
    `${baseUrl}/api/v1/groups/${groupId}/invitationLink`
  )
  return response.data
}
export default {
  getOwnedGroupByUserId,
  getJoinedGroupByUserId,
  getUserByGroupId,
  updateMemberRoleInGroup,
  getGroupByGroupId,
  createGroup,
  updateGroup,
  deleteGroup,
  getInvitationLink,
}
