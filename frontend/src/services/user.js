import axios from 'axios'
const token = '' //window.localStorage.getItem('userToken')
const baseUrl = 'https://midterm-ptudw-production.up.railway.app'
const updateUser = async (id, updatedUser) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const res = await axios.put(
    `${baseUrl}/api/v1/users/${id}`,
    updatedUser,
    config
  )
  return res.data
}

const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/users/${id}`)
  return response.data
}

const addUserToGroup = async (userId, groupId) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/groups/${groupId}/members`,
    { user_id: userId, role_id: 1 }
  )
  return response.data
}
export default { updateUser, getUserById, addUserToGroup }
