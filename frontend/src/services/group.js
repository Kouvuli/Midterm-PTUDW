import axios from 'axios'
const baseUrl = 'https://vtt-server.herokuapp.com'

const getOwnedGroupByUserId = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/users/${id}/ownGroups`)
  return response.data
}

const getUserByGroupId = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/groups/${id}/members`)
  return response.data
}

export default { getOwnedGroupByUserId, getUserByGroupId }
