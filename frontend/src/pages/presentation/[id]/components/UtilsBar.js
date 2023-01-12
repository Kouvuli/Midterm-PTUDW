import { Button } from 'antd'
import { Link } from 'umi'
const UtilsBar = ({ type, onAddSlide, onRemoveSlide, onPresentation }) => {
  return (
    <div>
      <div className={type === 'main' ? 'utils-bar' : 'sub-utils-bar'}>
        <div className="utils-btn-slide">
          <Button type="primary" size="large" className="utils-btn" onClick={onAddSlide}>
            New slide
          </Button>
          <Button type="primary" size="large" className="utils-btn" onClick={onRemoveSlide}>
            Remove
          </Button>
        </div>
        <div className="btn-container-util">
          <Button
            type="primary"
            size="large"
            className={type === 'main' ? 'utils-btn' : 'sub-utils-btn'}
            onClick={onPresentation}
          >
            Presentation
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UtilsBar
