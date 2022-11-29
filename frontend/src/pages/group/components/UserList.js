import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { t } from '@lingui/macro'
import { Trans } from '@lingui/macro'
import { Link } from 'umi'
import styles from './List.less'

const { confirm } = Modal

class UserList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      role: 'MEMBER',
    }
  }
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem } = this.props

    // if (e.key === '1') {
    //   onEditItem(record)
    // } else if (e.key === '2') {
    //   confirm({
    //     title: t`Are you sure delete this record?`,
    //     onOk() {
    //       onDeleteItem(record.id)
    //     },
    //   })
    // }

    switch (e.key) {
      case '1':
        if (this.state.role === 'MEMBER') {
          // set co-owner
          this.setState({
            role: 'CO-OWNER',
          })
        }
        if (this.state.role === 'CO-OWNER') {
          // remove co-owner  + kickout
          this.setState({
            role: 'MEMBER',
          })
        }
        break
      case '2':
        confirm({
          title: t`Are you sure want to kick this user ?`,
          onOk() {
            onDeleteItem(record.id)
          },
        })
        // api
        break
      default:
        break
    }
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props
    const columns = [
      {
        title: <Trans>Avatar</Trans>,
        dataIndex: 'avatar',
        key: 'avatar',
        width: '7%',
        fixed: 'left',
        render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: <Trans>FullName</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`/user/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>Role</Trans>,
        dataIndex: 'role',
        width: '10%',
        key: 'role',
        render: () => <p>{this.state.role}</p>,
      },
      {
        title: <Trans>Birthday</Trans>,
        dataIndex: 'birthday',
        key: 'birthday',
      },

      {
        title: <Trans>Gender</Trans>,
        dataIndex: 'isMale',
        key: 'isMale',
        width: '7%',
        render: (text) => <span>{text ? 'Male' : 'Female'}</span>,
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        width: '8%',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={(e) => this.handleMenuClick(record, e)}
              menuOptions={
                // change this.state.role to record.role
                this.state.role === 'MEMBER'
                  ? [
                      { key: '1', name: t`Set Co-Owner` },
                      { key: '2', name: t`Kick out` },
                    ]
                  : this.state.role === 'CO-OWNER'
                  ? [
                      { key: '1', name: t`Remove Co-Owner` },
                      { key: '2', name: t`Kick out` },
                    ]
                  : [{ key: '1', name: t`Cake double U` }]
              }
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: (total) => t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={(record) => record.id}
      />
    )
  }
}

UserList.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default UserList
