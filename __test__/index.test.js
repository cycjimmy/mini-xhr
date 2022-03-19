/* eslint no-undef: off */
/* eslint import/no-named-as-default-member: off */
import createXhrMock from '../__mocks__/createXhrMock';
import {
  responseSuccess, testUrl, statusTextFor404, JsonpErrorTextForTimeout,
} from '../__mocks__/someTestVariables';
import miniXhr from '../src/index';

describe('miniXhr', () => {
  test('miniXhr.get() default', () => {
    createXhrMock({
      response: responseSuccess,
    });

    return miniXhr.get(testUrl)
      .then((data) => {
        expect(data).toBe(responseSuccess);
      });
  });

  test('miniXhr.get() works when fail', () => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: statusTextFor404,
    });

    return miniXhr.get(testUrl)
      .catch((err) => {
        expect(err.status).toBe(404);
        expect(err.statusText).toBe(statusTextFor404);
      });
  });

  test('miniXhr.post() default', () => {
    createXhrMock({
      response: responseSuccess,
    });

    return miniXhr.post(testUrl)
      .then((data) => {
        expect(data).toBe(responseSuccess);
      });
  });

  test('miniXhr.post() works when fail', () => {
    createXhrMock({
      readyState: 4,
      status: 404,
      statusText: statusTextFor404,
    });

    return miniXhr.post(testUrl)
      .catch((err) => {
        expect(err.status).toBe(404);
        expect(err.statusText).toBe(statusTextFor404);
      });
  });

  test('miniXhr.jsonp() default', (done) => {
    miniXhr.jsonp(testUrl);
    setTimeout(done, 1e3);
  });

  test('miniXhr.jsonp() works when timeout', () => miniXhr.jsonp(testUrl, {
    data: { a: 1 },
    timeout: 2e3,
  })
    .catch((err) => {
      expect(err).toBe(JsonpErrorTextForTimeout);
    }));
});
