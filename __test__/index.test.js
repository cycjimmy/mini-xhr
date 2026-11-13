import FormData from 'form-data'

import createXhrMock from '../__mocks__/createXhrMock.js'
import {
  JsonpErrorTextForError,
  JsonpErrorTextForTimeout,
  responseSuccess,
  statusTextFor404,
  testUrl,
} from '../__mocks__/someTestVariables.js'
import miniXhr from '../src/index.js'

describe('miniXhr', () => {
  it('miniXhr.get() default', () => {
    createXhrMock({
      response: responseSuccess,
    })

    return miniXhr.get(testUrl)
      .then((data) => {
        expect(data).toBe(responseSuccess)
      })
  })

  it('miniXhr.get() works when fail', () => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: statusTextFor404,
    })

    return miniXhr.get(testUrl, {
      params: {
        a: 'a',
      },
    })
      .catch((err) => {
        expect(err.status).toBe(404)
        expect(err.statusText).toBe(statusTextFor404)
      })
  })

  it('miniXhr.post() default', () => {
    createXhrMock({
      response: responseSuccess,
    })

    return miniXhr.post(testUrl)
      .then((data) => {
        expect(data).toBe(responseSuccess)
      })
  })

  it('miniXhr.post() works when fail', () => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: statusTextFor404,
    })

    return miniXhr.post(testUrl)
      .catch((err) => {
        expect(err.status).toBe(404)
        expect(err.statusText).toBe(statusTextFor404)
      })
  })

  it('miniXhr.post() send formData', () => {
    createXhrMock({
      response: responseSuccess,
    })

    const formData = new FormData()
    formData.append('testField', 'testValue')

    return miniXhr.post(testUrl, {
      data: formData,
      dataType: 'formData',
      contentType: '',
    })
      .then((data) => {
        expect(data).toBe(responseSuccess)
      })
  })

  it('miniXhr.post() send text', () => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: statusTextFor404,
    })

    return miniXhr.post(testUrl, {
      data: 'text',
      dataType: 'text',
    })
      .catch((err) => {
        expect(err.status).toBe(404)
        expect(err.statusText).toBe(statusTextFor404)
      })
  })

  it('miniXhr.jsonp() default', (done) => {
    miniXhr.jsonp(testUrl)
    setTimeout(done, 1e3)
  })

  // jsdom never loads a script with a remote src, so the injected `<script>` is
  // answered by the test itself: either through the callback name carried by
  // the generated `src`, or through an `error` event. `document.head.appendChild`
  // is stubbed rather than spied on because the native ESM run has no `jest` global.
  it('miniXhr.jsonp() resolves through the injected callback', () => {
    const appendChild = document.head.appendChild
    let injected
    document.head.appendChild = (script) => {
      const appended = appendChild.call(document.head, script)
      injected = script

      const callbackName = new URL(script.src).searchParams.get('callback')
      window[callbackName](responseSuccess)

      return appended
    }

    return miniXhr.jsonp(testUrl, {
      params: { a: 1 },
    })
      .then((data) => {
        expect(data).toBe(responseSuccess)
        // the callback removed its own script from the head
        expect(injected.parentNode).toBeNull()
      })
      .finally(() => {
        delete document.head.appendChild
      })
  })

  it('miniXhr.jsonp() rejects when the script fails to load', () => {
    const appendChild = document.head.appendChild
    let injected
    document.head.appendChild = (script) => {
      const appended = appendChild.call(document.head, script)
      injected = script
      script.dispatchEvent(new Event('error'))

      return appended
    }

    return miniXhr.jsonp(testUrl)
      .catch((err) => {
        expect(err).toBe(JsonpErrorTextForError)
        expect(injected.parentNode).toBeNull()
      })
      .finally(() => {
        delete document.head.appendChild
      })
  })

  it('miniXhr.jsonp() works when timeout', () => miniXhr.jsonp(testUrl, {
    params: { a: 1 },
    timeout: 2e3,
  })
    .catch((err) => {
      expect(err).toBe(JsonpErrorTextForTimeout)
    }))
})
