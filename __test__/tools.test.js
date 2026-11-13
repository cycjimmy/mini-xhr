import { getGlobal, paramsStringMakeUp } from '../src/tools.js'

describe('tools', () => {
  it('dataStringMakeUp() default test', () => {
    expect(paramsStringMakeUp()).toBe('')
  })

  it('dataStringMakeUp({a: 1, b: 2}) return a=1&b=2', () => {
    expect(paramsStringMakeUp({ a: 1, b: 2 })).toBe('a=1&b=2')
  })

  it('dataStringMakeUp() cover test', () => {
    expect(paramsStringMakeUp(Object.create({ a: 1, b: 2 }))).toBe('')
  })

  it('dataStringMakeUp(null) return an empty string', () => {
    expect(paramsStringMakeUp(null)).toBe('')
  })

  it('getGlobal() test return window', () => {
    expect(getGlobal()).toBe(window)
  })
})
