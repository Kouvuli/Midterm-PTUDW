import axios from 'axios'
const getGroupInfoFromInvitation = async (url) => {
  const response = await axios.get(url)
  return response.data
}
export default { getGroupInfoFromInvitation }
