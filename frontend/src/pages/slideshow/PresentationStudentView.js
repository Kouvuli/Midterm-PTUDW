import { useState, useEffect } from 'react'
import StudentViewQuestion from './StudentViewQuestion'
import StudentViewAnswer from './StudentViewAnswer'
import StudentViewWait from './StudentViewWait'

const PresentationStudentView = () => {
  const [slides, setSlides] = useState([
    {
      id: 'sl1',
      question: 'Hi there fellowaaaaaaa',
      options: [
        { placeholder: 'Option 1', value: 'aaaaa', checked: false },
        { placeholder: 'Option 2', value: 'sss', checked: true },
        { placeholder: 'Option 3', value: 'a', checked: false },
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

  const handleSelection = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleSubmit = () => {
    console.log(selectedOption)
    setShow(false)
    let nextPart = 'question'
    if (showSlide === 'question') {
      console.log('ok')
      nextPart = 'wait'
    } else {
      nextPart = 'result'
    }
    setTimeout(() => setShowSlide(nextPart), 250)
    setTimeout(() => setShow(true), 500)
  }

  const handleNextSlide = () => {
    setCurrent(current + 1)
    setShow(false)
    setTimeout(() => {
      setShow(true)
    }, 500)
  }

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
        ></StudentViewAnswer>
      )}
    </div>
  )
}

export default PresentationStudentView
