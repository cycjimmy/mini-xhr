import _XMLHttpRequest from './_XMLHttpRequest.js'
import { getGlobal, paramsStringMakeUp } from './tools.js'

// get(url, { params, headers, contentType, responseType, timeout, ontimeoutCB })
export function get(
  url,
  {
    params = {},
    headers = {},
    contentType,
    responseType = 'json',
    timeout = 0,
    ontimeoutCB = null,
  } = {},
) {
  return Promise.resolve().then(
    () => new Promise((resolve, reject) => {
      _XMLHttpRequest({
        method: 'GET',
        url,
        params,
        contentType,
        headers,
        responseType,
        timeout,
        ontimeoutCB,
        success: res => resolve(res),
        fail: err => reject(err),
      })
    }),
  )
}

// post(url, { params, data, dataType, headers, contentType, responseType, timeout, ontimeoutCB })
export function post(
  url,
  {
    params = {},
    data = {},
    dataType = 'json',
    headers = {},
    contentType,
    responseType = 'json',
    timeout = 0,
    ontimeoutCB = null,
  } = {},
) {
  return Promise.resolve().then(
    () => new Promise((resolve, reject) => {
      _XMLHttpRequest({
        method: 'POST',
        url,
        params,
        data,
        dataType,
        headers,
        contentType,
        responseType,
        timeout,
        ontimeoutCB,
        success: res => resolve(res),
        fail: err => reject(err),
      })
    }),
  )
}

// jsonp(url, { params, timeout })
export function jsonp(url, { params = {}, timeout = 5e3 } = {}) {
  const jsonpNameSpace = getGlobal()
  const STR_ERROR = 'error'
  const STR_TIMEOUT = 'timeout'

  return Promise.resolve().then(
    () => new Promise((resolve, reject) => {
      const oHead = document.querySelector('head')
      const oScript = document.createElement('script')
      const sParams = paramsStringMakeUp(params)

      oScript.src = url
      oScript.type = 'text/javascript'

      const callbackName = `jsonp_${Math.random()}`.replace('.', '')

      function clearScript() {
        oHead.removeChild(oScript)
        clearTimeout(oScript.timer)
        jsonpNameSpace[callbackName] = null
      }

      // jsonp callback function
      jsonpNameSpace[callbackName] = (json) => {
        clearScript()
        resolve(json)
      }

      // set oScript.src
      if (sParams) {
        oScript.src += `?${sParams}&callback=${callbackName}`
      }
      else {
        oScript.src += `?callback=${callbackName}`
      }

      // timeout handle
      oScript.timer = setTimeout(() => {
        clearScript()
        reject(STR_TIMEOUT)
      }, timeout)

      oScript.addEventListener('error', () => {
        clearScript()
        reject(STR_ERROR)
      })

      // send
      oHead.appendChild(oScript)
    }),
  )
}

export default {
  get,
  post,
  jsonp,
}
