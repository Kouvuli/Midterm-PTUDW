import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import { Form, Input, InputNumber, Radio, Button } from 'antd'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import styles from './index.less'
import store from 'store'
const FormItem = Form.Item
const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

@connect(({ app, dashboard, loading }) => ({
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {
  render() {
    const userDetail = store.get('user')
    const { avatar, username } = userDetail
    const { dashboard, loading } = this.props
    const { user } = dashboard

    return (
      <>
        <Form ref={this.formRef} name="control-ref" layout="horizontal">
          <h1 style={{ textAlign: 'center' }}>Your profile</h1>
          <FormItem
            name="name"
            rules={[{ required: true }]}
            label={t`Name`}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>

          <FormItem
            name="isMale"
            rules={[{ required: true }]}
            label={t`Gender`}
            hasFeedback
            {...formItemLayout}
          >
            <Radio.Group>
              <Radio value>
                <Trans>Male</Trans>
              </Radio>
              <Radio value={false}>
                <Trans>Female</Trans>
              </Radio>
            </Radio.Group>
          </FormItem>
          <FormItem name="age" label={t`Age`} hasFeedback {...formItemLayout}>
            <InputNumber min={18} max={100} />
          </FormItem>
          <FormItem
            name="phone"
            rules={[
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: t`The input is not valid phone!`,
              },
            ]}
            label={t`Phone`}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            name="email"
            rules={[
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: t`The input is not valid E-mail!`,
              },
            ]}
            label={t`Email`}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
        </Form>
        <Row justify="center">
          <Button size="large" type="primary">
            Update
          </Button>
        </Row>
      </>
    )
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Dashboard
