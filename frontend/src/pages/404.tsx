import React from 'react'
import { FrownOutlined } from '@ant-design/icons'
import { Page } from 'components'
import styles from './404.less'
import { Redirect } from 'umi'
import { t } from "@lingui/macro"

const Error = () => (
  <Redirect to={t`/dashboard`} />
)

export default Error
