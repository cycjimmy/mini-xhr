import createXhrMock from '../__mocks__/createXhrMock.js'
import { responseSuccess, statusTextFor404, testUrl } from '../__mocks__/someTestVariables.js'
import _XMLHttpRequest from '../src/_XMLHttpRequest.js'

describe('_XMLHttpRequest', () => {
  it('_XMLHttpRequest default', (done) => {
    createXhrMock({
      response: responseSuccess,
    })

    _XMLHttpRequest({
      url: testUrl,
      success: (data) => {
        expect(data).toBe(responseSuccess)
        done()
      },
    })
  })

  it('_XMLHttpRequest timeout', (done) => {
    createXhrMock({
      readyState: 4,
      status: 0,
      response: responseSuccess,
    })

    _XMLHttpRequest({
      url: testUrl,
      timeout: 500,
      ontimeoutCB: done,
      dataType: '',
    })
  })

  it('_XMLHttpRequest fail', (done) => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: statusTextFor404,
    })

    _XMLHttpRequest({
      url: testUrl,
      fail: () => {
        done()
      },
    })
  })

  it('_XMLHttpRequest cover success function', (done) => {
    createXhrMock({
      response: responseSuccess,
    })

    _XMLHttpRequest({
      url: testUrl,
      data: {
        a: 1,
      },
      headers: {
        h1: 1,
      },
    })

    setTimeout(done, 1e3)
  })

  it('_XMLHttpRequest cover fail function', (done) => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: statusTextFor404,
    })

    _XMLHttpRequest({
      url: testUrl,
    })

    setTimeout(done, 1e3)
  })

  it('_XMLHttpRequest cover readyState', (done) => {
    createXhrMock({
      readyState: 3,
    })

    _XMLHttpRequest({
      url: testUrl,
    })

    setTimeout(done, 1e3)
  })
})
