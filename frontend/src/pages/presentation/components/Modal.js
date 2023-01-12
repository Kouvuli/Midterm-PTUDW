import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { Trans } from '@lingui/macro'
import city from 'utils/city'
import store from 'store'
import { t } from '@lingui/macro'
import presentationService from '../../../services/presentation'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class PresentationModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, modalType, onOk, handleRefresh, onSuccessUpdate } = this.props

    // this.formRef.current.validateFields()
    //   .then(values => {
    //     const data = {
    //       ...values,
    //       key: item.key,
    //     }
    //     data.address = data.address.join(' ')
    //     onOk(data)
    //   })
    //   .catch(errorInfo => {
    //     console.log(errorInfo)
    //   })
    const presentationTitle = this.formRef.current.getFieldValue('title')
    const accessCode = this.formRef.current.getFieldValue('access_code')
    const groupId = this.formRef.current.getFieldValue('group_id')
    const auth = store.get('auth')
    const { id: userId } = auth
    console.log(item)

    if (modalType === 'create') {
      presentationService
        .createPresentation(userId, { title: presentationTitle, access_code: accessCode, group_id: groupId })
        .then((res) => {
          console.log(res)
          onSuccessUpdate(res.data)
        })
        .catch((error) => console.log(error))
    } else {
      presentationService
        .updatePresentation({ title: presentationTitle, access_code: accessCode, id: item.id })
        .then((res) => {
          console.log(res)
          onSuccessUpdate(res.data)
        })
        .catch((error) => console.log(error))
    }
  }

  render() {
    const { item = {}, modalType, onOk, form, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form
          ref={this.formRef}
          name="control-ref"
          initialValues={{
            ...item,
            address: item.address && item.address.split(' '),
          }}
          layout="horizontal"
        >
          <FormItem
            name="title"
            rules={[{ required: true }]}
            label={t`Title`}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            name="group_id"
            rules={[{ required: true }]}
            label={t`Group ID`}
            hasFeedback
            {...formItemLayout}
          >
            <Input disabled={modalType !== 'create'} />
          </FormItem>
          {modalType !== 'create' && (
            <FormItem
              name="access_code"
              rules={[{ required: true }]}
              label={t`Access Code`}
              hasFeedback
              {...formItemLayout}
            >
              <Input disabled />
            </FormItem>
          )}
          
        </Form>
      </Modal>
    )
  }
}

PresentationModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default PresentationModal
