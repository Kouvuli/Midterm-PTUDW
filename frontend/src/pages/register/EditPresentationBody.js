import LeftSidebar from './LeftSidebar'
import SlideContent from './SlideContent'
import RightSidebar from './RightSidebar'
import { useState } from 'react'
import UtilsBar from './UtilsBar'
const EditPresentationBody = () => {
  const [display, setDisplay] = useState(true)
  const [slides, setSlides] = useState([
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
  ])

  const [selected, setSelected] = useState(0)
  const selectedSlide = slides[selected]

  return (
    <div>
      <UtilsBar
        className="main-util-bar"
        type="main"
        slides={slides}
        setSlides={setSlides}
        selected={selected}
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
        ></RightSidebar>
      </div>
    </div>
  )
}

export default EditPresentationBody
