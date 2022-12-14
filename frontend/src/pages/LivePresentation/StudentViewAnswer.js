import Fade from 'react-reveal/Fade'
import {
  ResponsiveContainer,
  BarChart,
  LabelList,
  XAxis,
  Bar,
  Cell,
} from 'recharts'
const StudentViewAnswer = ({ show, slides, current, totalArr }) => {
  const exampleData = () => {
    const data = []
    if (totalArr.length !== 0) {
      slides[current].options.forEach((option, idx) =>
        data.push({ name: option.value, total: totalArr[idx].total })
      )
    }

    return data
  }
  return (
    <div className="result-view">
      {' '}
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
          <h1>Correct options result: colored Yellow</h1>
        </div>
      </Fade>
    </div>
  )
}

export default StudentViewAnswer
