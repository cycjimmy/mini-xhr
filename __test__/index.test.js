import createXhrMock from '../__mocks__/createXhrMock';
import {responseSuccess, testUrl} from '../__mocks__/someTestVariables';
import miniXhr from '../src/index';

describe('miniXhr', () => {
  test('miniXhr.get() default', () => {
    createXhrMock({
      response: responseSuccess
    });

    return miniXhr.get(testUrl)
      .then(data => {
        expect(data).toBe(responseSuccess);
      });
  });

  test('miniXhr.get() works when fail', () => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: 'error'
    });

    return miniXhr.get(testUrl)
      .catch(err => {
        expect(err).toBeTruthy();
      });
  });

  test('miniXhr.post() default', () => {
    createXhrMock({
      response: responseSuccess
    });

    return miniXhr.post(testUrl)
      .then(data => {
        expect(data).toBe(responseSuccess);
      });
  });

  test('miniXhr.post() works when fail', () => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: 'error'
    });

    return miniXhr.post(testUrl)
      .catch(err => {
        expect(err).toBeTruthy();
      });
  });

  test('miniXhr.script() default', (done) => {
    miniXhr.script(testUrl);
    setTimeout(done, 1e3);
  });

  test('miniXhr.script() works when timeout', () => {
    return miniXhr.script(testUrl, {
      data: {a: 1},
      timeout: 2e3,
    })
      .catch(err => {
        expect(err).toBeTruthy();
      });
  });

  test('miniXhr.script() default', (done) => {
    miniXhr.jsonp(testUrl);
    setTimeout(done, 1e3);
  });

  test('miniXhr.jsonp() works when timeout', () => {
    return miniXhr.jsonp(testUrl, {
      data: {a: 1},
      timeout: 2e3,
    })
      .catch(err => {
        expect(err).toBeTruthy();
      });
  });
});
