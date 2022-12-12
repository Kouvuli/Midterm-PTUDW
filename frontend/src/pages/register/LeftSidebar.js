import SmallSlide from './SmallSlide'

const LeftSidebar = ({
  slides,
  setSelected,
  selected,
  display,
  setDisplay,
}) => {
  const onSlideClick = (id) => {
    const idx = slides.findIndex((slide) => slide.id === id)
    setSelected(idx)
  }

  return (
    <div className="left-sidebar">
      {slides.map((slide, idx) => (
        <SmallSlide
          slide={slide}
          key={idx}
          number={idx}
          selected={selected}
          isSelected={selected === idx ? true : false}
          onSlideClick={() => onSlideClick(slide.id)}
        ></SmallSlide>
      ))}
    </div>
  )
}
export default LeftSidebar
