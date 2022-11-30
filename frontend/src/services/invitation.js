import axios from 'axios'
const baseUrl = 'https://midterm-ptudw-production.up.railway.app'
const getGroupInfoFromInvitation = async (url) => {
  const response = await axios.get(url)
  return response.data
}

const inviteViaEmail = async (email, body, subject) => {
  const response = await axios.post(`${baseUrl}/api/v1/email`, {
    email,
    body,
    subject,
  })
  return response.data
}
export default { getGroupInfoFromInvitation, inviteViaEmail }
