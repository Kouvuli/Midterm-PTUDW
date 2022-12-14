import SmallSlide from './SmallSlide'
import UtilsBar from './UtilsBar'

const LeftSidebar = ({
  slides,
  setSelected,
  selected,
  display,
  setDisplay,
}) => {
  const onSlideClick = (id) => {
    const idx = slides?.findIndex((slide) => slide.id === id)
    setSelected(idx)
  }

  return (
    <div
      className="left-sidebar"
      onClick={display === false ? () => setDisplay(true) : null}
      style={display === true ? { zIndex: 10 } : { zIndex: 2 }}
    >
      {slides?.map((slide, idx) => (
        <SmallSlide
          slide={slide}
          key={idx}
          number={idx}
          selected={selected}
          isSelected={selected === idx ? true : false}
          onSlideClick={() => {
            onSlideClick(slide.id)
            setDisplay(false)
          }}
        ></SmallSlide>
      ))}
      <UtilsBar type="sub"></UtilsBar>
    </div>
  )
}
export default LeftSidebar
