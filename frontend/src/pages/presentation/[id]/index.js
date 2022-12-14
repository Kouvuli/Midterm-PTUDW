import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect, Link } from 'umi'
import { Button, Row, Input, Form, DatePicker } from 'antd'
import { GlobalFooter } from 'components'
import { GithubOutlined } from '@ant-design/icons'
import { t, Trans } from '@lingui/macro'
import { setLocale } from 'utils'
import config from 'utils/config'
import dayjs from 'dayjs'

import styles from './index.less'
import EditPresentationBody from './components/EditPresentationBody'

@connect(({ loading, dispatch }) => ({ loading, dispatch }))
class PresentationDetail extends PureComponent {
  render() {
    const { dispatch, loading } = this.props

    const handleOk = (values) => {
      values.birthday = dayjs(values.birthday).format('YYYY-MM-DD')
      dispatch({ type: 'register/register', payload: values })
    }
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
        <EditPresentationBody></EditPresentationBody>
        <div className={styles.footer}>
          <GlobalFooter links={footerLinks} copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

PresentationDetail.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default PresentationDetail
