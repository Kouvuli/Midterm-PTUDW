import axios from 'axios'
import baseConfig from './config'
const { token, baseUrl } = baseConfig

const getQuestionByPresentationId = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/questions/${id}`)
  return response.data
}

const createQuestion = async (presentationId, data) => {
  const body = {
    question: data.question,
    presentation: {
      id: presentationId,
    },
  }
  const response = await axios.post(`${baseUrl}/api/v1/questions`, body)
  return response.data
}

const updateQuestion = async (question) => {
  const body = {
    question: question.question || "",
    answer: question.answer || "",
    type: question.type || "",
  }
  const response = await axios.put(`${baseUrl}/api/v1/questions/${question.id}`, body)
  return response.data
}

const deleteQuestion = async (question) => {
  const response = await axios.delete(`${baseUrl}/api/v1/questions/${question.id}`)
  return response.data
}

export default {
  getQuestionByPresentationId,
  createQuestion,
  updateQuestion,
  deleteQuestion,
}
