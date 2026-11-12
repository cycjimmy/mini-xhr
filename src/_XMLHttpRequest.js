import { objectIterate, paramsStringMakeUp } from './tools.js'

// Creates the underlying XMLHttpRequest of a get/post call.
// Settings: method, url, timeout, ontimeoutCB, params, dataType, data,
// responseType, contentType, headers, success, fail.
export default ({
  method = 'GET',
  url,
  timeout = 0,
  ontimeoutCB = null,
  params = {},
  dataType = 'json',
  data,
  responseType = 'json',
  contentType = 'application/json; charset=UTF-8',
  headers = {},
  success = () => {},
  fail = () => {},
}) => {
  const xhr = new XMLHttpRequest()
  const sParams = paramsStringMakeUp(params)
  xhr.open(
    method,
    sParams
      ? `${url}?${paramsStringMakeUp(params)}`
      : url,
    true,
  )
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return
    }
    if (xhr.status >= 200 && xhr.status < 400) {
      success(xhr.response)
    }
    else {
      const { statusText, status } = xhr
      fail({
        statusText: status ? statusText : 'timeout',
        status,
      })
    }
  }

  xhr.timeout = timeout

  if (ontimeoutCB) {
    xhr.ontimeout = ontimeoutCB
  }

  xhr.responseType = responseType

  if (contentType) {
    xhr.setRequestHeader('Content-Type', contentType)
  }

  // set custom headers
  objectIterate(headers, (value, key) => {
    xhr.setRequestHeader(key, value)
  })

  switch (dataType) {
    case 'json':
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.send(JSON.stringify(data))
      break

    case 'text':
    case 'formData':
      xhr.setRequestHeader('Accept', '*/*')
      xhr.send(data)
      break

    default:
      xhr.send(data)
  }

  return xhr
}
