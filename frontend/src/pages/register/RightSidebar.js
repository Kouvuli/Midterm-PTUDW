import { Form, Input, Button, Select } from 'antd'
import { useEffect } from 'react'
import {
  DeleteOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
} from '@ant-design/icons'

const RightSidebar = ({ slides, selected, setSlides, display, setDisplay }) => {
  const [form] = Form.useForm()
  const { question, options } = slides[selected]

  const updateQuestion = (newValue) => {
    const newSlides = [...slides]
    newSlides[selected].question = newValue
    setSlides(newSlides)
  }

  const onOptionValueChanged = (e, idx) => {
    const newSlides = [...slides]
    newSlides[selected].options[idx].value = e.target.value
    setSlides(newSlides)
  }
  const handleMenu = () => {}

  const removeOption = (targetIdx) => {
    const newSlides = [...slides]
    newSlides[selected].options = options.filter(
      (option, idx) => targetIdx !== idx
    )
    setSlides(newSlides)
  }

  const addNewOption = () => {
    const newSlides = [...slides]
    newSlides[selected].options = [
      ...options,
      { name: `Option ${options.length + 1}` },
    ]
    setSlides(newSlides)
  }
  const optionsMapped = () => {
    return options.map((option) => option.value)
  }
  useEffect(() => {
    form.resetFields()
  }, [selected])
  useEffect(() => {
    options.forEach((option, idx) => {
      const name = `option${idx}`
      console.log(name, option.value)
      form.setFieldValue(name, option.value)
    })
  }, [])
  return (
    <div style={{}} className="right-sidebar">
      <div className="right-side-sub-top-bar">
        <div style={{ margin: 5 }}>
          <h3>Saved</h3>
        </div>
        <Button type="primary" size="middle" className="done-btn">
          Done
        </Button>
      </div>

      <div style={{ margin: 20 }}>
        <h2
          style={{
            fontWeight: 'revert-layer',
            fontFamily: `Segoe UI`,
            fontSize: '1.5em',
          }}
        >
          Slides type
        </h2>
        <Select
          defaultValue="multiple choices"
          style={{ width: '100%', fontSize: 32 }}
          onChange={handleMenu}
          options={[
            {
              value: 'multiple choices',
              label: (
                <div style={{ display: 'flex' }}>
                  <BarChartOutlined style={{ fontSize: 32 }}></BarChartOutlined>
                  <p style={{ fontSize: 20, margin: '1px 0 0 10px' }}>
                    Multiple choices
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>

      <Form form={form} layout="vertical" initialValues={{ question, options }}>
        <Form.Item
          label={<h2>Your question</h2>}
          tooltip="Your slide question"
          style={{ margin: 20 }}
          name="question"
        >
          <Input
            style={{ fontSize: 16 }}
            placeholder="Your question"
            onChange={(e) => updateQuestion(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label={<h2>Options</h2>}
          tooltip={{
            title: 'Answers option for the question',
            icon: <InfoCircleOutlined />,
          }}
          style={{ margin: 20 }}
        >
          {options.map((option, idx) => {
            console.log(option.value)
            return (
              <Form.Item
                label=""
                style={{ margin: '15px 0 0 0', fontSize: '20px' }}
                key={idx}
                name={`option${idx}`}
                initialValue={option.value}
              >
                <div style={{ display: 'flex' }}>
                  <Input
                    placeholder={option.value === '' ? option.name : ''}
                    onChange={(e) => onOptionValueChanged(e, idx)}
                    style={{ fontSize: 16 }}
                    id={`option${idx}`}
                  />
                  <button
                    onClick={() => removeOption(idx)}
                    style={{ margin: '0 0 0 5px' }}
                  >
                    <DeleteOutlined></DeleteOutlined>
                  </button>
                </div>
              </Form.Item>
            )
          })}
        </Form.Item>
        <Form.Item>
          <Button className="add-option-btn" onClick={() => addNewOption()}>
            Add option
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default RightSidebar
