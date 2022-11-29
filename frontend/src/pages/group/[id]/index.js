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
import groupService from '../../../services/group'
import dayjs from 'dayjs'

@connect(({ groupDetail, loading }) => ({ groupDetail, loading }))
class GroupDetail extends PureComponent {
  urlSplit = window.location.href.split('/')
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      groupDetailLoading: true,
      userLoading: true,
      groupId: this.urlSplit[this.urlSplit.length - 1],
      group: {},
    }
  }

  handleGenerateInvitationLink = () => {
    groupService.getInvitationLink(this.state.groupId).then((res) => {
      console.log(res.data)
      navigator.clipboard.writeText(res.data)
      alert(`Invitation link had been copied to clipboard!`)
    })
  }

  handleChangeRole = (id, newRoleId) => {
    this.setState({
      users: this.state.users.map((user) => {
        if (user.user.id === id) {
          const newUser = { ...user }
          console.log('newRole ', newRoleId)
          switch (newRoleId) {
            case 1:
              newUser.role.name = 'MEMBER'
              break
            case 2:
              newUser.role.name = 'KICKOUT'
              break
            case 3:
              newUser.role.name = 'CO-OWNER'
              break
            case 4:
              newUser.role.name = 'OWNER'
              break
            default:
              break
          }
          newUser.role.id = newRoleId
          groupService
            .updateMemberRoleInGroup(id, newRoleId, this.state.groupId)
            .then((res) => console.log(res.data))
            .catch((error) => console.log(error))
          return newUser
        } else return user
      }),
    })
  }

  componentDidMount() {
    const urlSplit = window.location.href.split('/')
    const groupId = urlSplit[urlSplit.length - 1]
    groupService
      .getGroupByGroupId(groupId)
      .then((res) => {
        console.log(res.data)
        this.setState({ group: res.data, groupDetailLoading: false })
      })
      .catch((error) => console.log(error))
    groupService
      .getUserByGroupId(groupId)
      .then((res) => {
        console.log('Hi there', res.data)
        this.setState({ users: res.data, userLoading: false })
      })
      .catch((error) => {
        console.log(error)
      })
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
    console.log(groupDetail)
    return {
      dataSource: this.state.users,
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
    content.push(<h2>Group detail</h2>)
    for (let key in this.state.group) {
      if ({}.hasOwnProperty.call(this.state.group, key)) {
        switch (key) {
          case 'image':
            content.push(
              <>
                {this.state.groupDetailLoading ? null : (
                  <div key={key}>
                    <div>{key}</div>
                    <img src={this.state.group[key]} alt="" />
                  </div>
                )}
              </>
            )
            break
          case 'admin':
            content.push(
              <>
                {this.state.groupDetailLoading ? null : (
                  <div key={key}>
                    <div>Owner : {String(this.state.group[key].email)}</div>
                  </div>
                )}
              </>
            )
            break
          case 'create_at':
            content.push(
              <>
                {this.state.groupDetailLoading ? null : (
                  <div key={key}>
                    <div>
                      Create date :{' '}
                      {dayjs(String(this.state.group[key])).format(
                        'YYYY-MM-DD'
                      )}
                    </div>
                  </div>
                )}
              </>
            )
            break
          case 'lock':
            break
          default:
            content.push(
              <>
                {this.state.groupDetailLoading ? null : (
                  <div key={key}>
                    <div>
                      {key} : {String(this.state.group[key])}
                    </div>
                  </div>
                )}
              </>
            )
            break
        }
      }
    }
    content.push(
      <>
        {this.state.groupDetailLoading ? null : (
          <Button
            size="small"
            danger
            onClick={() => this.handleGenerateInvitationLink()}
          >
            Get invitation link
          </Button>
        )}
      </>
    )
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
        {this.state.userLoading === true ? (
          <div>Loading users data...</div>
        ) : (
          <UserList
            {...this.userListProps}
            userData={this.state.users}
            handleChangeRole={this.handleChangeRole}
          />
        )}

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
