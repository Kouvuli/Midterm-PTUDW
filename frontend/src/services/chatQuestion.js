import axios from 'axios'
import baseConfig from './config'
const { token, baseUrl } = baseConfig

const getChatQuestionByPresentationId = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/chatquestion/${id}`)
  return response.data
}

const createChatQuestion = async (presentationId, data) => {
  const body = {
    question: data.question,
    author: data.author,
    presentation: {
      id: presentationId,
    },
  }
  const response = await axios.post(`${baseUrl}/api/v1/chatquestion`, body)
  return response.data
}

const upvoteChatQuestion = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/chatquestion/${id}/upvote`)
  return response.data
}

const downvoteChatQuestion = async (id) => {
  const response = await axios.get(`${baseUrl}/api/v1/chatquestion/${id}/downvote`)
  return response.data
}

const answeredChatQuestion = async (id) => {
  const body = {
    answer: "",
    question: {
      id: id,
    },
    author: ""
  }
  const response = await axios.post(`${baseUrl}/api/v1/chatanswer`, body)
  return response.data
}

export default {
  getChatQuestionByPresentationId,
  createChatQuestion,
  upvoteChatQuestion,
  downvoteChatQuestion,
  answeredChatQuestion,
}
