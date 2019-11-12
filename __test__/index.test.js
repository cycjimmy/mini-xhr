import miniXhr from '../src/index';

describe('miniXhr', () => {
  test('miniXhr.get() works', () => {
    return miniXhr.get('https://api.github.com/users/cycjimmy')
      .then(data => {
        expect(data).toBeTruthy();
      });
  });

  test('miniXhr.get() works when fail', () => {
    return miniXhr.get('https://api.github.com/users/cycjimmy')
      .catch(err => {
        expect(err).toBeTruthy();
      });
  });

  test('miniXhr.post() works when fail', () => {
    return miniXhr.post('https://api.github.com/users/cycjimmy111111')
      .catch(err => {
        expect(err).toBeTruthy();
      });
  });

  test('miniXhr.script() works when timeout', () => {
    return miniXhr.script('https://aa.bb.com/cycjimmy', {
      data: {a: 1},
      timeout: 2e3,
    })
      .catch(err => {
        expect(err).toBeTruthy();
      });
  });

  test('miniXhr.jsonp() works when timeout', () => {
    return miniXhr.jsonp('https://aa.bb.com/cycjimmy', {
      data: {a: 1},
      timeout: 2e3,
    })
      .catch(err => {
        expect(err).toBeTruthy();
      });
  });
});
