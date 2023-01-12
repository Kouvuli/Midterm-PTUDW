import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect, Link } from 'umi'
import { Button, Row, Input, Form } from 'antd'
import { GlobalFooter } from 'components'
import { GithubOutlined } from '@ant-design/icons'
import { t, Trans } from '@lingui/macro'
import { setLocale } from 'utils'
import config from 'utils/config'

import styles from './index.less'
import PresentationTeacherView from './PresentationTeacherView'
import PresentationStudentView from './PresentationStudentView'
const FormItem = Form.Item

import groupService from '../../services/group'
import presentationService from '../../services/presentation'
import store from 'store'

@connect(({ loading, dispatch }) => ({ loading, dispatch }))
class LivePresentation extends PureComponent {
  urlParams = new URLSearchParams(window.location.search)
  roomId = this.urlParams.get('id')

  constructor(props) {
    super(props)
    this.state = {
      view: "",
    }
  }

  componentDidMount() {
    const auth = store.get('auth')
    const { id } = auth

    const initialLoad = async () => {
      try {
        const { data: present } = await presentationService.getPresentationById(this.roomId)
        const { group } = present
          const { data: members } = await groupService.getUserByGroupId(group.id)
          const valid = members.find(member => member.id === id && (member.role.name === "OWNER" || member.role.name === "CO-OWNER"))
          const view = valid ? "teacher" : "student"
          this.setState({ view: view })
      } catch(err) {
        this.setState({ view: "404" })
      }
    }
    initialLoad();
  }

  render() {
    const { dispatch, loading, location } = this.props
    console.log(this.roomId)
    const { query } = location
    const { success } = query

    let footerLinks = [
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/zuiidea/antd-admin',
        blankTarget: true,
      },
    ]

    if (config.i18n) {
      footerLinks = footerLinks.concat(
        config.i18n.languages.map((item) => ({
          key: item.key,
          title: (
            <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>
          ),
        }))
      )
    }

    return (
      <Fragment>
        {this.state.view === '404' ? (
          <div>
            <h3>presentation not found or you are not authorized</h3>
          </div>
        ) : null}
        {this.state.view === 'teacher' ? (
          <PresentationTeacherView
            roomId={this.roomId}
          ></PresentationTeacherView>
        ) : null}
        {this.state.view === 'student' ? (
          <PresentationStudentView
            roomId={this.roomId}
          ></PresentationStudentView>
        ) : null}
      </Fragment>
    )
  }
}

LivePresentation.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default LivePresentation
