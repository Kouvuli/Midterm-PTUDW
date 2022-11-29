import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import styles from './index.less'
import userService from '../../../services/user'
import dayjs from 'dayjs'
@connect(({ userDetail }) => ({ userDetail }))
class UserDetail extends PureComponent {
  urlSplit = window.location.href.split('/')
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      userId: this.urlSplit[this.urlSplit.length - 1],
      loading: true,
    }
  }
  componentDidMount() {
    userService
      .getUserById(this.state.userId)
      .then((res) => this.setState({ user: res.data }))
      .catch((error) => console.log(error))
  }

  render() {
    const { userDetail } = this.props
    const { data } = userDetail
    const content = []
    return (
      <Page inner>
        <div className={styles.content}>
          <div>Fullname: {this.state.user.fullname}</div>
          <div>Email: {this.state.user.email}</div>
          <div>
            Birthday: {dayjs(this.state.user.birthday).format('YYYY-MM-DD')}
          </div>
        </div>
      </Page>
    )
  }
}

UserDetail.propTypes = {
  userDetail: PropTypes.object,
}

export default UserDetail
