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
import presentationService from '../../services/presentation'
import store from 'store'

@connect(({ presentation, loading }) => ({ presentation, loading }))
class Presentation extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      presentations: [],
    }
  }

  componentDidMount() {
    const auth = store.get('auth')
    const { id } = auth

    const initialLoad = async () => {
      const { data } = await presentationService.getPresentationList()
      const presentations = await Promise.all(data.map(async (present) => {
        const { group } = present
        const { data } = await groupService.getUserByGroupId(group.id)
        const members = data
        const valid = members.find(member => member.id === id && (member.role.name === "OWNER" || member.role.name === "CO-OWNER"))
        if (valid) {
          return present
        }
      }))
      this.setState({ presentations: presentations.filter(present => present) })
    }
    initialLoad();
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
    const { dispatch, presentation } = this.props
    const { list, pagination, selectedRowKeys } = presentation

    dispatch({
      type: 'presentation/multiDelete',
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
    const { dispatch, presentation, loading } = this.props
    const { currentItem, modalOpen, modalType } = presentation
    const handleUpdatePresentations = (newPresentation) => {
      let existedPresentationIndex = this.state.presentations.findIndex(presentation => presentation.id === newPresentation.id)
      if (existedPresentationIndex > -1) {
        let updateGroups = [...this.state.presentations]
        updateGroups[existedPresentationIndex] = newPresentation
        this.setState({ presentations: updateGroups })
      } else {
        this.setState({ presentations: [...this.state.presentations, newPresentation] })
      }
    }
    return {
      item: modalType === 'create' ? {} : currentItem,
      modalType: modalType,
      open: modalOpen,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`presentation/${modalType}`],
      title: `${modalType === 'create' ? t`Create Presentation` : t`Update Presentation`}`,
      centered: true,
      onOk: (data) => {
        dispatch({
          type: `presentation/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'presentation/hideModal',
        })
      },
      onSuccessUpdate(newGroup) {
        handleUpdatePresentations(newGroup)
        dispatch({
          type: 'presentation/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, presentation, loading } = this.props
    const { list, pagination, selectedRowKeys } = presentation

    const filteredGroups = this.state.presentations.filter((presentation) => !presentation.lock)

    return {
      // loading :
      dataSource: filteredGroups,
      loading: loading.effects['presentation/query'],
      pagination,
      onChange: (page) => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: (id) => {
        dispatch({
          type: 'presentation/delete',
          payload: id,
        }).then(() => {
          presentationService.deletePresentation({ id })
          .then(res => {
            const newPresentations = this.state.presentations.filter(presentation => presentation.id !== id)
            this.setState({ presentations: newPresentations })
          })
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
          type: 'presentation/showModal',
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
            type: 'presentation/updateState',
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
          type: 'presentation/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    const { presentation } = this.props
    const { selectedRowKeys } = presentation

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

Presentation.propTypes = {
  presentation: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Presentation
