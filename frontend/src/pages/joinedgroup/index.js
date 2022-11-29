import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history } from 'umi'
import { connect } from 'umi'
import { Row, Col, Button, Popconfirm } from 'antd'
import { t } from '@lingui/macro'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import groupService from '../../services/group'
import store from 'store'

@connect(({ group, loading }) => ({ group, loading }))
class JoinedGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
    }
  }

  componentDidMount() {
    const auth = store.get('auth')
    const { id } = auth
    groupService
      .getJoinedGroupByUserId(id)
      .then((res) => {
        console.log(res.data)
        this.setState({ groups: res.data })
      })
      .catch((e) => console.log(e))
  }

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

  handleDeleteItems = () => {
    const { dispatch, group } = this.props
    const { list, pagination, selectedRowKeys } = group

    dispatch({
      type: 'joinedGroup/multiDelete',
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

  get modalProps() {
    const { dispatch, group, loading } = this.props
    const { currentItem, modalOpen, modalType } = group
    const handleUpdateGroups = (newGroup) => {
      this.setState({ groups: [...this.state.groups, newGroup] })
    }
    return {
      item: modalType === 'create' ? {} : currentItem,
      open: modalOpen,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`joinedGroup/${modalType}`],
      title: `${modalType === 'create' ? t`Create Group` : t`Update Group`}`,
      centered: true,
      onOk: (data) => {
        dispatch({
          type: `joinedGroup/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'joinedGroup/hideModal',
        })
      },
      onSuccessUpdate(newGroup) {
        handleUpdateGroups(newGroup)
        dispatch({
          type: 'joinedGroup/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, group, loading } = this.props
    const { list, pagination, selectedRowKeys } = group

    return {
      // loading :
      dataSource: this.state.groups,
      loading: loading.effects['joinedGroup/query'],
      pagination,
      onChange: (page) => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: (id) => {
        dispatch({
          type: 'joinedGroup/delete',
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
          type: 'joinedGroup/showModal',
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
            type: 'joinedGroup/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  }

  get filterProps() {
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
          type: 'joinedGroup/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    const { group } = this.props
    const { selectedRowKeys } = group

    return (
      <Page inner>
        <Filter {...this.filterProps} />
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={this.handleDeleteItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

JoinedGroup.propTypes = {
  group: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default JoinedGroup