import {dataStringMakeUp, getGlobal} from '../src/tools';

describe('tools', () => {
  test('dataStringMakeUp() default test', () => {
    expect(dataStringMakeUp()).toBe('');
  });

  test('dataStringMakeUp({a: 1, b: 2}) return a=1&b=2', () => {
    expect(dataStringMakeUp({a: 1, b: 2})).toBe('a=1&b=2');
  });

  test('getGlobal() test return global', () => {
    expect(getGlobal()).toBe(global);
  });
});
