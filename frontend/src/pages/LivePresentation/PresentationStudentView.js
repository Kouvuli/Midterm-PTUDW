import { useState, useEffect, useMemo } from 'react'
import { Button, notification } from 'antd'
import StudentViewQuestion from './StudentViewQuestion'
import StudentViewAnswer from './StudentViewAnswer'
import StudentViewWait from './StudentViewWait'
import io from 'socket.io-client'
import ChatView from './ChatView'
import ChatQuestionView from './ChatQuestionView'
import chatQuestionService from '../../services/chatQuestion'
import questionService from '../../services/question'
import answerService from '../../services/answer'

import store from "store"

const mock = [
  {
    id: 'sl1',
    question: 'Hi there fellowaaaaaaa',
    options: [
      { placeholder: 'Option 1', value: 'aaaaa', checked: false },
      { placeholder: 'Option 2', value: 'sss', checked: true },
      { placeholder: 'Option 3', value: 'a', checked: true },
    ],
  },
  {
    id: 'sl2',
    question: 'Hi there Ya-all',
    options: [
      { placeholder: 'Option 1', value: '1', checked: false },
      { placeholder: 'Option 2', value: '2', checked: false },
      { placeholder: 'Option 3', value: '3', checked: true },
    ],
  },
  {
    id: 'sl3',
    question: 'Hi there Vinh',
    options: [
      { placeholder: 'Option 1', value: '1', checked: false },
      { placeholder: 'Option 2', value: '2', checked: false },
      { placeholder: 'Option 3', value: '3', checked: true },
    ],
  },
]

const socket = io.connect('https://socket-io-server.onrender.com/')
const Context = React.createContext({
  name: 'Default',
})
const PresentationStudentView = ({ roomId }) => {
  const [slides, setSlides] = useState([])
  const [current, setCurrent] = useState(0)
  const [show, setShow] = useState(true)
  const [showSlide, setShowSlide] = useState('question')
  const [selectedOption, setSelectedOption] = useState('')
  const [room, setRoom] = useState('')
  const [totalArr, setTotalArr] = useState([])
  const [messageReceived, setMessageReceived] = useState('')

  const [showChat, setShowChat] = useState(false)
  const [showChatQuestion, setShowChatQuestion] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatQuestions, setChatQuestions] = useState([])

  const auth = store.get('auth')

  const [api, contextHolder] = notification.useNotification()
  const openChatNotification = (placement, message) => {
    const { username } = message
    api.info({
      message: `1 new message from ${username}`,
      placement,
    })
  }

  const openQuestionNotification = (placement, message) => {
    const { author } = message
    api.info({
      message: `1 new question from ${author}`,
      placement,
    })
  }

  const contextValue = useMemo(
    () => ({
      name: 'Advanced Web',
    }),
    []
  )

  const handleSelection = (checkedValues) => {
    const newValue = checkedValues.join('-')
    setSelectedOption(newValue)
  }

  const handleToggleChat = () => {
    setShowChat((prevState) => !prevState)
    setShowChatQuestion(false)
  }

  const handleToggleChatQuestion = () => {
    setShowChatQuestion((prevState) => !prevState)
    setShowChat(false)
  }

  const handleSubmit = () => {
    setShow(false)
    socket.emit('send_message', { selectedOption, room, message: 'vote' })
    let nextPart = 'question'
    if (showSlide === 'question') {
      nextPart = 'wait'
    } else {
      nextPart = 'result'
    }
    setTimeout(() => setShowSlide(nextPart), 250)
    setTimeout(() => setShow(true), 500)
  }

  useEffect(() => {
    if (room === '') {
      console.log('Joined', roomId)
      socket.emit('join_room', roomId)
      setRoom(roomId)
    }
  }, [])

  useEffect(() => {
    if (messageReceived) {
      if (messageReceived.message === 'answer') {
        setTotalArr(messageReceived.total)
        setShow(false)
        setTimeout(() => setShowSlide('result'), 250)
        setTimeout(() => setShow(true), 500)
        console.log('Hi')
      } else if (messageReceived.message === 'next') {
        setCurrent(current + 1)
        setShow(false)
        setTimeout(() => setShowSlide('question'), 250)
        setTimeout(() => setShow(true), 500)
      } else if (messageReceived.message === 'vote') {
      }

      if (messageReceived.message === 'chat') {
        console.log(messageReceived)
        openChatNotification('topRight', messageReceived.data)
        setChatMessages((prevState) => [...prevState, messageReceived.data])
      }
      if (messageReceived.message === 'chat-question') {
        openQuestionNotification('topRight', messageReceived.data)
        chatQuestionService
          .getChatQuestionByPresentationId(roomId)
          .then((res) => {
            setChatQuestions(res.data)
          })
      }
      if (messageReceived.message === 'update-chat-question') {
        chatQuestionService
          .getChatQuestionByPresentationId(roomId)
          .then((res) => {
            setChatQuestions(res.data)
          })
      }
    }
  }, [messageReceived])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data)
    })
  }, [])

  useEffect(() => {
    chatQuestionService.getChatQuestionByPresentationId(roomId).then((res) => {
      setChatQuestions(res.data)
    })
  }, [])

  useEffect(() => {
    questionService
      .getQuestionByPresentationId(roomId)
      .then((res) => {
        const questions = res.data
        questions.forEach((question) => {
          answerService
            .getAnswerByQuestionId(question.id)
            .then((res) => {
              const answers = res?.data?.map((answer) => {
                return {
                  ...answer,
                  value: answer.answer,
                }
              })
              setSlides((prev) => {
                return [
                  ...prev,
                  {
                    id: question.id,
                    question: question.question,
                    options: answers,
                  },
                ]
              })
            })
            .catch((e) => console.log(e))
        })
      })
      .catch((e) => console.log(e))
  }, [])

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div style={{ height: '100vh', overflowY: 'scroll' }}>
        {showSlide !== 'question' ? null : (
          <StudentViewQuestion
            show={show}
            slides={slides}
            current={current}
            handleSelection={handleSelection}
            selectedOption={selectedOption}
            handleSubmit={handleSubmit}
          ></StudentViewQuestion>
        )}
        {showSlide !== 'wait' ? null : (
          <StudentViewWait
            show={show}
            slides={slides}
            current={current}
            selected={selectedOption}
            handleSubmit={handleSubmit}
          ></StudentViewWait>
        )}
        {showSlide !== 'result' ? null : (
          <StudentViewAnswer
            show={show}
            slides={slides}
            current={current}
            totalArr={totalArr}
          ></StudentViewAnswer>
        )}
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <div
            style={{
              margin: '0 auto',
              width: 500,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              type="primary"
              style={{ margin: '0px 5px 0 5px', width: 110 }}
              onClick={handleToggleChat}
            >
              Chat
            </Button>
            <Button
              type="primary"
              style={{ margin: '0px 5px 0 5px', width: 110 }}
              onClick={handleToggleChatQuestion}
            >
              Questions
            </Button>
          </div>
        </div>
      </div>
      <ChatView
        showChat={showChat}
        roomId={roomId}
        messages={chatMessages}
        role="student"
        user={auth}
      />
      <ChatQuestionView
        showChatQuestion={showChatQuestion}
        roomId={roomId}
        questions={chatQuestions}
        role="student"
        user={auth}
      />
    </Context.Provider>
  )
}

export default PresentationStudentView
