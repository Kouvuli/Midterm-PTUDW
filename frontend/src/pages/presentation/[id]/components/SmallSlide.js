import SlideContent from './SlideContent'
import './EditPresentation.css'
const SmallSlide = ({ number, slide, isSelected, onSlideClick }) => {
  return (
    <div
      className={
        !isSelected ? 'small-slide' : 'small-slide small-slide-selected'
      }
      onClick={onSlideClick}
    >
      <div style={{ padding: '0 5px 0 5px' }}>
        <h4>{number + 1}</h4>
      </div>
      <SlideContent
        type="multiple choices"
        size="small"
        slide={slide}
      ></SlideContent>
    </div>
  )
}

export default SmallSlide
