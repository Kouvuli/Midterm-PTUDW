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
    console.log('Hi:', props.userData)
    this.state = {}
  }

  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem } = this.props

    switch (e.key) {
      case '1':
        if (record.role.name === 'MEMBER') {
          // set co-owner
          this.props.handleChangeRole(record.user.id, 3)
        } else if (record.role.name === 'CO-OWNER') {
          // remove co-owner
          this.props.handleChangeRole(record.user.id, 1)
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
    const emptyColumns = [
      {
        title: <Trans>Avatar</Trans>,
        dataIndex: 'avatar',
        key: 'avatar',
        width: '7%',
        fixed: 'left',
      },
      {
        title: <Trans>FullName</Trans>,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: <Trans>Role</Trans>,
        dataIndex: 'role',
        width: '10%',
        key: 'role',
      },
      {
        title: <Trans>Birthday</Trans>,
        dataIndex: 'birthday',
        key: 'birthday',
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
        render: (text, record, idx) => {
          return (
            <DropOption
              onMenuClick={(e) => this.handleMenuClick(record, e)}
              menuOptions={[]}
            />
          )
        },
      },
    ]

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
        render: (text, record, idx) => (
          <Link to={`/user/${record.user.id}`}>
            {this.props.userData[idx].user.fullname}
          </Link>
        ),
      },
      {
        title: <Trans>Role</Trans>,
        dataIndex: 'role',
        width: '10%',
        key: 'role',
        render: (text, record, idx) => (
          <p>{this.props.userData[idx].role.name}</p>
        ),
      },
      {
        title: <Trans>Birthday</Trans>,
        dataIndex: 'birthday',
        key: 'birthday',
        render: (text, record, idx) => (
          <p>{this.props.userData[idx].user.birthday}</p>
        ),
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: 'email',
        key: 'email',
        render: (text, record, idx) => (
          <p>{this.props.userData[idx].user.email}</p>
        ),
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        width: '8%',
        render: (text, record, idx) => {
          return (
            <DropOption
              onMenuClick={(e) => this.handleMenuClick(record, e)}
              menuOptions={
                // change this.state.role to record.role
                // lock group user members
                record.role.name === 'MEMBER'
                  ? [
                      { key: '1', name: t`Set Co-Owner`, idx: idx },
                      { key: '2', name: t`Kick out`, idx: idx },
                    ]
                  : record.role.name === 'CO-OWNER'
                  ? [
                      { key: '1', name: t`Remove Co-Owner`, idx: idx },
                      { key: '2', name: t`Kick out`, idx: idx },
                    ]
                  : [{ key: '1', name: t`Cake double U`, idx: idx }]
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
        columns={this.props.userData.length === [] ? emptyColumns : columns}
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