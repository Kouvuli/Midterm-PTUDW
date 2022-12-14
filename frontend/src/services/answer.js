import axios from 'axios'
import baseConfig from './config'
const { token, baseUrl } = baseConfig

const getAnswerByQuestionId = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/answers/${id}`)
  return response.data
}

const createAnswer = async (questionId, data) => {
  const body = {
    answer: data.answer,
    question: {
      id: questionId,
    },
  }
  const response = await axios.post(`${baseUrl}/api/v1/answers`, body)
  return response.data
}

const updateAnswer = async (answer) => {
  const body = {
    answer: answer.answer,
  }
  const response = await axios.put(`${baseUrl}/api/v1/answers/${answer.id}`, body)
  return response.data
}

const deleteAnswer = async (answer) => {
  const response = await axios.delete(`${baseUrl}/api/v1/answers/${answer.id}`)
  return response.data
}

export default {
  getAnswerByQuestionId,
  createAnswer,
  updateAnswer,
  deleteAnswer,
}
