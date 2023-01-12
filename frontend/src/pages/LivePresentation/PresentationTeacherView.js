import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Bar,
  Cell,
  LabelList,
} from 'recharts'
import { Button, notification } from 'antd'
import { useState, useEffect, useMemo } from 'react'
import Fade from 'react-reveal/Fade'
import './PresentationView.css'
import io from 'socket.io-client'
import ChatView from './ChatView'
import ChatQuestionView from './ChatQuestionView'
import chatQuestionService from '../../services/chatQuestion'
import questionService from '../../services/question'
import answerService from '../../services/answer'

const socket = io.connect('https://socket-io-server.onrender.com/')
const Context = React.createContext({
  name: 'Default',
})
const PresentationTeacherView = ({ roomId }) => {
  const [slides, setSlides] = useState([])
  const [current, setCurrent] = useState(0)
  const [show, setShow] = useState(true)
  const [room, setRoom] = useState('')
  const [messageReceived, setMessageReceived] = useState('')
  const [totalArr, setTotalArr] = useState([])
  const [showedAnswer, setShowedAnswer] = useState(false)

  const [showChat, setShowChat] = useState(false)
  const [showChatQuestion, setShowChatQuestion] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatQuestions, setChatQuestions] = useState([])

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

  //socket functon, hard code presentation id
  const exampleData = () => {
    const data = []
    if (totalArr.length !== 0) {
      slides?.[current]?.options.forEach((option, idx) =>
        data.push({ name: option.value, total: totalArr[idx].total })
      )
    }

    return data
  }
  const handleShowAnswer = () => {
    socket.emit('send_message', { total: totalArr, room, message: 'answer' })
    setShowedAnswer(true)
  }

  const handleToggleChat = () => {
    setShowChat((prevState) => !prevState)
    setShowChatQuestion(false)
  }

  const handleToggleChatQuestion = () => {
    setShowChatQuestion((prevState) => !prevState)
    setShowChat(false)
  }

  const handleNextSlide = () => {
    let message = 'next'
    const newTotal = []
    slides?.[current]?.options.forEach((option, idx) =>
      newTotal.push({ ...option, total: 0 })
    )
    setTotalArr(newTotal)
    socket.emit('send_message', { message, room })
    setCurrent(current + 1)
    setShow(false)
    setTimeout(() => {
      setShow(true)
    }, 500)
  }
  useEffect(() => {}, [])
  useEffect(() => {
    const newTotal = []
    slides?.[current]?.options.forEach((option, idx) =>
      newTotal.push({ ...option, total: 0 })
    )
    setTotalArr(newTotal)
    if (room === '') {
      socket.emit('join_room', roomId)
      setRoom(roomId)
    }
  }, [])

  useEffect(() => {
    if (messageReceived) {
      if (
        messageReceived.message === 'answer' ||
        messageReceived.message === 'next'
      ) {
      }
      if (messageReceived.message === 'vote') {
        const newArr = [...totalArr]
        newArr[messageReceived.selectedOption].total += 1

        setTotalArr(newArr)
      }
      if (messageReceived.message === 'chat') {
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
  // if check user == teacher == owner of slide => return bellow else return <div>null</div>

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
      <div className="result-view">
        <Fade right opposite when={show}>
          <div style={{ textAlign: 'center' }}>
            <h1>Question: {slides?.[current]?.question}</h1>
          </div>
          <div
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <ResponsiveContainer width="100%" aspect={3}>
              <BarChart data={exampleData()}>
                <XAxis dataKey="name"></XAxis>
                <Bar dataKey="total" fill="#8884d8" label>
                  <LabelList position="center" fill="#000000"></LabelList>
                  {slides?.[current]?.options.map((option, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={option.checked === true ? '#FFA500' : '#8884d8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'center', color: '#FFA500' }}>
            <h1>Correct options result: colored Yellow</h1>
          </div>
          <div style={{ width: '100%' }}>
            <div
              style={{ margin: '0 auto', width: 500, justifyContent: 'center' }}
            >
              <Button
                type="primary"
                style={{ margin: '0px 5px 0 5px', width: 110 }}
                onClick={() => handleNextSlide()}
                disabled={
                  current === slides.length - 1 || showedAnswer === false
                }
              >
                Next
              </Button>
              <Button
                type="primary"
                style={{ margin: '0px 5px 0 5px', width: 110 }}
                onClick={() => handleShowAnswer()}
              >
                Show answer
              </Button>
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
        </Fade>
      </div>
      <ChatView
        showChat={showChat}
        roomId={roomId}
        messages={chatMessages}
        role="teacher"
      />
      <ChatQuestionView
        showChatQuestion={showChatQuestion}
        roomId={roomId}
        questions={chatQuestions}
        role="teacher"
      />
    </Context.Provider>
  )
}

export default PresentationTeacherView
