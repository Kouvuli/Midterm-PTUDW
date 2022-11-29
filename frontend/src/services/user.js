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
export default { updateUser, getUserById }
