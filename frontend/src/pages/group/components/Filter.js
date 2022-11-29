import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { FilterItem } from 'components'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { Button, Row, Col, DatePicker, Form, Input, Cascader } from 'antd'
import city from 'utils/city'
import invitationService from '../../../services/invitation'
import userService from '../../../services/user'
import store from 'store'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

class Filter extends Component {
  timer
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      invitationLink: '',
      alert: {
        message: '',
        type: '',
      },
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  handleInvitationLink = () => {
    const link = this.state.invitationLink
    invitationService.getGroupInfoFromInvitation(link).then((res) => {
      const group = res.data
      const auth = store.get('auth')
      const { id: userId } = auth
      userService
        .addUserToGroup(userId, group.id)
        .then((res) => {
          this.setState({
            alert: {
              message: `Accepted invitation to group ${group.name}`,
              type: 'success',
            },
          })
          this.timer = setTimeout(
            () => this.setState({ alert: { message: '', type: '' } }),
            1000
          )
        })
        .catch((error) => {
          this.setState({
            alert: {
              message: `Failed to accept invitation`,
              type: 'error',
            },
          })
          this.timer = setTimeout(
            () => this.setState({ alert: { message: '', type: '' } }),
            1000
          )
        })
    }).catch((error) => {
      this.setState({
        alert: {
          message: `Failed to accept invitation`,
          type: 'error',
        },
      })
      this.timer = setTimeout(
        () => this.setState({ alert: { message: '', type: '' } }),
        1000
      )
    })
  }
  handleFields = (fields) => {
    const { createTime } = fields
    if (createTime && createTime.length) {
      fields.createTime = [
        dayjs(createTime[0]).format('YYYY-MM-DD'),
        dayjs(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange } = this.props
    const values = this.formRef.current.getFieldsValue()
    const fields = this.handleFields(values)
    onFilterChange(fields)
  }

  handleReset = () => {
    const fields = this.formRef.current.getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    this.formRef.current.setFieldsValue(fields)
    this.handleSubmit()
  }
  handleChange = (key, values) => {
    const { onFilterChange } = this.props
    let fields = this.formRef.current.getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { onAdd, filter } = this.props
    const { name, address } = filter

    let initialCreateTime = []
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = dayjs(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = dayjs(filter.createTime[1])
    }

    return (
      <>
        <h3>Have an invitation link ?</h3>
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
        <div style={{ display: 'flex', margin: '1em 0 1em 0' }}>
          <Input
            style={{ width: '350px' }}
            name="invitationLink"
            alt=""
            value={this.state.invitationLink}
            onChange={(e) => this.setState({ invitationLink: e.target.value })}
          ></Input>
          <Button
            onClick={() => this.handleInvitationLink()}
            style={{ marginLeft: '0.5em' }}
          >
            Accept invite
          </Button>
        </div>
        <Form
          ref={this.formRef}
          name="control-ref"
          initialValues={{ name, address, createTime: initialCreateTime }}
        >
          <Row gutter={24}>
            <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
              <Form.Item name="name">
                <Search
                  placeholder={t`Search Name`}
                  onSearch={this.handleSubmit}
                />
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
              xl={{ span: 4 }}
              md={{ span: 8 }}
              id="addressCascader"
            ></Col>
            <Col
              {...ColProps}
              xl={{ span: 6 }}
              md={{ span: 8 }}
              sm={{ span: 12 }}
              id="createTimeRangePicker"
            >
              <FilterItem label={t`Created`}>
                <Form.Item name="createTime">
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </FilterItem>
            </Col>
            <Col
              {...TwoColProps}
              xl={{ span: 10 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
            >
              <Row type="flex" align="middle" justify="space-between">
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="margin-right"
                    onClick={this.handleSubmit}
                  >
                    <Trans>Search</Trans>
                  </Button>
                  <Button onClick={this.handleReset}>
                    <Trans>Reset</Trans>
                  </Button>
                </div>

                <Button type="ghost" onClick={onAdd}>
                  <Trans>Create</Trans>
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
