import LeftSidebar from './LeftSidebar'
import SlideContent from './SlideContent'
import RightSidebar from './RightSidebar'
import { useState, useEffect } from 'react'
import UtilsBar from './UtilsBar'

import presentationService from '../../../../services/presentation'
import questionService from '../../../../services/question'
import answerService from '../../../../services/answer'

const mockData = [
  {
    id: 'sl1',
    question: 'Hi there fellowaaaaaaa',
    options: [
      { placeholder: 'Option 1', value: 'aaaaa', checked: false },
      { placeholder: 'Option 2', value: '', checked: false },
      { placeholder: 'Option 3', value: '', checked: false },
    ],
  },
  {
    id: 'sl2',
    question: 'Hi there Ya-all',
    options: [
      { placeholder: 'Option 1', value: '', checked: false },
      { placeholder: 'Option 2', value: '', checked: false },
      { placeholder: 'Option 3', value: '', checked: false },
    ],
  },
  {
    id: 'sl3',
    question: 'Hi there Vinh',
    options: [
      { placeholder: 'Option 1', value: '', checked: false },
      { placeholder: 'Option 2', value: '', checked: false },
      { placeholder: 'Option 3', value: '', checked: false },
    ],
  },
  {
    id: 'sl4',
    question: 'Hi there Vinh1',
    options: [
      { placeholder: 'Option 1', value: '', checked: false },
      { placeholder: 'Option 2', value: '', checked: false },
      { placeholder: 'Option 3', value: '', checked: false },
    ],
  },
  {
    id: 'sl5',
    question: 'Hi there Vinh2',
    options: [
      { placeholder: 'Option 1', value: '', checked: false },
      { placeholder: 'Option 2', value: '', checked: false },
      { placeholder: 'Option 3', value: '', checked: false },
    ],
  },
  {
    id: 'sl6',
    question: 'Hi there Vinh3',
    options: [
      { placeholder: 'Option 1', value: '', checked: false },
      { placeholder: 'Option 2', value: '', checked: false },
      { placeholder: 'Option 3', value: '', checked: false },
    ],
  },
]

const EditPresentationBody = () => {
  const [display, setDisplay] = useState(true)
  const [slides, setSlides] = useState([])

  const urlSplit = window.location.href.split('/')
  
  const [selected, setSelected] = useState(0)
  const selectedSlide = slides[selected]

  const presentationId = urlSplit[urlSplit.length - 1]
  const questionId = selectedSlide?.id

  useEffect(() => {
    questionService.getQuestionByPresentationId(presentationId)
    .then(res => {
      const questions = res.data
      questions.forEach(question => {
        answerService.getAnswerByQuestionId(question.id)
        .then(res => {
          const answers = res?.data?.map(answer => {
            return {
              ...answer,
              value: answer.answer
            }
          })
          setSlides(prev => {
            return [
              ...prev,
              {
                id: question.id,
                question: question.question,
                options: answers,
              }
            ]
          })
        })
        .catch(e => console.log(e))
      })
    })
    .catch(e => console.log(e))
  }, [])

  const handleAddNewSlide = () => {
    questionService.createQuestion(presentationId, { question: '' })
    .then(res => {
      setSlides(prev => {
        return [
          ...prev,
          {
            id: res.data.id,
            question: res.data.question,
            options: [],
          },
        ]
      })
    })
  }

  const handleRemoveSlide = () => {
    questionService.deleteQuestion({ id: questionId })
    .then(res => {
      const newSlides = slides.filter(slide => slide.id !== questionId)
      setSlides(newSlides)
    })
  }

  const handleCheckBox = () => {
    if (!selectedSlide) {
      return;
    }
    const question = selectedSlide
    const answer = question.options
        .reduce((ans, option) => {
        if (option.checked) {
          ans = [...ans, option.id]
        }
        return ans
      }, [])
        .join(' ')
      questionService.updateQuestion({ id: question.id, question: question.question, answer: answer })
  }
  

  return (
    <div>
      <UtilsBar
        className="main-util-bar"
        type="main"
        slides={slides}
        setSlides={setSlides}
        selected={selected}
        onAddSlide={handleAddNewSlide}
        onRemoveSlide={handleRemoveSlide}
      ></UtilsBar>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <LeftSidebar
          slides={slides}
          selected={selected}
          setSelected={setSelected}
          display={display}
          setDisplay={setDisplay}
        ></LeftSidebar>
        <SlideContent
          type="multiple choices"
          size="wide"
          slide={selectedSlide}
        ></SlideContent>
        <RightSidebar
          slides={slides}
          selected={selected}
          setSlides={setSlides}
          display={display}
          setDisplay={setDisplay}
          onCheckBox = {handleCheckBox}
        ></RightSidebar>
      </div>
    </div>
  )
}

export default EditPresentationBody
