import axios from 'axios'
const token = '' //window.localStorage.getItem('userToken')
const baseUrl = 'https://vtt-server.herokuapp.com'
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

export default { updateUser }
