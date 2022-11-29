import axios from 'axios'
import baseConfig from './config'
const { token, baseUrl } = baseConfig

const getUserById = async (id) => {
  const url = `${baseUrl}/${id}`
  console.log(url)
  const response = await axios.get(`${baseUrl}/api/v1/users/${id}`)
  return response.data
}

export default { getUserById }
