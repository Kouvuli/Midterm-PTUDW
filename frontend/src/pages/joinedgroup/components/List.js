import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { t } from '@lingui/macro'
import { Trans } from '@lingui/macro'
import { Link } from 'umi'
import styles from './List.less'
import dayjs from 'dayjs'

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>Image</Trans>,
        dataIndex: 'image',
        key: 'image',
        width: '7%',
        fixed: 'left',
        render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <Link to={`/joinedgroup/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Create day</Trans>,
        dataIndex: 'create_at',
        key: 'create_at',
        render: (text, record) => (
          <p>{dayjs(record.create_at).format('YYYY-MM-DD')}</p>
        ),
      },
    ]

    return (
      <Table
        {...tableProps}
        loading={false}
        pagination={{
          ...tableProps.pagination,
          
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

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List