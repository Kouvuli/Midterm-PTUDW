import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Bar,
  Cell,
  LabelList,
} from 'recharts'
import { Button } from 'antd'
import { useState } from 'react'
import Fade from 'react-reveal/Fade'
import './PresentationView.css'
const PresentationTeacherView = () => {
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
  const [show, setShow] = useState(true)
  const exampleData = () => {
    const data = []
    slides[current].options.forEach((option) =>
      data.push({ name: option.value, total: 0 })
    )
    data[0].total = 1
    data[1].total = 2
    data[2].total = 3
    return data
  }
  const handleShowAnswer = () => {}

  const handleNextSlide = () => {
    setCurrent(current + 1)
    setShow(false)
    setTimeout(() => {
      setShow(true)
    }, 500)
  }
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
          <h1>Correct options: example</h1>
        </div>
        <div style={{ width: '100%' }}>
          <div
            style={{ margin: '0 auto', width: 250, justifyContent: 'center' }}
          >
            <Button
              type="primary"
              style={{ margin: '0px 5px 0 5px', width: 110 }}
              onClick={() => handleNextSlide()}
              disabled={current === slides.length - 1}
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
