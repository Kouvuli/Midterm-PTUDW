import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history } from 'umi'
import { connect } from 'umi'
import { Row, Col, Button, Popconfirm } from 'antd'
import { t } from '@lingui/macro'
import { Page } from 'components'
import { stringify } from 'qs'
import UserList from '../components/UserList'
import UserFilter from '../components/UserFilter'
import UserModal from '../components/UserModal'
import styles from './index.less'

@connect(({ groupDetail, loading }) => ({ groupDetail, loading }))
class GroupDetail extends PureComponent {
  handleRefresh = (newQuery) => {
    const { location } = this.props
    const { query, pathname } = location

    history.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  handleDeleteUserItems = () => {
    const { dispatch, groupDetail } = this.props
    const { list, pagination, selectedRowKeys } = groupDetail
    dispatch({
      type: 'groupDetail/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    }).then(() => {
      this.handleRefresh({
        page:
          list.length === selectedRowKeys.length && pagination.current > 1
            ? pagination.current - 1
            : pagination.current,
      })
    })
  }

  get userModalProps() {
    const { dispatch, groupDetail, loading } = this.props
    const { currentItem, modalOpen, modalType } = groupDetail

    return {
      item: modalType === 'create' ? {} : currentItem,
      open: modalOpen,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`groupDetail/${modalType}`],
      title: `${modalType === 'create' ? t`Create User` : t`Update User`}`,
      centered: true,
      onOk: (data) => {
        dispatch({
          type: `groupDetail/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'groupDetail/hideModal',
        })
      },
    }
  }

  get userListProps() {
    const { dispatch, groupDetail, loading } = this.props

    const { list, pagination, selectedRowKeys } = groupDetail

    return {
      dataSource: list,
      loading: loading.effects['groupDetail/queryUserList'],
      pagination,
      onChange: (page) => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: (id) => {
        dispatch({
          type: 'groupDetail/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'groupDetail/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: (keys) => {
          dispatch({
            type: 'groupDetail/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  }

  get userFilterProps() {
    const { location, dispatch } = this.props
    const { query } = location

    return {
      filter: {
        ...query,
      },
      onFilterChange: (value) => {
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        dispatch({
          type: 'groupDetail/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    const { groupDetail } = this.props
    const { data, selectedRowKeys } = groupDetail
    const content = []

    for (let key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        if (key === 'image') {
          content.push(
            <div key={key} className={styles.item}>
              <div className={styles.title}>{key}</div>
              <img src={data[key]} alt="" />
            </div>
          )
        } else {
          content.push(
            <div key={key} className={styles.item}>
              <div className={styles.title}>{key}</div>
              <div>{String(data[key])}</div>
            </div>
          )
        }
      }
    }
    content.push(
      <div>
        <div className={styles.title}>Users in group</div>
        <UserFilter {...this.userFilterProps} />
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={this.handleDeleteUserItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <UserList {...this.userListProps} />
        <UserModal {...this.userModalProps} />
      </div>
    )
    return (
      <Page inner>
        <div className={styles.content}>{content}</div>
      </Page>
    )
  }
}

GroupDetail.propTypes = {
  groupDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default GroupDetail
