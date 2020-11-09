import createXhrMock from '../__mocks__/createXhrMock';
import {responseSuccess, testUrl} from '../__mocks__/someTestVariables';
import _XMLHttpRequest from '../src/_XMLHttpRequest';

describe('_XMLHttpRequest', () => {
  test('_XMLHttpRequest default', (done) => {
    createXhrMock({
      response: responseSuccess
    });

    _XMLHttpRequest({
      url: testUrl,
      success: (data) => {
        expect(data).toBe(responseSuccess);
        done();
      }
    });
  });

  test('_XMLHttpRequest timeout', done => {
    createXhrMock({
      readyState: 3,
      response: responseSuccess
    });

    _XMLHttpRequest({
      url: testUrl,
      timeout: 500,
      ontimeoutCB: done,
      dataType: '',
    });
  });

  test('_XMLHttpRequest fail', done => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: 'error'
    });

    _XMLHttpRequest({
      url: testUrl,
      fail: (err) => {
        done();
      }
    });
  });

  test('_XMLHttpRequest cover success function', (done) => {
    createXhrMock({
      response: responseSuccess
    });

    _XMLHttpRequest({
      url: testUrl,
    });

    setTimeout(done, 1e3);
  });

  test('_XMLHttpRequest cover fail function', (done) => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: 'error'
    });

    _XMLHttpRequest({
      url: testUrl,
    });

    setTimeout(done, 1e3);
  });
});
