/**
 * objectIterate
 * @param obj
 * @param fn
 */
export const objectIterate = (obj, fn) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn.call(null, obj[key], key, obj);
    }
  }
};

/**
 * Params String Make Up
 * @param params
 * @returns {string}
 */
export const paramsStringMakeUp = (params = {}) => {
  // set data string
  let sParams = '';

  objectIterate(params, (value, key) => {
    let prefix = '';

    if (sParams) {
      // not first key
      prefix = '&';
    }

    sParams += `${prefix + key}=${value}`;
  });

  return sParams;
};

/**
 * get Global
 * @returns {any}
 */
export const getGlobal = () => (typeof window === 'undefined' ? global : window);
