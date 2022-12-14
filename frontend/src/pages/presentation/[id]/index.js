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

const FormItem = Form.Item

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
        {/* <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <Form onFinish={handleOk}>
            <FormItem name="username" rules={[{ required: true }]} hasFeedback>
              <Input placeholder={t`Username`} />
            </FormItem>
            <FormItem t name="email" rules={[{ required: true, pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: t`The input is not valid E-mail!`, }]} hasFeedback>
              <Input placeholder={t`Email`} />
            </FormItem>
            <FormItem name="fullname" rules={[{ required: true }]} hasFeedback>
              <Input placeholder={t`Fullname`} />
            </FormItem>
            <FormItem name="birthday" rules={[{ required: true }]} hasFeedback>
              <DatePicker className={styles.dob} format="DD/MM/YYYY" placeholder="Date of Birth" />
            </FormItem>
            <Trans
              id="Password"
              render={({ translation }) => (
                <FormItem
                  name="password"
                  rules={[{ required: true }]}
                  hasFeedback
                >
                  <Input type="password" placeholder={translation} required />
                </FormItem>
              )}
            />
            <Row>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.effects.register}
              >
                <Trans>Register</Trans>
              </Button>
              <p>
                <span className="margin-right">
                  Already have an account? <Link to="/login">Login now</Link>
                </span>
              </p>
            </Row>
          </Form>
        </div> */}
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
