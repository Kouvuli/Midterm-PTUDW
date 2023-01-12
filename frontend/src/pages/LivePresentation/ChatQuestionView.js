import { Button } from 'antd'
import { useEffect, useState } from 'react'
import './ChatQuestionView.css'
import io from 'socket.io-client'
import chatQuestionService from '../../services/chatQuestion'
const socket = io.connect('https://socket-io-server.onrender.com/')
import store from 'store'

const renderQuestion = (data, role, updateStoreUpvote, updateSocket) => {
  const { author, question, vote, answered, id, hasVoted } = data
  return (
    <div className="chat-message-container question">
      <p className="chat-user">{author} ask a question - {vote} upvote {answered && "- answered"}</p>
      <p className="chat-message">{question}</p>
      <div className='input-container'>
      <input
            type="checkbox"
            name="question"
            className="chat-type"
            defaultChecked={hasVoted}
            onClick={(e) => {
              if (e.target.checked) {
                chatQuestionService.upvoteChatQuestion(id)
                updateStoreUpvote(id, "add")
              } else {
                chatQuestionService.downvoteChatQuestion(id)
                updateStoreUpvote(id, "clear")
              }
              updateSocket()
            }}
          />
          <label htmlFor="upvote" className="chat-type-label">
            Upvote
          </label>
          {!answered && role === "teacher" && (
            <>
              <input
                type="checkbox"
                name="question"
                className="chat-type"
                onClick={(e) => {
                  if (e.target.checked) {
                    chatQuestionService.answeredChatQuestion(id)
                  } else {
                    e.target.checked = true
                  }
                  updateSocket()
                }}
              />
              <label htmlFor="answered" className="chat-type-label">
                Answered
              </label>
            </>
          )}
      </div>
    </div>
  )
}

const ChatQuestionView = ({ showChatQuestion, roomId, questions, role, user }) => {
  const [inputValue, setInputValue] = useState('')
  const auth = store.get('auth')
  const { id, username } = auth
  const upvoteObj = store.get('upvote')

  const renderedQuestions = questions.map(question => {
    const { id } = question
    if (upvoteObj?.[id]) {
      question.hasVoted = true
    }
    return question
  })

  const updateStoreUpvote = (id, type) => {
    if (type === "add") {
      if (!upvoteObj) {
        store.set('upvote', { [id]: true })
      } else {
        upvoteObj[id] = true
        store.set('upvote', upvoteObj)
      }
    } else {
      if (!upvoteObj) return
      upvoteObj[id] = false
      store.set('upvote', upvoteObj)
    }
  }

  const updateSocket = () => {
    socket.emit('send_message', {
      room: roomId,
      data: {},
      message: 'update-chat-question',
    })
  }

  const handleSendQuestion = () => {
    chatQuestionService.createChatQuestion(roomId, { author: username, question: inputValue })
    .then((res) => {
      socket.emit('send_message', {
        data: res.data,
        room: roomId,
        message: 'chat-question',
      })
      setInputValue('')
    })
  }

  if (!showChatQuestion) {
    return <></>
  }

  return (
    <div className="chat-view">
      <div className="chat-header">Questions</div>
      <div className="chat-body">
        {renderedQuestions.map((data) => {
          return renderQuestion(data, role, updateStoreUpvote, updateSocket)
        })}
      </div>
      <div className="chat-action">
        <div className="input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your question here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            type="primary"
            className="chat-send-btn"
            onClick={handleSendQuestion}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatQuestionView
