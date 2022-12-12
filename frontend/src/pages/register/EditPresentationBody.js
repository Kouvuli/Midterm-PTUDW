import LeftSidebar from './LeftSidebar'
import SlideContent from './SlideContent'
import RightSidebar from './RightSidebar'
import { useState } from 'react'
const EditPresentationBody = () => {
  const [display, setDisplay] = useState(true)
  const [slides, setSlides] = useState([
    {
      id: 'sl1',
      question: 'Hi there fellowaaaaaaa',
      options: [
        { name: 'Option 1', value: 'aaaaa' },
        { name: 'Option 2', value: '' },
        { name: 'Option 3', value: '' },
      ],
    },
    {
      id: 'sl2',
      question: 'Hi there Ya-all',
      options: [
        { name: 'Option 1', value: '' },
        { name: 'Option 2', value: '' },
        { name: 'Option 3', value: '' },
      ],
    },
    {
      id: 'sl3',
      question: 'Hi there Vinh',
      options: [
        { name: 'Option 1', value: '' },
        { name: 'Option 2', value: '' },
        { name: 'Option 3', value: '' },
      ],
    },
  ])
  const [selected, setSelected] = useState(0)
  const selectedSlide = slides[selected]
  return (
    <div>
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
