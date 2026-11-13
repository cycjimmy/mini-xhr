// Invokes `fn(value, key, obj)` for every own enumerable key of `obj`.
// `null`/`undefined` are tolerated: callers pass optional settings through
// unchanged, and a missing object means "nothing to iterate".
export function objectIterate(obj, fn) {
  if (obj === null || obj === undefined) {
    return
  }

  for (const key of Object.keys(obj)) {
    fn(obj[key], key, obj)
  }
}

// Builds the `a=1&b=2` query string of `params`, or an empty string.
export function paramsStringMakeUp(params = {}) {
  // set data string
  let sParams = ''

  objectIterate(params, (value, key) => {
    let prefix = ''

    if (sParams) {
      // not first key
      prefix = '&'
    }

    sParams += `${prefix + key}=${value}`
  })

  return sParams
}

// Returns the object that JSONP callbacks are attached to.
export function getGlobal() {
  if (typeof window !== 'undefined') {
    return window
  }

  // `globalThis` is ES2020 while the bundle targets ES2015, so keep `global`.
  // eslint-disable-next-line no-restricted-globals
  return global
}
