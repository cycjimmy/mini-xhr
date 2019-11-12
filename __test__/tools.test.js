import {dataStringMakeUp, getGlobal} from '../src/tools';

describe('tools', () => {
  test('dataStringMakeUp({a: 1, b: 2}) return a=1&b=2', () => {
    expect(dataStringMakeUp({a: 1, b: 2})).toBe('a=1&b=2');
  });

  test('getGlobal() in test return global', () => {
    expect(getGlobal()).toBe(global);
  });
});
