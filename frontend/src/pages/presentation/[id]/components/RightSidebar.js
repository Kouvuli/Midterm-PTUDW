import { Form, Input, Button, Select, FormListFieldData, Checkbox } from 'antd'
import { useEffect, useCallback } from 'react'
import {
  DeleteOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
} from '@ant-design/icons'
import answerService from '../../../../services/answer'
import questionService from '../../../../services/question'

const debounce = (func, timeout=1000) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

const RightSidebar = ({ slides, selected, setSlides, display, setDisplay, onCheckBox }) => {
  const [form] = Form.useForm()
  let question
  let options
  if (slides && slides[selected]) {
    question = slides[selected].question
    options = slides[selected].options
  }

  const onQuestionChanged = (newValue) => {
    const newSlides = [...slides]
    if (newSlides && newSlides[selected]) {
      newSlides[selected].question = newValue
    }
    setSlides(newSlides)
  }

  const onQuestionBlur = (newValue) => {
    questionService.updateQuestion({id: slides[selected]?.id, question: newValue})
  }

  const onOptionValueChanged = (e, idx, targetId) => {
    const newSlides = [...slides]
    if (newSlides && newSlides[selected]) {
      newSlides[selected].options[idx].value = e.target.value
    }

    setSlides(newSlides)
  }

  const onOptionValueBlur = (e, idx, targetId) => {
    answerService.updateAnswer({id: targetId, answer: e.target.value})
  }

  const debouncedOptionValueChanged = useCallback(debounce(onOptionValueChanged, 500), [])


  const handleMenu = () => {}

  const removeOption = (targetIdx, targetId) => {
    answerService.deleteAnswer({id: targetId})
    const newSlides = [...slides]
    if (newSlides && newSlides[selected]) {
      newSlides[selected].options = options.filter(
        (option, idx) => targetIdx !== idx
      )
    }
    setSlides(newSlides)
  }

  const addNewOption = () => {
    answerService.createAnswer(slides[selected].id, { answer: '' })
    .then(res => {
      const answer = res.data
      const newSlides = [...slides]
      newSlides[selected].options = [
        ...options,
        {
          ...answer,
          value: answer.answer,
          checked: false,
        },
      ]
      setSlides(newSlides)
    })
  }
  const optionsMapped = () => {
    return options?.map((option) => option.value)
  }
  const handleDisplay = () => {
    setDisplay(false)
  }

  const handleCheckBox = (e, idx) => {
    const newSlide = [...slides]
    newSlide[selected].options[idx].checked = e.target.checked
    setSlides(newSlide)
    onCheckBox();
  }
  useEffect(() => {
    form.resetFields()
  }, [selected])
  useEffect(() => {
    // const fields = form.getFieldsValue()
    // const { formOptions } = fields
    // console.log('efffect', formOptions)
    // options.forEach((option, idx) =>
    //   Object.assign(formOptions[idx], { value: option.value })
    // )
    // form.setFieldValue({ formOptions })
  }, [])

  return (
    <div
      className="right-sidebar"
      onClick={display === true ? handleDisplay : null}
      style={display === false ? { zIndex: 10 } : { zIndex: 2 }}
    >
      <div className="right-side-sub-top-bar">
        <div style={{ margin: 5 }}>
          <h3>Saved</h3>
        </div>
        <Button
          type="primary"
          size="middle"
          className="done-btn"
          onClick={() => setDisplay(true)}
        >
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

      <Form
        form={form}
        layout="vertical"
        initialValues={{ question, formOptions: options }}
      >
        <Form.Item
          label={<h2>Your question</h2>}
          tooltip="Your slide question"
          style={{ margin: 20 }}
          name="question"
        >
          <Input
            style={{ fontSize: 16 }}
            placeholder="Your question"
            onChange={(e) => onQuestionChanged(e.target.value)}
            onBlur={(e) => onQuestionBlur(e.target.value)}
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
          {options?.map((option, idx) => {
            return (
              <div
                style={{ margin: '15px 0 0 0', fontSize: '20px' }}
                key={idx}
                name={`option${idx}`}
              >
                <div style={{ display: 'flex' }}>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckBox(e, idx)}
                    checked={option.checked}
                    style={{
                      height: 30,
                      width: 30,
                      margin: '5px 10px 5px 5px',
                    }}
                  ></input>
                  <input
                    placeholder={option.value === '' ? option.placeholder : ''}
                    onChange={(e) => onOptionValueChanged(e, idx, option.id)}
                    onBlur={(e) => onOptionValueBlur(e, idx, option.id)}
                    value={option?.value}
                    className="option-input"
                  />
                  <button
                    onClick={() => removeOption(idx, option.id)}
                    style={{ margin: '0 0 0 5px' }}
                  >
                    <DeleteOutlined></DeleteOutlined>
                  </button>
                </div>
              </div>
            )
          })}
          {/* {options.map((option, idx) => {
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
          })} */}
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
