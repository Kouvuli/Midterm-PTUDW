import axios from 'axios'
const baseUrl = 'https://midterm-ptudw-production.up.railway.app'

const getOwnedGroupByUserId = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/users/${id}/ownGroups`)
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
const getInvitationLink = async (groupId) => {
  const response = await axios.get(
    `${baseUrl}/api/v1/groups/${groupId}/invitationLink`
  )
  return response.data
}
export default {
  getOwnedGroupByUserId,
  getUserByGroupId,
  updateMemberRoleInGroup,
  getGroupByGroupId,
  createGroup,
  getInvitationLink,
}
