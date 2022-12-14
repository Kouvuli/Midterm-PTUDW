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

@connect(({ loading, dispatch }) => ({ loading, dispatch }))
class Login extends PureComponent {
  render() {
    const { dispatch, loading, location } = this.props

    const { query } = location
    const { success } = query

    const handleOk = (values) => {
      dispatch({ type: 'login/login', payload: values })
    }
    const handleFailed = (errorInfo) => {
      console.log(errorInfo)
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
        {/* <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <Form
            onFinish={handleOk}
            onFinishFailed={handleFailed}
            >
            <FormItem name="username" 
              rules={[{ required: true }]} hasFeedback>
                <Input
                  placeholder={t`Username`}
                />
            </FormItem>
            <Trans id="Password" render={({translation}) => (
              <FormItem name="password" rules={[{ required: true }]} hasFeedback>
              <Input type='password' placeholder={translation} required />
              </FormItem>)} 
            />
            <Row>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.effects.login}
              >
                <Trans>Sign in</Trans>
              </Button>
              <p>
                <span className="margin-right">
                  Don't have an account? <Link to="/register">Register now</Link>
                </span>
              </p>
              {success && <p className={styles.successMessage}>Signup Successfully</p>}
            </Row>
          </Form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter links={footerLinks} copyright={config.copyright} />
        </div> */}
        <PresentationStudentView></PresentationStudentView>
        {/* <PresentationTeacherView></PresentationTeacherView> */}
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
