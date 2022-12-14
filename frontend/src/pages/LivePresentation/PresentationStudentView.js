import { useState, useEffect } from 'react'
import StudentViewQuestion from './StudentViewQuestion'
import StudentViewAnswer from './StudentViewAnswer'
import StudentViewWait from './StudentViewWait'
import io from 'socket.io-client'
const socket = io.connect('https://socket-io-server.onrender.com/')

const PresentationStudentView = ({ roomId }) => {
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
  ])
  const [current, setCurrent] = useState(0)
  const [show, setShow] = useState(false)
  const [showSlide, setShowSlide] = useState('question')
  const [selectedOption, setSelectedOption] = useState(0)
  const [room, setRoom] = useState('')
  const [totalArr, setTotalArr] = useState([])
  const [messageReceived, setMessageReceived] = useState('')

  const handleSelection = (e) => {
    setSelectedOption(e.target.value)
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
    }
  }, [messageReceived])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data)
    })
  })
  useEffect(() => {
    setShow(true)
  }, [])
  return (
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
    </div>
  )
}

export default PresentationStudentView
