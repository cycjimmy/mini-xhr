import _XMLHttpRequest from '../src/_XMLHttpRequest';

describe('_XMLHttpRequest', () => {
  test('_XMLHttpRequest() works', () => {
    _XMLHttpRequest({
      url: 'https://api.github.com/users/cycjimmy',
      ontimeoutCB: () => {
        console.log('timeout')
      },
      dataType: '',
      success: (data) => {
        expect(data).toBeTruthy();
      }
    });
  });
});
