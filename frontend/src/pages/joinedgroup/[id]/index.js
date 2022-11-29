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

@connect(({ joinedGroupDetail, loading }) => ({ joinedGroupDetail, loading }))
class JoinedGroupDetail extends PureComponent {
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
    const { dispatch, joinedGroupDetail } = this.props
    const { list, pagination, selectedRowKeys } = joinedGroupDetail
    dispatch({
      type: 'joinedGroupDetail/multiDelete',
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
    const { dispatch, joinedGroupDetail, loading } = this.props
    const { currentItem, modalOpen, modalType } = joinedGroupDetail

    return {
      item: modalType === 'create' ? {} : currentItem,
      open: modalOpen,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`joinedGroupDetail/${modalType}`],
      title: `${modalType === 'create' ? t`Create User` : t`Update User`}`,
      centered: true,
      onOk: (data) => {
        dispatch({
          type: `joinedGroupDetail/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'joinedGroupDetail/hideModal',
        })
      },
    }
  }

  get userListProps() {
    const { dispatch, joinedGroupDetail, loading } = this.props

    const { list, pagination, selectedRowKeys } = joinedGroupDetail

    return {
      dataSource: list,
      loading: loading.effects['joinedGroupDetail/queryUserList'],
      pagination,
      onChange: (page) => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: (id) => {
        dispatch({
          type: 'joinedGroupDetail/delete',
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
          type: 'joinedGroupDetail/showModal',
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
            type: 'joinedGroupDetail/updateState',
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
          type: 'joinedGroupDetail/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    const { joinedGroupDetail } = this.props
    const { data, selectedRowKeys } = joinedGroupDetail
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
        <div className={styles.title}>Users in joined group</div>
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

JoinedGroupDetail.propTypes = {
  joinedGroupDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default JoinedGroupDetail
