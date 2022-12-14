import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history } from 'umi'
import { connect } from 'umi'
import { Row, Col, Button, Popconfirm, Input } from 'antd'
import { t } from '@lingui/macro'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import groupService from '../../services/group'
import store from 'store'
import invitationService from '../../services/invitation'
import userService from '../../services/user'
@connect(({ group, loading }) => ({ group, loading }))
class JoinedGroup extends PureComponent {
  timer
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      invitationLink: '',
      alert: {
        message: '',
        type: '',
      },
      acceptInvitationloading: false,
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  handleInvitationLink = () => {
    this.setState({ acceptInvitationloading: true })
    const link = this.state.invitationLink
    const auth = store.get('auth')
    const { id: userId } = auth
    invitationService
      .getGroupInfoFromInvitation(link)
      .then((res) => {
        const group = res.data
        console.log(group)
        groupService
          .getUserByGroupId(group.id)
          .then((res) => {
            console.log(res.data)
            this.setState({ userInGroup: res.data })
            const isUserInGroup = this.state.userInGroup.find(
              (user) => user.user.id === userId
            )

            if (group.admin.id !== userId && isUserInGroup === undefined) {
              userService
                .addUserToGroup(userId, group.id)
                .then((res) => {
                  this.setState({
                    groups: [...this.state.groups, group],
                    alert: {
                      message: `Accepted invitation to group ${group.name}`,
                      type: 'success',
                      acceptInvitationloading: false,
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
                      acceptInvitationloading: false,
                    },
                  })
                  this.timer = setTimeout(
                    () => this.setState({ alert: { message: '', type: '' } }),
                    1000
                  )
                })
            } else throw new Error('Already in the group')
          })
          .catch((error) => {
            this.setState({
              alert: {
                message: `Failed to accept invitation`,
                type: 'error',
              },
              acceptInvitationloading: false,
            })
            this.timer = setTimeout(
              () => this.setState({ alert: { message: '', type: '' } }),
              1000
            )
          })
      })
      .catch((error) => {
        this.setState({
          alert: {
            message: `Failed to accept invitation`,
            type: 'error',
            acceptInvitationloading: false,
          },
        })
        this.timer = setTimeout(
          () => this.setState({ alert: { message: '', type: '' } }),
          1000
        )
      })
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

    const filteredGroups = [
      ...this.state.groups.filter((group) => !group.lock),
    ].filter((group) => group.role.name !== 'KICKOUT')

    return {
      // loading :
      dataSource: filteredGroups,
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
    const filteredGroups = [
      ...this.state.groups.filter((group) => !group.lock),
    ].filter((group) => group.role.name !== 'KICKOUT')
    return (
      <Page inner>
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
        <List {...this.listProps} groupData={filteredGroups} />
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