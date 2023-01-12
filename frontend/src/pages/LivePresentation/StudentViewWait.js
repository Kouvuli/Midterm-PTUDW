import Fade from 'react-reveal/Fade'
import { Button } from 'antd'
const StudentViewWait = ({ show, slides, current, selected }) => {
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
          <h2>
            Please wait for the result.
          </h2>
        </div>
      </div>
    </Fade>
  )
}

export default StudentViewWait
