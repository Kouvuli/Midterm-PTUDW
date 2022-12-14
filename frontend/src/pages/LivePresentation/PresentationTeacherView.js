import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Bar,
  Cell,
  LabelList,
} from 'recharts'
import { Button } from 'antd'
import { useState, useEffect } from 'react'
import Fade from 'react-reveal/Fade'
import './PresentationView.css'
import io from 'socket.io-client'

const socket = io.connect('https://socket-io-server.onrender.com/')
const PresentationTeacherView = ({ roomId }) => {
  const [slides, setSlides] = useState([
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
        { placeholder: 'Option 2', value: '2', checked: true },
        { placeholder: 'Option 3', value: '3', checked: false },
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
  ])
  const [current, setCurrent] = useState(0)
  const [show, setShow] = useState(true)
  const [room, setRoom] = useState('')
  const [messageReceived, setMessageReceived] = useState('')
  const [totalArr, setTotalArr] = useState([])
  const [showedAnswer, setShowedAnser] = useState(false)
  //socket functon, hard code presentation id
  const exampleData = () => {
    const data = []
    if (totalArr.length !== 0) {
      slides[current].options.forEach((option, idx) =>
        data.push({ name: option.value, total: totalArr[idx].total })
      )
    }

    return data
  }
  const handleShowAnswer = () => {
    socket.emit('send_message', { total: totalArr, room, message: 'answer' })
    setShowedAnser(true)
  }

  const handleNextSlide = () => {
    let message = 'next'
    const newTotal = []
    slides[current].options.forEach((option, idx) =>
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
    slides[current].options.forEach((option, idx) =>
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
    }
  }, [messageReceived])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data)
    })
  })
  // if check user == teacher == owner of slide => return bellow else return <div>null</div>
  return (
    <div className="result-view">
      <Fade right opposite when={show}>
        <div style={{ textAlign: 'center' }}>
          <h1>Question: {slides[current].question}</h1>
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
                {slides[current].options.map((option, index) => (
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
            style={{ margin: '0 auto', width: 250, justifyContent: 'center' }}
          >
            <Button
              type="primary"
              style={{ margin: '0px 5px 0 5px', width: 110 }}
              onClick={() => handleNextSlide()}
              disabled={current === slides.length - 1 || showedAnswer === false}
            >
              Next
            </Button>
            <Button
              type="primary"
              style={{ width: 110 }}
              onClick={() => handleShowAnswer()}
            >
              Show answer
            </Button>
          </div>
        </div>
      </Fade>
    </div>
  )
}

export default PresentationTeacherView
