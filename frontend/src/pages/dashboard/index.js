import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card, Button, DatePicker } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import { Form, Input, InputNumber, Radio, Cascader } from 'antd'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import dayjs from 'dayjs'
import {
  NumberCard,
  Quote,
  Sales,
  Weather,
  RecentSales,
  Comments,
  Completed,
  Browser,
  Cpu,
  User,
} from './components'
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
  handleUpdateBtn() {
    this.setState({
      updating: true,
    })
  }

  handleUpdateConfirmBtn() {
    // handle Form send
    this.setState({
      updating: false,
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      updating: false,
      //user: this.props.user,
      user: {
        name: 'Vinh',
        isMale: true,
        email: '123@gmail.com',
        phone: '012345678',
        age: 22,
        birthday: dayjs('12/14/2000'),
      },
    }
  }
  render() {
    const userDetail = store.get('user')
    const { dashboard, loading } = this.props
    const { user } = dashboard

    return (
      <>
        <Form
          ref={this.formRef}
          name="control-ref"
          layout="horizontal"
          initialValues={this.state.user}
        >
          <h1 style={{ textAlign: 'center' }}>Your profile</h1>
          <FormItem
            name="name"
            rules={[{ required: true }]}
            label={t`Name`}
            hasFeedback
            {...formItemLayout}
          >
            <Input disabled={!this.state.updating} />
          </FormItem>
          <FormItem
            name="isMale"
            rules={[{ required: true }]}
            label={t`Gender`}
            hasFeedback
            {...formItemLayout}
          >
            <Radio.Group disabled={!this.state.updating}>
              <Radio value>
                <Trans>Male</Trans>
              </Radio>
              <Radio value={false}>
                <Trans>Female</Trans>
              </Radio>
            </Radio.Group>
          </FormItem>
          <FormItem
            name="birthday"
            label={t`Birthday`}
            hasFeedback
            {...formItemLayout}
          >
            <DatePicker disabled={!this.state.updating} />
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
            <Input disabled={!this.state.updating} />
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
            <Input disabled={!this.state.updating} />
          </FormItem>
        </Form>
        <Row justify="center">
          {this.state.updating === true ? (
            <Button
              type="primary"
              size="large"
              onClick={() => this.handleUpdateConfirmBtn()}
            >
              Confirm update
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={() => this.handleUpdateBtn()}
            >
              Update
            </Button>
          )}
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
