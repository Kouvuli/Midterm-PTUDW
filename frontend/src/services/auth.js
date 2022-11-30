import axios from 'axios'
import baseConfig from './config'
const { token, baseUrl } = baseConfig

const login = async ({ username, password }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const res = await axios.post(
    `${baseUrl}/api/v1/auth/signin`,
    { username, password },
    config
  )
  return res.data
}

const register = async (data) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    
    const res = await axios.post(
      `${baseUrl}/api/v1/auth/signup`,
      data,
      config
    )
    return res.data
  }

export default { login, register }
