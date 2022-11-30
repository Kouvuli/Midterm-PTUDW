import request from 'utils/request'
import { apiPrefix } from 'utils/config'

import api from './api'

const gen = (params, key) => {
  let url = apiPrefix + params
  let method = 'GET'

  
  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }

  let withBaseUrl = false

  if (['loginUser', 'registerUser'].includes(key)) {
    withBaseUrl = true
  }

  return function(data) {
    return request({
      url,
      data,
      method,
      withBaseUrl,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key], key)
}

APIFunction.queryWeather = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/weather/now.json`,
    data: params,
  })
}

export default APIFunction