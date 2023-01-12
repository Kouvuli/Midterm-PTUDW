import axios from 'axios'
import baseConfig from './config'
const { token, baseUrl } = baseConfig

const getPresentationList = async () => {
  const response = await axios.get(`${baseUrl}/api/v1/presentations`)
  return response.data
}

const getPresentationById = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/presentations/${id}`)
  return response.data
}

const createPresentation = async (ownerId, presentation) => {
  const body = {
    title: presentation.title,
    author: {
      id: ownerId,
    },
    group: {
      id: presentation.group_id,
    }
  }
  const response = await axios.post(`${baseUrl}/api/v1/presentations`, body)
  return response.data
}

const updatePresentation = async (presentation) => {
  const body = {
    access_code: presentation.access_code,
    title: presentation.title,
  }
  const response = await axios.put(`${baseUrl}/api/v1/presentations/${presentation.id}`, body)
  return response.data
}

const deletePresentation = async (presentation) => {
  const response = await axios.delete(`${baseUrl}/api/v1/presentations/${presentation.id}`)
  return response.data
}

export default {
  getPresentationList,
  getPresentationById,
  createPresentation,
  updatePresentation,
  deletePresentation,
}
