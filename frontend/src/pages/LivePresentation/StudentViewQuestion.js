import Fade from 'react-reveal/Fade'
import { Button, Checkbox, Radio, Space } from 'antd'
const StudentViewQuestion = ({
  show,
  slides,
  current,
  handleSelection,
  handleSubmit,
}) => {
  const checkboxOptions = slides?.[current]?.options.map((option, idx) => ({
    label: option.value,
    value: option.id,
  }))

  return (
    <Fade right opposite when={show}>
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <div
          style={{
            textAlign: 'left',
            margin: '0 auto',
            width: '50%',
          }}
        >
          <img
            src="https://images.mentimeter.com/images/bacdaf39-3d77-4e2a-aaa7-dceaf2701c98.jpeg?auto=compress%2Cformat&fm=jpg&w=1080&expires=1673540089&s=42edc0d17ad9680789bf2981b344562d"
            alt=""
            style={{ width: '100%', margin: '20px 0 20px 0' }}
          ></img>
          <h1>Question: {slides?.[current]?.question}</h1>
        </div>
        <div
          style={{
            margin: '0 auto',
            width: '50%',
            textAlign: 'left',
          }}
        >
          <Checkbox.Group
            options={checkboxOptions}
            onChange={handleSelection}
          />
        </div>
        <div style={{ margin: '0 auto', width: '50%' }}>
          <Button
            type="primary"
            style={{ width: '100%', marginTop: '20px' }}
            onClick={() => handleSubmit()}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Fade>
  )
}

export default StudentViewQuestion
