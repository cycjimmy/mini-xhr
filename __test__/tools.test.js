import {dataStringMakeUp, getGlobal} from '../src/tools';

describe('tools', () => {
  test('dataStringMakeUp() default test', () => {
    expect(dataStringMakeUp()).toBe('');
  });

  test('dataStringMakeUp({a: 1, b: 2}) return a=1&b=2', () => {
    expect(dataStringMakeUp({a: 1, b: 2})).toBe('a=1&b=2');
  });

  test('dataStringMakeUp() cover test', () => {
    expect(dataStringMakeUp(Object.create({a: 1, b: 2}))).toBe('');
  });

  test('getGlobal() test return window', () => {
    expect(getGlobal()).toBe(window);
  });
});
