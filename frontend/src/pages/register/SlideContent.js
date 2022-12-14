import { BarChartOutlined } from '@ant-design/icons'
import { BarChart, XAxis, Bar, ResponsiveContainer } from 'recharts'

const SlideContent = ({ type, size, slide }) => {
  const exampleData = () => {
    const data = []
    slide.options.forEach((option) =>
      data.push({ name: option.value, total: 0 })
    )
    data[0].total = 1
    return data
  }

  const shortQuestion = slide.question.slice(0, 20) + '...'
  if (size === 'small') {
    return (
      <div
        style={{
          width: 200,
          height: 125,
          border: '3px solid grey',
        }}
      >
        <div style={{ display: 'flex', margin: 20 }}>
          <BarChartOutlined style={{ fontSize: 40 }}></BarChartOutlined>
          <p style={{ padding: 10 }}>
            {slide.question.length <= 20 ? slide.question : shortQuestion}
          </p>
        </div>
      </div>
    )
  } else {
    return (
      <div
        style={{
          height: 'calc(100vh - 140px)',
          borderBottom: '1px solid grey',
          borderRight: '1px solid grey',
          overflow: 'hidden',
          width: 'calc(96vw - 589px)',
          backgroundColor: 'grey',
        }}
      >
        <div style={{ height: 20 }}></div>
        <div
          style={{
            maxWidth: '80%',
            height: 'auto',
            backgroundColor: 'white',
            margin: 'auto',
          }}
        >
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <p>
              Go to <b>www.example.com</b> and use code <b>1234-5678</b>
            </p>
            <h2>{slide.question}</h2>

            <div
              style={{ width: '100%', padding: '32px 32px 32px 32px' }}
              className="center-content-display"
            >
              <ResponsiveContainer width="100%" aspect={2}>
                <BarChart data={exampleData()}>
                  <XAxis dataKey="name"></XAxis>
                  <Bar dataKey="total" fill="#8884d8"></Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default SlideContent
