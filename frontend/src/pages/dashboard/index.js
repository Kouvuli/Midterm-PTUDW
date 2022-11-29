import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card, Button, DatePicker } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import { Alert, Form, Input, InputNumber, Radio, Cascader } from 'antd'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import dayjs from 'dayjs'
import dashBoardService from '../../services/dashboard'

import userService from '../../services/user'
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
  timer
  formRef = React.createRef()
  handleUpdateBtn() {
    this.setState({
      updating: true,
    })
  }

  handleUpdateConfirmBtn(e) {
    // handle Form send
    e.preventDefault()
    const updatedUser = {
      fullname: this.formRef.current.getFieldValue('fullname'),
      birthday: dayjs(this.formRef.current.getFieldValue('birthday')).format(
        'YYYY-MM-DD'
      ),
      email: this.formRef.current.getFieldValue('email'),
    }

    userService
      .updateUser(this.state.user.id, updatedUser)
      .then((res) => {
        this.setState({
          user: res.data,
          updating: false,
          dashBoardFetchingUpdate: false,
          alert: {
            message: 'Successfully updated',
            type: 'success',
          },
        })

        this.timer = setTimeout(() => {
          this.setState({ alert: { message: '', type: '' } })
        }, 1000)
      })
      .catch((err) => {
        this.formRef.current.setFieldsValue({
          fullname: this.state.user.fullname,
          birthday: this.state.user.birthday,
          email: this.state.user.email,
        })
        this.setState({
          updating: false,
          alert: {
            message: 'Failed to update',
            type: 'error',
          },
        })
        this.timer = setTimeout(() => {
          this.setState({ alert: { message: '', type: '' } })
        }, 1000)
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      updating: false,
      user: null,
      oldUser: null,
      alert: {
        message: '',
        type: '',
      },
    }
  }
  componentDidMount() {
    const auth = store.get('auth')
    const { id } = auth
    dashBoardService
      .getUserById(id)
      .then((res) => {
        res.data.birthday = dayjs(res.data.birthday)
        this.setState({
          user: res.data,
        })
      })
      .catch((e) => console.log(e.message))
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  render() {
    const userDetail = store.get('user')
    const { dashboard, loading } = this.props
    const { user } = dashboard

    if (this.state.user === null) {
      return <div>Loading...</div>
    } else {
      return (
        <>
          <Form
            ref={this.formRef}
            name="control-ref"
            layout="horizontal"
            initialValues={this.state.user}
          >
            <h1 style={{ textAlign: 'center' }}>Your profile</h1>
            <Row justify="center">
              <p
                style={
                  !this.state.alert.message
                    ? { display: 'none' }
                    : this.state.alert.type === 'error'
                    ? { color: 'red' }
                    : { color: 'green' }
                }
              >
                {this.state.alert.message}
              </p>
            </Row>
            <FormItem
              name="fullname"
              rules={[{ required: true }]}
              label={t`Full Name`}
              hasFeedback
              {...formItemLayout}
            >
              <Input disabled={!this.state.updating} />
            </FormItem>
            <FormItem
              name="birthday"
              label={t`Birthday`}
              hasFeedback
              {...formItemLayout}
            >
              <DatePicker disabled={!this.state.updating} format="YYYY-MM-DD" />
            </FormItem>
            <FormItem
              name="email"
              rules={[
                {
                  required: true,
                  pattern:
                    /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                  message: t`The input is not valid E-mail!`,
                },
              ]}
              label={t`Email`}
              hasFeedback
              {...formItemLayout}
            >
              <Input disabled={true} />
            </FormItem>
            <Row justify="center">
              {this.state.updating === true ? (
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  onClick={(e) => this.handleUpdateConfirmBtn(e)}
                  loading={this.dashBoardFetchingUpdate}
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
          </Form>
        </>
      )
    }
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Dashboard
