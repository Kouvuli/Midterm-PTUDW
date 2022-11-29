import axios from 'axios'
const baseUrl = 'https://midterm-ptudw-production.up.railway.app'

const getUserById = async (id) => {
  const url = `${baseUrl}/${id}`
  console.log(url)
  const response = await axios.get(`${baseUrl}/api/v1/users/${id}`)
  return response.data
}

export default { getUserById }
