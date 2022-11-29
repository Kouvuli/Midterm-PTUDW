import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { Trans } from '@lingui/macro'
import city from 'utils/city'
import store from 'store'
import { t } from '@lingui/macro'
import groupService from '../../../services/group'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class GroupModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, onOk, handleRefresh, onSuccessUpdate } = this.props

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
    const groupName = this.formRef.current.getFieldValue('name')
    const auth = store.get('auth')
    const { id: userId } = auth
    groupService
      .createGroup(userId, { name: groupName })
      .then((res) => {
        console.log(res)
        onSuccessUpdate(res.data)
      })
      .catch((error) => console.log(error))
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props

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
            name="name"
            rules={[{ required: true }]}
            label={t`Name`}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

GroupModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default GroupModal
